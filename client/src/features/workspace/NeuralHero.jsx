import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './neural-hero.css';

const FEATURE_LINKS = [
  { to: '/optimize', label: 'Optimization' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/bug-detection', label: 'Bug Detection' },
  { to: '/refactoring', label: 'Refactoring' },
  { to: '/debugging', label: 'Debugging' },
];

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4';
const POSTER_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/130837c4-0244-4f37-9c61-8d801d93fd29.jpg';

/* NEURAL hero adapted for the React app (DESIGN.md §8 deviations):
   fixed layers are absolute inside the 100dvh section; the global header
   is hidden on `/` so the hero owns its `.bar`. Copy per mapping table. */
export default function NeuralHero() {
  const videoRef = useRef(null);
  const footRef = useRef(null);
  const navRef = useRef(null);

  // (a) Reduced motion pauses the artwork on its first frame (live-gated).
  // Lite mode (weak GPU / save-data) holds the poster still and shrinks
  // backdrop blur so compositing never janks. Video also pauses off-tab.
  useEffect(() => {
    const v = videoRef.current;
    const q = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!q || !v) return undefined;
    const nav = window.navigator || {};
    const lite = (nav.hardwareConcurrency || 8) <= 4
      || (nav.deviceMemory || 8) <= 4
      || (nav.connection && nav.connection.saveData);
    if (lite && v.closest('.nh')) v.closest('.nh').classList.add('nh-lite');
    const sync = (visible = true) => {
      if (q.matches || lite || !visible) v.pause();
      else { const p = v.play(); if (p) p.catch(() => {}); }
    };
    const onVis = () => sync(!document.hidden);
    sync(!document.hidden);
    if (q.addEventListener) q.addEventListener('change', () => sync(!document.hidden));
    else q.addListener(() => sync(!document.hidden));
    document.addEventListener('visibilitychange', onVis);
    return () => {
      if (q.removeEventListener) q.removeEventListener('change', () => sync(!document.hidden));
      else q.removeListener(() => sync(!document.hidden));
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // (b) Retire the entrance once so breakpoint changes never replay it.
  useEffect(() => {
    let done = false;
    const timer = setTimeout(finish, 4000);
    const el = footRef.current;
    function finish() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (el) el.removeEventListener('animationend', finish);
      document.documentElement.classList.add('is-entered');
    }
    if (el) el.addEventListener('animationend', finish);
    return () => {
      clearTimeout(timer);
      if (el) el.removeEventListener('animationend', finish);
      document.documentElement.classList.remove('is-entered');
    };
  }, []);

  // Escape closes the CSS-only panels (burger + product dropdown).
  // State lives in the checkboxes, so open/close never depends on React.
  const dropRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (navRef.current) navRef.current.checked = false;
      if (dropRef.current) dropRef.current.checked = false;
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="nh" aria-label="OPTRAQ introduction">
      <video
        ref={videoRef}
        className="art"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        poster={POSTER_URL}
        src={VIDEO_URL}
      />
      <div className="veil" />
      <header className="bar">
        <Link className="brand" to="/">
          <svg viewBox="0 0 23 17" aria-hidden="true">
            <path d="M8.15 0.9 L4.55 0.9 L0.5 9.3 L4.1 9.3 Z" />
            <path d="M17.0 0 L13.4 0 L6.15 16.4 L9.75 16.4 Z" />
            <path d="M22.9 0 L19.3 0 L15.0 7.6 L18.6 7.6 Z" />
            <path d="M22.6 6.9 L19.0 6.9 L14.05 16.4 L17.65 16.4 Z" />
          </svg>
          <span id="word">OPTRAQ</span>
        </Link>
        <input ref={navRef} className="navtoggle" type="checkbox" id="nav-open" />
        <label className="scrim" htmlFor="nav-open" aria-hidden="true" />
        <label className="burger" htmlFor="nav-open" aria-label="Menu">
          <svg viewBox="0 0 22 14" aria-hidden="true">
            <path className="b1" d="M1 1 H21" />
            <path className="b2" d="M1 7 H21" />
            <path className="b3" d="M1 13 H21" />
          </svg>
        </label>
        <div className="navpanel">
          <nav className="menu" aria-label="Primary">
            <div className="drop">
              <input ref={dropRef} className="droptoggle" type="checkbox" id="nh-product" />
              <label className="dropbtn" htmlFor="nh-product" aria-haspopup="true">
                <span id="about">Product</span>
              </label>
              <svg className="caret" viewBox="0 0 9 6" aria-hidden="true">
                <path d="M0.7 1.1 L4.5 4.6 L8.3 1.1" />
              </svg>
              <span className="dropmenu" id="nh-product-menu">
                {FEATURE_LINKS.map((f) => (
                  <Link key={f.to} to={f.to}>{f.label}</Link>
                ))}
              </span>
            </div>
            <Link to="/optimize" className="m-extra"><span>Product</span></Link>
            <Link to="/workspace"><span id="product">Workspace</span></Link>
            <a href="#faq"><span id="solutions">FAQ</span></a>
            <Link to="/analysis" className="m-extra"><span>Analysis</span></Link>
            <Link to="/bug-detection" className="m-extra"><span>Bug Detection</span></Link>
            <Link to="/refactoring" className="m-extra"><span>Refactoring</span></Link>
            <Link to="/debugging" className="m-extra"><span>Debugging</span></Link>
          </nav>
          <Link className="login" to="/auth">
            <span id="login">Log in</span>
            <svg className="navarrow" viewBox="0 0 10 9" aria-hidden="true">
              <path d="M0 4.5 H9.1 M5.4 0.9 L9.2 4.5 L5.4 8.1" />
            </svg>
          </Link>
          <Link className="pill" to="/auth"><span id="contact">Try OPTRAQ</span></Link>
        </div>
      </header>
      <main className="hero">
        <p className="eyebrow"><span>AI CODE OPTIMIZER</span></p>
        <h1 className="title">
          <span id="h1a">Optimize. Verify.</span>
          <span id="h1b">Accelerate.</span>
        </h1>
        <p className="sub">
          <span id="sub1">Slow code in, measured speed out.</span>
          <span id="sub2">No claims. Just numbers.</span>
        </p>
        <Link className="cta" to="/auth">
          <span id="cta">Try OPTRAQ</span>
          <svg className="arrow" viewBox="0 0 16 11" aria-hidden="true">
            <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
          </svg>
        </Link>
        <span className="micro">Free while in beta.</span>
        <aside className="stage" aria-label="Live proof">
          <div className="stage-head"><span className="live-dot" aria-hidden="true" /><span>LIVE PROOF</span></div>
          <pre className="stage-code"><code>{'def first_n(n):\n    out = []\n'}<span className="del">{'    for i in range(n + 1):\n'}</span>{'        out.append(i)\n    return out'}</code></pre>
          <pre className="stage-code"><code>{'def first_n(n):\n    out = []\n'}<span className="add">{'    for i in range(n):\n'}</span>{'        out.append(i)\n    return out'}</code></pre>
          <p className="stage-verdict"><b>Outputs match.</b> Proof recorded.</p>
        </aside>
        <ul className="feats">
          <li>
            <svg className="chev" viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span id="f1">Analyze in seconds</span>
          </li>
          <li>
            <svg className="chev" viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span id="f2">Check every fix</span>
          </li>
          <li>
            <svg className="chev" viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span id="f3">Sandboxed runs</span>
          </li>
          <li>
            <svg className="chev" viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span id="f4">Ship with evidence</span>
          </li>
        </ul>
        <span className="rule" aria-hidden="true" />
      </main>
      <footer className="foot">
        <span id="foot1">Trusted by teams who measure everything.</span>
        <span id="foot2" ref={footRef}>{new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
