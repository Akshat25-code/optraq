import React from 'react';
import UnderwaterBubbles from '@/features/workspace/sections/UnderwaterBubbles';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#020b1c] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Organic Deep-Ocean Bubble Core */}
      <UnderwaterBubbles />

      {/* Ambient Oceanic Bioluminescent Aura */}
      <div
        className="pointer-events-none absolute -top-40 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)' }}
      />
      <div className="relative w-full max-w-md z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

