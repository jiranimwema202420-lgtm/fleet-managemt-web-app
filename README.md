# FleetPulse — Fleet Management Web App

A modern fleet management dashboard built with:
- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**

## Features
- Dynamic KPI cards that recompute based on active filters.
- Search and status filters for vehicle, driver, and route visibility.
- Live fleet activity table with status badges and empty-state messaging.
- Responsive layout for desktop and tablet.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint with Next.js ESLint config

## Local Preview Options

- Preferred (full Next.js app): `npm install && npm run dev`
- Fallback static preview (no npm install required): `npm run preview:static` then open `http://localhost:4173/preview/`
