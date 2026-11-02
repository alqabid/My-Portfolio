import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Glasses,
  QrCode,
  ExternalLink,
  Check,
  Copy,
  Search,
  Maximize2,
  X,
  CheckCircle2,
  Eye,
  Share2,
  Play
} from 'lucide-react';
import { ARLens, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { WebsitePreview } from './WebsitePreview';

interface ARWorldProps {
  onSetCursor?: (type: CursorType, text?: string) => void;
}

export const ARWorld: React.FC<ARWorldProps> = () => {
  const { arLenses: AR_LENSES, personalInfo: PERSONAL_INFO } = usePortfolio();
  const [activeLens, setActiveLens] = useState<ARLens>(AR_LENSES[0] || {} as ARLens);
  const [selectedMobileSnapcode, setSelectedMobileSnapcode] = useState<ARLens | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'Brand Experience', 'Interactive Experience', 'Face Effect', 'Segmented Filter'];

  const filteredLenses = AR_LENSES.filter((lens) => {
    const matchesCategory = filterCategory === 'All' || lens.type === filterCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      lens.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lens.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyLensLink = () => {
    const link = activeLens.lensUrl || (activeLens.uuid ? `https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=${activeLens.uuid}&metadata=01` : '');
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Official Snapchat SVG Snapcode URL generator
  const getSnapcodeUrl = (lens: ARLens) => {
    if (lens.uuid) {
      return `https://app.snapchat.com/web/deeplink/snapcode?data=${lens.uuid}&type=svg`;
    }
    return `https://app.snapchat.com/web/deeplink/snapcode?data=${lens.id}&type=svg`;
  };

  const activeSnapcode = getSnapcodeUrl(activeLens);
  const activeUnlockUrl = activeLens.lensUrl || (activeLens.uuid ? `https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=${activeLens.uuid}&metadata=01` : '');

  return (
    <section id="ar" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Extended Reality & Lens Studio
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight mb-4">
          Augmented Reality & 3D Technology
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          I design interactive augmented reality lenses, student campaign experiences, campus election filters, and festival visual systems using Lens Studio. Explore, test, and scan the live lenses below.
        </p>

        {/* Aggregate Stats Cards (Clean Soft Neutral Surfaces, Zero Borders) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-50">
            <span className="font-display font-bold text-2xl text-neutral-950">{AR_LENSES.length}+</span>
            <span className="text-xs text-neutral-500 block uppercase mt-1">Lenses Created</span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50">
            <span className="font-display font-bold text-2xl text-neutral-950">850,000+</span>
            <span className="text-xs text-neutral-500 block uppercase mt-1">Total Lens Views</span>
          </div>

          {/* Snapchat Creator Link */}
          <a
            href={PERSONAL_INFO.snapchatCreator}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
            title="Visit Snapchat Creator Hub"
          >
            <div>
              <span className="font-display font-bold text-base text-neutral-950 block">Creator Hub</span>
              <span className="text-xs text-neutral-500">Official Lens Profile →</span>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
          </a>

          {/* Direct Snapchat Account */}
          <a
            href={PERSONAL_INFO.snapchatAccount}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
            title="Add @big_qabid on Snapchat"
          >
            <div>
              <span className="font-display font-bold text-base text-neutral-950 block">Add @big_qabid</span>
              <span className="text-xs text-neutral-500">Snapchat Account →</span>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar (Zero borders) */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-2xl bg-neutral-50">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lenses (e.g. SRC, RAVE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Lens Selector Grid */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="font-medium text-neutral-900">
            Select Lens to Preview ({filteredLenses.length} Available)
          </span>
          <span>Click any lens to load its interactive unlock and scanner</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[300px] overflow-y-auto p-2 rounded-2xl bg-neutral-50">
          {filteredLenses.map((lens, index) => {
            const isSelected = activeLens.id === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens)}
                className={`p-3 rounded-xl text-left transition-colors flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-sm font-semibold'
                    : 'hover:bg-white/60 text-neutral-700'
                }`}
              >
                <div>
                  <span className="text-[10px] text-neutral-400 block mb-0.5">
                    0{index + 1}
                  </span>
                  <h4 className="text-xs text-neutral-950 line-clamp-1">
                    {lens.name}
                  </h4>
                </div>
                <span className="text-[10px] text-neutral-500 truncate">
                  {lens.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN AR LENS LIVE VIEWPORT (Restored earlier full preview experience) */}
      <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8 space-y-8">
        {/* Header bar of selected lens */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-900">{activeLens.type}</span>
              <span aria-hidden="true">·</span>
              <span>Snapchat Lens Studio</span>
              {activeLens.uuid && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-neutral-400">UUID: {activeLens.uuid.slice(0, 8)}...</span>
                </>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
              {activeLens.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
              {activeLens.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLensLink}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setSelectedMobileSnapcode(activeLens)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-neutral-600" />
              <span>Enlarge Snapcode</span>
            </button>

            {activeUnlockUrl && (
              <a
                href={activeUnlockUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Unlock on Snapchat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Live Interactive Snapchat Web Unlock Viewport (WebsitePreview) */}
        {activeUnlockUrl && (
          <div className="w-full">
            <WebsitePreview
              url={activeUnlockUrl}
              title={`${activeLens.name} — Snapchat AR Lens`}
              tagline={activeLens.description}
              heightClass="h-96 sm:h-[480px]"
              allowLiveIframe={true}
            />
          </div>
        )}

        {/* Dual Information & Official Snapcode Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8">
          {/* Official Snapchat SVG Snapcode Scanner */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-50 relative group">
            <img
              src={activeSnapcode}
              alt={`${activeLens.name} Official Snapchat Snapcode`}
              className="w-48 h-48 rounded-xl object-contain cursor-pointer transition-transform group-hover:scale-105"
              onClick={() => setSelectedMobileSnapcode(activeLens)}
              onError={(e) => {
                // If official deep link fails, fallback gracefully
                (e.target as HTMLImageElement).src = 'https://app.snapchat.com/web/deeplink/snapcode?data=default&type=svg';
              }}
            />
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-neutral-900 block">
                Point Camera & Scan
              </span>
              <span className="text-[11px] text-neutral-500">
                Instantly opens & activates in Snapchat
              </span>
            </div>
            <button
              onClick={() => setSelectedMobileSnapcode(activeLens)}
              className="mt-2 text-xs font-medium text-neutral-600 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Click to Enlarge</span>
            </button>
          </div>

          {/* Lens Metrics & Technical Breakdown */}
          <div className="md:col-span-8 space-y-5">
            {/* Real Stats Ribbon */}
            {activeLens.stats && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-50">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Impressions</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-950 font-display">
                    {activeLens.stats.views || '35K+'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                    <Play className="w-3 h-3" />
                    <span>Camera Plays</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-950 font-display">
                    {activeLens.stats.plays || '15K+'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                    <Share2 className="w-3 h-3" />
                    <span>Story Shares</span>
                  </div>
                  <span className="text-lg font-bold text-neutral-950 font-display">
                    {activeLens.stats.shares || '5K+'}
                  </span>
                </div>
              </div>
            )}

            {/* Lens Features */}
            {activeLens.features && activeLens.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                  Shader & Tracking Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeLens.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Implementation Details */}
            <div className="pt-2 text-xs text-neutral-600 leading-relaxed space-y-1">
              <p>
                Built with <strong>Snapchat Lens Studio</strong> using custom facial anchors, depth segmentation, and mobile GPU-optimized shader graphs.
              </p>
              <p className="text-neutral-500">
                Compatible with iOS and Android Snapchat applications worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Snapcode Modal for Mobile / Fullscreen Scan */}
      <AnimatePresence>
        {selectedMobileSnapcode && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMobileSnapcode(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMobileSnapcode(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
                  Snapchat Official Lens
                </span>
                <h3 className="text-xl font-display font-bold text-neutral-950">
                  {selectedMobileSnapcode.name}
                </h3>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl flex items-center justify-center">
                <img
                  src={getSnapcodeUrl(selectedMobileSnapcode)}
                  alt={`${selectedMobileSnapcode.name} Snapcode`}
                  className="w-56 h-56 rounded-xl object-contain"
                />
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                Open Snapchat, point your camera at this code, and press and hold on the screen to unlock this lens.
              </p>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={selectedMobileSnapcode.lensUrl || (selectedMobileSnapcode.uuid ? `https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=${selectedMobileSnapcode.uuid}&metadata=01` : '#')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open in Snapchat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedMobileSnapcode(null)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
