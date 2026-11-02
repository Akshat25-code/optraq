import React, { useRef } from 'react';
import { useReveal } from './reveal';

const ITEMS = [
  { q: 'What does OPTRAQ do?', a: 'It analyzes your code for complexity and risk, proposes rewrites, runs both versions in a sandbox, and records proof that behavior is preserved. Four stages: analyze, optimize, execute, verify.' },
  { q: 'Is it free?', a: 'Yes. Free while in beta. There is no billing yet, so there is nothing to pay and no plan to pick.' },
  { q: 'Which languages are supported?', a: 'Python, JavaScript, TypeScript and C++ are first-class, with more on the way. The language wall above shows current support.' },
  { q: 'Is my code safe?', a: 'Execution happens in a sandboxed runner whose escape tests pass 12/12. Analysis never modifies your files without your action.' },
  { q: 'What happens to my code and data?', a: 'Private repositories stay private. Exactly what is stored and for how long is spelled out in our Privacy Policy.', link: { to: '/privacy', label: 'Privacy Policy' } },
  { q: 'Which AI providers can I use?', a: 'OpenAI, Anthropic, Gemini, DeepSeek and Grok. Add keys in Settings, then pick a provider per task or let the app choose.' },
  { q: 'How do I add an API key?', a: 'Open Settings, then API keys, pick your provider, paste the key and press Test. The key is verified live before anything is saved.' },
  { q: 'How are my API keys kept safe?', a: 'They are encrypted with AES-256 before storage, never logged or exposed, and only a masked hint is ever shown back. Delete any key any time from the same panel.' },
];

export default function Faq() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="faq" aria-label="Questions" className="py-24 sm:py-32 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <p className="eyebrow rv">Questions</p>
          <h2 className="h2 rv">Asked, answered.</h2>
          <p className="lede rv">Direct, engineering-first answers to common questions about OPTRAQ's AST compiler engine.</p>
        </div>

        {/* 2-Column Layout: Questions Accordion + Architecture Deep-Dive Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Open Accordion List */}
          <div className="lg:col-span-7 divide-y divide-cyan-500/15 border-y border-cyan-500/20">
            {ITEMS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="list-none cursor-pointer flex items-center justify-between gap-6 text-base sm:text-lg font-[450] text-white hover:text-cyan-300 transition-colors">
                  <span>{item.q}</span>
                  <span className="text-xl text-cyan-400/60 group-open:rotate-45 transition-transform flex-none font-mono">
                    +
                  </span>
                </summary>
                <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-2xl">
                  {item.a}{' '}
                  {item.link && (
                    <a href={item.link.to} className="text-cyan-400 underline underline-offset-4 hover:text-white">
                      {item.link.label}
                    </a>
                  )}
                </p>
              </details>
            ))}
          </div>

          {/* Right Column: Engine Architecture Blueprint Image */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#03152d]/60 shadow-[0_12px_40px_rgba(0,229,255,0.1)] group relative">
              <div className="px-4 py-2.5 border-b border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-cyan-400/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  OPTRAQ ARCHITECTURE SPEC
                </span>
                <span className="text-white/40">v2.4 AST ENGINE</span>
              </div>
              {/* Interactive Engine Architecture Blueprint Schematic */}
              <div className="p-4 bg-black/60 font-mono text-[11px] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-cyan-400">
                  <span className="text-[10px] tracking-wider uppercase text-white/50">PIPELINE TOPOLOGY</span>
                  <span className="text-emerald-400 font-semibold text-[10px]">ALL SYSTEMS GREEN</span>
                </div>

                {/* 4 Pipeline Nodes */}
                <div className="space-y-2">
                  <div className="p-2 rounded bg-[#020b1c]/80 border border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
                      <span className="text-white text-[11px]">Lossless CST & AST Ingestion</span>
                    </div>
                    <span className="text-emerald-400 text-[10px]">&lt; 1.2ms</span>
                  </div>

                  <div className="p-2 rounded bg-[#020b1c]/80 border border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                      <span className="text-white text-[11px]">Heuristic Vectorization Passes</span>
                    </div>
                    <span className="text-cyan-300 text-[10px]">+3.8x Speed</span>
                  </div>

                  <div className="p-2 rounded bg-[#020b1c]/80 border border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px]">3</span>
                      <span className="text-white text-[11px]">Hardened Micro-VM Sandbox</span>
                    </div>
                    <span className="text-emerald-400 text-[10px]">0 Escapes</span>
                  </div>

                  <div className="p-2 rounded bg-[#020b1c]/80 border border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px]">4</span>
                      <span className="text-white text-[11px]">Z3 SMT Formal Proof Engine</span>
                    </div>
                    <span className="text-emerald-400 text-[10px]">SATISFIED</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between text-[10px] text-cyan-300/80">
                  <span>Audit Trail: SHA-256 Merkle</span>
                  <span>Soundness: 100%</span>
                </div>
              </div>
              <div className="p-4 bg-black/40 text-xs text-white/60 leading-relaxed border-t border-white/10">
                Deterministic AST passes decompose functions into single-static-assignment (SSA) trees, verify behavioral invariants, and output mathematical proofs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
