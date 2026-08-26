import React, { useState, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorldSelector } from './components/WorldSelector';
import { BuildWorld } from './components/BuildWorld';
import { DesignWorld } from './components/DesignWorld';
import { ARWorld } from './components/ARWorld';
import { SkillConstellation } from './components/SkillConstellation';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { RecruiterMode } from './components/RecruiterMode';
import { CaseStudyModal } from './components/CaseStudyModal';
import { EasterEggsModal } from './components/EasterEggsModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Project, CursorType } from './types';
import { setSoundEnabled, getSoundEnabled, playSound } from './utils/sound';

export function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [soundEnabled, setSoundState] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [initialServiceInterest, setInitialServiceInterest] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundState(next);
    setSoundEnabled(next);
  };

  // Set custom cursor helper
  const handleSetCursor = (type: CursorType, text = '') => {
    setCursorType(type);
    setCursorText(text);
  };

  // Handle section scrolling
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener (Konami-style easter egg trigger)
  useEffect(() => {
    let keySequence: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.push(e.key.toLowerCase());
      if (keySequence.length > 6) {
        keySequence.shift();
      }
      // If user types 'abdul'
      if (keySequence.join('').includes('abdul')) {
        setIsEasterEggOpen(true);
        keySequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intersection Observer to track active section for navbar
  useEffect(() => {
    if (isRecruiterMode) return;

    const sectionIds = ['hero', 'worlds', 'build', 'design', 'ar', 'skills', 'about', 'services', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [introCompleted, isRecruiterMode]);

  return (
    <div className="relative min-h-screen bg-[#FAFAF7] text-[#111111] overflow-x-hidden">
      {/* Intro Experience Screen */}
      {!introCompleted && (
        <IntroScreen onComplete={() => setIntroCompleted(true)} />
      )}

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor cursorType={cursorType} cursorText={cursorText} />

      {/* Global Navigation Bar */}
      <Navbar
        isRecruiterMode={isRecruiterMode}
        onToggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenResume={() => setIsRecruiterMode(true)}
        onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
        activeSection={activeSection}
      />

      {/* Mode Switcher Container */}
      {isRecruiterMode ? (
        <RecruiterMode onExitRecruiterMode={() => setIsRecruiterMode(false)} />
      ) : (
        <main className="flex flex-col">
          {/* Hero Section */}
          <Hero
            onExploreWork={() => scrollToSection('worlds')}
            onOpenContact={() => scrollToSection('contact')}
            onOpenResume={() => setIsRecruiterMode(true)}
          />

          {/* World Selector */}
          <WorldSelector
            onSelectWorld={(worldId) => scrollToSection(worldId)}
            onSetCursor={handleSetCursor}
          />

          {/* Build World (Software & AI) */}
          <BuildWorld
            onOpenCaseStudy={(project) => setSelectedCaseStudy(project)}
            onSetCursor={handleSetCursor}
          />

          {/* Design World (Visual Content & Thumbnails) */}
          <DesignWorld onSetCursor={handleSetCursor} />

          {/* AR World (Snapchat Lens Studio) */}
          <ARWorld onSetCursor={handleSetCursor} />

          {/* Skill Constellation Graph */}
          <SkillConstellation onSetCursor={handleSetCursor} />

          {/* About Section */}
          <AboutSection />

          {/* Services Section */}
          <ServicesSection
            onSelectService={(serviceTitle) => {
              setInitialServiceInterest(serviceTitle);
              scrollToSection('contact');
            }}
          />

          {/* Contact Section */}
          <ContactSection
            initialServiceInterest={initialServiceInterest}
            onOpenResume={() => setIsRecruiterMode(true)}
          />
        </main>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Full Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Secret Easter Egg Celebration Modal */}
      <EasterEggsModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Admin Authentication & Login Modal */}
      <AdminLoginModal />

      {/* Full-Screen Admin CMS & Backend Management Portal */}
      <AdminPortal />
    </div>
  );
}

export default App;
