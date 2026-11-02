import React, { useState, useEffect } from 'react';
import { Briefcase, Compass, FileText, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  isRecruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  onOpenResume: () => void;
  activeSection: string;
  onSelectTab?: (tab: 'build' | 'design' | 'ar' | 'skills') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isRecruiterMode,
  onToggleRecruiterMode,
  onOpenResume,
  activeSection,
  onSelectTab
}) => {
  const { personalInfo } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'build', label: 'Projects', isTab: true },
    { id: 'design', label: 'Design', isTab: true },
    { id: 'ar', label: 'AR & 3D', isTab: true },
    { id: 'skills', label: 'Skills', isTab: true },
    { id: 'about', label: 'Experience', isTab: false },
    { id: 'contact', label: 'Contact', isTab: false },
  ];

  return (
    <header className="print:hidden fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Zone: Clean Wordmark (No pills, no borders) */}
        <a
          href="#hero"
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-display font-bold text-xs tracking-wider">
            AQ
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-tight text-neutral-900 block leading-tight">
              {personalInfo.name || 'Abdul-Qabid Siaka'}
            </span>
            <span className="text-[11px] text-neutral-500 block leading-none">
              Software Engineer · Accra
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Links (Clean text links with hover state, no borders) */}
        {!isRecruiterMode && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.isTab ? 'work' : link.id}`}
                  onClick={(e) => {
                    if (link.isTab && onSelectTab) {
                      onSelectTab(link.id as any);
                    }
                  }}
                  className={`transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right Actions: Clean Recruiter Toggle & Resume (Zero borders) */}
        <div className="flex items-center gap-2.5">
          <button
            id="navbar-recruiter-mode-btn"
            onClick={onToggleRecruiterMode}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isRecruiterMode
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            {isRecruiterMode ? (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>Standard View</span>
              </>
            ) : (
              <>
                <Briefcase className="w-3.5 h-3.5 text-neutral-600" />
                <span>Recruiter View</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors items-center gap-1.5 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
