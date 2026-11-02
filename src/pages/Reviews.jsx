import React from 'react';
import {ExternalLink,Info} from 'lucide-react';
import {PageTitle,Tag} from '../components/Shared.jsx';
import {reviewSearchLinks} from '../services/productService.js';
export default function Reviews({product}){
 const links=reviewSearchLinks(product);
 return <><PageTitle eyebrow="BUYER VOICES" title="Research customer feedback." sub={`Find customer feedback for ${product?.name||'your product'} from external sources.`}/>
 <div className="notice"><Info size={17}/>We do not have permissioned access to verified Amazon/Flipkart review feeds in this project. We have removed invented demo testimonials. Open the source and check verified-purchase labels, review dates and the exact product variant.</div>
 <section className="panel" style={{marginTop:'1.2rem'}}><h3>Review sources</h3><p>Compare repeated positive and negative themes across platforms. Do not rely on one unusually positive or negative review.</p>{links.map(x=><a key={x.store} href={x.url} target="_blank" rel="noreferrer" className="product-mini" style={{textDecoration:'none',marginTop:'.7rem'}}><span><b>{x.store}</b><small>Search this product and inspect original reviews</small></span><ExternalLink size={17}/></a>)}</section>
 <div className="panel" style={{marginTop:'1rem'}}><h3>What to analyse in reviews</h3><ul className="check-list"><li>Repeated complaints about quality, durability or irritation.</li><li>Whether reviews refer to the same size, model and formulation.</li><li>Recent reviews versus older reviews.</li><li>Verified-purchase status and suspicious repetitive wording.</li><li>Seller, delivery and packaging complaints separately from product performance.</li></ul></div>
 </>;
}
