import React, { useState, useEffect } from 'react';
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
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Project } from './types';

export function App() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [initialServiceInterest, setInitialServiceInterest] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle section scrolling
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
  }, [isRecruiterMode]);

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        isRecruiterMode={isRecruiterMode}
        onToggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
        onOpenResume={() => setIsRecruiterMode(true)}
        activeSection={activeSection}
      />

      {/* Mode Switcher Container */}
      {isRecruiterMode ? (
        <RecruiterMode onExitRecruiterMode={() => setIsRecruiterMode(false)} />
      ) : (
        <main className="flex flex-col">
          {/* Hero Section */}
          <Hero
            onExploreWork={() => scrollToSection('build')}
            onOpenContact={() => scrollToSection('contact')}
            onOpenResume={() => setIsRecruiterMode(true)}
          />

          {/* Core Disciplines Overview */}
          <WorldSelector
            onSelectWorld={(worldId) => scrollToSection(worldId)}
            onSetCursor={() => {}}
          />

          {/* Software Engineering & Products (MedVision, Yugogoo, etc.) */}
          <BuildWorld
            onOpenCaseStudy={(project) => setSelectedCaseStudy(project)}
            onSetCursor={() => {}}
          />

          {/* Brand & Visual Design */}
          <DesignWorld onSetCursor={() => {}} />

          {/* Augmented Reality & 3D */}
          <ARWorld onSetCursor={() => {}} />

          {/* Technical Skills & Technologies */}
          <SkillConstellation onSetCursor={() => {}} />

          {/* About & National Service Experience at Juni Ghana Limited */}
          <AboutSection />

          {/* Services & Collaboration */}
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

      {/* Admin Authentication & Login Modal (Stealth: ?admin=true or Cmd+Shift+A) */}
      <AdminLoginModal />

      {/* Full-Screen Admin CMS & Backend Management Portal */}
      <AdminPortal />
    </div>
  );
}

export default App;
