import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Shared below-fold reveal: content is visible by default; gsap.from only
   runs under no-preference, so reduced-motion and no-JS both read final
   state. Target children carry className "rv". */
export function useReveal(ref) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current.querySelectorAll('.rv'), {
          opacity: 0,
          y: 14,
          duration: 0.38,
          ease: 'power1.out',
          stagger: 0.07,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
}
