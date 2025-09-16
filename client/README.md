# TimeCraft AI – Client Frontend

> Internal team guide for the timetable management UI. Keep this short, practical, and current. If you add a feature, update the relevant section.

---
## 1. What Is This?
React + TypeScript + Vite frontend for academic timetable generation, editing, and role‑based dashboards (Admin, Faculty, Student). Data + AI engine not wired yet (mocked in components). Goal: fast iteration during hackathon → later plug backend + real scheduling logic.

---
## 2. Quick Start
```bash
pnpm install
pnpm dev      # http://localhost:5173
```
Build & preview:
```bash
pnpm build
pnpm preview
```
Lint:
```bash
pnpm lint
```

---
## 3. Daily Dev Tasks
| Task | Command | Notes |
|------|---------|-------|
| Start dev server | `pnpm dev` | HMR enabled |
| Type check + build | `pnpm build` | Uses project refs (tsconfig.*) |
| Preview prod build | `pnpm preview` | Serves dist bundle |
| Lint all files | `pnpm lint` | Add --fix locally if needed |
| Add a dependency | `pnpm add <pkg>` | Dev only: `-D` |
| Update deps (careful) | `pnpm up -i` | Commit lockfile |

---
## 4. Folder Layout (Client)
```
client/
  src/
    components/        # Feature + role UI (dashboards, generator, editor)
      ui/              # Reusable primitives (Radix wrappers, form elements)
    hooks/             # Custom React hooks
    lib/               # Utilities (e.g. class helpers)
    styles/            # Tailwind + global CSS
    assets/            # Static SVG/media
  public/              # Static public files
  vite.config.ts       # Vite config
  eslint.config.js     # ESLint setup
  tsconfig*.json       # TS project configs
```
Keep feature-specific logic inside a dedicated component file/folder. Avoid dumping logic into `App.tsx`.

---
## 5. UI & Components
Reusable primitives live in `src/components/ui` (Radix-based). When adding a new primitive:
1. Follow existing pattern: props + `forwardRef` + variants (if needed).
2. Keep styling utility‑first (Tailwind) + small.
3. Co-locate minimal helpers; move shared logic to `lib/` only when reused ≥2 times.

Feature components (e.g. `AdminDashboard`, `TimetableGenerator`, `TimetableEditor`) currently use mock data; mark real API calls with `// TODO(api)` once backend endpoints exist.

---
## 6. Code Style & Conventions
| Area | Rule |
|------|------|
| Naming | PascalCase components, camelCase functions/vars |
| Imports | Absolute not configured yet → use relative; group: react, libs, local |
| Styling | Tailwind classes; avoid deep custom CSS unless global token |
| State | Local `useState` now; introduce global store only when needed |
| Comments | Use `// TODO:` / `// FIXME:` / `// NOTE:` prefixes |
| Icons | Use `lucide-react`; keep icon size classes consistent |
| Accessibility | Preserve semantics (headings hierarchy, aria labels if interactive) |

---
## 7. Feature Areas (Current Status)
| Area | File(s) | Status | Notes |
|------|---------|--------|-------|
| Admin Dashboard | `AdminDashboard.tsx` | Mock | Stats + tabs + quick actions |
| Faculty Dashboard | `FacultyDashboard.tsx` | Mock | Availability + weekly view |
| Student Dashboard | `StudentDashboard.tsx` | Mock | Attendance + progress scaffolds |
| Timetable Generator | `TimetableGenerator.tsx` | Simulated flow | Steps + progress simulation |
| Timetable Editor | `TimetableEditor.tsx` | Interactive mock | Grid, selection, placeholders |
| Faculty Manager | `FacultyManager.tsx` | Placeholder | Extend later |
| Stats Overview | `StatsOverview.tsx` | Display only | Could link to analytics later |

---
## 8. Adding a New Feature (Mini Checklist)
1. Create component in `src/components/<FeatureName>.tsx`.
2. Use existing UI primitives; do NOT duplicate.
3. Add mock data at top of file (replace later with API call function stub).
4. Export and integrate into a dashboard / route (currently just composed in `App.tsx`).
5. Add `// TODO(api)` markers where backend integration will occur.
6. Update this README table (Section 7).
7. If adding env usage, document in Section 10.

---
## 9. Data & State (Future)
Planned layers:
- Fetch layer: thin wrapper (likely `fetch` + error mapping) in `lib/api/`.
- Caching: TanStack Query or lightweight Zustand store.
- Scheduling engine: external service → results shape to define (schedule matrix, conflicts list, metadata).

Temporary assumption: each dashboard owns its own mock arrays.

---
## 10. Environment Variables
None in use yet. Planned examples:
```
VITE_API_BASE_URL=https://api.example.com
VITE_FEATURE_FLAGS=editor,ai-engine
```
Document any new key here + add `.env.example`.

---
## 11. Roadmap (Trimmed)
| Phase | Items |
|-------|-------|
| P1 (Now) | Solidify UI scaffolds, define schedule data model, choose state lib |
| P2 | Integrate backend API for programs, faculty, rooms, courses |
| P3 | Real AI generation (constraint solver + heuristics), conflict detection overlay |
| P4 | Auth & role-based routing, export formats (PDF/CSV/iCal) |
| P5 | Analytics (utilization charts), dark mode, i18n |

---
## 12. Contributing Workflow
1. Branch naming: `feat/`, `fix/`, `chore/`, `refactor/`.
2. Small PRs (< ~300 lines diff preferred).
3. Run: `pnpm lint` + `pnpm build` before pushing.
4. Include screenshots / GIF for UI changes.
5. Keep mock data realistic but small.

PR Checklist (copy into description):
- [ ] Feature scope described
- [ ] UI screenshot(s) added (if visual)
- [ ] Lint + build pass locally
- [ ] README / docs updated (if needed)

---
## 13. Known Gaps / TODO Markers
- No persistence layer.
- No drag & drop in editor (library pending decision).
- No tests (Vitest + RTL planned).
- No accessibility audit.
- AI flow is simulated only.

---
## 14. License
Not yet defined. Pick MIT unless constraints require otherwise.

---
## 15. Contacts / Support
Internal: team chat / issue tracker. External (future): GitHub Issues.

---
## 16. Quick Reference Snippets
Import a UI primitive:
```tsx
import { Button } from "./components/ui/button";
```
Add a TODO marker:
```ts
// TODO(api): Replace mock faculty array with fetchFaculty()
```

---
> Keep this actionable. If sections grow bloated, split into `/docs` later.
