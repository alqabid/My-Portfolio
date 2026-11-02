import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Code2, Glasses, Coffee, ThumbsUp, RefreshCw, Volume2, VolumeX } from 'lucide-react';

interface InteractiveStickmanProps {
  variant?: 'hero' | 'floating' | 'compact';
  onNavigateSection?: (sectionId: string) => void;
  onOpenResume?: () => void;
}

type PoseType = 'idle' | 'waving' | 'coding' | 'glasses' | 'coffee';

const ABDUL_QUOTES = [
  "Hey! I'm Abdul. Welcome to my creative tech workspace! 👋",
  "Currently doing National Service at Juni Ghana Limited as a Software Engineer.",
  "I engineered MedVision AI to classify pneumonia in chest X-rays with 94.2% accuracy! 🫁",
  "Over 18 Snapchat Lenses published with 850,000+ views worldwide! 👻",
  "I write TypeScript by day and design high-converting flyers by night. 🎨",
  "Check out Yugogoo below for real-time event discovery and QR passes! 🎟️",
  "Need a full-stack web app or custom AR lens? Let's build it together!"
];

export const InteractiveStickman: React.FC<InteractiveStickmanProps> = ({
  variant = 'hero',
  onNavigateSection,
  onOpenResume
}) => {
  const [pose, setPose] = useState<PoseType>('waving');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3.5;
      if (dist === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        setEyeOffset({
          x: (dx / dist) * Math.min(dist / 40, maxOffset),
          y: (dy / dist) * Math.min(dist / 40, maxOffset)
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ABDUL_QUOTES.length);
    setShowBubble(true);
    // Cycle pose
    const poses: PoseType[] = ['waving', 'coding', 'glasses', 'coffee', 'idle'];
    const nextPose = poses[(poses.indexOf(pose) + 1) % poses.length];
    setPose(nextPose);
  };

  const currentQuote = ABDUL_QUOTES[quoteIndex];

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-5 right-5 z-40 print:hidden select-none">
        <AnimatePresence>
          {!minimized ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex flex-col items-end gap-2"
            >
              {/* Speech Bubble */}
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-neutral-900 text-white text-xs rounded-2xl p-3.5 max-w-xs shadow-xl relative"
                >
                  <p className="leading-relaxed">{currentQuote}</p>
                  <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                    <button
                      onClick={handleNextQuote}
                      className="hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next thought</span>
                      <RefreshCw className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => setShowBubble(false)}
                      className="hover:text-white cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 rotate-45" />
                </motion.div>
              )}

              {/* Stickman Badge Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimized(true)}
                  className="text-[10px] text-neutral-400 hover:text-neutral-700 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm cursor-pointer"
                  title="Minimize companion"
                >
                  Hide
                </button>
                <div
                  ref={containerRef}
                  onClick={handleNextQuote}
                  className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform relative group"
                  title="Click Abdul for a new thought!"
                >
                  <StickmanSVG pose={pose} eyeOffset={eyeOffset} size={54} />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setMinimized(false)}
              className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-colors cursor-pointer group"
              title="Show Abdul Companion"
            >
              <span className="text-sm font-bold font-mono">AQ</span>
            </motion.button>
          )}
        </AnimatePresence>
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
      <AnimatePresence mode="wait">
        {showBubble && (
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="mb-4 bg-neutral-900 text-white rounded-2xl p-4 sm:p-5 max-w-sm w-full text-center relative shadow-lg"
          >
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              "{currentQuote}"
            </p>
            {/* Action buttons inside bubble */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
              <button
                onClick={handleNextQuote}
                className="hover:text-white px-2 py-0.5 rounded bg-neutral-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Tap for next</span>
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stickman Stage Card (Zero borders, soft neutral surface) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full bg-neutral-50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Animated Avatar Character */}
        <motion.div
          animate={{
            y: pose === 'coding' ? [0, -2, 0] : [0, -4, 0],
          }}
          transition={{
            duration: pose === 'coding' ? 1.2 : 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onClick={handleNextQuote}
          className="cursor-pointer group flex flex-col items-center"
        >
          <StickmanSVG pose={pose} eyeOffset={eyeOffset} size={180} />
          
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
        </motion.div>

        {/* Action Gesture Selector Chips */}
        <div className="mt-6 pt-4 border-t border-neutral-200/50 flex flex-wrap items-center justify-center gap-1.5 w-full">
          <button
            onClick={() => {
              setPose('waving');
              setShowBubble(true);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              pose === 'waving' ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-200/60 text-neutral-700'
            }`}
          >
            <span>👋 Wave</span>
          </button>

          <button
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
};

// Vector Line-Art Stickman Component (Characterized as Abdul: Round Glasses, Laptop, Expressive Eyes)
interface StickmanSVGProps {
  pose: PoseType;
  eyeOffset: { x: number; y: number };
  size?: number;
}

const StickmanSVG: React.FC<StickmanSVGProps> = ({ pose, eyeOffset, size = 160 }) => {
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
        // Sitting cross-legged or at desk
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Left leg bent */}
          <path d="M 72 115 L 60 135 L 85 142" />
          {/* Right leg bent */}
          <path d="M 88 115 L 100 135 L 75 142" />
        </g>
      ) : (
        // Standing legs
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

      {/* Casual Tech Hoodie / Collar accent */}
      <path
        d="M 72 65 Q 80 72 88 65"
        stroke="#171717"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ARMS & PROPS BY POSE */}
      {pose === 'waving' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Left arm relaxed at side */}
          <path d="M 80 72 L 62 95 L 65 110" />
          {/* Right arm waving up */}
          <motion.path
            d="M 80 72 L 102 52 L 115 35"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '80px', originY: '72px' }}
          />
          {/* Waving hand palm / fingers */}
          <circle cx="116" cy="33" r="3.5" fill="#171717" />
        </g>
      )}

      {pose === 'coding' && (
        <g stroke="#171717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Arms reaching to laptop */}
          <path d="M 80 72 L 66 90 L 78 96" />
          <path d="M 80 72 L 94 90 L 82 96" />

          {/* Laptop Base */}
          <rect x="62" y="96" width="36" height="5" rx="1.5" fill="#171717" />
          {/* Laptop Screen (Glowing) */}
          <polygon points="65,96 70,74 98,74 93,96" fill="#3B82F6" stroke="#171717" strokeWidth="2" />
          {/* Little code lines on screen */}
          <line x1="73" y1="79" x2="88" y2="79" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="73" y1="83" x2="92" y2="83" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="73" y1="87" x2="84" y2="87" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      )}

      {pose === 'glasses' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Left arm down */}
          <path d="M 80 72 L 64 95 L 68 112" />
          {/* Right arm reaching up to tap glasses */}
          <path d="M 80 72 L 100 68 L 92 48" />
          {/* Hand finger at temple */}
          <circle cx="92" cy="46" r="3" fill="#171717" />
        </g>
      )}

      {pose === 'coffee' && (
        <g stroke="#171717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Left arm holding coffee cup */}
          <path d="M 80 72 L 64 85 L 68 76" />
          {/* Right arm relaxed */}
          <path d="M 80 72 L 96 95 L 94 112" />
          {/* Coffee Mug */}
          <rect x="62" y="70" width="12" height="15" rx="2" fill="#171717" />
          <path d="M 74 74 Q 78 77 74 81" stroke="#171717" strokeWidth="2" fill="none" />
          {/* Steam */}
          <path d="M 66 67 Q 68 63 66 59" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
          <path d="M 70 66 Q 72 62 70 58" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {pose === 'idle' && (
        <g stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Natural relaxed arms */}
          <path d="M 80 72 L 64 94 L 66 112" />
          <path d="M 80 72 L 96 94 L 94 112" />
        </g>
      )}

      {/* HEAD */}
      <circle cx="80" cy="42" r="18" fill="#FFFFFF" stroke="#171717" strokeWidth="4" />

      {/* Abdul's Hair / Cap (Clean minimalist modern trim) */}
      <path
        d="M 64 36 Q 80 22 96 36"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Abdul's Signature Wireframe Glasses (Round Frames with Bridge) */}
      <g stroke="#171717" strokeWidth="2.5" fill="none">
        {/* Left Lens */}
        <circle cx="73" cy="42" r="6" />
        {/* Right Lens */}
        <circle cx="87" cy="42" r="6" />
        {/* Glasses Bridge */}
        <line x1="79" y1="42" x2="81" y2="42" />
        {/* Left temple */}
        <line x1="67" y1="42" x2="63" y2="40" />
        {/* Right temple */}
        <line x1="93" y1="42" x2="97" y2="40" />
      </g>

      {/* Eyes (Smoothly tracking cursor coordinates) */}
      <circle
        cx={73 + eyeOffset.x}
        cy={42 + eyeOffset.y}
        r="1.8"
        fill="#171717"
      />
      <circle
        cx={87 + eyeOffset.x}
        cy={42 + eyeOffset.y}
        r="1.8"
        fill="#171717"
      />

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
};
