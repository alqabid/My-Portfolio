import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Sparkles, Layers, ArrowRight, Code, Palette, Glasses, Brain } from 'lucide-react';
import { SkillNode, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface SkillConstellationProps {
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({ onSetCursor }) => {
  const {
    skillNodes: SKILL_NODES,
    buildProjects: BUILD_PROJECTS,
    designItems: DESIGN_ITEMS,
    arLenses: AR_LENSES
  } = usePortfolio();
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_NODES[0] || {} as SkillNode);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const activeSkill = hoveredSkill || selectedSkill;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'code':
        return '#FFF35C';
      case 'design':
        return '#FFB7D5';
      case 'ar':
        return '#C9B8FF';
      case 'ai':
        return '#B9F5D0';
      default:
        return '#A9DDFF';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'code':
        return Code;
      case 'design':
        return Palette;
      case 'ar':
        return Glasses;
      case 'ai':
        return Brain;
      default:
        return Code;
    }
  };

  // Find related projects to display
  const getConnectedProjectsList = (projectIds: string[]) => {
    const list: { title: string; category: string }[] = [];
    projectIds.forEach((pid) => {
      const b = BUILD_PROJECTS.find((p) => p.id === pid);
      if (b) list.push({ title: b.title, category: 'Software/AI' });
      const d = DESIGN_ITEMS.find((p) => p.id === pid);
      if (d) list.push({ title: d.title, category: 'Visual Design' });
      const a = AR_LENSES.find((p) => p.id === pid);
      if (a) list.push({ title: a.name, category: 'AR Lens' });
    });
    return list;
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B9F5D0] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Network className="w-3.5 h-3.5" />
          <span>INTERACTIVE CONSTELLATION // SKILL ARCHITECTURE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          CONNECTING CODE, DESIGN & REALITY.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          Hover or click on any node in the constellation to trace technical connections, production proficiencies, and attached project case studies.
        </p>
      </div>

      {/* Main Graph & Detail Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Node Constellation Matrix */}
        <div className="lg:col-span-7 rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between relative overflow-hidden min-h-[440px]">
          {/* Subtle background grid */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          {/* Central Hub Badge */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[#ECECE4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#111111] text-[#FFF35C] font-display font-extrabold text-sm flex items-center justify-center border-2 border-[#111111] shadow-[2px_2px_0px_0px_#FFF35C]">
                AQ
              </div>
              <div>
                <span className="font-display font-black text-base text-[#111111]">
                  ABDUL QABID SIAKA
                </span>
                <span className="text-[11px] font-mono text-[#666666] block">
                  Core Competency Constellation
                </span>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono font-bold text-[#111111]">12 ACTIVE NODES</span>
              <span className="text-[10px] font-mono text-[#10B981] block font-bold">● Fully Integrated</span>
            </div>
          </div>

          {/* Interactive Node Grid (Floating interactive pills) */}
          <div className="relative z-10 py-8 flex flex-wrap gap-3 items-center justify-center">
            {SKILL_NODES.map((node) => {
              const isSelected = activeSkill.id === node.id;
              const Icon = getCategoryIcon(node.category);
              const nodeColor = getCategoryColor(node.category);

              return (
                <motion.button
                  key={node.id}
                  id={`skill-node-${node.id}`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    playSound('pop');
                    setSelectedSkill(node);
                  }}
                  onMouseEnter={() => {
                    setHoveredSkill(node);
                    playSound('click');
                    onSetCursor('explore', node.name.toUpperCase());
                  }}
                  onMouseLeave={() => {
                    setHoveredSkill(null);
                    onSetCursor('default');
                  }}
                  className={`px-4 py-2.5 rounded-2xl border-2 font-display font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#111111] text-[#FFF35C] border-[#111111] shadow-[4px_4px_0px_0px_#FFF35C] -translate-y-1'
                      : 'bg-[#FAFAF7] text-[#111111] border-[#111111] hover:bg-white shadow-[2px_2px_0px_0px_#111111]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: nodeColor }}
                  />
                  <Icon className="w-3.5 h-3.5" />
                  <span>{node.name}</span>
                  <span className="text-[10px] font-mono font-normal opacity-80">
                    {node.level}%
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Category Legend */}
          <div className="relative z-10 pt-4 border-t border-[#ECECE4] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#444444]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFF35C] border border-[#111111]" /> Software
              </span>
              <span className="flex items-center gap-1.5 text-[#444444]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB7D5] border border-[#111111]" /> Design
              </span>
              <span className="flex items-center gap-1.5 text-[#444444]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9B8FF] border border-[#111111]" /> AR Lens
              </span>
              <span className="flex items-center gap-1.5 text-[#444444]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B9F5D0] border border-[#111111]" /> AI / ML
              </span>
            </div>
            <span className="text-[#888888]">Click node for breakdown</span>
          </div>
        </div>

        {/* Right: Active Node Deep Breakdown Panel */}
        <div className="lg:col-span-5 rounded-3xl bg-[#FAFAF7] border-3 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Top Node Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase border border-[#111111] inline-block mb-2"
                    style={{
                      backgroundColor: getCategoryColor(activeSkill.category),
                      color: '#111111'
                    }}
                  >
                    {activeSkill.category.toUpperCase()} COMPETENCY
                  </span>
                  <h3 className="text-3xl font-display font-black text-[#111111]">
                    {activeSkill.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="font-display font-black text-2xl text-[#111111]">
                    {activeSkill.level}%
                  </span>
                  <span className="text-[10px] font-mono text-[#666666] block">Proficiency</span>
                </div>
              </div>

              {/* Progress Level Bar */}
              <div className="w-full h-3 rounded-full bg-white border-2 border-[#111111] overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeSkill.level}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[#111111]"
                />
              </div>

              {/* Narrative description */}
              <p className="text-sm text-[#444444] leading-relaxed font-medium">
                {activeSkill.description}
              </p>

              {/* Connected Real-World Projects */}
              <div className="pt-3 border-t border-[#E0E0D8]">
                <span className="text-xs font-mono font-bold text-[#111111] uppercase block mb-2.5">
                  DEPLOYED IN PORTFOLIO PROJECTS:
                </span>
                <div className="space-y-2">
                  {getConnectedProjectsList(activeSkill.connectedProjects).map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-[#111111] flex items-center justify-between text-xs"
                    >
                      <span className="font-display font-bold text-[#111111]">
                        {proj.title}
                      </span>
                      <span className="text-[10px] font-mono bg-[#FAFAF7] px-2 py-0.5 rounded border border-[#E0E0D8] text-[#555555]">
                        {proj.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-[#E0E0D8] flex items-center justify-between text-xs font-mono text-[#777777]">
            <span>Validated across 30+ production deliverables</span>
            <span className="text-[#111111] font-bold">2026 Core Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
};
