import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Palette,
  Glasses,
  Briefcase,
  Compass,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronDown,
  Building2,
  Code2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

export const AboutSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO, experience } = usePortfolio();
  const [showAllExperience, setShowAllExperience] = useState(false);

  const pillars = [
    {
      title: 'ENGINEERING & FINTECH',
      icon: Terminal,
      bg: '#FFF35C',
      description: 'Developing responsive web apps with React, TypeScript, and FastAPI, integrating REST APIs and backend services in FinTech and clinical environments.'
    },
    {
      title: 'VISUAL BRANDING & CANVA',
      icon: Palette,
      bg: '#FFB7D5',
      description: 'Advanced Canva designer and Adobe Photoshop specialist crafting high-converting promotional graphics, marketing collateral, and brand assets.'
    },
    {
      title: 'SPATIAL AR & PROMPT AI',
      icon: Glasses,
      bg: '#C9B8FF',
      description: 'Creating interactive augmented reality lenses in Snapchat Lens Studio and applying advanced prompt engineering to accelerate prototyping and research.'
    }
  ];

  // Parse bio paragraphs
  const bioParagraphs = (PERSONAL_INFO.bio || '').split('\n\n').filter(Boolean);

  // Active current experience item (Juni Ghana Limited)
  const currentExp = experience.find((e) =>
    e.company.toUpperCase().includes('JUNI GHANA')
  ) || experience[0];

  const previousExps = experience.filter((e) => e !== currentExp);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Container with bold neo-brutalist border and soft background */}
      <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-12 shadow-[8px_8px_0px_0px_#111111] relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#FFF35C]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#C9B8FF]/25 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & The Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] text-white text-xs font-mono font-bold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-[#FFF35C]" />
              <span>THE CREATIVE TECHNOLOGIST & SOFTWARE DEVELOPER</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black text-[#111111] tracking-tight leading-tight">
              WHO'S ABDUL?
            </h2>

            {/* Rendered Updated Bio Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#444444] leading-relaxed">
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'text-base sm:text-lg font-medium text-[#222222]' : ''}>
                    {para}
                  </p>
                ))
              ) : (
                <p>
                  Computer Science & Engineering graduate and Software Developer currently undertaking National Service at Juni Ghana Limited, with practical exposure to software development in a FinTech environment.
                </p>
              )}
            </div>

            {/* THE FORMULA CARD */}
            <div className="p-5 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
              <span className="text-[10px] font-mono text-[#777777] uppercase font-bold block mb-3">
                THE MULTIDISCIPLINARY EQUATION
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-display font-extrabold text-[#111111]">
                <span className="px-3 py-1 rounded-xl bg-[#FFF35C] border border-[#111111]">
                  CODER (React, TS, Python, FinTech)
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

          {/* Right Column: Three Value Pillars */}
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

      {/* CURRENT EXPERIENCE SPOTLIGHT: JUNI GHANA LIMITED */}
      {currentExp && (
        <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#111111] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#111111] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981] text-white text-xs font-mono font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_0px_#111111]">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>CURRENT ROLE & NATIONAL SERVICE</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-[#111111] tracking-tight">
                {currentExp.company}
              </h3>
              <p className="text-base sm:text-lg font-display font-bold text-[#333333]">
                {currentExp.role}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm font-mono text-[#555555]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAFAF7] border border-[#111111]">
                <MapPin className="w-4 h-4 text-[#111111]" /> {currentExp.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF35C] border border-[#111111] font-bold text-[#111111]">
                <Calendar className="w-4 h-4 text-[#111111]" /> {currentExp.period}
              </span>
            </div>
          </div>

          {/* Highlights & Contributions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-[#777777]">
              KEY RESPONSIBILITIES & CONTRIBUTIONS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentExp.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] flex items-start gap-3 hover:bg-[#FFFDF0] transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 border border-[#10B981]/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                    {hl.includes('React, JavaScript and TypeScript') ? (
                      <>
                        Work with <strong className="text-[#111111]">React, JavaScript and TypeScript</strong> to develop and improve web application interfaces.
                      </>
                    ) : (
                      hl
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack */}
          {currentExp.technologies && currentExp.technologies.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#777777] font-bold mr-1">STACK:</span>
              {currentExp.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-xl bg-[#FAFAF7] border border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Toggle for other career experience */}
          {previousExps.length > 0 && (
            <div className="pt-4 border-t border-[#E5E5DC]">
              <button
                onClick={() => {
                  playSound('pop');
                  setShowAllExperience(!showAllExperience);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border-2 border-[#111111] text-xs sm:text-sm font-display font-bold text-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#111111]" />
                <span>
                  {showAllExperience
                    ? 'Hide Previous Career Milestones'
                    : `View All Previous Milestones (${previousExps.length} more roles)`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showAllExperience ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {showAllExperience && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-4 overflow-hidden"
                  >
                    {previousExps.map((prev, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-5 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h4 className="text-base font-display font-extrabold text-[#111111]">
                              {prev.company}
                            </h4>
                            <p className="text-xs sm:text-sm font-semibold text-[#444444]">
                              {prev.role} · <span className="font-mono text-xs">{prev.location}</span>
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-white border border-[#111111] text-xs font-mono font-bold text-[#111111] self-start sm:self-auto">
                            {prev.period}
                          </span>
                        </div>

                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#555555]">
                          {prev.highlights.map((h, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {prev.technologies && prev.technologies.length > 0 && (
                          <div className="pt-1 flex flex-wrap gap-1.5">
                            {prev.technologies.map((pt, ptIdx) => (
                              <span
                                key={ptIdx}
                                className="px-2 py-0.5 rounded bg-white text-[10px] font-mono border border-[#D0D0C8] text-[#333333]"
                              >
                                {pt}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
