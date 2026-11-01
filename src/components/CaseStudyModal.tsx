import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { WebsitePreview } from './WebsitePreview';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-white border-b border-neutral-100 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                  {project.category} Case Study
                </span>
                <span aria-hidden="true">·</span>
                <span>Role: {project.role}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Real Link Preview / Interactive Browser Frame */}
            {project.liveUrl && (
              <WebsitePreview
                url={project.liveUrl}
                title={project.title}
                tagline={project.tagline}
                heightClass="h-80 sm:h-96"
                allowLiveIframe={true}
              />
            )}

            {/* Metrics Ribbon (Clean soft neutral, zero borders) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-50">
                    <span className="text-[11px] text-neutral-500 uppercase block">{m.label}</span>
                    <span className="font-display font-bold text-2xl text-neutral-950">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Solution Grid (Soft neutral, zero borders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-neutral-50">
                <h3 className="font-semibold text-xs text-neutral-900 uppercase tracking-wider mb-2">
                  The Problem & Challenge
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-neutral-50">
                <h3 className="font-semibold text-xs text-neutral-900 uppercase tracking-wider mb-2">
                  Engineering Solution
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="p-6 rounded-xl bg-neutral-50 space-y-3">
                <h3 className="font-semibold text-xs text-neutral-900 uppercase tracking-wider">
                  Key Capabilities & Architecture
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs text-neutral-500 mr-2 font-medium">Stack:</span>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-neutral-500">
              Verified Production Deployment
            </div>
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Visit Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
