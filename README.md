# Yumvit Kids Gummies Store (React, frontend only)

```bash
npm install
npm run dev      # local preview
npm run build    # production build in /dist
```

## Before going live, edit `src/config.js`
- `WHATSAPP_NUMBER`: your WhatsApp number with country code, digits only
- `PRICE_PKR`, `DELIVERY_FEE`, `FREE_DELIVERY_OVER`: placeholder values, set your real ones

## Where things are
- `src/formula.js`: the vitamin and mineral formula (home page + product page read from it)
- `src/Landing.jsx`: home page sections and Roman Urdu benefit copy
- `src/products.js`: products in the shop
- `src/index.css`: colors are at the top (`--yellow`, `--purple`)
- `src/assets/yumvit-bottle.png`: transparent bottle cutout; `medsol-logo.png`: transparent logo

## How orders work
Checkout builds the order text and opens WhatsApp or your email app. Nothing is stored on a server.
