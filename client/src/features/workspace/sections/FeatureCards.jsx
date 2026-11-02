import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';
import { ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    to: '/optimize',
    name: 'Optimization',
    means: 'Slow code rewritten for speed and size.',
    does: 'Paste code, pick a focus, run the task, keep the proven diff.',
    badge: 'AST Transforms',
    renderVisual: () => (
      <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[10px] space-y-2">
        <div className="flex justify-between text-cyan-400 pb-1.5 border-b border-white/10">
          <span>ALGORITHM_LOWERING</span>
          <span className="text-emerald-400">+3.8x FASTER</span>
        </div>
        <div className="text-rose-400 line-through opacity-75">for i in range(len(arr)): lookup(arr[i])</div>
        <div className="text-emerald-300">vectorized_simd_lookup(arr_ptr, len)</div>
        <div className="flex justify-between text-white/50 pt-1 text-[9px]">
          <span>Latency: 142ms → 37ms</span>
          <span className="text-emerald-400">Memory: -68%</span>
        </div>
      </div>
    ),
  },
  {
    to: '/analysis',
    name: 'Analysis',
    means: 'A full health scan of your code.',
    does: 'See complexity, quality and risk scored across seven metrics.',
    badge: 'Code Complexity Scan',
    renderVisual: () => (
      <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[10px] space-y-2">
        <div className="flex justify-between text-cyan-400 pb-1.5 border-b border-white/10">
          <span>SEMANTIC_HEALTH_RADAR</span>
          <span className="text-cyan-300">SCORE: 94/100</span>
        </div>
        <div className="space-y-1 text-[9px] text-white/70">
          <div className="flex justify-between"><span>Cyclomatic Depth</span><span className="text-emerald-400">4.2 (Low Risk)</span></div>
          <div className="flex justify-between"><span>Halstead Difficulty</span><span className="text-cyan-300">12.1 (Optimal)</span></div>
          <div className="flex justify-between"><span>Dead Code Branches</span><span className="text-emerald-400">0 Detected</span></div>
        </div>
      </div>
    ),
  },
  {
    to: '/bug-detection',
    name: 'Bug Detection',
    means: 'Static scans plus AI review, ranked.',
    does: 'Catch compile-time, runtime and logic errors before production.',
    badge: 'Zero-Day Flaws',
    renderVisual: () => (
      <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[10px] space-y-2">
        <div className="flex justify-between text-cyan-400 pb-1.5 border-b border-white/10">
          <span>VULNERABILITY_SENTINEL</span>
          <span className="text-emerald-400">0 ESCAPES</span>
        </div>
        <div className="text-rose-400 text-[9px]">[WARN] Potential race condition at line 84</div>
        <div className="text-emerald-300 text-[9px]">[RESOLVED] Lock mutex applied with RAII guard</div>
        <div className="text-white/40 text-[9px] pt-1">Audited against OWASP & CVE database</div>
      </div>
    ),
  },
  {
    to: '/refactoring',
    name: 'Refactoring',
    means: 'Cleaner structure, same behavior.',
    does: 'Restructure with patterns applied and verified line by line.',
    badge: 'Architecture Lift',
    renderVisual: () => (
      <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[10px] space-y-2">
        <div className="flex justify-between text-cyan-400 pb-1.5 border-b border-white/10">
          <span>CLEAN_ARCHITECTURE_LIFT</span>
          <span className="text-cyan-300">VERIFIED</span>
        </div>
        <div className="text-white/70 text-[9px]">Monolith function (380 lines)</div>
        <div className="text-emerald-300 text-[9px]">→ Decomposed into 4 Pure Invariant Callers</div>
        <div className="text-white/40 text-[9px] pt-1">Behavioral equivalence mathematically proven</div>
      </div>
    ),
  },
  {
    to: '/debugging',
    name: 'Debugging',
    means: 'Root causes, not guesses.',
    does: 'Get fixes with explanations and copy the verified result.',
    badge: 'Sandbox Debugger',
    renderVisual: () => (
      <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[10px] space-y-2">
        <div className="flex justify-between text-cyan-400 pb-1.5 border-b border-white/10">
          <span>ISOLATED_TRACE_RUNNER</span>
          <span className="text-emerald-400">STEP 18/18</span>
        </div>
        <div className="flex justify-between text-white/70 text-[9px]"><span>Heap Allocated</span><span className="text-cyan-300">14.2 MB</span></div>
        <div className="flex justify-between text-white/70 text-[9px]"><span>Network Packets</span><span className="text-emerald-400">0 (Blocked)</span></div>
        <div className="text-cyan-400 text-[9px] pt-1">Exact breakpoint root-cause identified</div>
      </div>
    ),
  },
  {
    to: '/workspace',
    name: 'Workspace',
    means: 'Your bench for everything above.',
    does: 'Files, editor, runs, proof and exports in one cockpit.',
    badge: 'Full Studio Cockpit',
    image: '/images/optraq_workbench_demo_1791551735238.jpg',
  },
];

export default function FeatureCards() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="instruments" aria-label="Features" className="py-24 sm:py-32 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <p className="eyebrow rv">What you can do here</p>
          <h2 className="h2 rv">Six instruments. One bench.</h2>
          <p className="lede rv">Each instrument tackles a distinct phase of code enhancement with mathematical precision.</p>
        </div>

        {/* Six Instruments Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.to + f.name}
              className="group rounded-2xl border border-cyan-500/20 bg-[#03152d]/45 p-5 transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#031b3a]/65 hover:shadow-[0_12px_40px_rgba(0,229,255,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-[450] text-white tracking-tight flex items-center gap-2">
                    {f.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-950/40">
                    {f.badge}
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-1">{f.means}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{f.does}</p>
              </div>

              {/* Instrument Preview: Either high-res screenshot or interactive HUD visual */}
              <div className="my-2">
                {f.image ? (
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_4px_20px_rgba(0,229,255,0.1)]">
                    <img
                      src={f.image}
                      alt={`${f.name} workbench tool`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b1c]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  f.renderVisual && f.renderVisual()
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <Link
                  to={f.to}
                  className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch {f.name.toLowerCase()}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <span className="text-[10px] font-mono text-white/40">LIVE INSTRUMENT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
