import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Mail, Sparkles, Terminal, Palette, Glasses, Play } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact, onOpenResume }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [interactiveMode, setInteractiveMode] = useState<'normal' | 'physics' | 'lens'>('normal');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for interactive orb / mesh
    const numParticles = 32;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      label?: string;
      baseX: number;
      baseY: number;
    }

    const colors = ['#FFF35C', '#C9B8FF', '#FFB7D5', '#A9DDFF', '#B9F5D0', '#111111'];
    const labels = ['CODE', 'DESIGN', 'AR', 'AI', 'CV', 'FASTAPI', 'CANVA', 'LENS'];

    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2;
      const radius = 90 + (i % 3) * 35;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: i < 8 ? 14 : Math.random() * 6 + 3,
        color: colors[i % colors.length],
        label: i < labels.length ? labels[i] : undefined,
      });
    }

    let mouse = { x: centerX, y: centerY, isHovered: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.x = centerX;
      mouse.y = centerY;
    };

    const handleClick = () => {
      playSound('pop');
      // Explosive force from mouse
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = 120 / dist;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const curCenterX = width / 2;
      const curCenterY = height / 2;

      // Draw subtle orbital rings
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 140, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.06)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 80, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.08)';
      ctx.stroke();

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(17, 17, 17, ${0.15 * (1 - dist / 75)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p, idx) => {
        // Return force to base orb orbit
        const angle = (idx / numParticles) * Math.PI * 2 + time * 0.3;
        const targetRadius = 90 + Math.sin(time + idx) * 20;
        const targetX = curCenterX + Math.cos(angle) * targetRadius;
        const targetY = curCenterY + Math.sin(angle) * targetRadius;

        p.vx += (targetX - p.x) * 0.02;
        p.vy += (targetY - p.y) * 0.02;

        // Mouse repelling/attraction
        if (mouse.isHovered) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 110) {
            const mforce = (110 - mdist) * 0.03;
            p.vx -= (mdx / mdist) * mforce;
            p.vy -= (mdy / mdist) * mforce;
          }
        }

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = p.label ? 2 : 1;
        ctx.stroke();

        if (p.label) {
          ctx.fillStyle = '#111111';
          ctx.font = 'bold 9px "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.label, p.x, p.y);
        }
      });

      // Center Core Icon
      ctx.save();
      ctx.translate(curCenterX, curCenterY);
      ctx.rotate(time * 0.2);

      // Rounded square core
      const coreSize = 52;
      ctx.fillStyle = '#FFF35C';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2.5;

      // Draw custom rounded rectangle
      ctx.beginPath();
      const r = 14;
      ctx.roundRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize, r);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Draw central label
      ctx.fillStyle = '#111111';
      ctx.font = '800 13px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ABDUL', curCenterX, curCenterY - 6);
      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.fillText('STUDIO', curCenterX, curCenterY + 8);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactiveMode]);

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
      {/* Background soft ambient pastel blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FFF35C]/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C9B8FF]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB7D5]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bold Expressive Headline & Positioning */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              {PERSONAL_INFO.location} · {PERSONAL_INFO.availability}
            </span>
          </motion.div>

          {/* Huge Expressive Headings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-1 mb-6"
          >
            <div className="text-xl sm:text-2xl font-display font-bold text-[#444444] tracking-tight">
              HEY. I'M ABDUL.
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#111111] leading-[0.95] tracking-tight">
              I <span className="inline-block px-2.5 bg-[#FFF35C] rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] rotate-[-1deg] text-[#111111]">BUILD.</span>
              <br />
              I <span className="inline-block px-2.5 bg-[#FFB7D5] rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] rotate-[1deg] text-[#111111]">DESIGN.</span>
              <br />
              I <span className="inline-block px-2.5 bg-[#C9B8FF] rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] rotate-[-1deg] text-[#111111]">CREATE.</span>
            </h1>
          </motion.div>

          {/* Subtitles & Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 mb-8 max-w-xl"
          >
            <div className="font-display font-bold text-lg sm:text-xl text-[#111111]">
              {PERSONAL_INFO.titles}
            </div>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              I combine engineering rigor, high-converting visual design, and augmented reality to build products and digital experiences that captivate people.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-explore-work-btn"
              onClick={() => {
                playSound('whoosh');
                onExploreWork();
              }}
              className="px-7 py-4 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-base border-2 border-[#111111] shadow-[4px_4px_0px_0px_#FFF35C] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDownRight className="w-5 h-5 text-[#FFF35C] group-hover:rotate-[-45deg] transition-transform" />
            </button>

            <button
              id="hero-contact-me-btn"
              onClick={() => {
                playSound('pop');
                onOpenContact();
              }}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-[#F5F5EE] text-[#111111] font-display font-bold text-base border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-5 h-5 text-[#111111]" />
              <span>CONTACT ME</span>
            </button>
          </motion.div>

          {/* Quick Skill Badges Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#E5E5DC] w-full"
          >
            <span className="text-xs font-mono font-bold text-[#777777] uppercase mr-1">
              FOCUS AREAS:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF35C]/60 border border-[#111111]/30 text-xs font-bold font-display text-[#111111]">
              <Terminal className="w-3.5 h-3.5" /> Full-Stack & AI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB7D5]/60 border border-[#111111]/30 text-xs font-bold font-display text-[#111111]">
              <Palette className="w-3.5 h-3.5" /> Canva & High-CTR Visuals
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9B8FF]/60 border border-[#111111]/30 text-xs font-bold font-display text-[#111111]">
              <Glasses className="w-3.5 h-3.5" /> Snapchat Lens Studio
            </span>
          </motion.div>
        </div>

        {/* Right Column: Interactive Reactive Canvas & Floating Badges */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
          {/* Card Frame containing interactive canvas */}
          <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] relative overflow-hidden flex flex-col">
            {/* Top window bar */}
            <div className="px-4 py-2.5 bg-[#FAFAF7] border-b-2 border-[#111111] flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFB7D5] border border-[#111111]" />
                <div className="w-3 h-3 rounded-full bg-[#FFF35C] border border-[#111111]" />
                <div className="w-3 h-3 rounded-full bg-[#B9F5D0] border border-[#111111]" />
                <span className="ml-2 font-mono text-[11px] font-bold text-[#555555]">
                  interactive-orb.canvas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono bg-[#FFF35C] text-[#111111] px-2 py-0.5 rounded-md font-bold border border-[#111111]">
                  Click to Burst
                </span>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-[#FAFAF7] cursor-crosshair">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Floating interactive hint badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#111111] text-[11px] font-mono text-[#333333] shadow-sm">
                <span>Move mouse & click anywhere to interact</span>
                <span className="font-bold text-[#111111]">32 NODES</span>
              </div>
            </div>
          </div>

          {/* Floating dynamic tags outside frame */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-2 sm:-right-4 px-3.5 py-2 rounded-2xl bg-[#FFF35C] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] text-xs font-display font-extrabold text-[#111111] flex items-center gap-1.5 select-none"
          >
            <Sparkles className="w-3.5 h-3.5" /> 94.2% AI Accuracy
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -left-2 sm:-left-4 px-3.5 py-2 rounded-2xl bg-[#C9B8FF] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] text-xs font-display font-extrabold text-[#111111] flex items-center gap-1.5 select-none"
          >
            <Glasses className="w-3.5 h-3.5" /> 250K+ AR Impressions
          </motion.div>
        </div>
      </div>
    </section>
  );
};
