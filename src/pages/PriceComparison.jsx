import React from 'react';
import {ExternalLink,ShoppingBag,Info} from 'lucide-react';
import {PageTitle,Tag} from '../components/Shared.jsx';
import {retailerSearchLinks} from '../services/productService.js';
export default function PriceComparison({product}){
 const offers=[...(product?.offers||[])].sort((a,b)=>a[1]-b[1]);
 const links=retailerSearchLinks(product);
 return <><PageTitle eyebrow="SMART DEAL FINDER" title="Compare before you buy." sub={`Find current listings for ${product?.name||'your product'} on retailer websites.`}/>
 {offers.length>0&&<><div className="notice"><Info size={17}/>The prices below come from the project’s sample catalogue. They are not live retailer prices and should not be used to claim the cheapest store.</div><div className="table-wrap"><table><thead><tr><th>Demo store</th><th>Sample price</th><th>Delivery note</th></tr></thead><tbody>{offers.map(o=><tr key={o[0]}><td>{o[0]}</td><td>₹{o[1]}</td><td>{o[2]}</td></tr>)}</tbody></table></div></>}
 <section className="panel" style={{marginTop:'1.2rem'}}><h3><ShoppingBag size={19}/> Check live listings</h3><p>Open the exact product search on each marketplace. Confirm the matching size/model, seller, shipping, coupons and final checkout price.</p><div className="alt-grid">{links.map(x=><a className="secondary" style={{textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem'}} key={x.store} href={x.url} target="_blank" rel="noreferrer">{x.store}<ExternalLink size={16}/></a>)}</div></section>
 <div className="notice">Automatic live price collection requires an authorised shopping/affiliate API or a compliant product-search provider. This version links to live retailer search results instead of scraping pages or inventing prices.</div></>;
}
