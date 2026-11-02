# UI Audit — owner-reported problems + masterplan

> Process (owner-locked): problems are reported one by one and logged below
> with zero code changes. When reporting stops, a masterplan is written in
> §3 and shown for approval. Coding starts only after written approval.
> Skills on standby for the plan: ui-ux-pro-max, design-taste-frontend,
> ui-typography.

## §1. How to report (copy-paste friendly)

- Page/route + screenshot.
- What feels wrong in one line each (ugly, confusing, broken, slow...).
- Anything goes — landing, app pages, modals, mobile, copy, motion.

## §2. Issue log

| # | Page / area | Problem (owner's words) | Status |
|---|---|---|---|
| 1 | Landing hero | Feels like a video, nothing is clickable/does anything — frustrating. And: reference is only a reference — take its UI language but lay it out originally with our name/features, not a pixel replica of the reference's content slots. | Logged, awaiting masterplan |
| 2 | Below-fold landing | Drastic drop from premium hero to ugly flat-black sections (e.g. marquee row). Whole site must be 3D-premium, not just the landing hero — extend the cinematic depth below the fold. | Logged, awaiting masterplan |
| 3 | Codebase | Remove old UI code (dead legacy: old theme system, unused components/classes, light-mode paths). Inventory first, delete only proven-dead code. | Logged, awaiting masterplan |
| 4 | Documentation feature | Remove completely (frontend route/pages/links incl. header Features dropdown; backend endpoints + tests to be inventoried before touching). | Logged, awaiting masterplan |
| 5 | "All-in-One" duplication | RESOLVED by owner: keep only one page, my call how. Plan: keep `/optimize` (full workbench), delete `OptimizationPage`, redirect `/optimization` → `/optimize`, drop the "All-in-One" label. | Resolved — plan set |
| 7 | Workspace everywhere | RESOLVED by owner: keep as-is, do nothing. Pages stay separate. | Resolved — no action |
| 9 | Pagination / data over-fetching | Page visits fire off all API calls and load full lists at once. Add pagination (and paging to long lists: sessions, findings, files, members) so a click loads one page of data, not everything. | Logged, awaiting masterplan |
| 10 | Auth-gated app | Feature pages + workspace must require login. Anonymous visitors see the landing (what the site contains) but app routes redirect to `/auth` (with return-to). Public stays: `/`, `/auth`, forgot/reset, `/privacy`, `/terms`, shared links, 404. | Logged, awaiting masterplan |
| 8 | Glyph sweep part 2 | Double-quoted `icon: "..."` values (feature cards etc.) still render mojibake — first sweep only covered single-quoted. Re-sweep before build. | Logged, awaiting masterplan |
| 11 | Empty landing | Landing looks empty — visitors learn nothing. Add: what each feature means (optimization, analysis, bug detection, refactoring, debugging, workspace), how to add API keys (Settings → API keys, providers), how keys are kept safe (claims verified in code first), what users can do on the site. Expand FAQ accordingly. | Built — in verification |
| 13 | Hero clicks dead + 1-sec freeze (owner machine) | DIAGNOSED. (a) Backend was down → `/auth/me` refused (expected; start it). No retry loop exists — single check on mount. (b) `sw.js` v2 served stale cached builds AND its fetch `.catch()` returned `undefined` → the exact "Failed to convert value to 'Response'" unhandled rejection; stale chunks also explain dead/broken handlers. Fixed: catch always returns a Response, cache bumped to `optraq-v3` (auto-purges v2). (c) Freeze: no 1s timer exists anywhere on the landing path — remaining suspect is GPU compositing (1080p video + full-screen backdrop blur). Shipped lite-mode: weak GPU / save-data holds the poster still + shrinks blur; video pauses off-tab. Owner action: start backend + one-time SW unregister (DevTools → Application → Service Workers). (d) Product dropdown rebuilt as zero-JS checkbox pattern (same trick as the burger): opens with CSS alone, so it survives even total React event failure; Escape still closes. Line-height collapse bug in dropdown links also fixed. Verified: lint clean, tests green, build green, desktop screenshot. | Fixed, owner to verify |
| 14 | Below-fold still not lavish | Owner verdict: sections still read flat/cheap (ambient too subtle to see, bare monogram marquee, text-only bento cells). Requires a real richness pass: visible ambient glows, varied cell treatments, stronger type moments, rhythm. | Logged, awaiting rework |
| 12 | Brand + hero lines + lavish everywhere | (a) Brand is OPTRAQ, not TwinRun — CTA becomes "Try OPTRAQ", pipeline commands become `$ optraq ...`, all TwinRun strings swept. (b) Owner wants NEW best hero lines — options in §3, owner picks. (c) EVERY page (not just landing) gets the full lavish 3D-premium treatment. (d) Testimonials STAY (await owner quotes); logo wall waits for owner-supplied logos (stack monograms interim). (e) FAQ as third nav item: APPROVED. | Logged, awaiting masterplan |
| 6 | Login page (`/auth`, + forgot/reset for consistency) | Strip the footer columns (brand blurb, Product links, Legal links, cookie-settings row) — keep ONLY the copyright line. Auth pages = login card only. | Logged, awaiting masterplan |

### Standing items (already known, not re-reported)

- Testimonials + logo brands: placeholders (`sections/NEEDS.md`).
- Stale old UI on owner's machine: environment/cache issue, not a UI bug.
  Fix path: fresh dev server, hard refresh, unregister `sw.js` if pinned.

## §3. Masterplan (shown for approval — no code until approved)

Skills applied per item (taste = design-taste-frontend, pro = ui-ux-pro-max,
type = ui-typography). Whole program stays dark-locked, Sora, glass +
footage language.

### A. Hero: original composition, everything clickable (issues #1, #12)

What "hero composition as drawn" means, plainly: instead of the
reference's centered stack, the hero splits in two — LEFT: eyebrow, the
two-line headline, sub-copy, CTA button + "Free while in beta."; RIGHT: a
live proof instrument (real before/after code + recorded verdict, small).
Feats row beneath both. Same footage, veil, glass and Sora — a new,
unmistakably-ours layout (taste anti-center rule).

New hero lines (owner picks one set — sub stays yours either way):
- Option 1 (recommended): "Ship faster code." / "Prove every line."
- Option 2: "Find the slow." / "Ship the fast."
- Option 3: keep "Optimize. Verify." / "Accelerate."
Sub (yours, unchanged): "Slow code in, measured speed out." /
"No claims. Just numbers."

Dead clicks: audit in fixed order at build (overlay stacking and
pointer-events, `::before` masks, scrim state, decorative caret, `#`
links, entrance holding elements invisible) — fix what the audit finds.
Product caret becomes a REAL dropdown (feature pages; Esc/outside close,
keyboard navigable). Every nav item + CTA navigates somewhere real —
proven by click-navigation tests, not by eye. Hover states everywhere,
visible ice focus throughout.
Nav becomes: Product (dropdown) / Workspace / FAQ (anchor to landing FAQ).
CTA everywhere reads "Try OPTRAQ" (brand lock §12a); pipeline commands
become `$ optraq ...`; backend/CLI TwinRun references inventoried and
renamed or mapped at build.

### B. Cinematic continuity below the fold (issue #2)

- Fixed ambient footage layer bleeds past the hero; section bands use
  veil-matched scrims (navy/blue family, never flat black, never purple).
- Marquee rebuilt with labels + real brand marks when supplied (NEEDS.md),
  pause on hover, static under reduced-motion.
- Bento cells each carry a real visual (live instrument, chart, code) —
  typography-only cells get tint variation, never 6 white-on-dark clones.
- App pages get the FULL lavish treatment, not tokens alone (issue #12):
  ambient page-top glow bands, glass cards with layered depth (rim +
  highlight + deep shadow), Sora display headings with eyebrow + action
  row per page, tabular numerals, Monaco neural-night, designed empty /
  loading / error states on every surface, app motion tier (reveals, no
  pins). Same footage-palette world as the landing. No WebGL (perf gate
  holds) — depth from layers, blur discipline, and motion.

### C. Dead-code deletion (issue #3 — inventory first, delete proven-dead only)

- `ThemeContext.jsx` + provider wiring (zero consumers left — verified at
  build; if any remain, they migrate first).
- `tailwind.config.js` (dead v3 file; v4 uses CSS `@theme`).
- `accentColor` dead prop (FeaturePageLayout + 4 call sites).
- `Fraunces` fallbacks, `.font-display` alias (now Sora), light-mode
  remnants, `design-concepts/` stays (untracked dev artifacts, never shipped).
- Rename lying var names (`--accent-cyan/gold` → `--accent-paper`) via bulk
  swap + build verify. Anything with a single live reference stays.

### D. Remove Documentation feature (issue #4)

- Frontend: delete route `/documentation`, `DocumentationPage.jsx`, header
  dropdown entry, hero Docs nav → replaced by FAQ anchor (`/#faq`, smooth
  scroll handling in router).
- Backend: `intelligence_routes.py:199` list item inspected at build —
  removed only if docs-specific; related tests updated or deleted with it.
- Footer/product links audited for dangling `/documentation` refs (grep gate).

### E. One optimization page (issue #5, resolved)

- Keep `/optimize` (full workbench). Delete `OptimizationPage.jsx`.
- `/optimization` → `<Navigate to="/optimize">` (no rotting links).
- Header dropdown + any in-app links retargeted (grep gate). "All-in-One"
  label deleted everywhere.

### F. Compact auth footer (issue #6)

- `/auth`, `/forgot-password`, `/reset-password`: footer renders copyright
  bar only (link columns hidden via route-aware Footer).

### G. Glyph sweep part 2 (issue #8)

- Double-quoted `icon: "..."` values → monograms/empty per the part-1
  system. Post-sweep byte scan must read zero.

### H. Pagination, not fire-hoses (issue #9)

- Backend already caps sensibly (sessions ≤200, history ≤100); the gap is
  frontend rendering everything at once.
- Shared pager ("showing 1–20 of N" + numbered pages) applied to: sessions
  drawer, findings/violations lists, team members, API key lists, file
  explorer over 50 files. Skeletons per page turn. No list renders unbounded.

### I. Login wall (issue #10)

- `ProtectedRoute` wrapper in `App.jsx`: logged-out visits to app routes →
  `/auth` with return-to state (Sign-in buttons already pass it), loading
  state shows shells (never a login flash, never a content flash).
- Public: `/`, `/auth`, forgot/reset, `/privacy`, `/terms`, `/share/:token`,
  404. Everything else gated.

### J. Landing that teaches (issues #11, #12)

Testimonials STAY (shell renders when owner quotes land — no invented
quotes, ever). Logo wall keeps stack monograms ONLY until owner-supplied
brand logos arrive, then swaps (NEEDS.md tracks both).

- "What you can do here" strip: six feature cards (optimization, analysis,
  bug detection, refactoring, debugging, workspace) — each says what the
  feature MEANS, one line on what you do there, link to the page.
- API key guide section: Settings → API keys → provider → paste → test
  connection; safety list published ONLY for claims verified in code
  (encrypted-at-rest string exists; masked display; reveal-once; verify the
  rest at build, drop what can't be proven).
- FAQ grows: API keys, key safety, beta/billing ("free while in beta",
  no plans), languages. Copy register + curly quotes enforced.

### Build order

1. C + D + E (deletions/redirects first — shrink the surface).
2. A (hero recomposition) + click-navigation tests.
3. B + J (below-fold richness + teaching content).
4. F + G + H + I (auth footer, glyphs, paging, login wall).
5. Gates: eslint 0 errors, client tests (updated for "Try OPTRAQ" copy +
   new coverage), build, pytest, remnant greps (teal/gold/emoji/TwinRun/
   `/documentation` refs), keyboard pass, screenshots desktop + phone,
   NEEDS.md updated.

### Open questions for owner (with recommendations)

1. Hero lines: Option 1, 2, or keep current? (Recommended: Option 1.)
2. Anything in this masterplan to change before coding starts?
