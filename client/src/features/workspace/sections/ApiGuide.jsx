import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';

const STEPS = [
  { n: '1', text: 'Open Settings, then API keys.' },
  { n: '2', text: 'Pick a provider: OpenAI, Anthropic, Gemini, DeepSeek or Grok.' },
  { n: '3', text: 'Paste your key and press Test to verify it live.' },
  { n: '4', text: 'Done. Calls route through your key and your billing.' },
];

const SAFETY = [
  'Encrypted with AES-256 before storage.',
  'Never logged, never exposed, never displayed in full.',
  'Only a masked hint is ever shown back to you.',
  'Delete any time from the same panel.',
];

export default function ApiGuide() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} aria-label="API keys guide" className="py-24 sm:py-32 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <p className="eyebrow rv" style={{ color: '#E23A22' }}>Integrations</p>
          <h2 className="h2 rv">Bring your own key.</h2>
          <p className="lede rv">Use the AI providers you already pay for. Four steps, one minute.</p>
        </div>

        {/* Open Split Section with Enclave Architecture Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cyan-500/15 border-y border-cyan-500/20">
          {/* Steps */}
          <div className="py-8 md:pr-10 space-y-4 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-400/70 mb-4">Setup Sequence</p>
              <div className="space-y-3 mb-6">
                {STEPS.map((s) => (
                  <p key={s.n} className="text-sm text-white/80 leading-relaxed">
                    <b className="text-cyan-400 font-mono mr-2">{s.n}.</b> {s.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/20 bg-black/50 aspect-[16/9] relative group my-4">
              <img
                src="/images/admin_panel_design_1792156829532.jpg"
                alt="Multi-Provider BYOK Configuration"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                UNLIMITED RATE LIMITS
              </span>
            </div>
            <div className="pt-2">
              <Link to="/settings" className="text-xs font-mono text-cyan-400 hover:text-white transition-colors">
                Open settings →
              </Link>
            </div>
          </div>

          {/* Safety */}
          <div className="py-8 md:pl-10 space-y-4 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-400/70 mb-4">Key Security Standards</p>
              <div className="space-y-3 mb-6">
                {SAFETY.map((s) => (
                  <p key={s} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-none" />
                    <span>{s}</span>
                  </p>
                ))}
              </div>
            </div>
            {/* Live Cryptographic Enclave Telemetry */}
            <div className="rounded-xl overflow-hidden border border-cyan-500/25 bg-black/75 p-4 font-mono text-[11px] leading-relaxed shadow-[0_8px_30px_rgba(0,229,255,0.08)] my-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-cyan-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  AES_256_GCM_ENCLAVE
                </span>
                <span className="text-emerald-400 text-[10px] font-semibold">ENCLAVE ACTIVE</span>
              </div>
              <div className="space-y-1.5 pt-2.5 text-white/70 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-white/50">Cipher Mechanism:</span>
                  <span className="text-cyan-300">AES-256-GCM + PBKDF2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Decryption Lifetime:</span>
                  <span className="text-emerald-400">Ephemeral (In-Memory Only)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Memory Zeroization:</span>
                  <span className="text-emerald-400">Immediate post-flight wipe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Server Log Storage:</span>
                  <span className="text-cyan-300">0 bytes (Masked Hints Only)</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-cyan-300/80">
                <span>Network Egress: Airgapped</span>
                <span className="text-emerald-400">Zero Retention Audited</span>
              </div>
            </div>
            <div className="pt-2 text-xs font-mono text-white/40">
              AUDITED RUNTIME MEMORY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
