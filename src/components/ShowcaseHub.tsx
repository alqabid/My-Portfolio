import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Terminal, Palette, Glasses, Layers } from 'lucide-react';
import { BuildWorld } from './BuildWorld';
import { Project, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

// Lazy-load secondary showcase tabs on demand
const DesignWorld = lazy(() =>
  import('./DesignWorld').then((m) => ({ default: m.DesignWorld }))
);
const ARWorld = lazy(() =>
  import('./ARWorld').then((m) => ({ default: m.ARWorld }))
);
const SkillConstellation = lazy(() =>
  import('./SkillConstellation').then((m) => ({ default: m.SkillConstellation }))
);

interface ShowcaseHubProps {
  activeTab?: string;
  onSelectCaseStudy: (project: Project) => void;
  onSetCursor?: (type: CursorType, text?: string) => void;
}

export type ShowcaseTabType = 'build' | 'design' | 'ar' | 'skills';

const TabLoadingFallback: React.FC = () => (
  <div className="py-10 space-y-4 animate-pulse">
    <div className="h-48 rounded-2xl bg-neutral-50" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="h-44 rounded-2xl bg-neutral-50" />
      <div className="h-44 rounded-2xl bg-neutral-50" />
      <div className="h-44 rounded-2xl bg-neutral-50" />
    </div>
  </div>
);

export const ShowcaseHub: React.FC<ShowcaseHubProps> = ({
  activeTab: externalActiveTab,
  onSelectCaseStudy,
  onSetCursor
}) => {
  const { buildProjects } = usePortfolio();
  const [activeTab, setActiveTab] = useState<ShowcaseTabType>('build');

  useEffect(() => {
    if (externalActiveTab && ['build', 'design', 'ar', 'skills'].includes(externalActiveTab)) {
      setActiveTab(externalActiveTab as ShowcaseTabType);
    }
  }, [externalActiveTab]);

  const tabs = [
    {
      id: 'build' as const,
      label: 'Software & Apps',
      icon: Terminal,
      tag: `${buildProjects.length} Builds`
    },
    {
      id: 'design' as const,
      label: 'Brand & Visual Design',
      icon: Palette,
      tag: 'Canva & Affinity'
    },
    {
      id: 'ar' as const,
      label: 'Snapchat AR & 3D',
      icon: Glasses,
      tag: '850K+ Views'
    },
    {
      id: 'skills' as const,
      label: 'Tech Stack & Skills',
      icon: Layers,
      tag: 'Code & Design'
    }
  ];

  return (
    <section id="work" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Hub Navigation Bar (Zero borders, clean solid surfaces) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Interactive Portfolio Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
              Selected Works & Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
            Toggle between software engineering, graphic design, and augmented reality lenses.
          </p>
        </div>

        {/* Tab Pills (Clean, modern, interactive) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span className="font-semibold">{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-neutral-800 text-neutral-300' : 'bg-white text-neutral-500'
                  }`}
                >
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display Area */}
      <div>
        {activeTab === 'build' && (
          <div id="build">
            <BuildWorld
              onOpenCaseStudy={onSelectCaseStudy}
              onSetCursor={onSetCursor}
            />
          </div>
        )}

        {activeTab === 'design' && (
          <div id="design">
            <Suspense fallback={<TabLoadingFallback />}>
              <DesignWorld onSetCursor={onSetCursor} />
            </Suspense>
          </div>
        )}

        {activeTab === 'ar' && (
          <div id="ar">
            <Suspense fallback={<TabLoadingFallback />}>
              <ARWorld onSetCursor={onSetCursor} />
            </Suspense>
          </div>
        )}

        {activeTab === 'skills' && (
          <div id="skills">
            <Suspense fallback={<TabLoadingFallback />}>
              <SkillConstellation onSetCursor={onSetCursor} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
};
