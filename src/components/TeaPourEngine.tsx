import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface TeaPourEngineProps {
  className?: string;
}

export const TeaPourEngine: React.FC<TeaPourEngineProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pourCycle, setPourCycle] = useState(0);

  // -------------------------------------------------------------------------
  // PHYSICAL 3D-STYLE BEVERAGE COMMERCIAL RENDERER
  // Features:
  // - Nightfall Neon atmospheric RGB lighting (cyan/violet rim, amber core)
  // - Large, engraved brass kettle with realistic tilt physics & rim speculars
  // - Thick, viscous, continuous golden-amber tea stream strictly locked to spout
  // - Authentic fluted Indian cutting chai glass with caustic refractions & rising level
  // - Reactive foam froth, agitation bubbles, surface waves
  // - Two-tone volumetric steam billows drifting through the scene
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    // Particle structures
    interface Droplet {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }

    interface SteamParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      angle: number;
      spin: number;
      warmSide: boolean;
    }

    interface DustMote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }

    const droplets: Droplet[] = [];
    const steamParticles: SteamParticle[] = [];
    const dustMotes: DustMote[] = [];

    // Pre-populate atmospheric dust motes
    for (let i = 0; i < 45; i++) {
      dustMotes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: -Math.random() * 0.0005 - 0.0001,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.4 ? '#D99445' : '#27D7FF',
      });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Commercial 9-second loop sequence
      const loopDuration = 9000;
      const elapsed = (currentTime - startTime) % loopDuration;
      const t = elapsed / loopDuration;

      // Camera push-in factor: subtle 2.5% scale zoom during pour peak
      const zoom = 1 + Math.sin(t * Math.PI) * 0.025;
      ctx.save();
      ctx.translate(width * 0.5, height * 0.5);
      ctx.scale(zoom, zoom);
      ctx.translate(-width * 0.5, -height * 0.5);

      // Timeline phases:
      // 0–2.0s (t: 0 -> 0.22): Kettle descends and tilts forward from 0° to 44°
      // 2.0–7.5s (t: 0.22 -> 0.83): Thick tea stream pours continuously, level rises to 82%
      // 7.5–9.0s (t: 0.83 -> 1.0): Kettle eases back upright, stream cuts off, droplets settle
      let kettleTilt = 0;
      let isPouring = false;
      let streamThicknessFactor = 0;
      let currentLevel = 0.08; // start with shallow tea base in glass

      if (t < 0.22) {
        // Phase 1: Entry & tilt
        const progress = t / 0.22;
        kettleTilt = Math.sin((progress * Math.PI) / 2) * 44;
        currentLevel = 0.08;
      } else if (t < 0.83) {
        // Phase 2: Pouring & level rise
        const pourProgress = (t - 0.22) / 0.61;
        kettleTilt = 44 + Math.sin(pourProgress * Math.PI * 4) * 0.8;
        isPouring = true;
        // Stream starts immediately full and tapers slightly near end
        streamThicknessFactor = Math.min(pourProgress * 4, 1);
        if (pourProgress > 0.9) {
          streamThicknessFactor *= (1 - pourProgress) * 10;
        }
        currentLevel = 0.08 + pourProgress * 0.74; // reaches 82%
      } else {
        // Phase 3: Kettle tilting back upright, glass settling
        const settleProgress = (t - 0.83) / 0.17;
        kettleTilt = 44 * (1 - Math.sin((settleProgress * Math.PI) / 2));
        currentLevel = 0.82;
      }

      // Responsive Coordinate Architecture:
      // Desktop: Kettle upper-right, Glass lower-right (generous left negative space)
      // Mobile: Scaled and repositioned to stay 100% visible
      const isMobile = width < 768;
      
      const glassWidth = isMobile ? Math.min(width * 0.36, 145) : Math.min(width * 0.24, 185);
      const glassHeight = glassWidth * 1.48;

      const glassCenterX = isMobile ? width * 0.68 : width * 0.73;
      const glassBottomY = isMobile ? height * 0.84 : height * 0.82;
      const glassTopY = glassBottomY - glassHeight;
      const glassX = glassCenterX - glassWidth * 0.5;

      // Kettle positioning:
      // Spout must be elevated above and slightly to the right of glass opening
      const kettlePivotX = isMobile ? glassCenterX + glassWidth * 0.72 : glassCenterX + glassWidth * 0.85;
      const kettlePivotY = isMobile ? glassTopY - glassHeight * 0.48 : glassTopY - glassHeight * 0.55;

      // =====================================================================
      // 1. NIGHTFALL NEON ATMOSPHERIC LIGHTING & VOLUMETRIC HAZE
      // =====================================================================
      // Primary background: Midnight Espresso (#100C0A)
      ctx.fillStyle = '#100C0A';
      ctx.fillRect(0, 0, width, height);

      // Cyan rim light glow (#27D7FF) along top-right edge
      const cyanGlow = ctx.createRadialGradient(width * 0.85, height * 0.15, 40, width * 0.85, height * 0.15, width * 0.6);
      cyanGlow.addColorStop(0, 'rgba(39, 215, 255, 0.18)');
      cyanGlow.addColorStop(0.5, 'rgba(39, 215, 255, 0.06)');
      cyanGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, 0, width, height);

      // Neon Violet accent glow (#A56BFF) along bottom-right edge
      const violetGlow = ctx.createRadialGradient(width * 0.9, height * 0.85, 30, width * 0.9, height * 0.85, width * 0.55);
      violetGlow.addColorStop(0, 'rgba(165, 107, 255, 0.14)');
      violetGlow.addColorStop(0.6, 'rgba(165, 107, 255, 0.04)');
      violetGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = violetGlow;
      ctx.fillRect(0, 0, width, height);

      // Core Warm Chai Amber Volumetric Illumination (#D99445 / #FFC56E)
      const amberCoreGlow = ctx.createRadialGradient(glassCenterX, (glassTopY + glassBottomY) * 0.5, 30, glassCenterX, (glassTopY + glassBottomY) * 0.5, glassWidth * 1.8);
      amberCoreGlow.addColorStop(0, 'rgba(255, 197, 110, 0.22)');
      amberCoreGlow.addColorStop(0.4, 'rgba(217, 148, 69, 0.14)');
      amberCoreGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = amberCoreGlow;
      ctx.fillRect(0, 0, width, height);

      // Drifting Atmospheric Dust Motes
      for (let i = 0; i < dustMotes.length; i++) {
        const m = dustMotes[i];
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < 0) m.y = 1;
        if (m.x < 0) m.x = 1;
        if (m.x > 1) m.x = 0;

        ctx.fillStyle = m.color;
        ctx.globalAlpha = m.alpha * (0.6 + Math.sin(currentTime * 0.002 + i) * 0.4);
        ctx.beginPath();
        ctx.arc(m.x * width, m.y * height, m.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // =====================================================================
      // 2. COUNTER SURFACE & CAUSTIC LIGHT SHADOW
      // =====================================================================
      const causticX = glassCenterX;
      const causticY = glassBottomY + 12;
      const tableShadow = ctx.createRadialGradient(causticX, causticY, 8, causticX, causticY, glassWidth * 1.1);
      tableShadow.addColorStop(0, 'rgba(16, 12, 10, 0.95)');
      tableShadow.addColorStop(0.35, 'rgba(217, 148, 69, 0.25)'); // Golden tea caustics on surface
      tableShadow.addColorStop(0.7, 'rgba(165, 107, 255, 0.08)');
      tableShadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = tableShadow;
      ctx.beginPath();
      ctx.ellipse(causticX, causticY, glassWidth * 0.85, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // =====================================================================
      // 3. AUTHENTIC INDIAN CUTTING CHAI GLASS (FLUTED TUMBLER)
      // =====================================================================
      // Geometry:
      // Tapered glass tumbler: slightly wider at rim than at heavy base
      const rimRadiusX = glassWidth * 0.5;
      const baseRadiusX = glassWidth * 0.38;
      const rimHeight = 12;

      // Base solid glass thickness
      const glassBaseThickness = glassHeight * 0.16;
      const innerBaseY = glassBottomY - glassBaseThickness;

      // Current liquid level height in pixels
      const fillableHeight = innerBaseY - (glassTopY + rimHeight * 1.5);
      const liquidSurfaceY = innerBaseY - fillableHeight * currentLevel;

      // Calculate width of glass at the liquid surface (linear interpolation)
      const liquidLevelRatio = currentLevel;
      const surfaceHalfWidth = baseRadiusX + (rimRadiusX - baseRadiusX) * liquidLevelRatio - 6;

      // ---------------------------------------------------------------------
      // 3A. GLASS BACKGROUND & REACTION CAUSTIC
      // ---------------------------------------------------------------------
      ctx.save();
      // Outer glass path for clipping liquid
      ctx.beginPath();
      ctx.moveTo(glassCenterX - rimRadiusX + 5, glassTopY + rimHeight);
      ctx.lineTo(glassCenterX - baseRadiusX + 5, innerBaseY);
      ctx.quadraticCurveTo(glassCenterX, innerBaseY + 6, glassCenterX + baseRadiusX - 5, innerBaseY);
      ctx.lineTo(glassCenterX + rimRadiusX - 5, glassTopY + rimHeight);
      ctx.closePath();

      // Clip liquid strictly inside inner glass bounds
      ctx.save();
      ctx.clip();

      // Background amber glow inside glass
      const innerGlassGlow = ctx.createRadialGradient(glassCenterX, (liquidSurfaceY + innerBaseY) * 0.5, 5, glassCenterX, (liquidSurfaceY + innerBaseY) * 0.5, glassWidth * 0.6);
      innerGlassGlow.addColorStop(0, 'rgba(255, 197, 110, 0.25)');
      innerGlassGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = innerGlassGlow;
      ctx.fill();

      // ---------------------------------------------------------------------
      // 3B. LIQUID (RICH SPICED INDIAN CHAI WITH GRADIENT & SURFACE WAVES)
      // ---------------------------------------------------------------------
      if (currentLevel > 0.01) {
        // Liquid Volume Gradient (Rich caramel brown, warm amber glow, never neon!)
        const teaGrad = ctx.createLinearGradient(0, liquidSurfaceY, 0, innerBaseY);
        teaGrad.addColorStop(0, '#E8A35C');   // Top golden crema / tea edge
        teaGrad.addColorStop(0.18, '#D99445'); // Rich chai amber
        teaGrad.addColorStop(0.55, '#B06828'); // Spiced Assam brew depth
        teaGrad.addColorStop(1, '#5E2E10');    // Deep espresso brown base

        ctx.fillStyle = teaGrad;
        ctx.beginPath();
        ctx.moveTo(glassCenterX - surfaceHalfWidth, liquidSurfaceY);

        // Dynamic surface ripple waves (agitated when pouring)
        const waveCount = 14;
        const waveAmp = isPouring ? 3.5 : 1.0;
        for (let i = 0; i <= waveCount; i++) {
          const ratio = i / waveCount;
          const wx = glassCenterX - surfaceHalfWidth + surfaceHalfWidth * 2 * ratio;
          // Impact dip near center where stream strikes
          const distFromCenter = Math.abs(wx - glassCenterX);
          const impactDip = isPouring && distFromCenter < 24 ? Math.cos((distFromCenter / 24) * Math.PI) * 2.5 : 0;
          const wy = liquidSurfaceY + Math.sin(currentTime * 0.014 + i * 1.4) * waveAmp + impactDip;
          ctx.lineTo(wx, wy);
        }

        ctx.lineTo(glassCenterX + baseRadiusX - 5, innerBaseY);
        ctx.quadraticCurveTo(glassCenterX, innerBaseY + 6, glassCenterX - baseRadiusX + 5, innerBaseY);
        ctx.closePath();
        ctx.fill();

        // Creamy Tea Foam & Surface Froth (#FFF0DC / #FFC56E)
        ctx.fillStyle = 'rgba(255, 240, 220, 0.45)';
        ctx.beginPath();
        ctx.ellipse(glassCenterX, liquidSurfaceY, surfaceHalfWidth * 0.9, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Stream impact agitation bubbles
        if (isPouring) {
          ctx.fillStyle = 'rgba(255, 245, 230, 0.85)';
          for (let b = 0; b < 7; b++) {
            const bAngle = b * 0.9 + currentTime * 0.018;
            const bDist = 4 + (b % 4) * 4.5;
            const bx = glassCenterX + Math.cos(bAngle) * bDist;
            const by = liquidSurfaceY + Math.sin(bAngle) * 2.5;
            ctx.beginPath();
            ctx.arc(bx, by, 1.4 + (b % 2) * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore(); // remove liquid clip

      // ---------------------------------------------------------------------
      // 3C. FLUTED RIBS & GLASS WALL REFRACTIONS
      // ---------------------------------------------------------------------
      // Vertical cutting facets (typical Indian cutting chai tumbler)
      const fluteCount = 7;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.2;
      for (let f = 1; f < fluteCount; f++) {
        const ratio = f / fluteCount;
        const topX = glassCenterX - rimRadiusX + rimRadiusX * 2 * ratio;
        const btmX = glassCenterX - baseRadiusX + baseRadiusX * 2 * ratio;
        ctx.beginPath();
        ctx.moveTo(topX, glassTopY + rimHeight * 1.8);
        ctx.lineTo(btmX, innerBaseY);
        ctx.stroke();
      }

      // Heavy solid glass base caustics
      const baseGrad = ctx.createLinearGradient(0, innerBaseY, 0, glassBottomY);
      baseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      baseGrad.addColorStop(0.5, 'rgba(39, 215, 255, 0.15)'); // Cyan rim reflection at base
      baseGrad.addColorStop(1, 'rgba(165, 107, 255, 0.12)'); // Violet rim reflection
      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.moveTo(glassCenterX - baseRadiusX, innerBaseY);
      ctx.lineTo(glassCenterX + baseRadiusX, innerBaseY);
      ctx.lineTo(glassCenterX + baseRadiusX - 4, glassBottomY);
      ctx.quadraticCurveTo(glassCenterX, glassBottomY + 4, glassCenterX - baseRadiusX + 4, glassBottomY);
      ctx.closePath();
      ctx.fill();

      // ---------------------------------------------------------------------
      // 3D. GLASS RIM, SPECULAR HIGHLIGHTS & RGB RIM LIGHTING
      // ---------------------------------------------------------------------
      // Outer glass walls stroke with electric cyan (#27D7FF) & violet (#A56BFF) highlights
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(glassCenterX - rimRadiusX, glassTopY + rimHeight);
      ctx.lineTo(glassCenterX - baseRadiusX, glassBottomY);
      ctx.quadraticCurveTo(glassCenterX, glassBottomY + 4, glassCenterX + baseRadiusX, glassBottomY);
      ctx.lineTo(glassCenterX + rimRadiusX, glassTopY + rimHeight);
      ctx.stroke();

      // Cyan-blue edge lighting along left rim wall
      ctx.strokeStyle = 'rgba(39, 215, 255, 0.55)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(glassCenterX - rimRadiusX, glassTopY + rimHeight);
      ctx.lineTo(glassCenterX - baseRadiusX, glassBottomY);
      ctx.stroke();

      // Violet-gold edge lighting along right rim wall
      ctx.strokeStyle = 'rgba(165, 107, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(glassCenterX + rimRadiusX, glassTopY + rimHeight);
      ctx.lineTo(glassCenterX + baseRadiusX, glassBottomY);
      ctx.stroke();

      // Top Glass Rim Oval with Specular Highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(glassCenterX, glassTopY + rimHeight, rimRadiusX, rimHeight * 0.75, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner rim reflection
      ctx.strokeStyle = 'rgba(255, 197, 110, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(glassCenterX, glassTopY + rimHeight + 2, rimRadiusX - 3, rimHeight * 0.65, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore(); // end glass context

      // =====================================================================
      // 4. LARGE BRASS KETTLE (METALLIC REFLECTIONS & TILT PHYSICS)
      // =====================================================================
      ctx.save();
      ctx.translate(kettlePivotX, kettlePivotY);
      ctx.rotate((-kettleTilt * Math.PI) / 180);

      // Scale kettle substantially larger so it's dominant and impressive
      const kettleScale = isMobile ? (glassWidth / 140) * 1.5 : (glassWidth / 160) * 1.65;
      ctx.scale(kettleScale, kettleScale);

      // Antique Brass Metallic Shading (#FFC56E, #D99445, #B88A50, #5E3816)
      const kettleBodyGrad = ctx.createLinearGradient(-65, -45, 65, 45);
      kettleBodyGrad.addColorStop(0, '#FFE8A3');   // Polished top brass specular
      kettleBodyGrad.addColorStop(0.25, '#FFC56E'); // Golden light highlight
      kettleBodyGrad.addColorStop(0.55, '#D99445'); // Rich amber body
      kettleBodyGrad.addColorStop(0.85, '#8C551F'); // Warm metallic shadow
      kettleBodyGrad.addColorStop(1, '#3B210B');    // Deep bronze core

      // Kettle Body Contour (Generous pear-shaped belly)
      ctx.fillStyle = kettleBodyGrad;
      ctx.beginPath();
      ctx.moveTo(-60, -32);
      ctx.bezierCurveTo(-85, 25, -55, 58, 0, 60);
      ctx.bezierCurveTo(55, 58, 85, 25, 60, -32);
      ctx.closePath();
      ctx.fill();

      // Subtle cyan-blue rim specular on kettle upper rim (#27D7FF)
      ctx.strokeStyle = 'rgba(39, 215, 255, 0.45)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 8, 22, Math.PI * 0.7, Math.PI * 1.3);
      ctx.stroke();

      // Engraved Ornamental Medallion (Traditional floral brass filigree)
      ctx.strokeStyle = 'rgba(255, 240, 200, 0.4)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 14, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 14, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Brass Kettle Lid & Dome Knob
      ctx.fillStyle = '#D99445';
      ctx.beginPath();
      ctx.ellipse(0, -34, 46, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFE8A3';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Dome Finial Knob
      ctx.fillStyle = '#FFE082';
      ctx.beginPath();
      ctx.arc(0, -48, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#D99445';
      ctx.beginPath();
      ctx.rect(-3, -40, 6, 7);
      ctx.fill();

      // Arching Brass & Rosewood Handle
      ctx.strokeStyle = '#4A2A10';
      ctx.lineWidth = 11;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-45, -34);
      ctx.bezierCurveTo(-45, -115, 45, -115, 45, -34);
      ctx.stroke();

      // Brass Handle Fastener brackets
      ctx.strokeStyle = '#FFE58F';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Long Graceful Spout (pointing left toward glass)
      // Spout geometry in local coordinates:
      // Base: (-45, 12), Tip: (-92, -32)
      ctx.fillStyle = kettleBodyGrad;
      ctx.beginPath();
      ctx.moveTo(-42, 18);
      ctx.bezierCurveTo(-90, 8, -100, -22, -88, -44);
      ctx.lineTo(-76, -49);
      ctx.bezierCurveTo(-82, -26, -65, -8, -35, 2);
      ctx.closePath();
      ctx.fill();

      // Spout Tip Opening Ellipse
      ctx.fillStyle = '#3B210B';
      ctx.beginPath();
      ctx.ellipse(-82, -46.5, 7, 4.5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFE8A3';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Compute world coordinates of the spout tip so stream is 100% connected
      const localSpoutTipX = -82;
      const localSpoutTipY = -46.5;
      const rad = (-kettleTilt * Math.PI) / 180;
      const cosR = Math.cos(rad);
      const sinR = Math.sin(rad);

      const worldSpoutX = kettlePivotX + (localSpoutTipX * cosR - localSpoutTipY * sinR) * kettleScale;
      const worldSpoutY = kettlePivotY + (localSpoutTipX * sinR + localSpoutTipY * cosR) * kettleScale;

      ctx.restore(); // end kettle context

      // =====================================================================
      // 5. THICK, CONTINUOUS, VISCOUS TEA POURING STREAM
      // =====================================================================
      // Target impact is the center of the liquid surface inside the glass
      const targetImpactX = glassCenterX;
      const targetImpactY = Math.min(liquidSurfaceY, innerBaseY - 12);

      if (isPouring && streamThicknessFactor > 0.05) {
        ctx.save();

        // Base thickness: substantially thicker, ~14px to 17px
        const streamBaseWidth = (isMobile ? 13 : 17) * streamThicknessFactor;

        // Stream outer golden-amber fluid gradient
        const streamGrad = ctx.createLinearGradient(worldSpoutX, worldSpoutY, targetImpactX, targetImpactY);
        streamGrad.addColorStop(0, '#FFC56E');   // Golden light at spout exit
        streamGrad.addColorStop(0.2, '#E89442'); // Warm amber stream
        streamGrad.addColorStop(0.65, '#D99445'); // Rich Assam chai
        streamGrad.addColorStop(1, '#A35A25');   // Caramel base

        // Fluid stream path: natural parabolic gravity curve
        const midY = (worldSpoutY + targetImpactY) * 0.48;
        const controlX = worldSpoutX - 12 + Math.sin(currentTime * 0.02) * 2;

        // Outer amber glow & stream body
        ctx.shadowColor = 'rgba(217, 148, 69, 0.55)';
        ctx.shadowBlur = 14;
        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = streamBaseWidth;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(worldSpoutX, worldSpoutY);
        ctx.quadraticCurveTo(controlX, midY, targetImpactX, targetImpactY);
        ctx.stroke();

        // Inner core golden highlight (light traveling through the liquid)
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(255, 245, 225, 0.75)';
        ctx.lineWidth = streamBaseWidth * 0.32;
        ctx.beginPath();
        ctx.moveTo(worldSpoutX, worldSpoutY);
        ctx.quadraticCurveTo(controlX + 1.2, midY, targetImpactX, targetImpactY);
        ctx.stroke();

        ctx.restore();

        // Spawn realistic droplet splashes at strike point
        if (Math.random() < 0.65) {
          droplets.push({
            x: targetImpactX + (Math.random() - 0.5) * 12,
            y: targetImpactY,
            vx: (Math.random() - 0.5) * 4.2,
            vy: -Math.random() * 5.2 - 2.0,
            radius: Math.random() * 2.2 + 0.9,
            alpha: 0.9,
            color: Math.random() > 0.4 ? '#FFC56E' : '#D99445',
          });
        }
      }

      // =====================================================================
      // 6. SPLASH PARTICLES DYNAMICS
      // =====================================================================
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.28; // gravity
        d.alpha -= 0.025;

        if (d.alpha <= 0) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.shadowColor = '#D99445';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // =====================================================================
      // 7. TWO-TONE VOLUMETRIC STEAM & ORGANIC BILLOWS
      // =====================================================================
      // Continuously spawn organic volumetric steam puffs from hot tea surface
      if (currentLevel > 0.04) {
        if (Math.random() < 0.42) {
          steamParticles.push({
            x: glassCenterX + (Math.random() - 0.5) * surfaceHalfWidth * 1.2,
            y: liquidSurfaceY - 4,
            vx: (Math.random() - 0.5) * 0.7 - 0.2, // drifts gently left & upward
            vy: -Math.random() * 1.5 - 0.9,
            radius: Math.random() * 12 + 10,
            alpha: 0.45,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.02,
            warmSide: Math.random() > 0.4, // mix of amber warmth and cyan rim light
          });
        }
      }

      for (let i = steamParticles.length - 1; i >= 0; i--) {
        const s = steamParticles[i];
        // Organic Brownian motion & turbulence
        s.x += s.vx + Math.sin(currentTime * 0.0025 + s.y * 0.015) * 0.55;
        s.y += s.vy;
        s.radius += 0.38; // expands as it rises
        s.alpha -= 0.0035; // gently dissipates
        s.angle += s.spin;

        if (s.alpha <= 0 || s.y < glassTopY - 240) {
          steamParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        const steamGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        if (s.warmSide) {
          // Amber side: catches warm golden light (#FFC56E / #D99445)
          steamGrad.addColorStop(0, `rgba(255, 240, 220, ${s.alpha * 0.55})`);
          steamGrad.addColorStop(0.5, `rgba(217, 148, 69, ${s.alpha * 0.22})`);
          steamGrad.addColorStop(1, 'rgba(0,0,0,0)');
        } else {
          // Cool edge: catches electric cyan / violet rim reflections (#27D7FF)
          steamGrad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha * 0.45})`);
          steamGrad.addColorStop(0.5, `rgba(39, 215, 255, ${s.alpha * 0.18})`);
          steamGrad.addColorStop(1, 'rgba(0,0,0,0)');
        }

        ctx.fillStyle = steamGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore(); // remove camera push-in matrix

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [pourCycle]);

  const handleRePour = () => {
    setPourCycle((prev) => prev + 1);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Physics & Commercial Beverage Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric Dark Vignette: Ensures Left Column Headline Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#100C0A] via-[#100C0A]/85 sm:via-[#100C0A]/55 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100C0A] via-transparent to-[#100C0A]/60 pointer-events-none" />

      {/* Re-Pour Commercial HUD Controller */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={handleRePour}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-[#201510]/80 hover:bg-[#201510] text-[#FFF0DC] border border-[#D99445]/40 hover:border-[#D99445] shadow-[0_4px_16px_rgba(217,148,69,0.2)] backdrop-blur-md transition-all group"
          title="Re-run commercial pouring sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D99445] group-hover:-rotate-90 transition-transform duration-300" />
          <span>Re-Pour Tea</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#100C0A]/80 text-[#27D7FF] border border-[#27D7FF]/30 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#27D7FF] animate-pulse" />
          <span>Cinematic 3D Pour</span>
        </div>
      </div>
    </div>
  );
};
