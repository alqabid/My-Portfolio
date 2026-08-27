import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  MapPin,
  Ticket,
  QrCode,
  Globe,
  Monitor,
  Layout
} from 'lucide-react';
import { Project, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { WebsitePreview } from './WebsitePreview';

interface BuildWorldProps {
  onOpenCaseStudy: (project: Project) => void;
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy, onSetCursor }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();

  return (
    <section id="build" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF35C] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>BUILD MODE // SOFTWARE & AI SYSTEMS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          ENGINEERED FOR SPEED & PRECISION.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          From deploying deep computer vision models with sub-second inference to orchestrating geospatial platforms and high-throughput web applications.
        </p>
      </div>

      {/* FEATURED PROJECT 1: MEDVISION with Real Live Link Preview */}
      <div className="mb-16 rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
        <div className="p-6 sm:p-10 border-b-2 border-[#111111] bg-[#FAFAF7] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#FFF35C] border border-[#111111] text-xs font-bold font-mono text-[#111111]">
                FEATURED AI CASE STUDY
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#111111] text-[11px] font-mono text-[#555555]">
                MobileNetV2 · FastAPI · Vercel
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111]">
              MedVision — Clinical AI Pneumonia Diagnostic System
            </h3>
            <p className="text-sm sm:text-base text-[#555555] mt-1 max-w-2xl">
              Deep transfer learning classifier assisting physicians with rapid triaging of pediatric chest radiographs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="medvision-case-study-btn"
              onClick={() => {
                playSound('pop');
                onOpenCaseStudy(BUILD_PROJECTS[0]);
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-xs border-2 border-[#111111] shadow-[3px_3px_0px_0px_#FFF35C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://medvision1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-[#FFF35C] hover:bg-[#ffe338] text-[#111111] font-display font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
              title="Visit MedVision Live Web App"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:bg-[#F0F0EA] transition-all"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-10">
          <WebsitePreview
            url="https://medvision1.vercel.app/"
            title="MedVision — AI Pneumonia Diagnostic System"
            tagline="Clinical diagnostic support tool for rapid pediatric chest radiograph classification."
            accentColor="#FFF35C"
            heightClass="h-96 sm:h-[480px]"
            allowLiveIframe={true}
          />
        </div>
      </div>

      {/* FEATURED PROJECT 2: YUGOGOO with Live Link Preview */}
      <div className="mb-16 rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
        <div className="p-6 sm:p-10 border-b-2 border-[#111111] bg-[#FAFAF7] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#A9DDFF] border border-[#111111] text-xs font-bold font-mono text-[#111111]">
                LOCATION PRODUCT & TICKETING
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#111111] text-[11px] font-mono text-[#555555]">
                React · Node.js · Vercel · QR Engine
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111]">
              Yugogoo — Real-time Event Discovery & Social Ticketing
            </h3>
            <p className="text-sm sm:text-base text-[#555555] mt-1 max-w-2xl">
              Led product architecture from zero to 120+ active community events with cryptographically verified digital passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="yugogoo-case-study-btn"
              onClick={() => {
                playSound('pop');
                onOpenCaseStudy(BUILD_PROJECTS[1]);
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#A9DDFF] font-display font-bold text-xs border-2 border-[#111111] shadow-[3px_3px_0px_0px_#A9DDFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="http://yugogoo-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-[#A9DDFF] hover:bg-[#8ecefa] text-[#111111] font-display font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
              title="Visit Yugogoo Live Web Platform"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:bg-[#F0F0EA] transition-all"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-10">
          <WebsitePreview
            url="http://yugogoo-website.vercel.app/"
            title="Yugogoo — Real-time Event Discovery & Ticketing"
            tagline="Location-based platform for discovering local happenings with dynamic QR passes."
            accentColor="#A9DDFF"
            heightClass="h-96 sm:h-[480px]"
            allowLiveIframe={true}
          />
        </div>
      </div>

      {/* ADDITIONAL PRODUCTION PROJECTS GRID (UGOGO, GRANDIOSE GLAM) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UGOGO */}
        <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#111111] p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_#111111] transition-all hover:-translate-y-1">
          <div className="space-y-3">
            {/* Live Link Preview Browser Header */}
            <div className="rounded-xl overflow-hidden border border-[#111111] bg-[#111111]">
              <div className="px-3 py-1.5 bg-[#1C1C1C] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                  ugogo.vercel.app
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="h-36 bg-[#151515] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.microlink.io?url=http%3A%2F%2Fugogo.vercel.app&screenshot=true&meta=false&embed=screenshot.url"
                  alt="UGOGO Live Preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-[#B9F5D0] font-bold">
                    ● Production Live on Vercel
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#B9F5D0] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                  MOBILITY & LOCAL
                </span>
                <span className="text-[10px] font-mono text-[#777777]">React · Vite</span>
              </div>
              <h4 className="text-lg font-display font-extrabold text-[#111111]">
                UGOGO — Urban Discovery & Mobility
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                Location-first urban exploration platform combining dynamic venue indexing and commuter insights.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECECE4] flex items-center justify-between gap-2">
            <a
              href="http://ugogo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-[#333333] text-[#B9F5D0] font-display font-bold text-xs border border-[#111111] text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS.find(p => p.id === 'ugogo') || BUILD_PROJECTS[2])}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0F0EA] text-[#111111] font-display font-bold text-xs border border-[#111111] cursor-pointer"
              title="View Case Study"
            >
              CASE STUDY
            </button>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-[#111111] text-[#111111] hover:bg-[#F0F0EA]"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* GRANDIOSE GLAM */}
        <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#111111] p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_#111111] transition-all hover:-translate-y-1">
          <div className="space-y-3">
            {/* Live Link Preview Browser Header */}
            <div className="rounded-xl overflow-hidden border border-[#111111] bg-[#111111]">
              <div className="px-3 py-1.5 bg-[#1C1C1C] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                  grandioseglam.vercel.app
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="h-36 bg-[#151515] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.microlink.io?url=https%3A%2F%2Fgrandioseglam.vercel.app&screenshot=true&meta=false&embed=screenshot.url"
                  alt="Grandiose Glam Live Preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-[#FFB7D5] font-bold">
                    ● Production Live on Vercel
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#FFB7D5] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                  LUXURY E-COMMERCE
                </span>
                <span className="text-[10px] font-mono text-[#777777]">React · Tailwind</span>
              </div>
              <h4 className="text-lg font-display font-extrabold text-[#111111]">
                Grandiose Glam — Beauty Storefront
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                High-converting luxury cosmetics boutique with editorial aesthetics, rapid cart drawer, and checkout funnels.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECECE4] flex items-center justify-between gap-2">
            <a
              href="https://grandioseglam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-[#333333] text-[#FFB7D5] font-display font-bold text-xs border border-[#111111] text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS.find(p => p.id === 'grandiose-glam') || BUILD_PROJECTS[3])}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0F0EA] text-[#111111] font-display font-bold text-xs border border-[#111111] cursor-pointer"
              title="View Case Study"
            >
              CASE STUDY
            </button>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-[#111111] text-[#111111] hover:bg-[#F0F0EA]"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
