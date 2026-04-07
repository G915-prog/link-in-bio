# Link-in-Bio

A standalone Link-in-Bio app built with React, Vite, and Supabase.

## Changelog

### 2.1.0 — 2026-04-07
- **Security**: Added `src/lib/url.js` — `isSafeUrl` + `sanitizeUrl` helpers; blocks `javascript:` and non-HTTP(S) URL schemes
- **Security**: `useLinks` — validates URL scheme in `addLink` and `updateLink` before any DB write; rejects with user-facing error if invalid
- **Security**: `useLinks` — added `.eq('user_id', userId)` to `deleteLink` and `updateLink` queries (defense-in-depth alongside RLS)
- **Security**: `useLinks` — `updateLink` now accepts and writes only `{ title, url }` (whitelisted fields, no arbitrary column spread)
- **Security**: `LinkItem` — renders `sanitizeUrl(link.url)` as href; `javascript:` URLs in existing DB rows render as `#` instead of executing
- **Security**: `useOwnProfile` — `upsertProfile` now destructures `{ username, display_name, bio, avatar_url, theme }` explicitly; removed unwhitelisted `...data` spread
- **Security**: `vercel.json` — added HTTP security headers: `Content-Security-Policy` (restricts scripts, styles, connect, img, frames), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`

### 2.0.0 — 2026-04-07
- **Architecture**: Added `AuthContext` (AuthProvider + useAuth) — auth state owned once at the top of the tree; no component fetches it independently
- **Architecture**: Added `ThemeContext` (ThemeProvider + useTheme) — single theme owner with no competing unmount resets
- **Architecture**: Added `ProtectedRoute` — replaces inline auth checks in Dashboard
- **Hooks**: Added `useOwnProfile(userId)` — fetches authed user's profile by ID; exposes `upsertProfile` using the passed userId (no internal `getUser()`)
- **Hooks**: Added `useProfileForm(profile)` — extracts 7 individual `useState` calls from ProfileEditor into a single form hook
- **Hooks**: Simplified `useProfile` — public fetch by username only; removed `fetchById` option and `upsertProfile`
- **Hooks**: Fixed `useLinks` — `display_order` now uses `Math.max` to prevent collisions on rapid adds; added `publishedOnly` option so ProfilePage reuses the hook
- **Components**: Added `LinkRow` — display mode for a link item (title, url, Edit/Delete)
- **Components**: Added `LinkEditForm` — edit mode with stale-state fix (`useEffect` on `link.id`); replaces inline edit branch in DraggableLinkItem
- **Components**: Refactored `DraggableLinkItem` — now a thin shell delegating to `LinkRow` or `LinkEditForm`
- **Components**: Fixed `LinkEditor` — renamed shadow variable `i` → `dragIdx`/`dropIdx`
- **Components**: Fixed `LinkList` — accepts `emptyMessage` prop instead of silently returning null
- **Components**: Fixed `ThemePicker` — replaced inline CSS properties with CSS custom properties (`--swatch-bg`, `--swatch-accent`) consumed by stylesheet
- **Components**: Fixed `QRCode` — `handleDownload` extracted to `src/lib/download.js`
- **Components**: Updated `Nav` — uses `useAuth` + `useOwnProfile`; removed duplicate auth state machine
- **Components**: Updated `ProfileHeader` — calls `setTheme` from ThemeContext instead of applying CSS vars directly
- **Components**: Updated `ProfileEditor` — uses `useOwnProfile`, `useProfileForm`, `useTheme`; accepts `userId` prop
- **Pages**: Updated `Dashboard` — uses `useAuth`; no `getSession`/`onAuthStateChange`; passes `userId` to ProfileEditor
- **Pages**: Updated `ProfilePage` — uses `useLinks(publishedOnly)` instead of raw inline query
- **Pages**: Updated `Home` — imports TEST_PROFILES from `src/data/testProfiles.js`
- **App**: Added `AuthProvider` + `ThemeProvider` wrapping the tree; `ProtectedRoute` guards `/dashboard`; fixed indentation
- **Styles**: Wrote `src/index.css` — full BEM stylesheet covering all components using CSS custom property theming
- Added `src/lib/download.js`, `src/data/testProfiles.js`
- Deleted `src/hooks/useTheme.js` (replaced by ThemeContext)

### 1.2.5 — 2026-04-07
- `LinkItem.jsx` — added `onAuxClick` handler so middle-click (open in background tab) also increments click count; left-click and shift-click already fired `onClick`

### 1.2.4 — 2026-04-07
- `ProfilePage.jsx` — added Share button: uses Web Share API (native share sheet) when available; falls back to clipboard copy with "Copied!" feedback for 2 seconds

### 1.2.3 — 2026-04-07
- `StatsPanel.jsx` — added per-link breakdown table sorted by click count descending

### 1.2.2 — 2026-04-07
- `LinkItem.jsx` — fixed RPC never firing: supabase.rpc() is a lazy builder that only executes on .then()/.await; made handleClick async and awaited the call

### 1.2.1 — 2026-04-07
- `useLinks.js` — subscribes to Supabase Realtime `postgres_changes` (UPDATE) on the links table filtered by userId; merges incoming rows into local state so click_count updates live without a page refresh
- `LinkItem.jsx` — removed debug console.log statements

### 1.2.0 — 2026-04-07
- Added `src/components/StatsPanel.jsx` — derives totalClicks, topLink, and recentLinks (last 7 days) from the links prop; shows "—" placeholders when empty
- Refactored `LinkEditor.jsx` — no longer calls `useLinks` internally; accepts hook state and functions as props
- Updated `Dashboard.jsx` — lifts `useLinks` to dashboard level, spreads into `LinkEditor`, passes links to `StatsPanel`; also removed debug console.log statements

### 1.1.1 — 2026-04-07
- Added `src/components/DraggableLinkItem.jsx` — drag handle (⠿), read/edit mode toggle, Save/Cancel/Delete actions; uses HTML5 drag events
- Updated `LinkEditor.jsx` — replaced ↑/↓ buttons with `DraggableLinkItem`; tracks `dragIndex` state to wire `onDragStart`/`onDrop` into `reorderLinks`

### 1.1.0 — 2026-04-07
- Added `src/hooks/useLinks.js` — fetches links ordered by `display_order`; exposes `addLink`, `deleteLink`, `updateLink`, `reorderLinks` all with optimistic updates and rollback on error
- Added `src/components/LinkEditor.jsx` — "Add link" form (title + URL), inline edit per item, delete, and ↑/↓ reorder buttons
- Wired `LinkEditor` into `Dashboard.jsx`

### 1.0.6 — 2026-04-07
- `Nav.jsx` — hide Login link when authenticated; Profile link falls back to /login only while username is still loading or missing (not as a permanent logged-out state)

### 1.0.5 — 2026-04-07
- `Nav.jsx` — fixed deadlock: moved profiles DB fetch out of `onAuthStateChange` callback into a separate `useEffect` watching `userId` state. Calling `supabase.from()` inside an `onAuthStateChange` callback triggers `auth.getSession()` internally, which tries to acquire the Supabase auth lock that the SDK is already holding while notifying subscribers — causing `signInWithPassword` and `getSession()` to hang indefinitely everywhere in the app.

### 1.0.4 — 2026-04-07
- `Dashboard.jsx` — use both getSession() for immediate check and onAuthStateChange for ongoing state (sign out, expiry)

### 1.0.3 — 2026-04-07
- `Dashboard.jsx` — replaced getSession() with onAuthStateChange to avoid race condition where session hadn't settled before the redirect check

### 1.0.2 — 2026-04-07
- `Nav.jsx` — Profile link now resolves to the logged-in user's own profile; falls back to /login if no session. Subscribes to auth state changes so it updates on sign in/out.

### 1.0.1 — 2026-04-07
- `ProfileEditor.jsx` — theme swatches now apply instantly via `useTheme(theme)` without needing to save

### 1.0.0 — 2026-04-07
- Extended `useProfile` hook with `fetchById` option (SELECT by user ID)
- Built `ProfileEditor.jsx` — controlled form for username, display name, bio, avatar URL, theme picker; username change warning; Saving/Saved/error states
- Wired `ProfileEditor` into `Dashboard.jsx`

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
