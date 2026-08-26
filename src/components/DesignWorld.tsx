import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  MessageSquare,
  Mail,
  ArrowRight,
  TrendingUp,
  Layout,
  Layers,
  Award
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CursorType } from '../types';
import { playSound } from '../utils/sound';

interface DesignWorldProps {
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const DesignWorld: React.FC<DesignWorldProps> = ({ onSetCursor }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  // Interactive CTR Framework Simulator
  const [hasHighContrast, setHasHighContrast] = useState(true);
  const [hasFaceEmotion, setHasFaceEmotion] = useState(true);
  const [hasMinimalText, setHasMinimalText] = useState(true);
  const [hasRimLighting, setHasRimLighting] = useState(true);

  const calculateScore = () => {
    let score = 4.2;
    if (hasHighContrast) score += 3.6;
    if (hasFaceEmotion) score += 4.1;
    if (hasMinimalText) score += 2.8;
    if (hasRimLighting) score += 2.5;
    return score.toFixed(1);
  };

  return (
    <section id="design" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFB7D5] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Palette className="w-3.5 h-3.5" />
          <span>DESIGN WORLD // GRAPHIC DESIGN & HIGH-CTR VISUAL SYSTEMS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          VISUALS THAT COMMAND ATTENTION.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          I design high-converting visual media, viral YouTube thumbnail frameworks, brand collateral, and digital promotional assets combining visual psychology, color theory, bold typography, and storytelling.
        </p>

        {/* Tools Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C4CC]" />
            <span className="font-display font-bold text-xs text-[#111111]">CANVA — ADVANCED MASTER</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#31A8FF]" />
            <span className="font-display font-bold text-xs text-[#111111]">ADOBE PHOTOSHOP</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F24E1E]" />
            <span className="font-display font-bold text-xs text-[#111111]">FIGMA</span>
          </div>
        </div>
      </div>

      {/* Main Design Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Column: 4 Core Design Pillars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-[#666666] uppercase">
              THE HIGH-CTR VISUAL BLUEPRINT
            </span>
            <span className="text-[11px] font-mono text-[#888888]">
              Engineered for maximum click-through rates
            </span>
          </div>

          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] space-y-2 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FFF35C] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                PILLAR 01 // FOCAL HIERARCHY
              </span>
              <Layout className="w-4 h-4 text-[#111111]" />
            </div>
            <h3 className="text-xl font-display font-black text-[#111111]">
              Microsecond Eye-Tracking & Focal Lock
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Positioning primary subjects along optical sweet-spots with depth-separated foregrounds, dramatic rim lighting, and clean background de-cluttering to stop viewers mid-scroll.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] space-y-2 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FFB7D5] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                PILLAR 02 // TYPOGRAPHIC IMPACT
              </span>
              <Zap className="w-4 h-4 text-[#111111]" />
            </div>
            <h3 className="text-xl font-display font-black text-[#111111]">
              Mobile-Readable High-Contrast Typography
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Never cluttered with unnecessary text. Distilling concepts into 2-3 high-impact words with custom kerning, outer strokes, and contrasting hues that remain razor-sharp on mobile feeds.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] space-y-2 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#C9B8FF] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                PILLAR 03 // COLOR PSYCHOLOGY
              </span>
              <Palette className="w-4 h-4 text-[#111111]" />
            </div>
            <h3 className="text-xl font-display font-black text-[#111111]">
              Feed-Contrasting Saturation & Emotion
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Targeted color gamuts and intentional hue contrasts engineered to stand out against YouTube dark and light themes, driving curiosity and emotional resonance.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive CTR Formula Lab */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#111111] text-white border-3 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#FFB7D5]">
          <div>
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB7D5] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#FFB7D5]">
                  CTR OPTIMIZATION CALCULATOR
                </span>
              </div>
              <Sliders className="w-4 h-4 text-[#FFF35C]" />
            </div>

            <h3 className="text-2xl font-display font-black text-white mb-2">
              The Anatomy of a High-CTR Asset
            </h3>
            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
              Toggle the core design parameters below to see how each visual factor compounds to maximize click-through performance:
            </p>

            {/* Interactive Toggles */}
            <div className="space-y-3">
              <label
                onClick={() => {
                  playSound('pop');
                  setHasHighContrast(!hasHighContrast);
                }}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  hasHighContrast
                    ? 'bg-white/10 border-[#FFF35C] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      hasHighContrast
                        ? 'bg-[#FFF35C] border-[#111111] text-[#111111]'
                        : 'border-white/30'
                    }`}
                  >
                    {hasHighContrast && <CheckCircle2 className="w-3.5 h-3.5 font-bold" />}
                  </div>
                  <span className="text-xs font-display font-bold">Ultra High-Contrast Contrast Ratio</span>
                </div>
                <span className="text-[11px] font-mono text-[#FFF35C]">+3.6% CTR</span>
              </label>

              <label
                onClick={() => {
                  playSound('pop');
                  setHasFaceEmotion(!hasFaceEmotion);
                }}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  hasFaceEmotion
                    ? 'bg-white/10 border-[#FFB7D5] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      hasFaceEmotion
                        ? 'bg-[#FFB7D5] border-[#111111] text-[#111111]'
                        : 'border-white/30'
                    }`}
                  >
                    {hasFaceEmotion && <CheckCircle2 className="w-3.5 h-3.5 font-bold" />}
                  </div>
                  <span className="text-xs font-display font-bold">Emotional Face Anchor / Subject Isolation</span>
                </div>
                <span className="text-[11px] font-mono text-[#FFB7D5]">+4.1% CTR</span>
              </label>

              <label
                onClick={() => {
                  playSound('pop');
                  setHasMinimalText(!hasMinimalText);
                }}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  hasMinimalText
                    ? 'bg-white/10 border-[#C9B8FF] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      hasMinimalText
                        ? 'bg-[#C9B8FF] border-[#111111] text-[#111111]'
                        : 'border-white/30'
                    }`}
                  >
                    {hasMinimalText && <CheckCircle2 className="w-3.5 h-3.5 font-bold" />}
                  </div>
                  <span className="text-xs font-display font-bold">Under 3 Words & Bold Mobile Kerning</span>
                </div>
                <span className="text-[11px] font-mono text-[#C9B8FF]">+2.8% CTR</span>
              </label>

              <label
                onClick={() => {
                  playSound('pop');
                  setHasRimLighting(!hasRimLighting);
                }}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  hasRimLighting
                    ? 'bg-white/10 border-[#B9F5D0] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      hasRimLighting
                        ? 'bg-[#B9F5D0] border-[#111111] text-[#111111]'
                        : 'border-white/30'
                    }`}
                  >
                    {hasRimLighting && <CheckCircle2 className="w-3.5 h-3.5 font-bold" />}
                  </div>
                  <span className="text-xs font-display font-bold">Layered Rim Lighting & Glow Separation</span>
                </div>
                <span className="text-[11px] font-mono text-[#B9F5D0]">+2.5% CTR</span>
              </label>
            </div>
          </div>

          {/* Dynamic Score Output Box */}
          <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                ESTIMATED CTR POTENTIAL
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#FFF35C]">
                  {calculateScore()}%
                </span>
                <span className="text-xs font-mono text-[#10B981] flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> High Performer
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/233238318021?text=Hi%20Abdul,%20I'd%20like%20to%20commission%20custom%20thumbnails%20and%20graphics.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-[#FFF35C] hover:bg-[#faee37] text-[#111111] font-display font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Commission Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bespoke Commission Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF35C] border border-[#111111] text-[11px] font-mono font-bold text-[#111111]">
            <Award className="w-3.5 h-3.5" />
            <span>CUSTOM COMMISSIONS & DESIGN PACKAGES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#111111]">
            Need Custom Thumbnails, Branding, or Graphics?
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            All thumbnail designs and visual campaigns are created bespoke to match your creator brand, channel niche, and CTR goals. Get in touch directly to commission a single asset or full content packages.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-extrabold text-xs sm:text-sm border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Custom%20Thumbnail%20%26%20Design%20Inquiry`}
            className="px-6 py-3.5 rounded-2xl bg-[#111111] hover:bg-neutral-800 text-[#FFF35C] font-display font-extrabold text-xs sm:text-sm border-2 border-[#111111] shadow-[3px_3px_0px_0px_#FFF35C] flex items-center gap-2 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email for Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
};
