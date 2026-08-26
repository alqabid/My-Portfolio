import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Database, Layers, Sparkles, Globe } from 'lucide-react';
import { Project } from '../types';
import { playSound } from '../utils/sound';
import { WebsitePreview } from './WebsitePreview';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-white border-3 border-[#111111] rounded-3xl shadow-[10px_10px_0px_0px_#111111] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#FAFAF7] border-b-2 border-[#111111] flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase border border-[#111111]"
                  style={{ backgroundColor: project.accentColor, color: '#111111' }}
                >
                  {project.category.toUpperCase()} CASE STUDY
                </span>
                <span className="text-xs font-mono text-[#666666]">
                  Role: {project.role}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#111111]">
                {project.title}
              </h2>
              <p className="text-sm font-display font-bold text-[#555555]">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={() => {
                playSound('pop');
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#F0F0EA] shadow-[2px_2px_0px_0px_#111111] transition-all cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
            {/* Real Link Preview / Interactive Browser Frame (No Fake/AI Stock Images) */}
            {project.liveUrl ? (
              <WebsitePreview
                url={project.liveUrl}
                title={project.title}
                tagline={project.tagline}
                accentColor={project.accentColor}
                heightClass="h-80 sm:h-96"
                allowLiveIframe={true}
              />
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#111111] p-6 bg-[#111111] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9B8FF] text-[#111111] text-[10px] font-mono font-bold">
                    SYSTEM SPECIFICATION
                  </span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-[#FFF35C]">
                  {project.title}
                </h3>
                <p className="text-neutral-300 font-mono text-xs mt-1 max-w-xl">
                  {project.tagline}
                </p>
              </div>
            )}

            {/* Metrics Ribbon */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
                    <span className="text-[10px] font-mono text-[#777777] uppercase block">{m.label}</span>
                    <span className="font-display font-black text-2xl text-[#111111]">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#FFF35C]/15 border-2 border-[#111111]">
                <h3 className="font-display font-extrabold text-base text-[#111111] mb-2 uppercase">
                  THE CHALLENGE & PROBLEM
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#C9B8FF]/15 border-2 border-[#111111]">
                <h3 className="font-display font-extrabold text-base text-[#111111] mb-2 uppercase">
                  THE ARCHITECTURAL SOLUTION
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture breakdown if present */}
            {project.architecture && (
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-sm text-[#111111] uppercase tracking-wider">
                  SYSTEM ARCHITECTURE & TECH SPECIFICATIONS
                </h3>
                <div className="p-5 rounded-2xl bg-[#111111] text-white space-y-2.5 font-mono text-xs border-2 border-[#111111]">
                  {project.architecture.map((arch, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#FFF35C] font-bold">▶</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features list */}
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-sm text-[#111111] uppercase tracking-wider">
                CORE CAPABILITIES DELIVERED
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#111111] flex items-start gap-2 text-xs font-semibold text-[#333333]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies used pills */}
            <div className="pt-4 border-t border-[#ECECE4] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#777777] uppercase mr-2">
                TECH STACK:
              </span>
              {project.technologies.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#FAFAF7] border border-[#111111] font-mono text-xs font-bold text-[#111111]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[#FAFAF7] border-t-2 border-[#111111] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#FFF35C] flex items-center gap-2"
                >
                  <span>VISIT LIVE PLATFORM</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                playSound('pop');
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#111111] text-white hover:text-[#FFF35C] font-display font-bold text-xs border border-[#111111] cursor-pointer transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
