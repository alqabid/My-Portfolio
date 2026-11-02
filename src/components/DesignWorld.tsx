import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  MessageSquare,
  Mail,
  ArrowRight,
  ExternalLink,
  Eye,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CursorType, DesignItem } from '../types';

interface DesignWorldProps {
  onSetCursor?: (type: CursorType, text?: string) => void;
}

export const DesignWorld: React.FC<DesignWorldProps> = () => {
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

  useEffect(() => {
    setZoomLevel(1);
  }, [selectedDesign]);

  const categories = useMemo(() => [
    { id: 'all', label: 'All Work' },
    { id: 'flyers', label: 'Flyers & Events' },
    { id: 'posters', label: 'Posters & Art' },
    { id: 'thumbnails', label: 'Thumbnails' },
    { id: 'branding', label: 'Brand Identity' },
    { id: 'social', label: 'Social Content' }
  ], []);

  const filteredDesigns = useMemo(() => {
    return designItems.filter((item) => {
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

    setSelectedDesign(filteredDesigns[newIndex]);
  };

  return (
    <section id="design" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Creative Direction
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight">
            Brand & Visual Design
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Promotional event flyers, YouTube thumbnails, and digital campaign assets engineered with strong focal hierarchy and typography.
        </p>
      </div>

      {/* Filter and Search Bar: Clean Soft Neutral Surface, Zero Borders */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl bg-neutral-50">
        {/* Category Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center md:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
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
      </div>

      {/* Gallery Grid (Soft neutral cards, zero borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredDesigns.map((design) => {
          const isFlyer = design.category === 'flyers' || design.category === 'posters' || design.aspectRatio === '4/5';

          return (
            <div
              key={design.id}
              className="rounded-2xl bg-neutral-50 overflow-hidden flex flex-col justify-between group transition-colors"
            >
              {/* Image Frame */}
              <div
                className={`relative w-full bg-neutral-900 overflow-hidden cursor-pointer ${
                  isFlyer ? 'aspect-[4/5]' : 'aspect-[16/10]'
                }`}
                onClick={() => setSelectedDesign(design)}
              >
                <img
                  src={design.imageUrl}
                  alt={design.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                  loading="lazy"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                {/* Inspect Overlay Trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-lg bg-white text-neutral-950 font-medium text-xs flex items-center gap-1.5 shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Detail</span>
                  </div>
                </div>

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wide">
                    {design.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {design.clientOrProject && (
                    <span className="text-[11px] text-neutral-400 block mb-1">
                      {design.clientOrProject}
                    </span>
                  )}
                  <h3 className="text-lg font-display font-bold text-neutral-950 leading-snug">
                    {design.title}
                  </h3>
                  {design.description && (
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                      {design.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-200/50 flex items-center justify-between">
                  <div className="text-xs text-neutral-500">
                    {(design.tools || []).join(' · ')}
                  </div>
                  <button
                    onClick={() => setSelectedDesign(design)}
                    className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-5xl max-h-[92vh] bg-neutral-950 rounded-2xl overflow-hidden flex flex-col md:flex-row text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Arrows */}
              <button
                onClick={() => navigateDesign(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateDesign(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer md:right-[380px]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Media Viewport */}
              <div className="flex-1 bg-black flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[350px]">
                <img
                  src={selectedDesign.imageUrl}
                  alt={selectedDesign.title}
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg transition-transform duration-200"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-96 bg-neutral-900 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                      {selectedDesign.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      {selectedDesign.title}
                    </h3>
                  </div>

                  {selectedDesign.description && (
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {selectedDesign.description}
                    </p>
                  )}

                  <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
                    {selectedDesign.clientOrProject && (
                      <div>
                        <span className="text-neutral-500 block">Client / Purpose:</span>
                        <span className="text-white font-medium">{selectedDesign.clientOrProject}</span>
                      </div>
                    )}
                    {selectedDesign.tools && (
                      <div>
                        <span className="text-neutral-500 block">Tools Used:</span>
                        <span className="text-white font-medium">{selectedDesign.tools.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 space-y-2">
                  <a
                    href={`https://wa.me/233257030060?text=Hi%20Abdul,%20I%20saw%20your%20design%20"${encodeURIComponent(selectedDesign.title)}"%20and%20would%20like%20to%20discuss%20a%20commission.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire About Design</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Commission Card (Soft neutral surface, zero borders) */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="text-2xl font-display font-bold text-neutral-950">
            Need Custom Promotional Graphics or Branding?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            All flyer designs, event posters, and visual campaigns are created bespoke to match your brand identity and audience. Get in touch for single designs or complete marketing collateral.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Design%20Inquiry`}
            className="px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email for Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
};
