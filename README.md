# AE Accounting Associates website
React + Vite + Tailwind CSS v4 + Motion for React + React Router + Lucide.

## Run
Requires Node 18+. `npm install`, then `npm run dev` (dev server), `npm run build` (production build), `npm run preview`.

## Update content
- Business details, services, process steps and FAQs: `src/data.js`
- Pages and components: `src/App.jsx`; colours and fonts: `src/index.css`

## Placeholders / not done
- WhatsApp number assumed to be the first flyer phone number; confirm it.
- About page has no history, team or credentials (none supplied).
- Logo is a typographic recreation; add the original logo file to replace it.
- Contact form opens email/WhatsApp; no server submission. No automated tests; no cross-device testing yet.
- Flyer lists "LED" as printed; expand it once confirmed.

## Hosting note
`public/_redirects` makes deep links (e.g. /services) work on reload on Netlify-style hosts. Other hosts need an equivalent "fallback to index.html" rule.
