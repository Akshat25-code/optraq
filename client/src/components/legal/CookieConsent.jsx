import React, { useCallback, useEffect, useState } from 'react';
import { getConsent, setConsent } from '@/lib/analytics';

/**
 * Cookie consent banner. Choice persists in localStorage; analytics only
 * loads after "accepted" (see lib/analytics.js). Re-openable via the
 * 'aco-open-cookie-settings' window event (footer link dispatches it).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === 'pending') setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener('aco-open-cookie-settings', reopen);
    return () => window.removeEventListener('aco-open-cookie-settings', reopen);
  }, []);

  const choose = useCallback((value) => {
    setConsent(value);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] rounded-[20px] p-5 shadow-2xl backdrop-blur-[30px]"
      style={{ background: 'rgba(17,16,15,.85)', border: '1px solid rgba(255,255,255,.1)' }}
    >
      <p className="text-sm font-semibold mb-1 text-white">
        We value your privacy
      </p>
      <p className="text-sm text-white/60 leading-relaxed">
        We use strictly-necessary cookies for sign-in and theme, and optional
        analytics cookies to improve the product. See our{' '}
        <a href="/privacy" className="underline underline-offset-2 text-[#9FE0FF]">
          Privacy Policy
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose('declined')}
          className="flex-1 min-h-[44px] px-4 py-2 rounded-[12px] border border-white/20 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="flex-1 min-h-[44px] px-4 py-2 rounded-[12px] bg-[#E9E9E9] text-sm font-bold text-[#0A0707] transition-colors hover:bg-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
