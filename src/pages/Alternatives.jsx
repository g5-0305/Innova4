import React from 'react';
import {PageTitle,Tag} from '../components/Shared.jsx';
import {getProductAlternatives} from '../services/productService.js';
export default function Alternatives({product,onSelect}){const options=getProductAlternatives(product);return <><PageTitle eyebrow="SMART ALTERNATIVES" title="Find a better-fit alternative." sub={`Alternatives to ${product?.name||'this product'}, based on product category and use.`}/>
 {options.length?<div className="alt-grid">{options.map(p=><article className="panel alt-card" key={p.name}><Tag>{p.type}</Tag><h3>{p.name}</h3><p><b>Why consider it</b><br/>{p.good}</p><p><b>What to check</b><br/>{p.watch}</p><p><b>May suit</b><br/>{p.best}</p></article>)}</div>:<div className="panel"><h3>No reliable alternatives identified yet</h3><p>We need a clearer product category and intended use before recommending substitutes. We will not suggest unrelated products just to fill this page.</p></div>}
 <div className="notice">Alternative suggestions are category-level guidance, not a diagnosis or guarantee. Compare the exact ingredient list, formulation, price and suitability before switching.</div></>}
