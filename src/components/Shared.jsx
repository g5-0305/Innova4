import React from 'react';
import { Search, Star, ShieldCheck, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';
export function PageTitle({eyebrow,title,sub}){return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{sub}</p></div>}
export function Stars({rating}){return <span className="stars">{'★'.repeat(Math.round(rating))}<small>{rating}/5</small></span>}
export function ProductMini({product,onClick}){return <button className="product-mini" onClick={onClick}><div className="product-art"><ShieldCheck size={25}/></div><div><b>{product.name}</b><small>{product.brand} · {product.category}</small><Stars rating={product.rating}/></div><ArrowUpRight size={17}/></button>}
export function Tag({children,tone='neutral'}){return <span className={'tag '+tone}>{children}</span>}
export function Empty({children}){return <div className="empty">{children}</div>}
