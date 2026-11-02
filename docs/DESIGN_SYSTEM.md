# DESIGN_SYSTEM.md — tokens for the NEURAL Program

> Companion to root `DESIGN.md` and `docs/MOTION_SPEC.md`. PLAN ONLY.
> Semantic tokens in components; raw values live here and in NEURAL-spec
> arbitrary values. Values below are LAW unless DESIGN.md §8 says otherwise.

## 1. Color tokens (NEURAL §2 + semantic roles)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#ffffff` | Headlines, primary on footage |
| `--sub` | `#a2a9b8` | Sub-copy (never body-small alone) |
| `--nav` | `#fbfdff` | Nav links, burger strokes |
| `--foot` | `#f4f8fd` | Footer lines |
| `--hair` | `rgba(196,214,232,.72)` | Pill borders, hairlines |
| `--chev` | `rgba(214,232,250,.90)` | Feat chevrons |
| `--navdim` | `#e8ecf0` | Pill CTA text |
| `--feat` | `#e2ebf5` | Feat labels |
| `--veil` | `6,10,18` | Raw triplet for veil scrims |
| `--night` | `#02060f` | App/page background base |
| `--ice` | `#9FE0FF` | Focus ring, links on night, selection |
| `--status-pass` | `#3ECF8E` | Pass reporting ONLY (+ word) |
| `--status-fail` | `#E2607A` | Fail reporting ONLY (+ word) |

Single-accent discipline holds by construction: the only saturated hues on
marketing surfaces are footage pixels + status words. No purple washes.
App sanction: indigo-400 (#818CF8) is retained as the single secondary
"info/selection" hue (selected rows, focused inputs, info badges) —
one family, never gradients, never glows. Teal/gold are fully retired;
emerald/amber/red keep status-only meaning.
Contrast: ink on veiled footage is carried by the veil recipe (§4), verified
per breakpoint at build (flare region). App text pairs: ink/night 19+:1,
sub/night ~7:1, ice/night ~12:1.

## 2. Typography — Sora variable, fractional weights

- Source: Google Fonts Sora variable `wght 100..900`, `display:block`
  (prompt's fallback; no local TTF). Base stack:
  `'Sora',system-ui,-apple-system,'Segoe UI',sans-serif`.
- Fractional `font-variation-settings:'wght'` per element (static weights
  will NOT reproduce — build gate):
  word 531 · nav/login 506 · pill-CTA 581 · h1 424 · sub 446 · CTA 497 ·
  feats 534 · foot 521.
- Rendering: antialiased, `text-rendering:geometricPrecision`. Tracking per
  NEURAL table (tight throughout, e.g. h1 +0.532/−0.398). Never letterspace
  lowercase body; caps labels 6–12%.
- Scale: desktop coordinates are law (h1 46.8u, sub 20.6/19.1u, CTA 22u,
  feats 14.6u, foot 16.3u); flow sizes per canvas (33/17/18 phone-base …
  full tables in build). Tabular numerals wherever numbers align.
- ui-typography at build: curly quotes, en-dash ranges, `…`, straight marks
  only for code, no em dashes, no underline except links, 65ch measures.

## 3. Scale system (build tokens, not px)

Desktop `--u` maps 1536×1024 (`--cover/--fit`, dvh-guarded); blur
`--blur:26u`, glow `--glow:34u`, hairline `max(1px,1.6u)`. Flow `--c`
per canvas (430×860 base; 360×770 phone capped `1px`; 760×430 landscape;
860×1120 tablet; 1040×780 landscape-tablet; dvh restatements). Hero uses
this system verbatim; app surfaces use px from §7.

## 4. Lighting — art, veil, glass, grain

- `.art` video: fixed, cover, center, `#03060c` underlay, exact URLs.
- `.veil` desktop: 140%×60% radial at 50%/40% (.16→.057→0) + 180° linear
  (.10 at base). Phone re-aim: 130%×44% at 50%/45% (.50→.26→0) + top .34 →
  0 → base .36. Same scrim, new coordinates (spec rationale kept).
- CTA glass: three stacked gradients (warm left edge, cool right) +
  masked gradient-hairline `::before` (NOT a border) + blur(`--blur`)
  saturate(.45) + warm/cool shadows. Panel glass: 180° white .10→.045 +
  90° warm/cool .06 + 180° deep-navy .60→.70, blur(`--blur`).
- Grain: one fixed `pointer-events-none` layer, 3–4%, never on scrollers.
- Focus: 2px `#9FE0FF` + 3px offset. Selection: ice-tinted.

## 5. Shape, z-index, icons, imagery

- Radii: pill 999px (CTA, burger, pills); panel 20–22u; card 24/33px app.
  One scale per surface, documented per page.
- Z: art/veil 0 · content 1 · header 5(flow)/50(app) · overlay 40 ·
  grain 60 (pointer-events none) · toasts 70. No ad-hoc values.
- Icons: NEURAL inline SVGs (brand slash-mark, chevrons, caret, arrows) are
  BRAND marks — the taste skill's hand-rolled-SVG ban exempts single simple
  geometric marks, and these ship verbatim. All other UI icons: lucide
  only, one family, consistent stroke.
- Imagery: footage + live components only. Logo wall: real simple-icons
  SVGs, logo-only. Placeholders: labeled slots + needs list, never CSS
  fake-screenshots. Numbers: measured or `<!-- mock -->`.

## 6. Component skins (shared)

Brand svg fill ink; caret/navarrow stroked round (navarrow square/miter);
chev 1.75 round; CTA arrow 1.6 square/miter; rule = 3-stop vertical silver
gradient; burger 44px tap target via `::after` expander (visual stays
pill-sized).

## 7. App surfaces (cockpit density 5–6, marketing stays 3)

Rails 264–320px; data rows 44–64px; settings rows 64px; mono for code +
tabular data only. Workbench beds: night blacks + hairlines; active tab =
paper underline + ink label. Diff/proof: status fills ≤14% + obligatory
words (severity always text). Forms: 44px controls, label-above,
error-below (claret + icon + "Error"), ice focus, text-state toggles.
Tables: 12px/8%-spaced headers, hairline dividers, tabular right numerals.
Badges word-first. Destructive = claret text + confirm step. Overlays:
glass-panel blur 30, modal ≤520px, drawer 400px right, Esc + focus trap +
return, backdrop `rgba(8,10,25,.7)`. Monaco `neural-night`: bg `#02060f`,
fg `#EDEFF5`, dim gutter, paper cursor, ice-25% selection. Print: light
theme exception (only dark-lock break).

## 8. Accessibility contracts (pro-max P1–P2, binding)

AA pairs (§1 + flare-spot checks per breakpoint); 44px targets (burger via
expander, panel rows min-height, nav hit areas); checkbox nav stays
focusable with visible focus; Esc/outside close; body never scroll-locked
by the landing (page scrolls — deviation §8); DOM order = visual order;
content readable with JS off (entrance `backwards` fill reveals);
reduced-motion = final state + paused video; chart/canvas content always
has text equivalents; decorative SVGs `aria-hidden`.
