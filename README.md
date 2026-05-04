# Columbus Recruitment Task

A product listing page built with Next.js 16 (App Router), TypeScript, and CSS Modules. Submitted as a Junior Frontend Developer recruitment assignment for Columbus.

## Live demo

[https://columbus-junior-frontend-developer.vercel.app](https://columbus-junior-frontend-developer.vercel.app)

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **CSS Modules** with CSS custom properties
- **Vercel** for hosting

No external UI libraries — all components and styles are written from scratch.

## Getting started

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in API_KEY and API_URL

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Script                   | Description                                  |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Start the development server                 |
| `npm run build`          | Create a production build                    |
| `npm run start`          | Run the production build locally             |
| `npm run lint`           | Run ESLint                                   |
| `npm run types:generate` | Regenerate TypeScript types from JSON Schema |

## Project structure

```
.
├── app/
│   ├── layout.tsx           # Root layout with CartProvider and metadata
│   ├── page.tsx             # Home page (Server Component, fetches products)
│   ├── loading.tsx          # Loading skeleton (auto-shown during fetch)
│   ├── error.tsx            # Error state with retry
│   └── globals.css          # CSS variables and base styles
├── components/
│   ├── Header/              # Sticky header with logo, title, cart icon
│   ├── CartIcon/            # Client Component — reads cart state, renders badge
│   ├── ProductList/         # Server Component — responsive grid
│   ├── ProductCard/         # Server Component — single product card
│   ├── ProductImage/        # Client Component — image with onError fallback
│   ├── PriceTag/            # Server Component — price + promotion display
│   └── AddToCartButton/     # Client Component — add to cart with loading state
├── context/
│   └── CartContext.tsx      # Cart state via React Context (Client Component)
├── lib/
│   ├── api.ts               # Server-side API call with env-based auth
│   ├── cart.ts              # fakeAddToCart helper (simulates async API)
│   └── price.ts             # calculateDiscountedPrice helper
├── schemas/
│   └── columbus-recruitment.schema.json   # API response schema (provided)
└── types/
    └── columbus.ts          # Auto-generated TypeScript types from schema
```
