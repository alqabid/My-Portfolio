import React from 'react';
import { Code2, Palette, Glasses, Brain, Check, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
      case 'Glasses':
        return Glasses;
      case 'Brain':
        return Brain;
      default:
        return Code2;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Collaboration
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight mb-4">
          Services & Capabilities
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          From full-stack web applications and backend API integration to high-converting visual branding and interactive augmented reality lenses.
        </p>
      </div>

      {/* Services Grid (Zero borders, soft neutral surface) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((srv) => {
          const Icon = getIcon(srv.iconName);

          return (
            <div
              key={srv.id}
              className="rounded-2xl bg-neutral-50 p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-neutral-950">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-medium text-neutral-500">
                      {srv.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                    Deliverables:
                  </span>
                  {srv.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-2">
                <button
                  onClick={() => onSelectService(srv.title)}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Inquire for {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
