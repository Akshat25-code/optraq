import React, { useMemo } from 'react';

/**
 * UnderwaterBubbles - High-Performance Organic Deep-Ocean Bubble & Caustic Engine
 * 
 * Features:
 * - 48 procedurally generated organic bubbles with randomized depths and trajectories.
 * - 30 bioluminescent marine plankton & deep-sea glowing spores.
 * - Translucent glass-shimmer shaders with cyan/white specular highlights.
 * - Dual-axis wobbling buoyancy animation.
 * - Sweeping oceanic caustic light rays filtering down through deep water.
 * - Zero GPU/CPU thrashing: 100% CSS transforms, respects prefers-reduced-motion.
 */
export default function UnderwaterBubbles() {
  // Generate consistent deterministic bubble properties across 3 depth tiers
  const bubbles = useMemo(() => {
    const list = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      // Tier 1: Micro-bubbles (55%), Tier 2: Medium bubbles (30%), Tier 3: Macro glossy orbs (15%)
      const size = rand < 0.55 ? 5 + Math.random() * 8 : rand < 0.85 ? 15 + Math.random() * 14 : 32 + Math.random() * 22;
      const left = Math.random() * 98; // horizontal position in vw %
      const duration = 9 + Math.random() * 18; // 9s - 27s ascent duration
      const delay = -(Math.random() * 25); // negative delay so bubbles appear immediately across viewport
      const wobbleDuration = 2.2 + Math.random() * 3.8;
      const wobbleDistance = 14 + Math.random() * 26; // horizontal drift px
      const opacity = rand < 0.55 ? 0.4 + Math.random() * 0.4 : 0.6 + Math.random() * 0.35;

      list.push({
        id: i,
        size,
        left,
        duration,
        delay,
        wobbleDuration,
        wobbleDistance,
        opacity,
        isLarge: size > 25,
      });
    }
    return list;
  }, []);

  // Bioluminescent deep-sea glowing marine plankton
  const plankton = useMemo(() => {
    const list = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      list.push({
        id: i,
        size: 2 + Math.random() * 3.5,
        left: Math.random() * 96,
        duration: 14 + Math.random() * 16,
        delay: -(Math.random() * 20),
        color: rand < 0.55 ? 'cyan' : rand < 0.8 ? 'emerald' : 'sapphire',
        driftDist: 20 + Math.random() * 40,
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none" aria-hidden="true">
      {/* 1. Volumetric Shimmering Ocean Caustic Beams & Sunlight Refraction */}
      <div className="absolute inset-0 oceanic-caustics-layer opacity-45 mix-blend-screen" />
      <div className="absolute inset-0 oceanic-light-shafts opacity-30 mix-blend-overlay" />

      {/* 2. Bioluminescent Marine Plankton / Glowing Deep-Sea Spores */}
      <div className="absolute inset-0">
        {plankton.map((p) => (
          <div
            key={p.id}
            className={`oceanic-plankton-dot plankton-${p.color}`}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift-dist': `${p.driftDist}px`,
            }}
          />
        ))}
      </div>

      {/* 3. Rising Translucent Oceanic Bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="oceanic-bubble-wrapper"
            style={{
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <div
              className={`oceanic-bubble-sphere ${b.isLarge ? 'oceanic-bubble-large' : ''}`}
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                opacity: b.opacity,
                animationDuration: `${b.wobbleDuration}s`,
                '--wobble-dist': `${b.wobbleDistance}px`,
              }}
            >
              {/* Internal Specular Glass Highlight */}
              <span className="oceanic-bubble-highlight" />
              {b.isLarge && <span className="oceanic-bubble-subhighlight" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
