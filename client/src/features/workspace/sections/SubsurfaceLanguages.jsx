import React from 'react';
import { ShieldCheck } from 'lucide-react';

const RUNTIMES = [
  {
    symbol: 'Py',
    name: 'Python',
    engine: 'CPython 3.12 / AST',
    metrics: 'Lossless Ingestion',
    speed: '< 1.4ms parse',
    badge: 'Production Proven',
    features: 'AST transforms · Pyodide sandbox',
  },
  {
    symbol: 'TS',
    name: 'TypeScript',
    engine: 'Strict Typegraph / TSC',
    metrics: 'Type-Preserving',
    speed: '< 2.1ms parse',
    badge: 'Full AST Fidelity',
    features: 'Type-directed lowering · V8 passes',
  },
  {
    symbol: 'Rs',
    name: 'Rust',
    engine: 'MIR & LLVM Passes',
    metrics: 'Zero-Cost Vectorization',
    speed: '< 0.9ms parse',
    badge: 'Memory Safe',
    features: 'Borrowck verify · MIR optimization',
  },
  {
    symbol: 'Go',
    name: 'Go',
    engine: 'SSA & Escape Analysis',
    metrics: 'Goroutine Safe',
    speed: '< 1.1ms parse',
    badge: 'Escape Verified',
    features: 'Heap allocation check · SSA trees',
  },
  {
    symbol: 'C++',
    name: 'C / C++',
    engine: 'Clang AST & Clang-Tidy',
    metrics: 'Deterministic AST',
    speed: '< 0.7ms parse',
    badge: 'Compiler-Grade',
    features: 'SIMD vectorization · Clang AST passes',
  },
  {
    symbol: 'JS',
    name: 'JavaScript',
    engine: 'V8 TurboFan & Babel',
    metrics: 'Monomorphic Passes',
    speed: '< 1.5ms parse',
    badge: 'V8 Optimized',
    features: 'Inline caching · Monomorphic call sites',
  },
];

export default function SubsurfaceLanguages() {
  const renderRow = (isAriaHidden = false) => (
    <div className="flex items-center gap-12 sm:gap-16 py-4" aria-hidden={isAriaHidden || undefined}>
      {RUNTIMES.map((rt) => (
        <div
          key={rt.symbol + (isAriaHidden ? '-dup' : '')}
          className="flex-none flex items-center gap-4 group"
        >
          <span className="w-10 h-10 rounded-full border border-cyan-400/20 bg-cyan-950/30 flex items-center justify-center font-mono font-medium text-cyan-300 text-sm group-hover:border-cyan-400 group-hover:text-white transition-colors">
            {rt.symbol}
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm tracking-tight">{rt.name}</span>
              <span className="text-[10px] font-mono text-cyan-400/60">{rt.speed}</span>
            </div>
            <span className="text-xs text-white/50 font-mono">{rt.engine}</span>
          </div>
          <span className="w-px h-6 bg-cyan-500/10 ml-6 hidden sm:block" />
        </div>
      ))}
    </div>
  );

  return (
    <section aria-label="Supported runtime engines" className="relative pt-10 pb-20 border-b border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-10 text-center relative z-10">
        <p className="eyebrow mx-auto justify-center">Language AST Ingestion</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight mb-3">
          Multi-Language AST Stream
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-normal">
          Deterministic parsing, behavioral preservation, and isolated verification across mission-critical runtimes.
        </p>
      </div>

      {/* Borderless Open Marquee Ribbon */}
      <div className="subsea-marquee-container relative w-full overflow-hidden select-none border-y border-white/10 bg-black/20 py-3">
        <div className="subsea-marquee flex">
          {renderRow(false)}
          {renderRow(true)}
        </div>
      </div>

      {/* High-Tech AST Pipeline Invariants Indicator */}
      <div className="max-w-[1200px] mx-auto px-6 mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl border border-cyan-500/15 bg-[#03152d]/40 backdrop-blur-sm">
            <span className="font-mono text-xl sm:text-2xl font-light text-cyan-300">100%</span>
            <p className="text-xs text-white/60 mt-1 font-mono">AST Tree Fidelity</p>
          </div>
          <div className="p-4 rounded-xl border border-cyan-500/15 bg-[#03152d]/40 backdrop-blur-sm">
            <span className="font-mono text-xl sm:text-2xl font-light text-emerald-400">&lt; 1.2ms</span>
            <p className="text-xs text-white/60 mt-1 font-mono">Mean Parsing Latency</p>
          </div>
          <div className="p-4 rounded-xl border border-cyan-500/15 bg-[#03152d]/40 backdrop-blur-sm">
            <span className="font-mono text-xl sm:text-2xl font-light text-cyan-300">Zero</span>
            <p className="text-xs text-white/60 mt-1 font-mono">Semantic Divergence</p>
          </div>
          <div className="p-4 rounded-xl border border-cyan-500/15 bg-[#03152d]/40 backdrop-blur-sm">
            <span className="font-mono text-xl sm:text-2xl font-light text-emerald-400">Byte-for-Byte</span>
            <p className="text-xs text-white/60 mt-1 font-mono">Equivalence Proof</p>
          </div>
        </div>
      </div>
    </section>
  );
}
