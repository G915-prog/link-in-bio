# Link-in-Bio

A standalone Link-in-Bio app built with React, Vite, and Supabase.

## Changelog

### 0.9.0 — 2026-04-07
- Built `Dashboard.jsx` — checks session on mount, redirects to /login if none, shows user email, sign out button, and placeholder sections for ProfileEditor, LinkEditor, StatsPanel
- Built `Login.jsx` — email/password form with sign in / sign up toggle, error display, redirects to /dashboard on success

### 0.8.0 — 2026-04-07
- Built out `QRCode.jsx` — generates QR code onto a canvas via the `qrcode` package, with a Download PNG button
- Updated `ProfilePage.jsx` — passes `profile.username` (from DB) to QRCode instead of the URL param

### 0.7.4 — 2026-04-07
- `LinkItem.jsx` — removed temporary debug logging; click tracking confirmed working

### 0.7.3 — 2026-04-07
- `Home.jsx` — profile URL is now display text inside the React Router Link, not a separate external anchor

### 0.7.2 — 2026-04-07
- `Home.jsx` — each profile entry now shows the full public URL as a clickable link alongside the theme label

### 0.7.1 — 2026-04-07
- Updated `Home.jsx` — lists links to all 5 test profile pages

### 0.7.0 — 2026-04-07
- Added `src/components/LinkItem.jsx` — renders link title + URL, fires fire-and-forget `increment_click_count` RPC on click
- Added `src/components/LinkList.jsx` — ordered list of `<LinkItem>` components
- Updated `ProfilePage.jsx` — replaced inline list with `<LinkList>`

### 0.6.1 — 2026-04-07
- `useTheme.js` — also sets `document.body.style.color` so text is readable on all theme backgrounds

### 0.6.0 — 2026-04-07
- Extracted `src/lib/themes.js` — shared THEMES map and DEFAULT_THEME used across the app
- Added `src/hooks/useTheme.js` — applies theme CSS variables to `:root` and body; resets on unmount
- Added `src/components/ThemePicker.jsx` — 5 clickable swatches for the dashboard; accepts `value` and `onChange` props
- Refactored `ProfileHeader.jsx` — removed inline theme logic, now delegates to `useTheme`

### 0.5.0 — 2026-04-07
- Built out `ProfileHeader.jsx` — applies theme CSS variables and body background on mount, resets to default on unmount; renders avatar (or placeholder div), display_name, bio
- Updated `ProfilePage.jsx` — passes full `profile` object to `<ProfileHeader>`

### 0.4.0 — 2026-04-07
- Built out `ProfilePage.jsx` — fetches profile by username, fetches published links by `user_id`, loading/not-found states
- Added placeholder `ProfileHeader.jsx` — renders `display_name` and `bio`
- Added placeholder `QRCode.jsx` — renders a canvas element for future QR generation

### 0.3.5 — 2026-04-07
- Added `public/favicon.svg` — custom chain-link icon on indigo background
- Updated `index.html` to reference the new favicon (removes 404 on vite.svg)

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
