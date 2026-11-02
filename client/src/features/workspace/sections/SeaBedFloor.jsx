import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from './reveal';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SeaBedFloor() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="seabed"
      aria-label="Final call to action and Sea Bed"
      className="relative pt-28 sm:pt-36 overflow-hidden"
    >
      {/* Central Cyan Energy Conduit (Oceanic Depth Light Column) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-96 bg-gradient-to-t from-cyan-400/40 via-cyan-400/20 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-96 bg-gradient-to-t from-cyan-500/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center pb-32">
        {/* Eyebrow */}
        <p className="eyebrow rv mx-auto justify-center">
          Bedrock Verification
        </p>

        {/* Climax Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight max-w-3xl mx-auto leading-[1.05] mb-6 rv">
          Ship it like you measured it.
        </h2>
        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10 rv">
          Reaching bedrock with deterministic proof. Connect a repo and watch the flight happen to your own code.
        </p>

        {/* Action Buttons (Strictly matching Hero Button System) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 rv">
          <Link
            to="/auth"
            className="h-[51px] px-8 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15.5px] font-[450] transition-all hover:bg-white active:scale-[0.98] flex items-center gap-2"
          >
            <span>Try OPTRAQ</span>
            <ArrowRight className="w-4 h-4 text-[#0A0707]" />
          </Link>
          <Link
            to="/optimize"
            className="h-[51px] px-8 rounded-[12px] border border-white/80 text-white text-[15.5px] font-[450] transition-all hover:bg-white/10 active:scale-[0.98] flex items-center justify-center"
          >
            <span>Explore Workbench</span>
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/40 font-mono rv">
          <span>Free while in beta</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-white/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            12/12 Sandbox Isolation
          </span>
          <span>•</span>
          <span>Zero Network Leaks</span>
        </div>
      </div>
    </section>
  );
}
