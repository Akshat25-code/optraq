import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Kinetic3DScene - Hardware-Accelerated 3D WebGL Canvas
 * Powered by Three.js & Animaster Lib patterns.
 * 
 * Features:
 * - 3D faceted optical crystal core representing the AI AST Compiler Engine.
 * - Reactive to cursor coordinates with inertia easing.
 * - Scroll-linked camera dollying & prism rotation.
 * - Drifting ambient spatial particle field with volumetric bloom glow.
 * - Accessibility & Performance: Pauses rendering when document is hidden;
 *   respects prefers-reduced-motion; disposes WebGL context on unmount.
 */
export default function Kinetic3DScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020b1c, 0.002);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth || window.innerWidth || 1024, container.clientHeight || window.innerHeight || 768);
      renderer.setClearColor(0x020b1c, 0);
      container.appendChild(renderer.domElement);
    } catch {
      // Gracefully exit in headless / jsdom / unsupported test environments
      return;
    }

    // 2. Optical Oceanic Faceted Crystal Prism (Icosahedron / Octahedron Geometry)
    const geometry = new THREE.OctahedronGeometry(4.2, 1);
    
    // Custom refractive wireframe + physical glass shader effect with deep ocean refraction
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xddf5ff,
      emissive: 0x041d3d,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.92,
      ior: 1.54,
      thickness: 2.8,
      specularIntensity: 1.2,
      specularColor: 0x00e5ff,
      wireframe: false,
    });

    const prism = new THREE.Mesh(geometry, material);
    scene.add(prism);

    // Oceanic Bioluminescent Wireframe Cage
    const wireGeo = new THREE.OctahedronGeometry(4.28, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    prism.add(wireCage);

    // Inner glowing core (Sapphire / Emerald convergence)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    prism.add(core);

    // 3. Drifting Oceanic Spatial Particle Field (Bioluminescent Marine Snow & Micro-bubbles)
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00e5ff);
    const colorSapphire = new THREE.Color(0x0077b6);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 50 - 5;

      const mixed = Math.random() < 0.45 ? colorCyan : Math.random() < 0.75 ? colorSapphire : colorEmerald;
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Volumetric Underwater Caustic & Oceanic Lights
    const cyanLight = new THREE.PointLight(0x00e5ff, 55, 45);
    cyanLight.position.set(12, 10, 8);
    scene.add(cyanLight);

    const sapphireLight = new THREE.PointLight(0x0055ff, 45, 40);
    sapphireLight.position.set(-12, -8, 6);
    scene.add(sapphireLight);

    const ambientLight = new THREE.AmbientLight(0x021636, 3.2);
    scene.add(ambientLight);

    // 5. Interactive Mouse & Scroll State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // 6. Animation Loop with Tab Visibility Optimization
    let animationFrameId;
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!reducedMotion) {
        // Continuous kinetic rotation
        prism.rotation.x = elapsedTime * 0.2 + targetY * 0.4;
        prism.rotation.y = elapsedTime * 0.25 + targetX * 0.4;

        // Counter-rotation on inner core
        core.rotation.x = -elapsedTime * 0.4;
        core.rotation.y = elapsedTime * 0.5;

        // Scroll-driven camera dollying
        const scrollOffset = scrollY * 0.003;
        prism.position.y = -scrollOffset * 1.5;
        prism.position.z = Math.min(scrollOffset * 0.8, 6);

        // Slow ambient particle drift
        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
