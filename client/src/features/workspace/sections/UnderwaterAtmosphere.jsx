import React, { useState, useEffect } from 'react';
import { Compass, ArrowDown } from 'lucide-react';

export default function UnderwaterAtmosphere() {
  const [currentDepth, setCurrentDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      const depthMeters = Math.round(progress * 11000);
      setCurrentDepth(depthMeters);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Seamless Hero-to-Ocean Water Continuation */}
      <div id="surface" className="relative w-full overflow-hidden pointer-events-none select-none">
        {/* Central Atmospheric Crimson Beam Continuation (Matching the Hero's Light Column) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-[#E23A22]/50 via-[#E23A22]/20 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-64 h-96 bg-gradient-to-b from-[#E23A22]/10 via-[#E23A22]/5 to-transparent blur-3xl" />

        {/* Deep Water Horizon Transition Glow */}
        <div className="w-full h-32 bg-gradient-to-b from-transparent via-[#060817]/60 to-[#080A19]" />
      </div>

      {/* Ambient Micro-Embers & Marine Particulate (Matching Hero's Storm Atmosphere) */}
      <div className="underwater-particles-wrap" aria-hidden="true">
        <span className="ocean-ember oe1" />
        <span className="ocean-ember oe2" />
        <span className="ocean-ember oe3" />
        <span className="ocean-ember oe4" />
        <span className="ocean-ember oe5" />
        <span className="ocean-ember oe6" />
        <span className="ocean-ember oe7" />
        <span className="ocean-ember oe8" />
      </div>

      {/* Minimal Depth Coordinate (Non-Intrusive, Matching Hero Palette) */}
      <aside
        aria-label="Current Depth Coordinate"
        className="fixed right-4 sm:right-6 bottom-6 z-40 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#080A19]/90 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E23A22] animate-pulse" />
        <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase">Depth</span>
        <span className="text-xs font-mono font-medium text-white">
          -{currentDepth.toLocaleString()}m
        </span>
      </aside>
    </>
  );
}
