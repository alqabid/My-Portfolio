import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Palette, Glasses, Brain, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

export const AboutSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const pillars = [
    {
      title: 'ENGINEERING RIGOR',
      icon: Terminal,
      bg: '#FFF35C',
      description: 'Writing maintainable, asynchronous, and type-safe systems with Python, FastAPI, React, and PostgreSQL.'
    },
    {
      title: 'VISUAL STORYTELLING',
      icon: Palette,
      bg: '#FFB7D5',
      description: 'Mastery in Canva Advanced and Photoshop creating high-converting thumbnails and compelling brand identities.'
    },
    {
      title: 'SPATIAL & AR COMPUTING',
      icon: Glasses,
      bg: '#C9B8FF',
      description: 'Authoring Snapchat Lenses with custom 3D face tracking shaders, segmentation, and interactive visual scripting.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container with bold border and soft background */}
      <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-12 shadow-[8px_8px_0px_0px_#111111] relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#FFF35C]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#C9B8FF]/30 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & The Equation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] text-white text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FFF35C]" />
              <span>THE CREATIVE TECHNOLOGIST</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black text-[#111111] tracking-tight leading-tight">
              WHO'S ABDUL?
            </h2>

            <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
              I'm <strong>Abdul Qabid Siaka</strong>, a software developer, graphic designer, and AR creator from Ghana.
              I bridge the gap between technical architecture and visually engaging digital media.
            </p>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              With a background in Computer Science and Engineering, I don't treat code and visual design as separate disciplines.
              To me, code is the skeleton, design is the soul, and AR is the playground where both come to life.
            </p>

            {/* THE FORMULA CARD */}
            <div className="p-5 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
              <span className="text-[10px] font-mono text-[#777777] uppercase font-bold block mb-3">
                THE MULTIDISCIPLINARY EQUATION
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-display font-extrabold text-[#111111]">
                <span className="px-3 py-1 rounded-xl bg-[#FFF35C] border border-[#111111]">
                  CODER (Full-Stack & AI)
                </span>
                <span className="text-lg">+</span>
                <span className="px-3 py-1 rounded-xl bg-[#FFB7D5] border border-[#111111]">
                  DESIGNER (Canva & Photoshop)
                </span>
                <span className="text-lg">+</span>
                <span className="px-3 py-1 rounded-xl bg-[#C9B8FF] border border-[#111111]">
                  CREATOR (Lens Studio AR)
                </span>
                <span className="text-lg">=</span>
                <span className="px-3.5 py-1 rounded-xl bg-[#111111] text-[#FFF35C] border border-[#111111]">
                  CREATIVE TECHNOLOGIST
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Three Interactive Value Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="p-5 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] flex items-start gap-4 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-2xl border-2 border-[#111111] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#111111]"
                    style={{ backgroundColor: pil.bg }}
                  >
                    <Icon className="w-6 h-6 text-[#111111]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-display font-extrabold text-[#111111]">
                      {pil.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {pil.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
