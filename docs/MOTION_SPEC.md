# MOTION_SPEC.md — motion for the NEURAL Program

> Companion to root `DESIGN.md` and `docs/DESIGN_SYSTEM.md`. PLAN ONLY.
> Governing question: "what does this animation communicate?" — no answer,
> no animation.

## 1. Dials

`MOTION_INTENSITY 8`: choreographed cinematic hero + GSAP scroll story
below. Easing: `--ent-line cubic-bezier(.16,1,.3,1)` (type),
`--ent-soft cubic-bezier(.25,.8,.35,1)` (supporting). Rise 9px (6px phone).

## 2. Hero entrance (NEURAL §6 — LAW)

CSS only, `prefers-reduced-motion:no-preference` gate, selectors prefixed
`html:not(.is-entered)`, `backwards` fill. CRITICAL (spec): animate ONLY
independent `translate`/`scale`/`opacity`/`clip-path` — never `transform`
(stage scale, link centering, card transforms would be destroyed).

Keyframes: `en-wipe` (clip-path inset opens downward + rise), `en-lift`
(opacity + rise), `en-settle` (opacity + .7 rise + scale .99), `en-draw`
(scale 1 0, for the rule, origin top).

Timeline: brand .12 · about .20 · product .25 · solutions/caret .30 ·
login/navarrow .35 · pill+burger .40 · h1a .34 (wipe .95s) · h1b .44 ·
sub1 .74 · sub2 .80 · cta .94 · feats 1.08/1.15/1.22/1.29 · rule 1.34
(draw .55s) · foot1 1.42 · foot2 1.48. Total ≈2.1s.

Retire (React effects mirroring the two IIFEs): (a) matchMedia live-gated
video pause (with legacy fallback), poster holds first frame; (b) retire
on `#foot2` animationend ONCE or 4000ms timeout → `is-entered` on
documentElement, so breakpoint changes never replay the entrance.

## 3. Below-fold GSAP (landing story)

Setup: `gsap.registerPlugin(ScrollTrigger)` once, `useGSAP` scope per
section, `revert()` on unmount + route change, `ScrollTrigger.refresh()`
after fonts + hero video metadata.

- Reveals: `opacity 0, y 12–14, 300–400ms, power1.out, start "top 88%",
  once` + 70ms grid stagger. Reads as hierarchy (pro-max/gsap Reveal).
- THE ONE PIN: pipeline sticky-stack, `start "top top"`, `end "+=140%"`,
  `scrub 1`, outgoing card scales .92/fades .55 via incoming trigger
  (taste-skill StickyStack skeleton). Off <768px → static stack.
- SplitText (pro-max/gsap: SplitText ships with GSAP 3.13+): section
  headlines ONLY, ≤8 words, `expo.out`, `split.revert()` on cleanup,
  plain-fade fallback, skipped under reduced-motion.
- Logo marquee: CSS loop (not GSAP), pause on hover/focus, static row
  under reduced-motion. One per page.
- Decor parallax: scrims only, `yPercent ±8`, scrub, never text/controls.
- BANNED: scroll listeners, scrollY-in-state, rAF→state, second pin,
  scroll-hijack galleries, magnetic buttons, counting numerals, cursor
  effects.

## 4. State-change tier (whole site)

Hovers 150–300ms expo-out; press `scale(.98)`; accordion height (instant
under reduced-motion); menu panel 200ms; toasts slide 240ms/5s dismiss;
skeletons for async (never spinners); streaming text progressive;
drawer/modal 240–300ms; palette filtering instant.

## 5. App tier (cockpit: quiet)

No pins/scrub/parallax/marquee/entrances in tool routes — final-state
renders. Route change: 240ms fade + 8px rise (CSS). Charts: lib mount
animation only, `animation:false` under reduced-motion. Monaco: no UI
animation. Tour: 150ms fades, never auto-advance. GSAP forbidden in app
code (landing system only).

## 6. Reduced motion (three layers, non-negotiable)

1. CSS hard stop LAST rule: `*{animation:none!important;
   transition:none!important}` under the query.
2. GSAP fully gated: skip creation, render final states (stacked cards,
   static marquee row, visible content).
3. Video paused via live matchMedia; poster holds composition.

## 7. Performance budgets + cut order

Transform/opacity/clip-path only; static blurs (never animated
backdrop-filters); video `preload="auto"` + poster per spec, ≤1080p;
fonts variable-single-request; refresh triggers after font/video load.
Gate: Lighthouse mobile LCP <2.5s TBT <300ms CLS <0.1. Cut order: decor
parallax → marquee → pin → SplitText → grain. Hero timeline + video are
never cut; on LCP miss, cut video resolution first.
