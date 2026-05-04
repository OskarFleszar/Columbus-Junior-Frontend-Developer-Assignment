# Columbus Recruitment Task

A product listing page — Junior Frontend Developer recruitment task for Columbus.

**Live:** [columbus-junior-frontend-developer.vercel.app](https://columbus-junior-frontend-developer.vercel.app)

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript in `strict` mode
- CSS Modules + CSS variables
- Zod for runtime API validation
- Hosted on Vercel

No UI libraries — every component and stylesheet is written from scratch, as the task required.

## Running locally

```bash
git clone <repo>
cd columbus-assignment

npm install

cp .env.example .env.local
# Fill in API_KEY and API_URL from the assignment

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the production build locally (worth running Lighthouse against this, not against `dev`) |
| `npm run lint` | Runs ESLint |

## Project structure

```
.
├── app/
│   ├── layout.tsx           # Root layout, CartProvider, metadata
│   ├── page.tsx             # Home (Server Component, fetches products)
│   ├── loading.tsx          # Skeleton shown during fetch
│   ├── error.tsx            # Error UI with retry button
│   └── globals.css          # CSS variables and base styles
├── components/
│   ├── Header/              # Sticky header (logo + title + cart icon)
│   ├── CartIcon/            # Client — reads cart state, renders badge
│   ├── ProductList/         # Responsive grid
│   ├── ProductCard/         # Single product card
│   ├── ProductImage/        # Client — image with onError fallback
│   ├── PriceTag/            # Price + promotion display
│   └── AddToCartButton/     # Client — add to cart with loading state
├── context/
│   └── CartContext.tsx      # Cart state via React Context
├── lib/
│   ├── api.ts               # Fetch with timeout, abort, cache, and Zod validation
│   ├── schemas.ts           # Zod schemas — single source of truth for types
│   ├── cart.ts              # fakeAddToCart (simulates an async API)
│   └── price.ts             # calculateDiscountedPrice
├── schemas/
│   └── columbus-recruitment.schema.json   # Original JSON Schema from the task
└── types/
    └── columbus.ts          # Re-exports types from lib/schemas
```

## Technical decisions

### Server Components by default, Client only where I actually need it

The App Router renders Server Components by default, and I left it that way. Only four things are marked `"use client"`:

- `CartContext` — uses hooks and Context API
- `CartIcon` — reads the cart state
- `AddToCartButton` — has `onClick` and a local `isAdding` flag
- `ProductImage` — needs `onError` to deal with broken image URLs

Everything else (`ProductCard`, `ProductList`, `PriceTag`, `Header`) is a Server Component — its JS doesn't ship to the browser at all. This keeps the bundle small and shows that I think about *when* the client is genuinely needed instead of slapping `"use client"` on everything.

### API key never reaches the client

`process.env.API_KEY` is read inside a Server Component, with no `NEXT_PUBLIC_` prefix, so the key never ends up in the client bundle. `.env.local` is gitignored, and `.env.example` documents the required vars.

### Runtime API validation with Zod

This is something I added late, after a piece of external feedback — and it's one of the better improvements. Earlier, types lived in `types/columbus.ts` and were generated from the JSON Schema with `json-schema-to-typescript`. The problem: TypeScript only enforces types at compile time. At runtime the API can return literally anything and the components consuming the data quietly fall over on unexpected shapes.

With Zod, the schemas live in `lib/schemas.ts` and serve two purposes at once:

1. They validate the API response at runtime (`ColumbusDataSchema.parse(json)` throws a descriptive error if anything is off).
2. They generate TypeScript types via `z.infer`, so types and validation are the same code — single source of truth.

`types/columbus.ts` now just re-exports from `lib/schemas`, so the six existing imports across the codebase keep working without changes.

### Timeout and abort on fetch

Another thing I didn't have at first. The native `fetch()` has no timeout — if the API hangs, the request hangs, and the page hangs with it. I wrapped the call in an `AbortController` with an 8-second timeout. `clearTimeout` lives in a `finally` block so it doesn't fire after a successful response. If the request gets aborted, I catch `AbortError` and throw a clearer message than the default.

### Explicit cache strategy

In Next.js 15+, `fetch` is no longer cached by default. I added `next: { revalidate: 60 }` explicitly — the product list is cached for 60 seconds, then Next pulls a fresh snapshot. Without this, every visit hits the API. The number is arbitrary; in a real shop you'd tune it per use case.

### Cart state via React Context

The rest of the app is small enough that Redux would be massive overkill. Context plus `useCallback` on `addToCart` and `useMemo` on the value protects consumers (`CartIcon`, `AddToCartButton`) from unnecessary re-renders. `addToCart` uses functional `setItems(prev => ...)`, so it stays correct after `await fakeAddToCart()` instead of running into a stale-closure bug.

### Schema/API mismatch

The JSON Schema shipped with the task says `link` and `ean`, but the actual API responds with `url` and `gtin`. I noticed this on the very first fetch and updated my Zod schemas to match what the API actually returns. The original schema file is still in `schemas/`, so it's clear what I was given. In a real project I'd flag this discrepancy to the backend team.

### Images

- `next/image` with `fill` and `sizes` so Next can pick reasonable sizes
- `priority` on the first two products (the rest can lazy-load — on mobile only one or two images are above the fold)
- A few of the test image URLs from Unsplash were dead, so I wrapped `<Image>` in `<ProductImage>` with an `onError` handler that swaps in a graceful placeholder instead of a broken icon
- Image hosts are configured in `next.config.ts` under `images.remotePatterns`

### Accessibility

I didn't treat this as optional:

- Semantic HTML (`<header>`, `<main>`, `<article>`, `<button>`)
- Heading hierarchy (one `<h1>` in the header, `<h2>` on each card)
- All interactive elements are keyboard-reachable (Tab + Enter) with visible `:focus-visible`
- The cart icon's `aria-label` includes the item count
- `aria-busy` on the Add to cart button while the simulated request is in flight
- Lighthouse Accessibility: **100**

### Performance

- Data is fetched on the server — the initial HTML already contains the products, no client-side flicker
- `next/image` optimises sizes and formats
- `priority` on the first product images improves LCP
- Lighthouse Performance is noticeably higher on the production deploy than in `npm run dev` (dev mode doesn't minify, doesn't tree-shake JS, and uses HTTP/1.1)

## What I'd add with more time

- **Cart persistence in localStorage** so a refresh doesn't wipe the cart
- **Cart drawer or page** with quantity controls and a remove button (right now the cart is just a counter)
- **Unit tests** for `calculateDiscountedPrice` and the `addToCart` reducer logic — small surface, lots of confidence
- **Component tests** for `AddToCartButton` and `PriceTag` (Testing Library)
- **A more refined visual design** — colours are functional but could lean further into the Columbus brand
- **Pagination or infinite scroll** if the product list grew beyond a couple of dozen items
