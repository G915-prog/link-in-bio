# Link-in-Bio

A standalone Link-in-Bio app built with React, Vite, and Supabase.

## Changelog

### 0.3.4 — 2026-04-07
- `ProfilePage.jsx` — removed unauthenticated seed hack; test row should be inserted manually via Supabase Table Editor

### 0.3.3 — 2026-04-07
- Added `vercel.json` — rewrites all routes to `index.html` so React Router handles client-side navigation (fixes 404 on direct URL access)

### 0.3.2 — 2026-04-07
- `ProfilePage.jsx` — seeds a hardcoded test user row into the `profiles` table on mount via direct Supabase upsert

### 0.3.1 — 2026-04-07
- `ProfilePage.jsx` — imports `useProfile`, fetches by route username (falls back to `'testuser'`), logs profile to console on fetch

### 0.3.0 — 2026-04-07
- Added `src/hooks/useProfile.js` — custom hook to fetch a profile by username and upsert the authed user's own profile

### 0.2.0 — 2026-04-07
- Added `src/components/Nav.jsx` — navigation menu with `NavLink`s to all pages
- Rendered `<Nav />` globally in `App.jsx` above all routes

### 0.1.1 — 2026-04-07
- Added `.gitignore` (excludes `node_modules`, `dist`, `.env*.local`)
- Removed committed `node_modules` from git tracking (fixes Vercel "Permission denied" build error)


### 0.1.0 — 2026-04-07
- Scaffolded React + Vite project
- Installed dependencies: `react-router-dom`, `@supabase/supabase-js`, `qrcode`
- Set up routing: `/`, `/profile/:username`, `/dashboard`, `/login`
- Created placeholder pages: Home, ProfilePage, Dashboard, Login
- Initialised Supabase client from `import.meta.env`
- Added `.env.local` template for Supabase credentials
