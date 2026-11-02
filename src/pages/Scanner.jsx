import React from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import {Camera,Barcode,ImagePlus,Search,ScanLine,ArrowRight,Square,LoaderCircle} from 'lucide-react';
import {PageTitle,ProductMini,Tag} from '../components/Shared.jsx';
import {catalogue} from '../data/catalogue.js';

// Convert Open Food Facts data into the shape used by the Consumerverse report.
function formatProduct(data, barcode) {
  const name = data.product_name || data.product_name_en || data.generic_name || 'Unnamed product';
  const ingredientSource = data.ingredients?.length
    ? data.ingredients.map(x => x.text || x.id || '').filter(Boolean)
    : (data.ingredients_text || data.ingredients_text_en || '').split(/[,;]+/).map(x => x.trim()).filter(Boolean);
  const ingredients = ingredientSource.slice(0, 20);
  const categories = (data.categories || '').split(',').map(x => x.trim()).filter(Boolean);
  return {
    id: `barcode-${barcode}`, barcode, name,
    brand: data.brands || 'Brand not listed',
    category: categories.at(-1) || 'Product',
    quantity: data.quantity || 'Not listed',
    description: data.generic_name || data.product_name || 'Product information retrieved from Open Food Facts.',
    ingredients,
    cautions: [data.allergens ? `Declared allergens: ${data.allergens}` : 'Allergen information is not available in this database record.', data.traces ? `Possible traces declared: ${data.traces}` : 'Trace-allergen information is not available in this record.', 'Check the physical package for expiry date, seal and storage instructions.'],
    pros: ['Product record found in an external product database'],
    cons: ['Database information may be incomplete or user-contributed'],
    rating: 0, reviews: 0, offers: [], alternatives: []
  };
}

export default function Scanner({onFound,recent}) {
  const [term,setTerm]=React.useState('');
  const [file,setFile]=React.useState(null);
  const [error,setError]=React.useState('');
  const [loading,setLoading]=React.useState(false);
  const [cameraOpen,setCameraOpen]=React.useState(false);
  const videoRef=React.useRef(null);
  const controlsRef=React.useRef(null);

  React.useEffect(()=>()=>{controlsRef.current?.stop();},[]);

  async function lookupBarcode(rawCode) {
    const code = String(rawCode || '').replace(/\D/g, '');
    if (!code) { setError('Please enter a valid barcode number.'); return; }
    setLoading(true); setError('');
    try {
      // Requests go through Vite's local proxy so Safari does not have to
      // contact the external product database directly.
      const databases = ['/off-food', '/off-beauty', '/off-petfood', '/off-products'];
      let found = null;
      let lastError = null;
      for (const base of databases) {
        try {
          const response = await fetch(`${base}/api/v2/product/${encodeURIComponent(code)}.json`);
          if (!response.ok) {
            lastError = new Error(`Database returned HTTP ${response.status}`);
            continue;
          }
          const result = await response.json();
          if (result.status === 1 && result.product) { found = result.product; break; }
        } catch (err) { lastError = err; }
      }
      if (found) { onFound(formatProduct(found, code)); return; }
      const sample = catalogue.find(p => p.barcode === code);
      if (sample) { onFound(sample); return; }
      if (lastError) {
        throw new Error(`Product database connection failed (${lastError.message}). Make sure you started the updated project with npm run dev.`);
      }
      setError('Barcode reached the product databases, but no matching product was found. Try another barcode.');
    } catch (e) {
      setError(e.message || 'Product lookup failed. Please try again.');
    } finally { setLoading(false); }
  }

  async function startCamera(){
    setError('');setCameraOpen(true);
    try {
      const reader=new BrowserMultiFormatReader();
      // Give React a moment to render the video element.
      await new Promise(resolve=>setTimeout(resolve,100));
      controlsRef.current=await reader.decodeFromVideoDevice(undefined,videoRef.current,(result)=>{
        if(result){const code=result.getText();controlsRef.current?.stop();setCameraOpen(false);setTerm(code);lookupBarcode(code);}
      });
    } catch(e) {setCameraOpen(false);setError('Could not open camera. Allow camera permission and use localhost or HTTPS.');}
  }

  function find(){
    const q=term.trim();
    if(!q)return;
    const sample=catalogue.find(x=>x.name.toLowerCase().includes(q.toLowerCase())||x.brand.toLowerCase()===q.toLowerCase());
    if(sample){onFound(sample);return;}
    lookupBarcode(q);
  }

  return <>
    <PageTitle eyebrow="START HERE" title="Scan before you spend." sub="Scan a product barcode or enter its number to look up product information."/>
    <div className="scanner-grid"><section className="scan-panel"><div className="scan-frame"><div className="scan-corners"><ScanLine size={54}/></div><b>Ready to scan?</b><p>Use your camera to read a barcode, or enter the barcode number manually.</p>
      <div className="scan-actions">
        <button className="secondary" onClick={cameraOpen?()=>{controlsRef.current?.stop();setCameraOpen(false);}:startCamera}><Camera size={17}/>{cameraOpen?'Stop camera':'Scan with camera'}</button>
        <button className="secondary" onClick={()=>document.getElementById('barcode-input')?.focus()}><Barcode size={17}/> Enter barcode</button>
      </div>
      {cameraOpen&&<div style={{marginTop:'1rem'}}><video ref={videoRef} style={{width:'100%',maxHeight:280,objectFit:'cover',borderRadius:12}}/><small className="muted">Point the camera at the product's barcode.</small></div>}
      {file&&<Tag tone="success">Selected: {file.name}</Tag>}
      <small className="muted">Product details are retrieved from Open Food Facts when a matching record exists. Coverage and fields vary by product.</small>
    </div>
    <div className="search-box"><Search/><input id="barcode-input" value={term} onChange={e=>setTerm(e.target.value)} onKeyDown={e=>e.key==='Enter'&&find()} placeholder="Enter any product barcode..."/><button className="primary" onClick={find} disabled={loading}>{loading?<><LoaderCircle size={16}/> Searching...</>:'Find product'} {!loading&&<ArrowRight size={16}/>}</button></div>
    {error&&<p className="error">{error}</p>}
    <small className="muted">Image upload is not barcode recognition yet. Use camera scan or type the barcode.</small>
    </section>
    <aside className="sample-panel"><span className="eyebrow">TRY A SAMPLE</span><h3>Or explore demo products</h3><p>These are local examples, separate from the external database.</p>{catalogue.map(p=><ProductMini key={p.id} product={p} onClick={()=>onFound(p)}/>)}</aside></div>
    {recent?.length>0&&<section className="section"><div className="section-head"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recently viewed</h2></div><Tag>{recent.length} products</Tag></div><div className="product-list">{recent.map(p=><ProductMini key={p.id} product={p} onClick={()=>onFound(p)}/>)}</div></section>}
  </>;
}
