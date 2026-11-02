import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';

export default function ClimaxCta() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section ref={ref} aria-label="Final call to action">
      <div className="climax">
        <h2 className="h2 rv" style={{ maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto' }}>Ship it like you measured it.</h2>
        <p className="lede rv" style={{ margin: '0 auto', textAlign: 'center' }}>Connect a repo. Watch the flight happen to your own code.</p>
        <p className="rv" style={{ marginTop: 34 }}>
          <Link className="paper-cta" to="/auth">Try OPTRAQ</Link>
        </p>
        <p className="microline rv">Free while in beta.</p>
      </div>
    </section>
  );
}
