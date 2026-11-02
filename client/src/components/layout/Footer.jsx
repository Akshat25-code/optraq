import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import OptraqLogo from './OptraqLogo';

const productLinks = [
  { to: '/optimize', label: 'Optimization Lab' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/review', label: 'Review Pipeline' },
  { to: '/rules', label: 'Rules Engine' },
  { to: '/visualize', label: 'Visualizer' },
  { to: '/workspace', label: 'Workspace' },
];

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
];

export default function Footer() {
  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('aco-open-cookie-settings'));
  };
  const { pathname } = useLocation();
  // Auth routes get the copyright bar only — login card owns the focus.
  const compact = pathname === '/auth'
    || pathname.startsWith('/forgot-password')
    || pathname.startsWith('/reset-password');

  const isLanding = pathname === '/';

  return (
    <footer className={`relative z-10 ${isLanding ? 'mt-0 border-t border-cyan-500/20' : 'mt-24 border-t border-white/10'} bg-[#020b1c]`}>
      {!compact && (
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <OptraqLogo size={24} />
          <p className="text-sm text-white/60 mt-3 max-w-xs leading-relaxed">
            Deterministic AST compiler reasoning, sandboxed execution proof, and mission-critical optimization.
          </p>
        </div>
        <nav aria-label="Product">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 mb-3">Product</p>
          <ul className="space-y-2">
            {productLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/60 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 mb-3">Legal</p>
          <ul className="space-y-2">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/60 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-sm text-white/60 hover:text-white hover:underline underline-offset-4"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </nav>
      </div>
      )}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        ©&nbsp;{new Date().getFullYear()}&nbsp;OPTRAQ. All rights reserved.
      </div>
    </footer>
  );
}
