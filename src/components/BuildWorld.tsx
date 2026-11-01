import React from 'react';
import {
  Terminal,
  ExternalLink,
  Github,
  ArrowRight
} from 'lucide-react';
import { Project, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { WebsitePreview } from './WebsitePreview';

interface BuildWorldProps {
  onOpenCaseStudy: (project: Project) => void;
  onSetCursor?: (type: CursorType, text?: string) => void;
}

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();

  return (
    <section id="build" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Engineering & Products
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight mb-4">
          Production Software Systems
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          From deploying deep transfer learning models with sub-second diagnostic classification to building scalable event platforms and high-throughput web applications.
        </p>
      </div>

      {/* FEATURED PROJECT 1: MEDVISION (Zero borders, soft neutral surface) */}
      <div className="mb-14 rounded-2xl bg-neutral-50 overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            {/* Clean Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-semibold text-neutral-900">Featured AI System</span>
              <span aria-hidden="true">·</span>
              <span>FastAPI · MobileNetV2 · Python · Vercel</span>
              <span aria-hidden="true">·</span>
              <span>94.2% Validation Accuracy</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
              MedVision — Clinical AI Pneumonia Diagnostic System
            </h3>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Deep transfer learning classifier assisting physicians with rapid triaging of pediatric chest radiographs. Features automated heatmaps, confidence intervals, and REST inference API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="medvision-case-study-btn"
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS[0])}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://medvision1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Interactive Preview Canvas */}
        <div className="p-6 sm:p-8">
          <WebsitePreview
            url="https://medvision1.vercel.app/"
            title="MedVision — AI Pneumonia Diagnostic System"
            tagline="Clinical diagnostic support tool for rapid pediatric chest radiograph classification."
            heightClass="h-96 sm:h-[460px]"
            allowLiveIframe={true}
          />
        </div>
      </div>

      {/* FEATURED PROJECT 2: YUGOGOO */}
      <div className="mb-14 rounded-2xl bg-neutral-50 overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            {/* Clean Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-semibold text-neutral-900">Live Web Platform</span>
              <span aria-hidden="true">·</span>
              <span>React · TypeScript · Node.js · Dynamic QR Engine</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
              Yugogoo — Real-time Event Discovery & Social Ticketing
            </h3>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Led full-stack architecture from inception to 120+ active community events. Built dynamic venue indexing, geospatial search, and cryptographically verified digital entrance passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="yugogoo-case-study-btn"
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS[1])}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="http://yugogoo-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Preview */}
        <div className="p-6 sm:p-8">
          <WebsitePreview
            url="http://yugogoo-website.vercel.app/"
            title="Yugogoo — Real-time Event Discovery & Ticketing"
            tagline="Location-based platform for discovering local happenings with dynamic QR passes."
            heightClass="h-96 sm:h-[460px]"
            allowLiveIframe={true}
          />
        </div>
      </div>

      {/* ADDITIONAL PRODUCTION PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UGOGO */}
        <div className="rounded-2xl bg-neutral-50 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold text-neutral-900">Urban Mobility & Venues</span>
              <span>React · Vite · Vercel</span>
            </div>
            <div>
              <h4 className="text-xl font-display font-bold text-neutral-950 mb-1">
                UGOGO — Urban Discovery & Mobility
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Location-first exploration platform combining dynamic venue indexing and commuter transit insights in Accra.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-2 flex items-center gap-2">
            <a
              href="http://ugogo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Visit Live Web App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS.find(p => p.id === 'ugogo') || BUILD_PROJECTS[2])}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs transition-colors cursor-pointer"
            >
              Case Study
            </button>
          </div>
        </div>

        {/* GRANDIOSE GLAM */}
        <div className="rounded-2xl bg-neutral-50 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold text-neutral-900">E-Commerce & Storefront</span>
              <span>React · Tailwind CSS</span>
            </div>
            <div>
              <h4 className="text-xl font-display font-bold text-neutral-950 mb-1">
                Grandiose Glam — Beauty Boutique
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Luxury cosmetics storefront with clean editorial aesthetic, responsive product catalog, and streamlined checkout experience.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-2 flex items-center gap-2">
            <a
              href="https://grandioseglam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Visit Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS.find(p => p.id === 'grandiose-glam') || BUILD_PROJECTS[3])}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs transition-colors cursor-pointer"
            >
              Case Study
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
