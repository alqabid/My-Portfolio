import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Palette, Glasses, ArrowUpRight, Sparkles, Cpu, Image, Layers } from 'lucide-react';
import { playSound } from '../utils/sound';
import { CursorType } from '../types';

interface WorldSelectorProps {
  onSelectWorld: (worldId: 'build' | 'design' | 'ar') => void;
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({ onSelectWorld, onSetCursor }) => {
  const [hoveredWorld, setHoveredWorld] = useState<'build' | 'design' | 'ar' | null>(null);

  const worlds = [
    {
      id: 'build' as const,
      number: '01',
      title: 'BUILD',
      category: 'Software & AI Development',
      tagline: 'Turning complex logic into lightning software.',
      accent: '#FFF35C',
      hoverBorder: 'hover:border-[#FFF35C]',
      icon: Terminal,
      iconColor: 'bg-[#FFF35C]',
      highlights: ['Computer Vision (MedVision)', 'Location Discovery (Yugogoo)', 'FastAPI & Python Microservices', 'React & TypeScript Systems'],
      metric: '94.2% AI Accuracy',
      statLabel: 'Deep Transfer Learning'
    },
    {
      id: 'design' as const,
      number: '02',
      title: 'DESIGN',
      category: 'Visual Content & Thumbnails',
      tagline: 'Crafting visuals that stop the infinite scroll.',
      accent: '#FFB7D5',
      hoverBorder: 'hover:border-[#FFB7D5]',
      icon: Palette,
      iconColor: 'bg-[#FFB7D5]',
      highlights: ['High-CTR YouTube Thumbnails', 'Canva Advanced & Photoshop Master', 'Brand Identities & Campaign Decks', 'Tactile UI/UX Design'],
      metric: '14.8% Avg CTR',
      statLabel: 'High Converting Visuals'
    },
    {
      id: 'ar' as const,
      number: '03',
      title: 'AR',
      category: 'Snapchat Lens Studio & 3D',
      tagline: 'Reality is just another interactive canvas.',
      accent: '#C9B8FF',
      hoverBorder: 'hover:border-[#C9B8FF]',
      icon: Glasses,
      iconColor: 'bg-[#C9B8FF]',
      highlights: ['Custom Facial Tracking Shaders', '3D Asset Integration & PBR Shaders', 'Segmentation & VFX Particles', 'Brand & Festival Experiences'],
      metric: '250K+ Views',
      statLabel: 'Lens Impressions'
    }
  ];

  return (
    <section id="worlds" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF35C]" />
            <span>THREE MULTIDISCIPLINARY REALMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#111111] tracking-tight">
            CHOOSE YOUR EXPERIENCE
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#666666] max-w-md">
          Explore Abdul's creative ecosystem across code, high-impact visual design, and augmented reality.
        </p>
      </div>

      {/* Three Giant Floating World Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {worlds.map((w) => {
          const Icon = w.icon;
          const isHovered = hoveredWorld === w.id;

          return (
            <motion.div
              key={w.id}
              id={`world-card-${w.id}`}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onMouseEnter={() => {
                setHoveredWorld(w.id);
                playSound('pop');
                onSetCursor('explore', `ENTER ${w.title}`);
              }}
              onMouseLeave={() => {
                setHoveredWorld(null);
                onSetCursor('default');
              }}
              onClick={() => {
                playSound('whoosh');
                onSelectWorld(w.id);
              }}
              className={`group relative rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[6px_6px_0px_0px_#111111] active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden`}
              style={{
                backgroundColor: isHovered ? `${w.accent}15` : '#FFFFFF'
              }}
            >
              {/* Top Accent corner badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${w.iconColor} border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111]`}>
                    <Icon className="w-6 h-6 text-[#111111]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#888888] block">
                      WORLD // {w.number}
                    </span>
                    <span className="font-display font-bold text-xs text-[#111111] uppercase tracking-wide">
                      {w.category}
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-[#111111] bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Main Headline */}
              <div className="mb-8">
                <h3 className="text-4xl sm:text-5xl font-display font-black text-[#111111] tracking-tight mb-2 flex items-center gap-2">
                  <span>{w.title}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#555555] font-medium leading-relaxed">
                  {w.tagline}
                </p>
              </div>

              {/* Highlights list */}
              <div className="space-y-2 mb-8 pt-4 border-t border-[#ECECE4]">
                {w.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-display font-semibold text-[#333333]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Metric Pill */}
              <div className="pt-4 border-t border-[#ECECE4] flex items-center justify-between">
                <div>
                  <span className="font-display font-black text-lg text-[#111111] block">
                    {w.metric}
                  </span>
                  <span className="text-[10px] font-mono text-[#777777] uppercase">
                    {w.statLabel}
                  </span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-[#111111] text-white font-display font-bold text-xs tracking-wider uppercase group-hover:bg-[#FFF35C] group-hover:text-[#111111] group-hover:border group-hover:border-[#111111] transition-colors">
                  EXPLORE →
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
