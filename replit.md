# Sonic Stone — Stone/Tile E-commerce Storefront

## Overview
This is a React + Vite storefront (imported from GitHub) for a stone/tile products
business ("Sonic Stone"). It uses Firebase (Firestore + Auth) for data and
authentication, with the Firebase config already hardcoded in `src/firebase.js`.

Key areas:
- `src/pages/` — Home, Products, Product Detail, Search, Tile Calculator, About,
  Contact, Admin Dashboard
- `src/components/` — Header, Footer, Cart Sidebar, Checkout Modal
- `src/context/CartContext.jsx` — cart state
- `src/data/ProductData.js` — product data
- `firestore.rules`, `.firebaserc`, `firebase.json` — Firebase project config
  (project id: `stone-app-f5011`)

## Known gaps from import
- `.env` sets `VITE_API_BASE_URL=http://192.168.1.196:5000`, pointing at a local
  network API that is **not** part of this repository. Anything in the app that
  calls this URL will not work inside the Replit environment as-is.
- No run workflow has been configured yet — the project has not been started or
  verified in this environment. Nothing has been installed or launched.

## Status
Imported and left as-is per user's request — no setup, dependency install, or
workflow configuration performed yet. Ask the user for direction (get it
running, migrate away from the local API, etc.) before making changes.

## User preferences
(none recorded yet)
