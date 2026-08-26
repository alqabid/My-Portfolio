import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, X, Zap, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface EasterEggsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggsModal: React.FC<EasterEggsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      playSound('unlock');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFF35C', '#C9B8FF', '#FFB7D5', '#A9DDFF', '#B9F5D0', '#111111']
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.85, opacity: 0, rotate: 3 }}
          className="relative w-full max-w-lg bg-[#FFF35C] border-4 border-[#111111] rounded-3xl p-6 sm:p-8 shadow-[12px_12px_0px_0px_#111111] text-center space-y-6"
        >
          <button
            onClick={() => {
              playSound('pop');
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#FAFAF7] shadow-[2px_2px_0px_0px_#111111] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-white border-3 border-[#111111] flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#111111] rotate-6">
            <Trophy className="w-8 h-8 text-[#111111]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#111111] text-[#FFF35C] font-mono text-xs font-bold uppercase tracking-widest inline-block">
              EASTER EGG #01 UNLOCKED
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-black text-[#111111]">
              YOU FOUND SOMETHING! 👀
            </h3>
            <p className="text-sm font-display font-bold text-[#333333] max-w-sm mx-auto">
              Curiosity is the fundamental requirement for true innovation. You explored beyond the surface.
            </p>
          </div>

          {/* Special Secret Badge */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#111111] text-left shadow-[3px_3px_0px_0px_#111111] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase">
                PASSKEY: CREATIVE_EXPLORER
              </span>
              <span className="text-[10px] font-mono bg-[#B9F5D0] px-2 py-0.5 rounded border border-[#111111] text-[#111111] font-bold">
                Level 99 Unlocked
              </span>
            </div>
            <p className="text-xs text-[#555555]">
              "The best digital products are born where engineering architecture meets playful artistic intuition."
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                playSound('laser');
                try {
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
                } catch {}
              }}
              className="px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-neutral-800 font-display font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#FFFFFF]"
            >
              <Zap className="w-3.5 h-3.5 text-[#FFF35C]" />
              <span>Fire Laser Synth</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white text-[#111111] font-display font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] cursor-pointer"
            >
              Back to Experience
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
