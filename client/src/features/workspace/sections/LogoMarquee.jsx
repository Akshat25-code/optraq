import React from 'react';

/* Stack wall: monograms of supported languages (truthful — no fake
   customer logos). Real brands replace these per NEEDS.md. Logo-only. */
const MARKS = ['Py', 'JS', 'TS', 'Go', 'Rs', 'C++'];

export default function LogoMarquee() {
  const row = (hidden) => (
    <div className="mq-track" aria-hidden={hidden || undefined}>
      {MARKS.map((m) => (
        <span key={m} className="mq-mark" title={m}>{m}</span>
      ))}
    </div>
  );
  return (
    <section aria-label="Supported languages">
      <div className="sec" style={{ paddingTop: 56, paddingBottom: 8 }}>
        <div className="mq">
          <div style={{ display: 'flex' }}>
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
