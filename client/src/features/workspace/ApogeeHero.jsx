import React from 'react';
import { Link } from 'react-router-dom';

const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65,
  88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47,
  92, 72,
];

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4';

function Animate({ children, delay = 0, className = '', direction = 'up' }) {
  const directionMap = {
    up: 'animate-fade-up',
    down: 'animate-fade-down',
    left: 'animate-fade-left',
    right: 'animate-fade-right',
    scale: 'animate-fade-scale',
  };
  const directionClass = directionMap[direction] || 'animate-fade-up';

  return (
    <div
      className={`opacity-0 ${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function OptimizationTelemetryCard() {
  const maxHeight = Math.max(...BAR_HEIGHTS);

  return (
    <Animate delay={900} direction="scale" className="w-full max-w-[415px] mx-auto lg:mx-0">
      <div className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.40)] backdrop-blur-[20px] border border-white/10 p-5 sm:p-8 pb-5 sm:pb-6 shadow-2xl relative overflow-hidden">
        {/* Subtle top edge glow highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-3 sm:mb-4">
          Optimization Throughput
        </p>

        <div className="flex items-baseline mb-2 sm:mb-3">
          <span className="text-white text-[28px] sm:text-[46px] font-[450] leading-[1] tracking-tight">
            -74.2%
          </span>
          <span className="text-white/20 text-[28px] sm:text-[46px] font-[450] leading-[1]">
            .00
          </span>
          <span className="ml-2.5 text-xs sm:text-sm font-[450] text-emerald-400">
            Latency
          </span>
        </div>

        <div className="flex items-center gap-[10px] mb-6 sm:mb-8">
          <span className="px-[8px] py-[6px] bg-emerald-500/15 border border-emerald-500/25 rounded-[6px] text-emerald-300 text-[12px] sm:text-[14px] font-[450] leading-[14px]">
            +3.8x Throughput
          </span>
          <span className="text-white/80 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
            vs. baseline unoptimized AST
          </span>
        </div>

        {/* Chart block */}
        <div className="relative">
          {/* Vertical gridlines */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-white/[0.08]"
                style={{ left: `${((i + 1) / 5) * 100}%` }}
              />
            ))}
          </div>

          {/* Staggered benchmark bars */}
          <div className="flex items-end gap-[1.5px] h-[80px] sm:h-[100px] relative z-10">
            {BAR_HEIGHTS.map((h, i) => {
              const isProjected = i >= 28;
              const heightPercent = (h / maxHeight) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-[0.5px] animate-bar-grow origin-bottom"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isProjected ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
                    animationDelay: `${1100 + i * 30}ms`,
                  }}
                  title={`Cycle ${i + 1}: ${h}ms`}
                />
              );
            })}
          </div>

          {/* Time axis */}
          <div className="flex justify-between mt-3">
            {['0ms', '30ms', '60ms', '90ms', '120ms'].map((label, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[10px] font-[450] leading-[10px] text-white/80"
                style={{ opacity: i >= 3 ? 0.4 : 0.85 }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default function ApogeeHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#080A19] flex flex-col justify-between">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-80"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Oceanic gradient vignette & scrim to transition smoothly into deep ocean */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080A19]/40 via-transparent via-60% to-[#020b1c] pointer-events-none z-0" />
      {/* Seamless Blue Ocean Descent Transition Zone */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[#03152d]/70 to-[#020b1c] pointer-events-none z-[5]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-[6] shadow-[0_0_12px_#00e5ff]" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between pt-6">

        {/* Hero content row */}
        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            {/* Copy block (left column) */}
            <div className="max-w-[593px]">
              {/* Eyebrow badge */}
              <Animate delay={200} direction="up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-[450] text-white/80 mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI CODE OPTIMIZER & COMPILER BENCHMARK</span>
                </div>
              </Animate>

              {/* Headline */}
              <Animate delay={300} direction="up">
                <h1 className="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] tracking-[-0.035em] mb-5 sm:mb-8">
                  Elevate your essential code to peak performance
                </h1>
              </Animate>

              {/* Subhead */}
              <Animate delay={500} direction="up">
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[420px] mb-7 sm:mb-10">
                  Deterministic AST reasoning, sandboxed execution proof, and compiler-grade optimization for mission-critical software.
                </p>
              </Animate>

              {/* Actions row */}
              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    to="/auth"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-all hover:bg-white active:scale-[0.98] btn-shine flex items-center justify-center"
                  >
                    Try OPTRAQ
                  </Link>
                  <Link
                    to="/optimize"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white/80 text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-all hover:bg-white/10 active:scale-[0.98] flex items-center justify-center"
                  >
                    Explore Workbench
                  </Link>
                </div>
              </Animate>
            </div>

            {/* Right column: Optimization Telemetry Card */}
            <OptimizationTelemetryCard />
          </div>
        </div>

        {/* Bottom subtle trust stats line */}
        <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pb-6 sm:pb-8 flex flex-wrap items-center justify-between text-xs text-white/40 gap-4">
          <div className="flex items-center gap-6">
            <span>Docker Sandbox Isolation Guard</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Zero Network Leaks</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Multi-Stage Review Pipeline</span>
          </div>
          <div>
            <span>Free while in beta • No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
