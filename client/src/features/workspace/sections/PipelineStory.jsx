import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from './reveal';

gsap.registerPlugin(ScrollTrigger);

/* THE ONE PIN: pipeline story. Cards pin at viewport top while the next
   stage displaces the last (scrub 1). Static stack under 768px and under
   reduced-motion — pinning fights mobile scroll. */
const STAGES = [
  { n: '01', to: '/analysis', title: 'Analyze', desc: 'Static analysis maps complexity, dead code and risk across the whole repo in seconds.', cmd: '$ optraq analyze ./src' },
  { n: '02', to: '/optimize', title: 'Optimize', desc: 'Rewrites that preserve behavior, ranked by measured impact. Nothing ships on vibes.', cmd: '$ optraq optimize --prove' },
  { n: '03', to: '/optimize', title: 'Execute', desc: 'Sandboxed runs measure before and after, so every claim arrives with numbers attached.', cmd: '$ optraq run --sandbox' },
  { n: '04', to: '/optimize', title: 'Verify', desc: 'Outputs match. The proof is recorded with the diff, ready to ship with evidence.', cmd: '$ optraq verify' },
];

export default function PipelineStory() {
  const ref = useRef(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.pipe-card');
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cards[cards.length - 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
          });
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="How it works">
      <div className="sec">
        <p className="eyebrow rv">How it works</p>
        <h2 className="h2 rv">Four stages. One proof.</h2>
        <p className="lede rv">Scroll through a run. Each stage displaces the last until only the evidence is left.</p>
      </div>
      {STAGES.map((s) => (
        <div key={s.n} className="pipe-card">
          <div className="pipe-inner glass-card">
            <div className="pipe-num" aria-hidden="true">{s.n}</div>
            <div>
              <h3 className="pipe-title">{s.title}</h3>
              <p className="pipe-desc">{s.desc}</p>
              <div className="pipe-cmd">{s.cmd}</div>
              <p style={{ margin: '16px 0 0' }}>
                <Link to={s.to} style={{ color: '#9FE0FF', fontSize: 14 }}>Open {s.title.toLowerCase()} page</Link>
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
