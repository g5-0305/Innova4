// Product intelligence helpers. These rules are explainable heuristics, not a medical or lab safety certification.
const ingredientKnowledge = [
  {keys:['petrolatum','petroleum jelly'],name:'Petrolatum',role:'Occlusive skin protectant',good:'Forms a barrier that reduces moisture loss and protects dry or chafed skin.',watch:'Can feel greasy; may not suit everyone’s preferred texture. Use clean product on clean skin.',level:'Generally well-established topical use'},
  {keys:['glycerin','glycerol'],name:'Glycerin',role:'Humectant',good:'Attracts water and helps keep the skin hydrated.',watch:'Usually well tolerated; check the full formula if irritation occurs.',level:'Common cosmetic ingredient'},
  {keys:['fragrance','parfum','perfume'],name:'Fragrance',role:'Scent ingredient',good:'Adds a pleasant scent; no essential moisturising benefit.',watch:'Can trigger irritation or allergy in fragrance-sensitive people.',level:'Sensitivity flag'},
  {keys:['alcohol denat','denatured alcohol'],name:'Alcohol denat.',role:'Solvent / quick-drying agent',good:'Can improve lightweight feel and help dissolve ingredients.',watch:'May feel drying or irritating, especially in some sensitive-skin formulas.',level:'Context-dependent'},
  {keys:['niacinamide'],name:'Niacinamide',role:'Vitamin B3 skin-conditioning ingredient',good:'Can support the skin barrier and improve uneven tone in suitable formulations.',watch:'Some users experience temporary irritation; concentration and formula matter.',level:'Evidence-supported cosmetic use'},
  {keys:['salicylic acid'],name:'Salicylic acid',role:'Exfoliant',good:'Helps unclog pores and is commonly used for acne-prone skin.',watch:'May cause dryness or irritation; follow product directions and avoid combining many exfoliants.',level:'Evidence-supported active'},
  {keys:['paraben','methylparaben','propylparaben'],name:'Parabens',role:'Preservatives',good:'Help prevent microbial growth and keep products safe during use.',watch:'Some consumers prefer to avoid them; presence alone does not mean a product is hazardous at permitted cosmetic levels.',level:'Regulated preservative class'},
  {keys:['sodium lauryl sulfate','sls'],name:'Sodium lauryl sulfate',role:'Cleansing surfactant',good:'Effective at removing oil and dirt and creating foam.',watch:'Can irritate or dry some skin types, especially with frequent exposure.',level:'Sensitivity flag'},
  {keys:['tocopherol','vitamin e'],name:'Vitamin E / Tocopherol',role:'Antioxidant / skin-conditioning',good:'Used as an antioxidant and skin-conditioning ingredient.',watch:'Rare contact allergy is possible.',level:'Common cosmetic ingredient'},
  {keys:['zinc oxide'],name:'Zinc oxide',role:'Skin protectant / UV filter',good:'Can provide a protective barrier; in sunscreens it is a mineral UV filter.',watch:'Check whether the product is actually labelled and tested as sunscreen; ingredient presence alone does not establish SPF.',level:'Function depends on formulation'},
  {keys:['milk'],name:'Milk',role:'Food ingredient',good:'Provides protein and nutrients as part of a balanced diet.',watch:'Milk is a major food allergen for people with milk allergy.',level:'Declared allergen category'},
];
export function analyseIngredients(items=[]){
  return items.map(raw=>{const text=typeof raw==='string'?raw:(raw.text||raw.name||'');const key=text.toLowerCase();const hit=ingredientKnowledge.find(x=>x.keys.some(k=>key.includes(k)));return hit?{ingredient:text,...hit}:{ingredient:text,name:text,role:'Ingredient / component',good:'The database lists this item, but its exact purpose and concentration could not be confidently identified.',watch:'Check the manufacturer’s official ingredient or material information; absence of a warning is not proof of safety.',level:'Insufficient product-specific evidence'};});
}
export function getProductAlternatives(product){
 const text=`${product?.name||''} ${product?.brand||''} ${product?.category||''} ${product?.ingredients?.join(' ')||''}`.toLowerCase();
 if(/petroleum|vaseline|petrolatum|jelly/.test(text)) return [
  {name:'Cetaphil Moisturising Cream',brand:'Cetaphil',type:'Cream moisturiser',good:'A cream-based moisturiser; may suit someone wanting a less jelly-like texture.',watch:'Not a direct ingredient-for-ingredient replacement. Check fragrance, preservatives and the exact variant.',best:'Daily moisturising when a cream texture is preferred.'},
  {name:'Plain fragrance-free glycerin moisturiser',brand:'Category alternative',type:'Humectant-based moisturiser',good:'Can hydrate by attracting water to the skin.',watch:'Formula quality varies; often works best with an occlusive layer when skin is very dry.',best:'Lightweight hydration.'},
  {name:'CeraVe Moisturising Cream',brand:'CeraVe',type:'Barrier-support cream',good:'Some variants contain ceramides and humectants to support the skin barrier.',watch:'Check the exact local formulation and ingredient list; may cost more.',best:'When a cream with barrier-support ingredients is preferred.'}
 ];
 if(/moistur|cream|lotion|skin|personal care/.test(text)) return [
  {name:'Cetaphil Moisturising Cream',brand:'Cetaphil',type:'Cream moisturiser',good:'Rich cream option for dry skin; exact formula varies by market.',watch:'Check full ingredients and whether the texture suits your skin.',best:'Dry-skin moisturising.'},
  {name:'CeraVe Moisturising Cream',brand:'CeraVe',type:'Barrier-support cream',good:'Some variants include ceramides and humectants.',watch:'Check the exact variant and local ingredient list.',best:'When barrier-support ingredients are desired.'},
  {name:'Simple Kind to Skin Hydrating Light Moisturiser',brand:'Simple',type:'Light moisturiser',good:'A lighter-texture option in markets where this variant is available.',watch:'Check current packaging and ingredient list.',best:'When a lighter feel is preferred.'}
 ];
 return [];
}
export function retailerSearchLinks(product){const q=encodeURIComponent(`${product?.brand||''} ${product?.name||''} ${product?.quantity||''}`.trim());return [
 {store:'Amazon India',url:`https://www.amazon.in/s?k=${q}`},
 {store:'Flipkart',url:`https://www.flipkart.com/search?q=${q}`},
 {store:'Google Shopping',url:`https://www.google.com/search?tbm=shop&q=${q}`},
 {store:'Tata 1mg',url:`https://www.1mg.com/search/all?name=${q}`}
];}
export function reviewSearchLinks(product){const q=encodeURIComponent(`${product?.brand||''} ${product?.name||''} reviews`);return [
 {store:'Amazon customer reviews',url:`https://www.amazon.in/s?k=${q}`},
 {store:'Flipkart reviews',url:`https://www.flipkart.com/search?q=${q}`},
 {store:'Google review search',url:`https://www.google.com/search?q=${q}`}
];}
