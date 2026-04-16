# FleetPulse — Fleet Management Web App

A modern fleet management dashboard built with:
- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**

## Features
- Multi-page FleetPulse experience with dedicated Dashboard, Vehicles, Drivers, and Maintenance pages.
- Dynamic KPI cards that recompute based on active filters.
- Search, status filters, and sort controls for vehicle, driver, and route visibility.
- Live fleet activity table with status badges, fuel/utilization metrics, and empty-state messaging.
- Maintenance & risk alert panel highlighting low-fuel and upcoming-service vehicles.
- Shared fleet utility functions for filtering, sorting, and metrics.
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
- If localhost binding issues occur, run `npm run preview:static:local` and open `http://127.0.0.1:4173/preview/`.

### Troubleshooting preview connection issues
- Confirm server is running and port is open: `curl -I http://127.0.0.1:4173/preview/index.html`
- If your environment blocks `localhost`, use `127.0.0.1` explicitly.
- If port `4173` is occupied, run: `python3 scripts/preview_server.py --port 3000`
