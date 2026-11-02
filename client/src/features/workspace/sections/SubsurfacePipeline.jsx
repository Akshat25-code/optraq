import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';
import { ArrowUpRight } from 'lucide-react';

const STAGES = [
  {
    n: '01',
    to: '/analysis',
    title: 'Analyze',
    subtitle: 'Deterministic AST Topology & Semantic Parsing',
    desc: 'Transforms your codebase into a fully qualified Concrete Syntax Tree (CST) and typed Abstract Syntax Tree (AST). Rather than relying on fuzzy regex patterns or hallucinated assumptions, OPTRAQ models every token, scope boundary, lexical decorator, and dependency call-path across multiple repositories in milliseconds.',
    bullets: [
      'Constructs formal Control Flow Graphs (CFGs) and Single Static Assignment (SSA) representations',
      'Flags cyclomatic complexity hotspots, dead code branches, unpinned heap allocs, and memory leaks',
      'Calculates exact Halstead volume, maintainability indices, and baseline wall-clock latency',
    ],
    specs: [
      { label: 'Time Complexity', val: 'O(N) deterministic' },
      { label: 'Tree Fidelity', val: '100% lossless CST' },
      { label: 'Scope Indexing', val: 'Multi-file dependency' },
    ],
    cmd: '$ optraq analyze ./src --depth=full --ast-cache --json',
    stat: '-42.8% Complexity',
    image: '/images/ocean_ast_diagram.jpg',
    tag: 'AST Ingestion & Syntax Topology',
    badge: 'AST Static Analysis',
  },
  {
    n: '02',
    to: '/optimize',
    title: 'Optimize',
    subtitle: 'Heuristic AST Rewrite & Vectorization Passes',
    desc: 'Applies rigorous, compiler-grade transformation passes directly onto the Abstract Syntax Tree. Rather than making speculative text edits, OPTRAQ executes proven compiler algorithms: hoisting loop-invariant computations, vectorizing sequential iterations using SIMD intrinsics, and eliminating dead code paths for maximum silicon throughput.',
    bullets: [
      'Preserves language semantics, runtime typing, and exception contracts with zero deviation',
      'Executes SIMD auto-vectorization (AVX-512 / ARM NEON) and algorithmic loop unrolling',
      'Reduces GC pressure and heap fragmentation with cache-line-aligned contiguous structures',
    ],
    specs: [
      { label: 'Compiler Passes', val: 'LICM, DCE, SIMD, Inline' },
      { label: 'Semantics', val: 'Strict type preservation' },
      { label: 'Target Silicon', val: 'x86_64 / ARM64 native' },
    ],
    cmd: '$ optraq optimize --passes=licm,inline,simd --target=x86_64',
    stat: '+3.8x Speedup',
    image: '/images/landing_pipeline_design_1792156787143.jpg',
    tag: 'Heuristic Transformation Stream',
    badge: 'Compiler Optimization Passes',
  },
  {
    n: '03',
    to: '/optimize',
    title: 'Execute',
    subtitle: 'Sandboxed Micro-VM Isolation & Comparative Runs',
    desc: 'Runs the candidate rewrite side-by-side with the baseline code inside an ephemeral, hardened Micro-VM chamber. With 12/12 verified sandbox escape mitigations, strict Linux Seccomp-BPF system call filtering, and zero-egress network namespaces, the runner records true microsecond latency and memory deltas without background interference.',
    bullets: [
      '12/12 security escape tests verified: ptrace injection, fork bombs, and chroot breakouts blocked',
      'Air-gapped execution: virtual network namespace denies all egress packets and DNS lookups',
      'Microsecond-resolution monotonic hardware timers record authentic cycle benchmarks',
    ],
    specs: [
      { label: 'Sandbox Guard', val: 'Seccomp-BPF + Cgroups v2' },
      { label: 'Network Egress', val: 'Airgapped (0 packets)' },
      { label: 'Memory Ceiling', val: '512MB RAM hard cap' },
    ],
    cmd: '$ optraq run --sandbox=microvm --seccomp=strict --mem=512mb',
    stat: '12/12 Escapes Blocked',
    image: '/images/ocean_sandbox_vm.jpg',
    tag: 'Docker Micro-VM Isolation Guard',
    badge: 'Sandboxed Execution Chamber',
  },
  {
    n: '04',
    to: '/optimize',
    title: 'Verify',
    subtitle: 'Z3 SMT Mathematical Equivalence & Audit Receipts',
    desc: 'Formally proves that the optimized AST produces mathematically identical outputs for all valid input vectors. Microsoft’s Z3 SMT constraint solver evaluates input domains and invariants, ensuring zero behavioral regressions before appending an immutable cryptographic SHA-256 proof receipt directly to your Git diff.',
    bullets: [
      'Mathematical equivalence theorem guarantees 100% preservation of functional behavior',
      'Cryptographically signed SHA-256 audit receipt automatically attached to PR manifests',
      'Automated CI/CD compliance gate: zero manual QA guesswork before production deployment',
    ],
    specs: [
      { label: 'Solver Engine', val: 'Z3 SMT v4.12.2' },
      { label: 'Behavioral Regressions', val: 'Zero side-effects' },
      { label: 'Audit Artifact', val: 'SHA-256 Merkle Proof' },
    ],
    cmd: '$ optraq verify --z3-smt --prove-invariants --emit-proof=sha256',
    stat: 'Zero Side-Effects',
    image: '/images/ocean_proof_engine.jpg',
    tag: 'Equivalence & Formal Verification Proof',
    badge: 'Formal Mathematical Proof',
  },
];

export default function SubsurfacePipeline() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="pipeline"
      aria-label="How it works"
      className="relative py-24 sm:py-32 border-b border-white/10"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <p className="eyebrow rv">How it works</p>
          <h2 className="h2 rv">Four stages. One proof.</h2>
          <p className="lede rv">
            A deterministic pipeline that transforms unoptimized code into mathematically proven, production-ready software.
          </p>
        </div>

        {/* Open Editorial Pipeline with Rich Technical Details & Double-Bezel Monitors */}
        <div className="divide-y divide-cyan-500/15">
          {STAGES.map((s) => (
            <div
              key={s.n}
              className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start group"
            >
              {/* Stage Numeral */}
              <div className="lg:col-span-1 flex items-baseline gap-3">
                <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-light text-cyan-400/30 group-hover:text-cyan-400 transition-colors">
                  {s.n}
                </span>
              </div>

              {/* Stage Details with Detailed Technical Copy */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">{s.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-[450] text-white tracking-tight flex items-center gap-3">
                    {s.title}
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-950/40">
                      {s.stat}
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-cyan-200/80 mt-1">{s.subtitle}</p>
                </div>

                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {s.desc}
                </p>

                {/* Technical Invariants & Architectural Specifications Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 font-mono text-[10px]">
                  {s.specs.map((sp, idx) => (
                    <div key={idx} className="bg-black/40 rounded-lg p-2 border border-cyan-500/15">
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">{sp.label}</span>
                      <span className="text-cyan-300 font-medium">{sp.val}</span>
                    </div>
                  ))}
                </div>

                {/* Key Architectural Technical Invariants */}
                <ul className="space-y-2 pt-1">
                  {s.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-none" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <span className="font-mono text-xs text-cyan-400/75 tracking-wider bg-black/50 px-3 py-1.5 rounded-lg border border-cyan-500/20 block overflow-x-auto">
                    {s.cmd}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to={s.to}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-white group/link transition-colors"
                  >
                    <span>Launch {s.title.toLowerCase()} workbench</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400/60 group-hover/link:text-cyan-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Stage Visual Viewport (Double-Bezel Oceanic Monitor) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/25 bg-[#03152d]/60 shadow-[0_12px_40px_rgba(0,180,216,0.15)] group-hover:border-cyan-400/50 group-hover:shadow-[0_16px_50px_rgba(0,229,255,0.25)] transition-all duration-300">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/50 text-[10px] font-mono text-white/50">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      STAGE {s.n} // {s.tag}
                    </span>
                    <span className="text-cyan-400/80 font-semibold">VERIFIED ENGINE</span>
                  </div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <img
                      src={s.image}
                      alt={`${s.title} technical visualization`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b1c]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
