import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, MessageSquare, Mail, Glasses } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
    // Secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Stealth URL param check: ?admin=true or #admin
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('portal') === 'true' || window.location.hash === '#admin') {
      handleOpenAdmin();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminPortalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  return (
    <footer className="print:hidden bg-white py-12 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Quiet Details */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
            <span className="font-display font-bold text-neutral-900">
              {PERSONAL_INFO.name}
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-xs text-neutral-500">
              {PERSONAL_INFO.location}
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            {PERSONAL_INFO.titles}
          </p>
          <p className="text-[11px] text-neutral-400">
            Accra, Ghana · Local Time: <span className="text-neutral-700 font-medium">{ghanaTime || 'GMT'}</span>
          </p>
        </div>

        {/* Social Links Bar (Zero borders) */}
        <div className="flex items-center justify-center gap-2">
          {PERSONAL_INFO.github && (
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors"
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
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          {PERSONAL_INFO.whatsapp && (
            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors"
              title="WhatsApp Direct"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          )}

          {PERSONAL_INFO.email && (
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
