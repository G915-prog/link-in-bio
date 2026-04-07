# Link-in-Bio

A standalone Link-in-Bio app built with React, Vite, and Supabase.

## Changelog

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
