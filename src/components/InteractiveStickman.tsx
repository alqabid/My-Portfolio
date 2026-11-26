import React, { useState, useEffect, useRef, memo } from 'react';
import { Code2, Glasses, Coffee, RefreshCw } from 'lucide-react';

interface InteractiveStickmanProps {
  variant?: 'hero' | 'floating' | 'compact';
  onNavigateSection?: (sectionId: string) => void;
  onOpenResume?: () => void;
}

type PoseType = 'idle' | 'waving' | 'coding' | 'glasses' | 'coffee';

const ABDUL_QUOTES = [
  "Hey! I'm Abdul. Welcome to my creative tech workspace!",
  "Currently building Wonkyendi — a football gaming app! Preview it live below.",
  "Doing National Service at Juni Ghana Limited as a Software Engineer.",
  "MedVision now supports both Chest X-ray & Chest CT scans with Grad-CAM heatmaps & clinical reports!",
  "Over 18 Snapchat Lenses published with 850,000+ views worldwide!",
  "I build apps in React & TypeScript and design visuals in Affinity & Canva.",
  "Need a web app, game UI, or custom AR lens? Let's build it together!"
];

const POSES: PoseType[] = ['waving', 'coding', 'glasses', 'coffee', 'idle'];

export const InteractiveStickman: React.FC<InteractiveStickmanProps> = memo(({
  variant = 'hero'
}) => {
  const [pose, setPose] = useState<PoseType>('waving');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(variant === 'hero');
  const [minimized, setMinimized] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);

  // Zero-re-render, rAF-throttled, viewport-aware eye tracking via direct SVG DOM attributes
  useEffect(() => {
    if (minimized) return;

    let isVisible = true;
    let rafId = 0;
    let lastClientX = 0;
    let lastClientY = 0;
    let centerX = 0;
    let centerY = 0;

    const updateCenter = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    };

    updateCenter();

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) updateCenter();
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const applyEyePosition = () => {
      rafId = 0;
      if (!isVisible || !leftEyeRef.current || !rightEyeRef.current) return;
      const dx = lastClientX - centerX;
      const dy = lastClientY - centerY;
      const dist = Math.hypot(dx, dy);
      const maxOffset = 3.2;
      const ox = dist === 0 ? 0 : (dx / dist) * Math.min(dist / 45, maxOffset);
      const oy = dist === 0 ? 0 : (dy / dist) * Math.min(dist / 45, maxOffset);

      leftEyeRef.current.setAttribute('cx', (73 + ox).toFixed(2));
      leftEyeRef.current.setAttribute('cy', (42 + oy).toFixed(2));
      rightEyeRef.current.setAttribute('cx', (87 + ox).toFixed(2));
      rightEyeRef.current.setAttribute('cy', (42 + oy).toFixed(2));
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyEyePosition);
      }
    };

    const handleLayoutShift = () => {
      if (isVisible) updateCenter();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleLayoutShift, { passive: true });
    window.addEventListener('scroll', handleLayoutShift, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleLayoutShift);
      window.removeEventListener('scroll', handleLayoutShift);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [minimized]);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ABDUL_QUOTES.length);
    setShowBubble(true);
    setPose((prev) => POSES[(POSES.indexOf(prev) + 1) % POSES.length]);
  };

  const currentQuote = ABDUL_QUOTES[quoteIndex];

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-5 right-5 z-40 print:hidden select-none">
        {!minimized ? (
          <div className="flex flex-col items-end gap-2">
            {/* Speech Bubble */}
            {showBubble && (
              <div className="bg-neutral-900 text-white text-xs rounded-2xl p-3.5 max-w-xs relative animate-fade-in">
                <p className="leading-relaxed">{currentQuote}</p>
                <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                  <button
                    type="button"
                    onClick={handleNextQuote}
                    className="hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next thought</span>
                    <RefreshCw className="w-2.5 h-2.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBubble(false)}
                    className="hover:text-white cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 rotate-45" />
              </div>
            )}

            {/* Stickman Badge Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="text-[10px] text-neutral-400 hover:text-neutral-700 bg-neutral-100 px-2 py-1 rounded-md cursor-pointer transition-colors"
                title="Minimize companion"
              >
                Hide
              </button>
              <div
                ref={containerRef}
                onClick={handleNextQuote}
                className="w-15 h-15 rounded-full bg-neutral-100 hover:bg-neutral-200/80 flex items-center justify-center cursor-pointer active:scale-95 transition-transform relative"
                title="Click Abdul for a new thought!"
              >
                <StickmanSVG
                  pose={pose}
                  size={52}
                  leftEyeRef={leftEyeRef}
                  rightEyeRef={rightEyeRef}
                />
                <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Show Abdul Companion"
          >
            <span className="text-xs font-bold font-mono">AQ</span>
          </button>
        )}
      </div>
    );
  }

  // Hero Variant (Main Stage Avatar)
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto flex flex-col items-center select-none"
    >
      {/* Speech Bubble */}
      {showBubble && (
        <div
          key={quoteIndex}
          className="mb-4 bg-neutral-900 text-white rounded-2xl p-4 sm:p-5 max-w-sm w-full text-center relative animate-fade-in"
        >
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            "{currentQuote}"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <button
              type="button"
              onClick={handleNextQuote}
              className="hover:text-white px-2.5 py-0.5 rounded bg-neutral-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Tap for next</span>
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900 rotate-45" />
        </div>
      )}

      {/* Main Stickman Stage Card (Zero borders, soft neutral surface) */}
      <div className="w-full bg-neutral-50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div
          onClick={handleNextQuote}
          className="cursor-pointer flex flex-col items-center animate-stickman-bob"
        >
          <StickmanSVG
            pose={pose}
            size={180}
            leftEyeRef={leftEyeRef}
            rightEyeRef={rightEyeRef}
          />

          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-900 font-display">
              Abdul-Qabid (Stickman Edition)
            </span>
            <span className="text-[10px] text-neutral-400 font-mono bg-white px-2 py-0.5 rounded">
              {pose.toUpperCase()}
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5">
            Tap avatar to interact & switch actions
          </span>
        </div>

        {/* Action Gesture Selector Chips */}
        <div className="mt-6 pt-4 border-t border-neutral-200/50 flex flex-wrap items-center justify-center gap-1.5 w-full">
          <button
            type="button"
            onClick={() => {
              setPose('waving');
              setShowBubble(true);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              pose === 'waving' ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-200/60 text-neutral-700'
            }`}
          >
            <span>Wave</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPose('coding');
              setShowBubble(true);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              pose === 'coding' ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-200/60 text-neutral-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Coding</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPose('glasses');
              setShowBubble(true);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              pose === 'glasses' ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-200/60 text-neutral-700'
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Glasses</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPose('coffee');
              setShowBubble(true);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              pose === 'coffee' ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-200/60 text-neutral-700'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Coffee</span>
          </button>
        </div>
      </div>
    </div>
  );
});

InteractiveStickman.displayName = 'InteractiveStickman';

interface StickmanSVGProps {
  pose: PoseType;
  size?: number;
  leftEyeRef: React.RefObject<SVGCircleElement | null>;
  rightEyeRef: React.RefObject<SVGCircleElement | null>;
}

const StickmanSVG: React.FC<StickmanSVGProps> = memo(({ pose, size = 160, leftEyeRef, rightEyeRef }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Shadow / Base */}
      <ellipse cx="80" cy="152" rx="36" ry="5" fill="#E5E7EB" />

      {/* LEGS */}
      {pose === 'coding' ? (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 72 115 L 60 135 L 85 142" />
          <path d="M 88 115 L 100 135 L 75 142" />
        </g>
      ) : (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round">
          <path d="M 74 112 L 65 148" />
          <path d="M 86 112 L 95 148" />
        </g>
      )}

      {/* TORSO */}
      <path
        d="M 80 62 L 80 115"
        stroke="#171717"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Casual Tech Collar */}
      <path
        d="M 72 65 Q 80 72 88 65"
        stroke="#171717"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ARMS & PROPS BY POSE */}
      {pose === 'waving' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 72 L 62 95 L 65 110" />
          <g className="animate-stickman-wave" style={{ transformOrigin: '80px 72px' }}>
            <path d="M 80 72 L 102 52 L 115 35" />
            <circle cx="116" cy="33" r="3.5" fill="#171717" />
          </g>
        </g>
      )}

      {pose === 'coding' && (
        <g stroke="#171717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 72 L 66 90 L 78 96" />
          <path d="M 80 72 L 94 90 L 82 96" />
          <rect x="62" y="96" width="36" height="5" rx="1.5" fill="#171717" />
          <polygon points="65,96 70,74 98,74 93,96" fill="#3B82F6" stroke="#171717" strokeWidth="2" />
          <line x1="73" y1="79" x2="88" y2="79" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="73" y1="83" x2="92" y2="83" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="73" y1="87" x2="84" y2="87" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      )}

      {pose === 'glasses' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 72 L 64 95 L 68 112" />
          <path d="M 80 72 L 100 68 L 92 48" />
          <circle cx="92" cy="46" r="3" fill="#171717" />
        </g>
      )}

      {pose === 'coffee' && (
        <g stroke="#171717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 72 L 64 85 L 68 76" />
          <path d="M 80 72 L 96 95 L 94 112" />
          <rect x="62" y="70" width="12" height="15" rx="2" fill="#171717" />
          <path d="M 74 74 Q 78 77 74 81" stroke="#171717" strokeWidth="2" fill="none" />
          <path d="M 66 67 Q 68 63 66 59" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
          <path d="M 70 66 Q 72 62 70 58" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {pose === 'idle' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 72 L 64 94 L 66 112" />
          <path d="M 80 72 L 96 94 L 94 112" />
        </g>
      )}

      {/* HEAD */}
      <circle cx="80" cy="42" r="18" fill="#FFFFFF" stroke="#171717" strokeWidth="4" />

      {/* Minimalist Hairline */}
      <path
        d="M 64 36 Q 80 22 96 36"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Signature Wireframe Glasses */}
      <g stroke="#171717" strokeWidth="2.5" fill="none">
        <circle cx="73" cy="42" r="6" />
        <circle cx="87" cy="42" r="6" />
        <line x1="79" y1="42" x2="81" y2="42" />
        <line x1="67" y1="42" x2="63" y2="40" />
        <line x1="93" y1="42" x2="97" y2="40" />
      </g>

      {/* Eyes (Directly updated via rAF refs — zero React re-renders) */}
      <circle ref={leftEyeRef} cx="73" cy="42" r="1.8" fill="#171717" />
      <circle ref={rightEyeRef} cx="87" cy="42" r="1.8" fill="#171717" />

      {/* Friendly Smile */}
      <path
        d={pose === 'waving' ? 'M 76 50 Q 80 54 84 50' : 'M 77 49 Q 80 52 83 49'}
        stroke="#171717"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
});

StickmanSVG.displayName = 'StickmanSVG';
