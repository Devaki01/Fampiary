# 🐝 Fampiary

> **A data-driven relationship intelligence platform** — visualise, manage, and explore your family network of up to 500 members across Paternal and Maternal branches.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screens & Navigation](#screens--navigation)
- [Data Model](#data-model)
- [Authentication](#authentication)
- [Family Tree Layout](#family-tree-layout)
- [Configuration](#configuration)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## Overview

Fampiary is a mobile-first React web application that lets families map, browse, and stay connected with every member of their extended network. The app revolves around an **interactive family tree** that is automatically centred on the logged-in user, with Maternal relatives on the left and Paternal relatives on the right — exactly mirroring how a physical family tree diagram looks.

Beyond the tree, members can search by name, city, or skill; receive live location signals from relatives passing through their city; and maintain their own profile with contact details and professional information.

---

## Features

| Feature | Description |
|---|---|
| 🌳 **Interactive Family Tree** | Pan, zoom, drag nodes, and re-connect members. Centred on Self at launch. |
| 👤 **Member Profiles** | Name, city, phone, profession, skills, branch, and generation. |
| 🔍 **Search & Filter** | Full-text search across name, city, and profession with branch/generation filters. |
| 📡 **Swarm Signals** | Real-time-style location signals — see which relatives are visiting your city. |
| 🔐 **Auth (Login / Sign Up)** | Username derived from full name. Password strength meter. Secure local storage. |
| ➕ **Add Member** | Add children or root members from the tree canvas with a single click. |
| 🗑️ **Remove Member** | Remove any non-self member with child re-linking confirmation. |
| 🔗 **Connect Mode** | Click-to-connect two nodes to re-parent relationships visually. |
| 🗺️ **Minimap** | Always-visible overview of the entire tree canvas. |
| 📱 **Mobile-First** | Designed for 390 px screens upward; works on desktop too. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite |
| State Management | Zustand (`useStore.ts`) |
| Styling | Inline `<style>` injection (no CSS-in-JS library) + per-screen CSS files |
| Icons | Lucide React |
| Data | Static mock data (`mockData.ts`) + `localStorage` persistence |
| Auth | Custom `usePasswordStore.ts` (localStorage, plaintext — demo only) |

---

## Project Structure

```
fampiary/
├── src/
│   ├── components/
│   │   ├── AddMemberForm.tsx       # Form to add a new member to the tree
│   │   ├── AuthGate.tsx            # Wraps Login/Signup toggle (optional helper)
│   │   ├── MemberPopup.tsx         # Detail popup shown when a tree card is clicked
│   │   ├── MemberPopup.css
│   │   ├── Navigation.tsx          # Bottom tab bar (Hive / Search / Swarm / Tree / Profile)
│   │   ├── Navigation.css
│   │   └── usePasswordStore.ts     # localStorage password map (separate from Member type)
│   │
│   ├── data/
│   │   └── mockData.ts             # 170+ seed members, Member type, RELATION_TYPES, BRANCHES
│   │
│   ├── screens/
│   │   ├── HiveScreen.tsx          # Home feed — activity, signals, quick stats
│   │   ├── HiveScreen.css
│   │   ├── LoginScreen.tsx         # Login form with injected CSS (also injects profile styles)
│   │   ├── LoginScreen.css
│   │   ├── ProfileScreen.tsx       # Editable user profile + privacy toggle + logout
│   │   ├── ProfileScreen.css
│   │   ├── SearchScreen.tsx        # Member search and directory
│   │   ├── SearchScreen.css
│   │   ├── Signupscreen.tsx        # Sign-up form with strength meter + optional profile fields
│   │   ├── SwarmScreen.tsx         # Location signal feed
│   │   ├── SwarmScreen.css
│   │   ├── TreeScreen.tsx          # Interactive family tree (all logic + CSS self-contained)
│   │   └── TreeScreen.css
│   │
│   ├── store/
│   │   └── useStore.ts             # Zustand store — members, currentUser, login, addMember, removeMember
│   │
│   ├── App.tsx                     # Root component — auth gate + tab router
│   ├── main.tsx                    # Vite entry point
│   └── index.css                   # Global resets and CSS variables
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fampiary.git
cd fampiary

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Screens & Navigation

The bottom tab bar exposes five screens:

```
🏠 Hive      — Home feed, recent activity, swarm signals
🔍 Search    — Search and browse all family members
📡 Swarm     — Location-based signals from relatives
🌳 Tree      — Interactive family tree (canvas)
👤 Profile   — Your profile, privacy settings, logout
```

### Tree Screen Controls

| Control | Action |
|---|---|
| Drag canvas | Pan around the tree |
| Scroll / pinch | Zoom in and out |
| Drag a card | Move a member's node to a new position |
| Click a card | Open the member detail popup |
| **Find Me** button | Snap the viewport back to Self |
| **Fit All** button | Zoom to fit every visible member |
| **Connect** mode | Click child node → click new parent to re-parent |
| Branch filter | Show All / Paternal only / Maternal only |

---

## Data Model

```typescript
type Member = {
  id: string;
  name: string;
  relation: string;       // e.g. "Father", "Mausi", "Cousin"
  city: string;
  phone: string;
  profession: string;
  skills: string[];
  avatar: string;         // pravatar URL
  branch: 'Paternal' | 'Maternal';
  generation: number;     // 0 = Self, 1 = Parents, 2 = Grandparents, -1 = Children
  children?: string[];    // IDs of this member's children
  isLocal?: boolean;      // lives in the same city as Self
  isAdmin?: boolean;      // can perform admin actions
};
```

### Generation Convention

| Value | Row |
|---|---|
| `3` | Great-grandparents (topmost) |
| `2` | Grandparents |
| `1` | Parents, Aunts, Uncles |
| `0` | Self, Siblings, Cousins |
| `-1` | Children |

The tree layout uses this field directly to assign Y coordinates — no tree-traversal is needed to determine row positions.

### Connecting the Two Family Branches

The Paternal and Maternal sides are joined through the **Mother** node (`id: 'mom'`, `branch: 'Maternal'`). Mother and Father both list `children: ['7', '8']` (Rahul and Neha), which causes the layout engine to detect them as a couple and render them side-by-side under both sets of grandparents.

---

## Authentication

### Login

- Username is derived from the member's name: `"Rahul Sharma"` → `rahul.sharma`
- All **existing seed members** use the default password: `password`
- The `passwordStore.verify()` function falls back to `'password'` for any member without a stored password entry

### Sign Up

1. Enter your full name — a username preview is shown live
2. Choose a password (strength meter: Weak / Medium / Strong)
3. Optionally add city, phone, profession, relation, and branch
4. On submit, a new `Member` record is created and added to the store; the password is saved to `localStorage` under `fampiary_passwords`

> ⚠️ **Security note:** Passwords are stored in plaintext in `localStorage`. This is intentional for a local demo. Replace `usePasswordStore.ts` with a proper backend auth service before any production deployment.

---

## Family Tree Layout

The tree uses a **recursive subtree-width algorithm**:

1. **Bottom-up width pass:** `subtreeW(id)` computes the minimum pixel width required to draw each node's entire descendant subtree without overlap.
2. **Top-down placement:** Starting from root couples/nodes, each parent is centred over its children's total width. Couples are detected by shared `children[]` IDs.
3. **Branch ordering:** Maternal root subtrees are placed to the left, Paternal root subtrees to the right.
4. **Self-centring:** After all coordinates are computed, the entire canvas is shifted so that Self's card is horizontally centred at `x = 0`. On mount, the viewport centres on Self at `72%` zoom so two generations above are immediately visible.

The SVG edge layer uses `overflow="visible"` so bezier curves connecting nodes at negative X coordinates (Maternal side) are never clipped.

---

## Configuration

| Constant | File | Default | Description |
|---|---|---|---|
| `MAX_MEMBERS` | `TreeScreen.tsx` | `100` | Cap on rendered tree nodes for performance |
| `DEFAULT_SCALE` | `TreeScreen.tsx` | `0.72` | Initial zoom when tree screen opens |
| `DATA_VERSION` | `mockData.ts` | `6` | Bump to force localStorage refresh of member data |
| `CARD_W / CARD_H` | `TreeScreen.tsx` | `130 / 78` | Card pixel dimensions |
| `H_GAP / V_GAP` | `TreeScreen.tsx` | `44 / 80` | Horizontal and vertical spacing between nodes |

---

## Known Limitations

- **No real backend** — all data lives in `localStorage`. Clearing browser storage resets the app to seed data.
- **Passwords are plaintext** — `usePasswordStore.ts` is for demo purposes only.
- **Single-device** — there is no sync between devices or users.
- **Avatar images** — member avatars use `pravatar.cc` placeholders; real image upload is not yet implemented.
- **Tree performance** — rendering is capped at 100 members for the tree canvas. Members beyond this limit are excluded from the tree view but remain visible in Search and Hive screens.

---

## Roadmap

- [ ] Backend API (Node.js / Supabase) with real authentication
- [ ] Password hashing (bcrypt) and JWT sessions
- [ ] Profile photo upload
- [ ] Real-time swarm signals via WebSockets
- [ ] Invite system — share a family code to let relatives join
- [ ] Export tree as PNG / PDF
- [ ] Offline support via PWA / service worker
- [ ] Multi-language support (Hindi relation names already in `RELATION_TYPES`)
- [ ] Admin panel — approve new member requests, manage roles

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

```bash
# Run linter
npm run lint

# Type-check without building
npx tsc --noEmit
```

---

## License

MIT © 2025 Fampiary
