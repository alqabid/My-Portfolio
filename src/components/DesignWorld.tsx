import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  MessageSquare,
  Mail,
  ArrowRight,
  Award,
  ExternalLink,
  Eye,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Layers,
  LayoutGrid,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CursorType, DesignItem } from '../types';
import { playSound } from '../utils/sound';

interface DesignWorldProps {
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const DesignWorld: React.FC<DesignWorldProps> = ({ onSetCursor }) => {
  const {
    personalInfo: PERSONAL_INFO,
    designItems,
    isAdminLoggedIn,
    setIsAdminPortalOpen
  } = usePortfolio();

  // Category filter and search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox modal state
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedDesign) return;

      if (e.key === 'Escape') {
        setSelectedDesign(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        navigateDesign(1);
      } else if (e.key === 'ArrowLeft') {
        navigateDesign(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDesign, designItems]);

  // Reset zoom when selecting different design
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedDesign]);

  // Categories config
  const categories = useMemo(() => [
    { id: 'all', label: 'All Designs' },
    { id: 'flyers', label: 'Flyers & Events' },
    { id: 'posters', label: 'Posters & Art' },
    { id: 'thumbnails', label: 'YouTube Thumbnails' },
    { id: 'branding', label: 'Branding & Identity' },
    { id: 'social', label: 'Social Graphics' }
  ], []);

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    return designItems.filter((item) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory === 'flyers') {
        matchesCategory = item.category === 'flyers' || item.tags.some(t => t.toLowerCase().includes('flyer'));
      } else if (selectedCategory === 'posters') {
        matchesCategory = item.category === 'posters' || item.tags.some(t => t.toLowerCase().includes('poster'));
      } else if (selectedCategory === 'thumbnails') {
        matchesCategory = item.category === 'thumbnails' || item.tags.some(t => t.toLowerCase().includes('thumbnail'));
      } else if (selectedCategory === 'branding') {
        matchesCategory = item.category === 'branding' || item.category === 'marketing';
      } else if (selectedCategory === 'social') {
        matchesCategory = item.category === 'social' || item.category === 'ui';
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        item.title.toLowerCase().includes(query) ||
        (item.description || '').toLowerCase().includes(query) ||
        (item.clientOrProject || '').toLowerCase().includes(query) ||
        (item.tools || []).some(t => t.toLowerCase().includes(query)) ||
        (item.tags || []).some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [designItems, selectedCategory, searchQuery]);

  const navigateDesign = (direction: number) => {
    if (!selectedDesign) return;
    const currentIndex = filteredDesigns.findIndex((d) => d.id === selectedDesign.id);
    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = filteredDesigns.length - 1;
    if (newIndex >= filteredDesigns.length) newIndex = 0;

    playSound('click');
    setSelectedDesign(filteredDesigns[newIndex]);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'flyers':
        return 'bg-[#FFF35C] text-[#111111]';
      case 'posters':
        return 'bg-[#A9DDFF] text-[#111111]';
      case 'thumbnails':
        return 'bg-[#FFB7D5] text-[#111111]';
      case 'branding':
        return 'bg-[#C9B8FF] text-[#111111]';
      case 'social':
        return 'bg-[#B9F5D0] text-[#111111]';
      default:
        return 'bg-neutral-200 text-[#111111]';
    }
  };

  return (
    <section id="design" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFB7D5]/80 border border-neutral-200/80 text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider mb-4">
          <Palette className="w-3.5 h-3.5" />
          <span>DESIGN WORLD // GRAPHIC DESIGN & FLYER SHOWCASE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          VISUALS THAT COMMAND ATTENTION.
        </h2>
        <p className="text-base sm:text-xl text-neutral-600 max-w-3xl leading-relaxed">
          Showcase of bespoke promotional flyers, event posters, viral YouTube thumbnails, and brand identities crafted across Canva Advanced, Adobe Photoshop, and Figma.
        </p>

        {/* Tools Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-neutral-200/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C4CC]" />
            <span className="font-display font-bold text-xs text-[#111111]">CANVA — ADVANCED MASTER</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-neutral-200/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#31A8FF]" />
            <span className="font-display font-bold text-xs text-[#111111]">ADOBE PHOTOSHOP</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-neutral-200/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F24E1E]" />
            <span className="font-display font-bold text-xs text-[#111111]">FIGMA</span>
          </div>
        </div>
      </div>

      {/* Flyer & Design Showcase: Loaded Items vs Empty Showcase Ready State */}
      {designItems.length === 0 ? (
        <div className="p-8 sm:p-14 text-center rounded-3xl bg-white border border-neutral-200/80 space-y-6 mb-16">
          <div className="w-16 h-16 rounded-2xl bg-[#FFB7D5] flex items-center justify-center mx-auto">
            <Palette className="w-8 h-8 text-[#111111]" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#111111]">
              DESIGN SHOWCASE READY
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Authentic event flyers, custom brand graphics, and promotional posters will appear here. No simulated or artificial placeholders are displayed — only real visual deliverables.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              onClick={() => playSound('click')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FFF35C] border border-neutral-300 font-display font-bold text-sm text-[#111111] hover:bg-[#faee37] active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Commission Custom Flyer</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email || 'abdulqabidsiaka@gmail.com'}?subject=Graphic%20Design%20Commission`}
              onClick={() => playSound('click')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-neutral-200/80 font-display font-bold text-sm text-[#111111] hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Request Brand Kit</span>
            </a>
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  playSound('click');
                  setIsAdminPortalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#111111] text-[#FFF35C] font-display font-bold text-sm hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Flyer</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Interactive Category & Search Controls */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-neutral-200/80">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('click');
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input & Item Counter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flyers, tools, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-neutral-200 focus:border-neutral-400 text-xs font-mono text-[#111111] placeholder:text-neutral-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFF35C] border border-neutral-300 text-[11px] font-mono font-bold text-[#111111] whitespace-nowrap">
            <span>{filteredDesigns.length} ASSETS</span>
          </div>
        </div>
      </div>

      {/* Flyer & Design Showcase Grid */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDesigns.map((design) => {
            const isFlyerOrPoster = design.category === 'flyers' || design.category === 'posters' || design.aspectRatio === '4/5' || design.aspectRatio === '3/4';
            const categoryBadge = getCategoryBadgeColor(design.category);

            return (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group rounded-3xl bg-white border border-neutral-200/80 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-neutral-400"
              >
                {/* Visual Image Container with Flyer Aspect Ratio */}
                <div
                  className={`relative w-full bg-[#1A1A1A] overflow-hidden border-b border-neutral-200/80 cursor-pointer group/img ${
                    isFlyerOrPoster ? 'aspect-[4/5]' : 'aspect-[16/10]'
                  }`}
                  onClick={() => {
                    playSound('click');
                    setSelectedDesign(design);
                  }}
                  onMouseEnter={() => onSetCursor('hover', 'PREVIEW')}
                  onMouseLeave={() => onSetCursor('default')}
                >
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                    <span className={`px-2.5 py-1 rounded-full border border-neutral-200/80 text-[10px] font-mono font-bold uppercase ${categoryBadge}`}>
                      {design.category}
                    </span>

                    {design.metrics && (
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono">
                        {design.metrics}
                      </span>
                    )}
                  </div>

                  {/* Quick Inspect Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 pointer-events-none">
                    <div className="px-4 py-2 rounded-2xl bg-[#FFF35C] border border-neutral-300 text-[#111111] font-display font-extrabold text-xs flex items-center gap-2 scale-90 group-hover/img:scale-100 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>Inspect Flyer</span>
                    </div>
                  </div>

                  {/* Aspect Ratio Pill */}
                  {design.aspectRatio && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/15 text-[10px] font-mono text-white/90">
                      {design.aspectRatio}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {design.clientOrProject && (
                      <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                        {design.clientOrProject}
                      </span>
                    )}
                    <h3 className="text-xl font-display font-extrabold text-[#111111] leading-snug group-hover:text-neutral-900">
                      {design.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                      {design.description || 'Custom crafted visual asset engineered with high contrast, deliberate typography, and balanced spacing.'}
                    </p>
                  </div>

                  {/* Tools & Tags */}
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    {design.tools && design.tools.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {design.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200/80 text-[10px] font-mono text-neutral-700"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-1">
                      {/* Open Lightbox Button */}
                      <button
                        onClick={() => {
                          playSound('click');
                          setSelectedDesign(design);
                        }}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-white font-display font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>

                      {/* External Live Preview Link (if available) */}
                      {design.previewUrl && (
                        <a
                          href={design.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-[#FFF35C] hover:bg-[#faee37] text-[#111111] font-display font-bold text-xs flex items-center justify-center gap-1 border border-neutral-300 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                          title={design.previewLinkLabel || 'Open Live Preview'}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">
                            {design.previewLinkLabel || 'Preview'}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-neutral-200/80 space-y-4 mb-16">
          <Palette className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="text-xl font-display font-extrabold text-[#111111]">
            No matching designs found
          </h3>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            Try adjusting your search query or switching to another category tab above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#111111] text-white font-display font-bold text-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  )}

      {/* Interactive Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#14151B] border border-neutral-800 rounded-3xl overflow-hidden flex flex-col md:flex-row text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playSound('pop');
                  setSelectedDesign(null);
                }}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={() => navigateDesign(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer hidden sm:flex items-center justify-center"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateDesign(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer hidden sm:flex items-center justify-center"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Visual Showcase Stage */}
              <div className="md:w-3/5 bg-neutral-950 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800 min-h-[300px] md:min-h-[520px]">
                {/* Image Zoom Control Bar */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm border border-neutral-800 rounded-xl p-1 font-mono text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                    className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-[11px] text-neutral-400">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                    className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="px-1.5 py-0.5 rounded text-[10px] text-neutral-400 hover:text-white"
                  >
                    Reset
                  </button>
                </div>

                {/* High-res Flyer Display */}
                <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center overflow-auto p-2 scrollbar-thin">
                  <motion.img
                    src={selectedDesign.imageUrl}
                    alt={selectedDesign.title}
                    animate={{ scale: zoomLevel }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl border border-neutral-800"
                  />
                </div>
              </div>

              {/* Information & Actions Pane */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full space-y-6">
                <div className="space-y-4">
                  {/* Category & Tag */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FFF35C] text-[#111111] font-mono font-bold text-[10px] uppercase border border-[#111111]">
                      {selectedDesign.category}
                    </span>
                    {selectedDesign.aspectRatio && (
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 font-mono text-[10px] text-neutral-400">
                        {selectedDesign.aspectRatio}
                      </span>
                    )}
                  </div>

                  {/* Title & Client */}
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-white leading-tight">
                      {selectedDesign.title}
                    </h3>
                    {selectedDesign.clientOrProject && (
                      <p className="text-xs font-mono text-[#FFF35C] mt-1">
                        Client / Context: {selectedDesign.clientOrProject}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {selectedDesign.description || 'Custom promotional visual created with deliberate layout hierarchy, mobile legibility, and high-impact typography.'}
                  </p>

                  {/* Tools */}
                  {selectedDesign.tools && selectedDesign.tools.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                        Production Tools
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDesign.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Process Highlights */}
                  {selectedDesign.process && selectedDesign.process.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                        Design Methodology
                      </span>
                      <ul className="space-y-1">
                        {selectedDesign.process.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Action Links */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                  {selectedDesign.previewUrl && (
                    <a
                      href={selectedDesign.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF35C] hover:bg-[#faee37] text-[#111111] font-display font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{selectedDesign.previewLinkLabel || 'Open Live Preview / External Link'}</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/233238318021?text=Hi%20Abdul,%20I%20saw%20your%20design%20"${encodeURIComponent(selectedDesign.title)}"%20and%20I'd%20like%20to%20commission%20a%20flyer/graphic%20like%20this.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire About This Design</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bespoke Commission Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF35C] border border-neutral-200/80 text-[11px] font-mono font-bold text-[#111111]">
            <Award className="w-3.5 h-3.5" />
            <span>CUSTOM COMMISSIONS & FLYER PACKAGES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#111111]">
            Need Custom Flyers, Thumbnails, or Branding?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            All flyer designs, event posters, and visual campaigns are created bespoke to match your event theme, creator brand, and audience. Reach out directly to commission single promotional flyers or full event packages.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-extrabold text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Custom%20Flyer%20%26%20Design%20Inquiry`}
            className="px-6 py-3.5 rounded-2xl bg-[#111111] hover:bg-neutral-800 text-[#FFF35C] font-display font-extrabold text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email for Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
};
