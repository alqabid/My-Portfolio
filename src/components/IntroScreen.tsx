import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, FastForward, Code, Palette, Glasses } from 'lucide-react';
import { playSound } from '../utils/sound';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    playSound('unlock');
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleSkip = () => {
    playSound('pop');
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF7] text-[#111111] overflow-hidden select-none"
        >
          {/* Subtle playful background pastel shapes */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FFF35C]/40 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [0, -30, 0],
              x: [0, -30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C9B8FF]/40 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [0.9, 1.15, 0.9],
              x: [0, 15, 0],
              y: [0, 25, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 -right-16 w-80 h-80 rounded-full bg-[#FFB7D5]/35 blur-3xl pointer-events-none"
          />

          {/* Grid background effect */}
          <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

          {/* Main Card Content */}
          <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
            {/* Top Interactive Mascot / Icon Badges */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF35C] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111] rotate-[-6deg]">
                <Code className="w-6 h-6 text-[#111111]" />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFB7D5] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111] rotate-[4deg]">
                <Palette className="w-6 h-6 text-[#111111]" />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9B8FF] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111] rotate-[-3deg]">
                <Glasses className="w-6 h-6 text-[#111111]" />
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] text-white text-sm font-display font-medium tracking-wide mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#FFF35C]" />
              <span>INTERACTIVE PORTFOLIO</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#111111] tracking-tight leading-none mb-3"
            >
              HEY, I'M ABDUL 👋
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl text-[#444444] font-medium max-w-md mx-auto mb-8 leading-relaxed"
            >
              WELCOME TO MY DIGITAL WORLD.
              <span className="block text-sm text-[#777777] mt-1">
                Software Developer · Graphic Designer · AR Creator
              </span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <button
                id="enter-experience-btn"
                onClick={handleEnter}
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-[5px_5px_0px_0px_#FFF35C] border-2 border-[#111111] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer group"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowRight className="w-5 h-5 text-[#FFF35C] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="skip-intro-btn"
                onClick={handleSkip}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-neutral-100 text-[#111111] font-display font-medium text-sm rounded-2xl flex items-center justify-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <FastForward className="w-4 h-4 text-[#777777]" />
                <span>Skip intro for recruiters</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom subtle indicator */}
          <div className="absolute bottom-6 text-xs text-[#888888] font-mono select-none">
            [ Accra, Ghana · 2026 Edition ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
