import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApogeeHero from './ApogeeHero';
import Kinetic3DScene from './sections/Kinetic3DScene';
import UnderwaterBubbles from './sections/UnderwaterBubbles';
import SubsurfaceLanguages from './sections/SubsurfaceLanguages';
import SubsurfacePipeline from './sections/SubsurfacePipeline';
import ProofBento from './sections/ProofBento';
import FeatureCards from './sections/FeatureCards';
import InstrumentPreview from './sections/InstrumentPreview';
import ApiGuide from './sections/ApiGuide';
import Testimonials from './sections/Testimonials';
import Faq from './sections/Faq';
import SeaBedFloor from './sections/SeaBedFloor';
import './sections/sections.css';

/**
 * OPTRAQ Landing Page - 3D Cinematic & Zero-Card Editorial Architecture
 */
export default function WelcomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq' || window.location.hash === '#faq') {
      const timer = setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <main className="bg-[#020b1c] min-h-screen text-white relative selection:bg-cyan-500 selection:text-black">
      {/* Real-time 3D Hardware-Accelerated Kinetic Background */}
      <Kinetic3DScene />

      {/* Organic Deep-Ocean Bubble & Caustic Engine */}
      <UnderwaterBubbles />

      {/* Content Layer with Depth & Zero-Card Layouts */}
      <div className="relative z-10">
        <ApogeeHero />
        <div className="landing backdrop-blur-[2px]">
          <SubsurfaceLanguages />
          <SubsurfacePipeline />
          <ProofBento />
          <FeatureCards />
          <InstrumentPreview />
          <ApiGuide />
          <Testimonials />
          <Faq />
          <SeaBedFloor />
        </div>
      </div>
    </main>
  );
}

