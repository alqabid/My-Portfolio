import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, ExternalLink, Briefcase, Code2, Layers, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact, onOpenResume }) => {
  const { personalInfo: PERSONAL_INFO, buildProjects } = usePortfolio();

  return (
    <section id="hero" className="relative min-h-[88vh] pt-32 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Typographic Hierarchy (No borders, no pills) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Quiet Unboxed Metadata Status */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-6">
            <span>Accra, Ghana</span>
            <span aria-hidden="true">·</span>
            <span>Software Engineer at Juni Ghana Limited</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-900 font-semibold">National Service</span>
          </div>

          {/* Clean Strong Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-neutral-950 tracking-tight leading-[1.08] mb-6">
            Engineering robust web applications, intelligent interfaces, and creative digital products.
          </h1>

          {/* Narrative Body */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-8">
            Computer Science & Engineering graduate and Software Developer with practical exposure in FinTech and healthcare AI. Experienced in React, JavaScript, TypeScript, Vite, Python, FastAPI, combined with advanced UI/UX, graphic design, and augmented reality.
          </p>

          {/* Clean Action Buttons (No borders, solid fills) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreWork}
              className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="px-5 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="px-5 py-3.5 rounded-xl text-neutral-600 hover:text-neutral-900 font-semibold text-sm transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Discipline Index (Clean text list with dot separators) */}
          <div className="mt-10 pt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
            <span className="text-neutral-900 font-semibold">Specializations:</span>
            <span>Frontend & Full-Stack (React, TypeScript, FastAPI)</span>
            <span aria-hidden="true">·</span>
            <span>Healthcare & Computer Vision AI</span>
            <span aria-hidden="true">·</span>
            <span>Visual Brand Identity (Canva, Photoshop)</span>
            <span aria-hidden="true">·</span>
            <span>Snapchat Lens Studio AR</span>
          </div>
        </div>

        {/* Right Column: Clean Production Highlight Card (Soft neutral surface, zero borders) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                <span className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                  Current Focus
                </span>
                <span>October 2026 – Present</span>
              </div>
              <h2 className="text-xl font-display font-bold text-neutral-950 mb-1">
                Juni Ghana Limited
              </h2>
              <p className="text-xs font-medium text-neutral-600">
                National Service Personnel | Software Engineer · Accra, Ghana
              </p>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Contributing to software development activities in a FinTech environment. Developing responsive web interfaces with React, JavaScript, and TypeScript, and collaborating on backend REST API integration.
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Web application interfaces built with React, Vite & TypeScript</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Backend REST API consumption, integration testing & debugging</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Modern frontend architecture with practical full-stack exposure</span>
              </div>
            </div>

            {/* Featured Project Quick-Jump */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 block">Featured Project</span>
                <span className="text-xs font-semibold text-neutral-900">MedVision AI Pneumonia Diagnostics</span>
              </div>
              <a
                href="https://medvision1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Live App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
