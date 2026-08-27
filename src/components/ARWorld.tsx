import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Glasses,
  QrCode,
  ExternalLink,
  UserPlus,
  Check,
  Copy,
  Radio,
  Search
} from 'lucide-react';
import { ARLens, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { WebsitePreview } from './WebsitePreview';
import { playSound } from '../utils/sound';

interface ARWorldProps {
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const ARWorld: React.FC<ARWorldProps> = ({ onSetCursor }) => {
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
    if (!activeLens.lensUrl) return;
    playSound('pop');
    navigator.clipboard.writeText(activeLens.lensUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="ar" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9B8FF] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Glasses className="w-3.5 h-3.5" />
          <span>AR WORLD // SNAPCHAT LENS STUDIO & 3D REALMS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          REALITY IS JUST ANOTHER CANVAS.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          I design interactive augmented reality lenses, student campaign experiences, campus election filters, and festival visual systems using Lens Studio. Explore and unlock my created lenses below.
        </p>

        {/* Aggregate Stats & Direct Account Badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
            <span className="font-display font-black text-2xl text-[#111111]">{AR_LENSES.length}+</span>
            <span className="text-xs font-mono text-[#666666] block uppercase mt-0.5">Created Lenses</span>
          </div>

          {/* Stat 2 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
            <span className="font-display font-black text-2xl text-[#111111]">850,000+</span>
            <span className="text-xs font-mono text-[#666666] block uppercase mt-0.5">Total Lens Views</span>
          </div>

          {/* Direct Snapchat Creator Profile Link */}
          <a
            href={PERSONAL_INFO.snapchatCreator}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#FFF35C] hover:bg-[#faee37] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-between group cursor-pointer"
            title="Visit Snapchat Creator Hub"
          >
            <div>
              <div className="flex items-center gap-1.5 font-display font-black text-base text-[#111111]">
                <span>Creator Hub</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[11px] font-mono text-[#111111] block uppercase font-bold">Snapchat Profile →</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-[#111111] flex items-center justify-center text-[#111111] shrink-0">
              <Glasses className="w-4 h-4" />
            </div>
          </a>

          {/* Direct Add on Snapchat Profile */}
          <a
            href={PERSONAL_INFO.snapchatAccount}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#FFFC00] hover:bg-[#f0ec00] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-between group cursor-pointer"
            title="Add @big_qabid on Snapchat"
          >
            <div>
              <div className="flex items-center gap-1.5 font-display font-black text-base text-[#111111]">
                <span>Add @big_qabid</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[11px] font-mono text-[#111111] block uppercase font-bold">Snapchat Account →</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-[#111111] flex items-center justify-center text-[#111111] shrink-0 text-base">
              👻
            </div>
          </a>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('pop');
                setFilterCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs border transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#111111] text-[#FFF35C] border-[#111111]'
                  : 'bg-[#FAFAF7] text-[#555555] border-neutral-300 hover:border-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lenses (e.g. SRC, RAVE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-xl bg-[#FAFAF7] border border-[#111111] text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#FFF35C]"
          />
        </div>
      </div>

      {/* Lens Selector Grid */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#666666] uppercase flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
            SELECT CREATED SNAPCHAT LENS TO PREVIEW ({filteredLenses.length} OF {AR_LENSES.length})
          </span>
          <span className="text-[11px] font-mono text-[#888888]">
            Click any lens to load its live unlock window
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[340px] overflow-y-auto p-1.5 border-2 border-[#111111] rounded-3xl bg-[#FAFAF7]">
          {filteredLenses.map((lens, index) => {
            const isSelected = activeLens.id === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => {
                  playSound('pop');
                  setActiveLens(lens);
                }}
                onMouseEnter={() => onSetCursor('try-lens', 'PREVIEW LENS')}
                onMouseLeave={() => onSetCursor('default')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#111111] shadow-[3px_3px_0px_0px_#111111] ring-2 ring-[#FFF35C]'
                    : 'bg-white border-neutral-200 hover:border-[#111111]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border border-[#111111]"
                      style={{ backgroundColor: lens.accentColor, color: '#111111' }}
                    >
                      0{index + 1}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    )}
                  </div>
                  <h4 className="font-display font-black text-xs text-[#111111] line-clamp-1">
                    {lens.name}
                  </h4>
                </div>

                <div className="text-[10px] font-mono text-[#666666] pt-1 border-t border-neutral-100 flex items-center justify-between">
                  <span className="truncate">{lens.type.split(' ')[0]}</span>
                  <span className="font-bold text-[#111111] shrink-0">⚡</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main AR Studio Viewport */}
      <div className="space-y-8 mb-16">
        {/* Active Lens Live Viewport Window */}
        <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] space-y-6">
          {/* Header bar of selected lens */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-[#111111] pb-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#666666] uppercase">
                  OFFICIAL SNAPCHAT UNLOCK PREVIEW
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-[#111111]"
                  style={{ backgroundColor: activeLens.accentColor }}
                >
                  {activeLens.type}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#111111]">
                {activeLens.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555]">
                {activeLens.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLensLink}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-[#111111] font-mono text-xs font-bold border border-[#111111] flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playSound('whoosh');
                  setSelectedMobileSnapcode(activeLens);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#FFF35C] hover:bg-[#faee37] text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan Snapcode</span>
              </button>

              <a
                href={activeLens.lensUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-neutral-800 text-[#FFFC00] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#FFFC00] flex items-center gap-1.5 cursor-pointer"
              >
                <Glasses className="w-3.5 h-3.5" />
                <span>Unlock on Snapchat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Lens Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono font-bold text-[#111111]">Features:</span>
            {activeLens.features.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#FAFAF7] border border-[#111111] text-xs font-mono font-medium text-[#222222]"
              >
                ✓ {feature}
              </span>
            ))}
          </div>

          {/* Live Lens Preview Window */}
          <WebsitePreview
            url={activeLens.lensUrl || PERSONAL_INFO.snapchatCreator}
            title={`${activeLens.name} — Snapchat Unlock`}
            tagline={`Official Snapchat lens destination (Created by Abdul Qabid)`}
            accentColor={activeLens.accentColor}
            heightClass="h-96 sm:h-[480px]"
            allowLiveIframe={true}
          />

          {/* Mobile Scan & Creator Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Box 1: Quick QR Code */}
            <div className="p-4 rounded-2xl bg-[#FFFC00] border-2 border-[#111111] flex items-center gap-4 shadow-[3px_3px_0px_0px_#111111]">
              <div className="w-20 h-20 bg-white border border-[#111111] rounded-xl p-1.5 shrink-0 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeLens.lensUrl || '')}`}
                  alt="Snapcode QR"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#111111] uppercase block">
                  MOBILE SCAN TO UNLOCK
                </span>
                <h5 className="font-display font-extrabold text-xs text-[#111111]">
                  {activeLens.name}
                </h5>
                <p className="text-[11px] text-[#444444] leading-tight">
                  Opens directly in Snapchat app.
                </p>
              </div>
            </div>

            {/* Box 2: Snapchat Account Link */}
            <div className="p-4 rounded-2xl bg-[#C9B8FF] border-2 border-[#111111] flex items-center justify-between gap-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#111111] uppercase block">
                  ADD CREATOR ACCOUNT
                </span>
                <h5 className="font-display font-extrabold text-xs text-[#111111]">
                  Snapchat @big_qabid
                </h5>
                <p className="text-[11px] text-[#333333] leading-tight">
                  Get all future lens drops & test builds.
                </p>
              </div>
              <a
                href={PERSONAL_INFO.snapchatAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#111111] flex items-center justify-center text-[#111111] shrink-0 hover:bg-[#FFF35C] transition-colors"
                title="Add @big_qabid"
              >
                <UserPlus className="w-4 h-4" />
              </a>
            </div>

            {/* Box 3: Official Creator Hub */}
            <div className="p-4 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] flex items-center justify-between gap-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#666666] uppercase block">
                  ALL LENSES CATALOG
                </span>
                <h5 className="font-display font-extrabold text-xs text-[#111111]">
                  Creator Hub Profile
                </h5>
                <p className="text-[11px] text-[#555555] leading-tight">
                  Explore all 17+ authored filters.
                </p>
              </div>
              <a
                href={PERSONAL_INFO.snapchatCreator}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#111111] flex items-center justify-center text-[#111111] shrink-0 hover:bg-[#FFF35C] transition-colors"
                title="Open Creator Hub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Snapcode QR Code Modal */}
      <AnimatePresence>
        {selectedMobileSnapcode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white border-3 border-[#111111] rounded-3xl shadow-[8px_8px_0px_0px_#111111] p-6 text-center space-y-6"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF35C] border-2 border-[#111111] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_0px_#111111]">
                  <Glasses className="w-6 h-6 text-[#111111]" />
                </div>
                <span className="text-[10px] font-mono text-[#777777] uppercase font-bold">
                  EXPERIENCE THIS SNAPCHAT LENS
                </span>
                <h4 className="text-2xl font-display font-black text-[#111111]">
                  {selectedMobileSnapcode.name}
                </h4>
                <p className="text-xs text-[#555555] mt-1">
                  Open Snapchat or your phone camera to scan the code and unlock the filter immediately.
                </p>
              </div>

              {/* Snapcode Box with Real QR Code */}
              <div className="p-6 rounded-2xl bg-[#FFFC00] border-3 border-[#111111] flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_#111111] max-w-xs mx-auto">
                <div className="w-44 h-44 bg-white border-2 border-[#111111] rounded-xl flex items-center justify-center p-3">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(selectedMobileSnapcode.lensUrl || '')}`}
                    alt="Snapchat Lens Snapcode"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-mono font-bold text-xs text-[#111111] mt-3">
                  SCAN // SNAPCHAT UNLOCK
                </span>
              </div>

              <div className="space-y-2">
                <a
                  href={selectedMobileSnapcode.lensUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#111111] hover:bg-neutral-800 text-[#FFFC00] font-display font-bold text-xs border border-[#111111] flex items-center justify-center gap-1.5"
                >
                  <Glasses className="w-4 h-4" />
                  <span>Direct Snapchat Unlock Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.snapchatAccount}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#C9B8FF] hover:bg-[#b8a1fa] text-[#111111] font-display font-bold text-xs border border-[#111111] flex items-center justify-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add @big_qabid</span>
                  </a>
                  <button
                    onClick={() => setSelectedMobileSnapcode(null)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
