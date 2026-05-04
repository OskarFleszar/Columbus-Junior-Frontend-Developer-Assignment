# Columbus Recruitment Task

Product listing page built as a Junior Frontend Developer recruitment assignment for Columbus.

The app fetches product data from an external API, validates the response at runtime, renders a responsive product grid, and includes a small client-side cart counter.

## Live demo

https://columbus-junior-frontend-developer.vercel.app

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS Modules
- CSS custom properties
- Zod
- Vercel

No external UI libraries were used. Components and styles are written from scratch.

## Features

- Server-side product data fetching
- Runtime API response validation with Zod
- Responsive product grid
- Product cards with image fallback handling
- Promotion and discounted price display
- Add-to-cart interaction with loading state
- Cart counter handled with React Context
- Loading and error states
- Accessible semantic markup
- Optimized images with `next/image`

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/OskarFleszar/Columbus-Junior-Frontend-Developer-Assignment.git
cd Columbus-Junior-Frontend-Developer-Assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Fill in the required values:

```env
API_KEY=
API_URL=
```

`API_KEY` is required to access the Columbus recruitment API.
`API_URL` points to the API endpoint used by the application.

### 4. Run the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Available scripts

| Script          | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Starts the development server     |
| `npm run build` | Creates a production build        |
| `npm run start` | Runs the production build locally |
| `npm run lint`  | Runs ESLint                       |

## Project structure

```txt
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── globals.css
├── components/
│   ├── AddToCartButton/
│   ├── CartIcon/
│   ├── Header/
│   ├── PriceTag/
│   ├── ProductCard/
│   ├── ProductImage/
│   └── ProductList/
├── context/
│   └── CartContext.tsx
├── lib/
│   ├── api.ts
│   ├── cart.ts
│   ├── price.ts
│   └── schemas.ts
├── schemas/
│   └── columbus-recruitment.schema.json
└── types/
    └── columbus.ts
```

## Rendering model

- Server Components are used by default.
- Client Components are limited to: cart state, cart icon, add-to-cart button, image error fallback.

## API layer

- `API_KEY` is read on the server and never exposed to the client.
- Requests are wrapped with an `AbortController` timeout.
- Fetch uses an explicit revalidation cache strategy.
- Responses are validated with Zod before being passed to the UI.

## State management

- Cart state is managed with React Context.

## Accessibility

- Semantic HTML structure
- Keyboard-accessible interactive elements
- Visible focus states
- Descriptive labels for cart state
- Loading state feedback on buttons
- Meaningful image alternative text and fallbacks

## Performance notes

- Product data is fetched on the server.
- Images are rendered with `next/image`.
- Above-the-fold images are prioritized.
- CSS Modules keep styles scoped.
- The production build should be used for Lighthouse checks instead of `npm run dev`.
