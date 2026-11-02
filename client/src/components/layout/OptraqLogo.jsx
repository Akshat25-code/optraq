import React from 'react';

/**
 * OptraqLogo - 4-Quadrant Geometric Brand Mark for OPTRAQ
 * As specified in the design direction and visual references.
 */
export default function OptraqLogo({ size = 28, showWordmark = true, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      {/* 4-Quadrant Clover Geometry Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
        className="text-white transition-transform duration-300 group-hover:scale-105 flex-none"
        aria-hidden="true"
      >
        <path
          d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
          fill="currentColor"
        />
      </svg>

      {/* Brand Wordmark */}
      {showWordmark && (
        <span className="text-white text-[22px] sm:text-[24px] font-[450] leading-none tracking-[-0.02em]">
          OPTRAQ
        </span>
      )}
    </div>
  );
}
