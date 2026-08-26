import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, MessageSquare, Mail, Glasses } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

export const Footer: React.FC = () => {
  const {
    personalInfo: PERSONAL_INFO,
    isAdminLoggedIn,
    setIsAdminPortalOpen,
    setIsAdminLoginModalOpen
  } = usePortfolio();

  const [ghanaTime, setGhanaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setGhanaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key shortcut: Ctrl+Shift+A or Cmd+Shift+A opens admin gateway
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const scrollToTop = () => {
    playSound('whoosh');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    playSound('click');
    if (isAdminLoggedIn) {
      setIsAdminPortalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  return (
    <footer className="border-t-3 border-[#111111] bg-white py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-black text-lg text-[#111111]">
              {PERSONAL_INFO.name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF35C] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
              {PERSONAL_INFO.location}
            </span>
          </div>
          <p className="font-display font-bold text-xs text-[#666666]">
            {PERSONAL_INFO.titles}
          </p>
          <p className="text-[11px] font-mono text-[#888888]">
            Local Time (Accra): <strong className="text-[#111111]">{ghanaTime || 'GMT'}</strong>
          </p>
        </div>

        {/* Social Icons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PERSONAL_INFO.github && (
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#111111] text-[#111111] hover:text-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {PERSONAL_INFO.linkedin && (
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#111111] text-[#111111] hover:text-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {PERSONAL_INFO.snapchatCreator && (
            <a
              href={PERSONAL_INFO.snapchatCreator}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#FFF35C] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title="Snapchat Lens Creator Hub"
            >
              <Glasses className="w-4 h-4" />
            </a>
          )}
          {PERSONAL_INFO.snapchatAccount && (
            <a
              href={PERSONAL_INFO.snapchatAccount}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#FFFC00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title={`Add @${PERSONAL_INFO.snapchatHandle} on Snapchat`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.002 2c-3.57 0-6.19 2.522-6.19 5.86 0 1.258.423 2.54 1.135 3.396.115.14.16.27.135.39-.05.23-.393.37-.887.49-.667.16-1.572.4-1.95 1.07-.22.39-.183.85.12 1.34.46.74 1.48 1.1 2.53 1.28.18.03.3.16.32.32.06.63.35 1.05.8 1.26.47.22 1.12.18 1.83-.11.23-.1.49-.07.7.07.72.47 1.48.71 2.25.71.78 0 1.54-.24 2.27-.72.2-.14.47-.16.7-.06.7.29 1.36.33 1.83.11.45-.21.74-.63.8-1.26.02-.16.14-.29.32-.32 1.05-.18 2.07-.54 2.53-1.28.3-.49.34-.95.12-1.34-.38-.67-1.28-.91-1.95-1.07-.49-.12-.84-.26-.89-.49-.02-.12.02-.25.14-.39.71-.856 1.13-2.138 1.13-3.396 0-3.338-2.62-5.86-6.19-5.86z"/>
              </svg>
            </a>
          )}
          {PERSONAL_INFO.whatsapp && (
            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#25D366] text-[#111111] hover:text-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title="WhatsApp Contact"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          )}
          {PERSONAL_INFO.email && (
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-9 h-9 rounded-xl bg-[#FAFAF7] hover:bg-[#111111] text-[#111111] hover:text-white border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center transition-all"
              title="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Action Column: Back to top button & Hidden Stealth Trigger right below */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-2xl bg-[#FAFAF7] hover:bg-[#111111] text-[#111111] hover:text-[#FFF35C] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none font-display font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Stealth discreet hit-target right below Back to Top (Invisible to visitors, known only to you) */}
          <button
            onClick={handleOpenAdmin}
            tabIndex={-1}
            className="h-3 w-16 opacity-0 hover:opacity-20 cursor-default flex items-center justify-center focus:outline-none transition-opacity"
            title=""
            aria-hidden="true"
          >
            <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
          </button>
        </div>
      </div>
    </footer>
  );
};
