# DESIGN.md — OPTRAQ website redesign ("NEURAL Program")

> Status: PLAN ONLY. No code has been written or changed for this redesign.
> Build starts only after owner approval of this file plus
> `docs/DESIGN_SYSTEM.md` and `docs/MOTION_SPEC.md`.
> Single source of truth for the hero: the NEURAL standalone prompt
> (video + poster URLs, Sora variable, locked 1536×1024 composition, flow
> canvases, entrance timeline, acceptance criteria). Where this plan embeds
> that hero into a scrolling React site, each deviation is logged in §8.
> The earlier "Apogee Program" docs are superseded in full — do not mix
> tokens, copy, or motion across programs. Reusable mechanics only (§9).

## 0. Design read (required by taste skill)

Reading this as: **dark-cinematic studio landing for technical buyers, with
a converging-light premium language, leaning toward Tailwind utilities +
Sora variable + CSS-only hero entrance and GSAP scroll choreography below
the fold.**

Dials (locked): `DESIGN_VARIANCE 8 / MOTION_INTENSITY 8 / VISUAL_DENSITY 3`
— cinematic, spacious, asymmetric. (ui-ux-pro-max queries run for this
program returned an off-topic Brutalism style on both attempts; per skill
rules unverified output is rejected and the NEURAL prompt governs. The
Scroll-Triggered Storytelling pattern and GSAP presets from those runs are
adopted and cited where used.)

Skills active: `ui-ux-pro-max` (system, GSAP presets, 119 UX guidelines),
`design-taste-frontend` (taste rules, layout discipline), `ui-typography`
(Butterick rules for all copy). Honest note: no standalone "GSAP skill" is
installed — all GSAP guidance comes from ui-ux-pro-max's gsap domain
(17 presets), referenced as `pro-max/gsap:<preset>`.

## 1. Concept

**Light converges; proof follows.** The landing opens on the NEURAL hero:
golden strands pour from the upper corners, blue strands rise from the
lower ones, and they collide at a white-hot center behind two lines of
Sora — "Optimize. Verify." / "Accelerate." A glass CTA burns at the impact
point. Below the fold, the page becomes the proof the hero promises:
pipeline stages, measured numerals, a live instrument, testimonials, pricing,
FAQ, climax CTA. The signature moment (the screenshot): the center flare
blooming behind the wipe-revealed headline at 0.34s.

3-second rule (non-negotiable): a first-time visitor must be able to say
"this makes my code faster, with proof" within 3 seconds. Mechanism is
structural: transformation language in the headline + a live-feeling glass
instrument directly below the fold — never a manifesto paragraph.

## 2. Scope — the entire project, one theme

No flow or IA changes anywhere (APPFLOW.md holds). Route inventory from
`client/src/app/App.jsx` (18 routes); components from `features/*`.

- Global chrome: header/footer/toasts/skeletons/focus/consent/error
  boundary — retokened to NEURAL (§8 reverts Phase 1–2 Apogee items first).
- Marketing `/`: NEURAL hero (§3) + below-fold sections (§4).
- Legal `/privacy`, `/terms`: token reskin only, 65ch measure.
- `*` 404: centered manifesto + single "Back home" CTA.
- Auth (`/auth`, `/forgot-password`, `/reset-password`): centered 405px
  glass card, validation + spamGuard logic untouched, 44px controls.
- Workspace `/workspace`: cockpit density 5–6, 264px rail, 44px rows.
- Optimize (`/optimize`, `/optimization`, `/refactoring` + panels): split
  workbench (320px config rail / editor / proof rail), stepper kept.
- Analysis family (`/analysis`, `/bug-detection`, `/documentation`,
  `/debugging` + dashboards): metric tiles + trend charts in NEURAL chart
  language (white series, hairline grid, tabular numerals, text labels).
- Team, Review, Rules, Visualization, GitHub panels: rows with severity
  TEXT tags, glass modals/drawers, canvas chrome reskinned, reduced-motion
  final frames.
- Profile, Settings (+ApiKeys): 64px rows, masked keys + copy, claret only
  for destructive text.
- Overlays: palette, sessions drawer, tour (themed tooltips, "Step n of m",
  always skippable), shared session read-only + expiry notice.
- Reports/export: controls reskinned; printed output keeps a light print
  theme (only sanctioned break of dark-lock).
- Monaco: `defineTheme("neural-night")` — bg `#02060f`, fg `#EDEFF5`,
  gutter dim, cursor paper, selection ice 25%.

## 3. Hero content mapping (NEURAL slot → OPTRAQ content)

| NEURAL slot | OPTRAQ content | Notes |
|---|---|---|
| Brand mark + `#word` | Prism mark + `OPTRAQ` | Owner-locked brand; letterspacing .06em flow / 4.8u desktop |
| `#about/#product/#solutions` | Product / Pricing / Docs | Caret stays on first item, dropdown of feature pages |
| `#login` | Log in → `/auth` | — |
| Pill `#contact` | Try TwinRun | Single-CTA-intent lock stands (owner-locked label) |
| `#h1a / #h1b` | Optimize. Verify. / Accelerate. | Owner-locked headline, two written lines |
| `#sub1 / #sub2` | "Slow code in, measured speed out." / "No claims. Just numbers." | Owner-approved verbatim |
| `#cta` | Try TwinRun + arrow | Same intent as pill (consistency, not duplication) |
| `#f1..#f4` | Analyze in seconds / Check every fix / Sandboxed runs / Ship with evidence | Owner-approved verbatim, chevron-led |
| Microline under CTA | "Free while in beta." | New element (deviation §8.9): small, sub-colored, rides the CTA's entrance; sets price expectation with no billing |
| `#foot1 / #foot2` | Trusted by teams who measure everything. / dynamic year | Placeholder line, owner can replace |
| Video/poster | NEURAL CloudFront URLs verbatim | Never substituted, never localized |
| Font | Sora variable (Google Fonts fallback per prompt) | Fractional wght per DESIGN_SYSTEM.md §2 |

## 4. Below-fold landing (NEURAL language, same IA rules as planned before)

Sections: logo marquee (ONE marquee, real SVG logos, logo-only) → pipeline
sticky-stack (THE ONE pin, Analyze→Optimize→Execute→Verify) → proof bento
(asymmetric, ≥2 cells with real visuals) → live mini-instrument preview
(real component, never fake screenshot) → testimonials (≤3 lines, curly
quotes) → FAQ (top 5 + link) → climax CTA + footer. No pricing section:
the project has no billing yet, and a pricing table would promise plans
that do not exist. Eyebrow budget: max 3 page-wide.
Theme lock: dark throughout, no light sandwiches. Layout families never
repeat; max 2 consecutive splits (there are none planned).

## 5. Copy register + locks

Precise, terse, technical. Numbers ship measured or labeled `<!-- mock -->`.
One CTA label per intent site-wide ("Try TwinRun" = demo intent,
owner-locked; "Log in" = auth intent). No other demo/contact labels anywhere.
Typography enforcement (ui-typography): curly quotes, en dashes for ranges,
single-char ellipses, straight quotes only for code/inch marks, no em dashes
anywhere, max one exclamation per page (budget: zero).

## 6. Lighting direction (full recipe in DESIGN_SYSTEM.md)

Footage hero with aimed veil (desktop scrim + stronger re-aimed phone veil);
glass blur scale 26u/34u glow by unit (desktop) and 17/20/24/30px blur tiers
(flow components); ice-only focus `#9FE0FF`; grain on one fixed
pointer-events-none layer; no purple washes, no neon outer glows.

## 7. Acceptance gates

1. NEURAL prompt §12 verbatim (never scrolls *the hero*, autoplay legal,
   locked ≥1200px, flow below, legible flare, 44px targets, reduced-motion,
   zero CLS).
2. Embedding deviations in §8 implemented exactly (100dvh hero section,
   global header hidden on `/`, React-controlled retire + video pause).
3. Taste pre-flight: eyebrows ≤3, one marquee, one pin, one CTA label per
   intent, no em dashes, logo-only wall, mobile collapse per section.
4. pro-max P1–P2: AA contrast, 44px targets, keyboard + visible focus,
   aria on icon-only controls, DOM order = visual order, no-JS readability.
5. App sweep: all 18 routes reskinned, zero emoji icons, zero foreign hex
   (teal/gold remnants grep), charts labeled, tables tabular right-aligned,
   modals trap + return focus.
6. Perf: Lighthouse mobile LCP <2.5s TBT <300ms; pin off <768px;
   ScrollTrigger.refresh after fonts/video metadata.
7. Existing gates green: client tests + build, eslint, pytest, full CI.

## 8. Embedding deviations (standalone prompt → React app, all logged)

1. Page scrolls below the hero (prompt: never scrolls). Hero is a
   `100dvh` section; composition lock applies to the hero viewport only.
2. Global `<Header/>` hidden on `/` (hero owns its `.bar`; double nav is a
   ship-blocker — the exact defect in the rejected Apogee attempt).
   Footer stays (page end, below fold).
3. Burger checkbox kept uncontrolled (prompt: zero-JS nav) — React does not
   manage it; Esc/outside-close added via effect without owning state.
4. Entrance retire (`is-entered`) + video pause implemented as React effects
   mirroring the prompt's two IIFEs.
5. Sora via Google Fonts variable (prompt's own fallback; no local TTF).
6. Footer year dynamic (prompt hardcodes 2024).
7. Title/meta/OG → OPTRAQ (prompt titles a fictional studio).
9. Microline "Free while in beta." under the CTA (owner directive): the
   prompt has no such element. Justified — honest pricing signal where no
   plans exist. Shares the CTA's en-lift entrance (no new timeline entry);
   sits between CTA and feats without breaking the desktop lock.
8. Reverts of shipped Phase 1–2 Apogee items at hero build: Suisse Intl →
   Sora (link, base stack, `@theme` tokens), remove unused Apogee keyframe
   block, retoken `apogee-nav`/paper buttons to NEURAL values when app
   chrome is reskinned. Glass toast/consent/panel work is brand-neutral
   and stays, retinted.

## 9. Carry-over mechanics (no visual tokens cross programs)

Skeletons-not-spinners, inline form errors, one-CTA empty states, 4-step
stepper, validation + spamGuard logic, scroll-storytelling pattern
(pro-max), GSAP SplitText rules (short headlines only, revert on unmount).
Teal, Abyssal Gold, Fraunces, Suisse Intl, Apogee hero: all retired.

## 10. Build order (after approval)

1. Reverts §8.8 + Sora link + NEURAL tokens/keyframes.
2. Global chrome retoken (header/footer/toast/consent/focus/skeletons).
3. Hero component (video, veil, bar, headline, CTA, feats, rule, foot) +
   App `/` wiring + header-hide + measurement pass (desktop 1536 + 390px).
4. Landing sections in page order, mobile collapse per section.
5. Auth/legal/404 → workspaces → analysis/team/review → settings/overlays.
6. GSAP layer, reduced-motion gates, copy audit (quotes, em dashes, CTA
   sweep, mock labels, emoji/hex greps).
7. Gates §7: a11y sweep, Lighthouse ×2 routes, tests, full CI.

## 11. Open decisions (owner answers before code)

1. RESOLVED — sub-copy + feats approved verbatim (§3).
2. RESOLVED — CTA label "Try TwinRun" (pill + hero).
3. Confirm nav mapping (Product/Pricing/Docs + caret dropdown).
4. 3 testimonials, logo-wall brands (or placeholders + needs list —
   standing default). Pricing: dropped, no billing exists.
5. Settings IA untouched (recommended) or reordered during reskin.
6. Avatars: initial-monograms (recommended) or generated images.
7. Tour copy: reskin-only (recommended) or rewritten.
