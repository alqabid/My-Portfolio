import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Briefcase, Compass, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface NavbarProps {
  isRecruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenResume: () => void;
  onTriggerEasterEgg: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isRecruiterMode,
  onToggleRecruiterMode,
  soundEnabled,
  onToggleSound,
  onOpenResume,
  onTriggerEasterEgg,
  activeSection
}) => {
  const { personalInfo, isAdminLoggedIn, setIsAdminPortalOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    playSound('pop');
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoClicks(0);
      onTriggerEasterEgg();
    }
  };

  const navLinks = [
    { id: 'worlds', label: 'Worlds' },
    { id: 'build', label: 'Build' },
    { id: 'design', label: 'Design' },
    { id: 'ar', label: 'AR' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo with Easter Egg Counter */}
        <button
          id="navbar-logo-btn"
          onClick={handleLogoClick}
          className={`flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-2xl border-2 border-[#111111] transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
            isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'
          }`}
          title={logoClicks > 0 ? `${5 - logoClicks} clicks until secret mode!` : 'Abdul Qabid Siaka'}
        >
          <div className="w-7 h-7 rounded-xl bg-[#FFF35C] border border-[#111111] flex items-center justify-center font-display font-extrabold text-sm text-[#111111]">
            {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="text-left hidden xs:block">
            <span className="font-display font-bold text-sm tracking-tight text-[#111111] block leading-none">
              {personalInfo.name ? personalInfo.name.split(' ').slice(0, 2).join(' ') : 'ABDUL QABID'}
            </span>
            <span className="text-[10px] font-mono text-[#666666] tracking-wider uppercase leading-tight">
              CREATIVE TECH
            </span>
          </div>
          {logoClicks > 0 && (
            <span className="text-[10px] font-mono bg-[#FFB7D5] text-[#111111] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
              {logoClicks}/5
            </span>
          )}
        </button>

        {/* Center Desktop Navigation Links */}
        {!isRecruiterMode && (
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => playSound('click')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold tracking-wide uppercase transition-all duration-150 ${
                    isActive
                      ? 'bg-[#111111] text-[#FFF35C]'
                      : 'text-[#333333] hover:bg-[#F0F0EA] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right Actions: Mode Toggle, Sound & Resume */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sound Toggle */}
          <button
            id="navbar-sound-toggle-btn"
            onClick={() => {
              onToggleSound();
              playSound('switch');
            }}
            className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:bg-[#F4F4EE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Interactive Sound FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#111111]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#888888]" />
            )}
          </button>

          {/* Mode Switcher Button (Recruiter vs Explore) */}
          <button
            id="navbar-recruiter-mode-btn"
            onClick={() => {
              playSound('switch');
              onToggleRecruiterMode();
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl border-2 border-[#111111] font-display font-bold text-xs flex items-center gap-2 shadow-[3px_3px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
              isRecruiterMode
                ? 'bg-[#111111] text-[#FFF35C]'
                : 'bg-[#FFF35C] text-[#111111] hover:bg-[#ffee38]'
            }`}
          >
            {isRecruiterMode ? (
              <>
                <Compass className="w-4 h-4 text-[#FFF35C]" />
                <span className="hidden sm:inline">EXPLORE MODE</span>
                <span className="sm:hidden">EXPLORE</span>
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4 text-[#111111]" />
                <span className="hidden sm:inline">RECRUITER MODE</span>
                <span className="sm:hidden">RECRUITER</span>
              </>
            )}
          </button>

          {/* Resume Action */}
          <button
            id="navbar-resume-btn"
            onClick={() => {
              playSound('pop');
              onOpenResume();
            }}
            className="px-3 sm:px-4 py-2 rounded-2xl bg-white border-2 border-[#111111] font-display font-bold text-xs text-[#111111] flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#111111] hover:bg-[#F4F4EE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#111111]" />
            <span className="hidden md:inline">RESUME</span>
          </button>
        </div>
      </div>
    </header>
  );
};
