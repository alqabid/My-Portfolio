import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CursorType } from '../types';

interface CustomCursorProps {
  cursorType: CursorType;
  cursorText: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType, cursorText }) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const getCursorStyle = () => {
    switch (cursorType) {
      case 'view':
        return {
          size: 80,
          bg: 'bg-[#111111]',
          text: 'text-[#FFF35C] font-display text-xs font-bold tracking-widest uppercase',
          border: 'border-2 border-[#FFF35C]'
        };
      case 'try-lens':
        return {
          size: 90,
          bg: 'bg-[#FFF35C]',
          text: 'text-[#111111] font-display text-xs font-bold tracking-wider uppercase',
          border: 'border-2 border-[#111111]'
        };
      case 'explore':
        return {
          size: 84,
          bg: 'bg-[#C9B8FF]',
          text: 'text-[#111111] font-display text-xs font-bold tracking-wider uppercase',
          border: 'border-2 border-[#111111]'
        };
      case 'open':
        return {
          size: 74,
          bg: 'bg-[#FFB7D5]',
          text: 'text-[#111111] font-display text-xs font-bold tracking-wider uppercase',
          border: 'border-2 border-[#111111]'
        };
      case 'play':
        return {
          size: 80,
          bg: 'bg-[#B9F5D0]',
          text: 'text-[#111111] font-display text-xs font-bold tracking-wider uppercase',
          border: 'border-2 border-[#111111]'
        };
      case 'pointer':
        return {
          size: 36,
          bg: 'bg-[#111111]/20 backdrop-blur-sm',
          text: '',
          border: 'border-2 border-[#111111]'
        };
      default:
        return {
          size: 16,
          bg: 'bg-[#111111]',
          text: '',
          border: 'border border-white/60'
        };
    }
  };

  const style = getCursorStyle();
  const hasText = ['view', 'try-lens', 'explore', 'open', 'play'].includes(cursorType) || Boolean(cursorText);
  const displayText = cursorText || (cursorType === 'try-lens' ? 'TRY LENS' : cursorType.toUpperCase());

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 ${style.bg} ${style.border}`}
      style={{
        width: style.size,
        height: style.size,
      }}
      animate={{
        x: mousePosition.x - style.size / 2,
        y: mousePosition.y - style.size / 2,
        scale: hasText ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 350,
        mass: 0.4
      }}
    >
      {hasText && (
        <span className={`select-none text-center px-1 ${style.text}`}>
          {displayText}
        </span>
      )}
    </motion.div>
  );
};
