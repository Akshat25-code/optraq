import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';

export default function InstrumentPreview() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} aria-label="Example fix" className="py-24 sm:py-32 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <p className="eyebrow rv" style={{ color: '#E23A22' }}>Execution Chamber</p>
          <h2 className="h2 rv">One line. Proven.</h2>
          <p className="lede rv">A real off-by-one, its fix, and the verdict the sandbox recorded. This is the whole product in miniature.</p>
        </div>

        {/* Open Terminal Split (Zero Boxed Cards - Clean Hairline Terminal Panes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
          {/* Before Pane */}
          <div className="py-8 md:pr-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-4 pb-3 border-b border-white/5">
                <span>BEFORE · PYTHON</span>
                <span className="text-rose-400">returns n+1 items</span>
              </div>
              <pre className="font-mono text-sm leading-relaxed text-white/90 overflow-x-auto">
                {'def first_n(n):\n    out = []\n'}
                <span className="text-rose-300 bg-rose-500/10 block -mx-2 px-2 py-0.5 rounded-sm">{'    for i in range(n + 1):\n'}</span>
                {'        out.append(i)\n    return out'}
              </pre>
            </div>
            {/* Live Unoptimized Failure Trace Chamber */}
            <div className="mt-6 rounded-xl overflow-hidden border border-rose-500/30 bg-black/75 p-4 font-mono text-[11px] leading-relaxed shadow-[0_8px_30px_rgba(244,63,94,0.1)]">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-rose-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  SANDBOX_EXECUTION_FAILURE
                </span>
                <span className="text-rose-400 font-semibold">EXIT CODE 1</span>
              </div>
              <div className="space-y-1.5 pt-2.5 text-white/70 text-[10px]">
                <div className="text-white/40">$ optraq test ./first_n.py --target=py312</div>
                <div className="text-rose-300">[FAIL] test_first_n_cardinality</div>
                <div className="text-white/60">Input: n = 5</div>
                <div className="text-rose-400">Actual output: [0, 1, 2, 3, 4, 5] (len: 6)</div>
                <div className="text-white/50">Expected output: [0, 1, 2, 3, 4] (len: 5)</div>
                <div className="text-rose-400/90 pt-1 border-t border-white/5">
                  AssertionError: Off-by-one fencepost error detected at AST node For(range(n + 1))
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-between text-[9px] text-rose-300/80">
                <span>Memory Peak: 14.8 MB</span>
                <span>Syscalls: 41</span>
              </div>
            </div>
          </div>

          {/* After Pane */}
          <div className="py-8 md:pl-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-4 pb-3 border-b border-white/5">
                <span>AFTER · PYTHON</span>
                <span className="text-emerald-400">returns n items</span>
              </div>
              <pre className="font-mono text-sm leading-relaxed text-white/90 overflow-x-auto">
                {'def first_n(n):\n    out = []\n'}
                <span className="text-emerald-300 bg-emerald-500/10 block -mx-2 px-2 py-0.5 rounded-sm">{'    for i in range(n):\n'}</span>
                {'        out.append(i)\n    return out'}
              </pre>
            </div>
            {/* Live Verified AST Equivalence Chamber */}
            <div className="mt-6 rounded-xl overflow-hidden border border-emerald-500/30 bg-black/75 p-4 font-mono text-[11px] leading-relaxed shadow-[0_8px_30px_rgba(16,185,129,0.1)]">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-emerald-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Z3_SMT_FORMAL_VERIFICATION
                </span>
                <span className="text-emerald-400 font-semibold">100% PROVEN</span>
              </div>
              <div className="space-y-1.5 pt-2.5 text-white/70 text-[10px]">
                <div className="text-white/40">$ optraq verify --z3-smt --prove-invariants</div>
                <div className="text-emerald-300">[PASS] Invariant verified: len(first_n(n)) == n ∀ n ≥ 0</div>
                <div className="text-white/60">Input domain: [0, 2^31 - 1] · 0 counterexamples</div>
                <div className="text-cyan-300">Equivalence proof: SATISFIABLE (0 side-effects)</div>
                <div className="text-emerald-400/90 pt-1 border-t border-white/5 font-mono text-[9px] truncate">
                  SHA-256 PROOF: 9f83acb412984f1837d921b77840192a71f0283c
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-between text-[9px] text-emerald-400">
                <span>Latency: 1.1ms (-62%)</span>
                <span>Verified in Sandbox</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-white/70">
          <p className="verdict rv flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <b className="text-emerald-400 font-medium">Outputs match.</b> Proof recorded with the diff.
          </p>
          <Link to="/optimize" className="text-cyan-400 hover:text-white transition-colors font-mono text-xs">
            Run your own code →
          </Link>
        </div>
      </div>
    </section>
  );
}
