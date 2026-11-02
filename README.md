# Consumerverse — Product Intelligence Demo

A React + Vite prototype for an AI-style shopping assistant.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Project structure
- `src/pages/Registration.jsx` — consumer onboarding
- `src/pages/Scanner.jsx` — barcode/manual catalogue search and image upload UI
- `src/pages/ProductAnalysis.jsx` — product report, cautions, pros/cons
- `src/pages/Reviews.jsx` — review summary and filters
- `src/pages/PriceComparison.jsx` — seller price comparison
- `src/pages/Alternatives.jsx` — alternative products
- `src/pages/CompareProducts.jsx` — side-by-side comparison
- `src/pages/Assistant.jsx` — product Q&A demo
- `src/pages/SavedProducts.jsx` — saved products
- `src/pages/Rights.jsx` — Indian consumer rights
- `src/components/Shared.jsx` — reusable UI components
- `src/data/catalogue.js` — sample product data
- `src/services/productService.js` — product lookup and analysis helpers
- `src/styles.css` — all styling

## Important prototype limitations
This version is an interactive front-end demo. Product data, ratings, reviews and seller prices in `src/data/catalogue.js` are sample data. The image upload control is a UI placeholder; it does not yet perform OCR or image recognition. Barcode lookup currently matches only the sample catalogue. Price comparison is not live. Reviews are clearly marked as illustrative. The assistant uses simple local rules, not a connected AI model. No authenticity, safety or medical certification is provided.

To make this production-ready, connect a product/barcode database, OCR or vision service, trusted retailer price feeds, and genuine review sources. Never display sample ratings, reviews or prices as live facts.


### Barcode lookup connection fix

The development server proxies barcode requests to Open Food Facts, Open Beauty Facts, Open Pet Food Facts, and Open Products Facts. Start the app with `npm run dev` (do not open `index.html` directly). The Vite proxy is for local development; production hosting needs an equivalent server-side proxy/API route.
