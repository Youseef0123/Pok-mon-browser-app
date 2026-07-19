# ⚡ Pokédex

Frontend assessment project — a Pokémon browser built with React + TypeScript.

**Live:** https://pok-mon-browser-app-nu.vercel.app/

## What's in it

Three ways to browse the list, switchable from the top toggle:

- **Page Controls** — normal pagination with page numbers
- **Load More** — button-based, appends the next batch
- **Infinite Scroll** — auto-loads on scroll. I virtualized this one with `@tanstack/react-virtual` so it doesn't render hundreds of DOM nodes as you scroll — this wasn't required but felt like the right way to do infinite scroll properly.

Click any Pokémon and you get a real route (`/pokemon/:id`), not a modal, with stats, abilities, types, height/weight, etc.

## Stack

- Vite + React + TypeScript
- React Router
- TanStack React Query (data fetching/caching)
- Axios
- Tailwind
- `@tanstack/react-virtual` for the infinite scroll grid

## Bonus stuff I added

- **React Query** for fetching, caching, and retries (not just the basic requirement — used it properly with isolated cache keys per view)
- **Error Boundary** wrapping the app so an unexpected render crash shows a recoverable screen instead of a blank page
- **A third view** (Infinite Scroll) on top of the two required ones, built with actual grid virtualization instead of just rendering everything
- Selected view + scroll position persist when navigating to a detail page and back

## A few things worth mentioning

- Height/weight from the API come in decimetres/hectograms, not m/kg — I convert them at the display level, kept the raw values in the type.
- Load More and Infinite Scroll both use the same `usePokemonList` hook, but each passes a different `viewKey` so React Query doesn't mix up their cached pages when switching between them.
- The infinite scroll view measures each row's real height instead of assuming a fixed one — cards render at different heights depending on screen size, so a fixed estimate caused overlapping rows on mobile until I fixed it.
- Selected view + scroll position are kept across navigating to a detail page and back (view is stored in the URL, scroll position in memory).

## Running it

1. Install dependencies:

   ```bash
   npm install
   ```

2. ⚠️ **Required — create your `.env` file:**

   ```bash
   cp .env.example .env
   ```

   The app **will not work** without this step — it reads `VITE_API_BASE_URL` from `.env` to reach the PokeAPI. Don't skip it.

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Structure

```
src/
├── services/     API calls
├── types/        TS interfaces
├── hooks/        React Query hooks
├── utils/
├── components/
│   ├── ui/       generic, no domain knowledge
│   ├── shared/   Pokémon-aware, reused across views
│   └── common/   toggle, error boundary
├── views/        the three list views
└── pages/        HomePage, DetailPage
```
