import React from 'react';
import { Terminal, Palette, Glasses, ArrowRight } from 'lucide-react';
import { CursorType } from '../types';

interface WorldSelectorProps {
  onSelectWorld: (worldId: 'build' | 'design' | 'ar') => void;
  onSetCursor?: (type: CursorType, text?: string) => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({ onSelectWorld }) => {
  const disciplines = [
    {
      id: 'build' as const,
      number: '01',
      title: 'Software & AI Systems',
      description: 'Developing high-performance web applications with React, TypeScript, Vite, Python, and FastAPI. Specializing in computer vision diagnostics and location platforms.',
      icon: Terminal,
      highlights: ['React & TypeScript Systems', 'FastAPI Microservices', 'Computer Vision (MedVision AI)', 'Geospatial Discovery (Yugogoo)'],
      metric: '94.2% AI Accuracy',
      metricLabel: 'MobileNetV2 Diagnostic Model'
    },
    {
      id: 'design' as const,
      number: '02',
      title: 'Brand & Visual Design',
      description: 'Crafting high-impact promotional graphics, event flyers, visual branding, and marketing assets using advanced Canva, Figma, and Adobe Photoshop.',
      icon: Palette,
      highlights: ['Event Posters & Flyers', 'Advanced Canva & Photoshop', 'Social Campaign Collateral', 'High-CTR Visual Assets'],
      metric: '14.8% Average CTR',
      metricLabel: 'Promotional Campaign Assets'
    },
    {
      id: 'ar' as const,
      number: '03',
      title: 'Augmented Reality & 3D',
      description: 'Building immersive facial tracking, interactive effects, and branded AR experiences within Snapchat Lens Studio with custom shaders and 3D assets.',
      icon: Glasses,
      highlights: ['Snapchat Lens Studio', 'Facial Tracking & Segmentation', 'Interactive 3D Assets & VFX', 'Festival & Brand Filters'],
      metric: '250K+ Views',
      metricLabel: 'Global Lens Impressions'
    }
  ];

  return (
    <section id="worlds" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Areas of Practice
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
            Core Disciplines
          </h2>
        </div>
        <p className="text-sm text-neutral-600 max-w-md">
          A unique combination of production software engineering, high-converting graphic design, and augmented reality technology.
        </p>
      </div>

      {/* Cards Grid: Clean Soft Neutral Surfaces with Zero Borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {disciplines.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.id}
              onClick={() => onSelectWorld(d.id)}
              className="group rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 p-7 flex flex-col justify-between cursor-pointer transition-colors"
            >
              <div>
                {/* Header with Icon and Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-400">
                    {d.number}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold text-neutral-950 mb-2">
                  {d.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {d.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-6 pt-2">
                  {d.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-neutral-700 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-neutral-400" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metric & Link (Zero pills, clean text) */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-neutral-950 block">
                    {d.metric}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {d.metricLabel}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
