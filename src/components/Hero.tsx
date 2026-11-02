import React from 'react';
import { ArrowDownRight, ArrowRight, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveStickman } from './InteractiveStickman';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact, onOpenResume }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();

  return (
    <section id="hero" className="relative min-h-[85vh] pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Punchy, modern typography (no walls of text) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 mb-4">
            <span className="flex items-center gap-1 text-neutral-900 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              Accra, Ghana
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>Software Engineer at <strong className="text-neutral-900 font-semibold">Juni Ghana Limited</strong></span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-emerald-700 font-semibold">National Service</span>
          </div>

          {/* Strong Concise Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-neutral-950 tracking-tight leading-[1.08] mb-4">
            Hi, I'm {PERSONAL_INFO.name?.split(' ')[0] || 'Abdul'}.<br />
            I build intelligent web apps & creative digital products.
          </h1>

          {/* Crisp, Direct Intro */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-7">
            Computer Science & Engineering graduate specializing in React, TypeScript, Python AI, and immersive UI/UX. Currently engineering FinTech solutions at Juni Ghana Limited.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={onExploreWork}
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-xl text-neutral-600 hover:text-neutral-950 font-semibold text-sm transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Fast Fact Badges (Clean, no harsh borders) */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for projects</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg">
              <span>🫁 MedVision AI (94.2% accuracy)</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg">
              <span>👻 850k+ Lens Views</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Stickman Characterized as Abdul */}
        <div className="lg:col-span-5 flex justify-center">
          <InteractiveStickman variant="hero" />
        </div>
      </div>
    </section>
  );
};

