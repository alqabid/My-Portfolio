import React from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Sparkles, Brain, Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { services: SERVICES } = usePortfolio();
  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return Code2;
      case 'Palette':
        return Palette;
      case 'Sparkles':
        return Sparkles;
      case 'Brain':
        return Brain;
      default:
        return Code2;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A9DDFF] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAPABILITIES & COLLABORATION</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          HOW WE CAN WORK TOGETHER.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          Whether you need a full-stack web application, scroll-stopping visual branding, or custom augmented reality lenses, I deliver end-to-end craftsmanship.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((srv) => {
          const Icon = getIcon(srv.iconName);

          return (
            <motion.div
              key={srv.id}
              id={`service-card-${srv.id}`}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#111111] flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111]"
                    style={{ backgroundColor: srv.accentColor }}
                  >
                    <Icon className="w-7 h-7 text-[#111111]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#888888]">
                    READY TO SHIP
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#111111] mb-1">
                  {srv.title}
                </h3>
                <p className="text-sm font-display font-bold text-[#666666] mb-4">
                  {srv.tagline}
                </p>
                <p className="text-sm text-[#444444] leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 pt-4 border-t border-[#ECECE4]">
                  <span className="text-[11px] font-mono font-bold text-[#777777] uppercase block">
                    KEY DELIVERABLES:
                  </span>
                  {srv.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#222222]">
                      <div className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-[#ECECE4]">
                <button
                  onClick={() => {
                    playSound('pop');
                    onSelectService(srv.title);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#FAFAF7] hover:bg-[#111111] text-[#111111] hover:text-[#FFF35C] font-display font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>INQUIRE ABOUT {srv.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
