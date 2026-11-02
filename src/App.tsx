import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseHub, ShowcaseTabType } from './components/ShowcaseHub';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { RecruiterMode } from './components/RecruiterMode';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Footer } from './components/Footer';
import { InteractiveStickman } from './components/InteractiveStickman';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Project } from './types';

export function App() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [initialServiceInterest, setInitialServiceInterest] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<ShowcaseTabType>('build');

  // Handle section scrolling
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTab = (tab: 'build' | 'design' | 'ar' | 'skills') => {
    setActiveShowcaseTab(tab);
    scrollToSection('work');
  };

  // Intersection Observer to track active section for navbar
  useEffect(() => {
    if (isRecruiterMode) return;

    const sectionIds = ['hero', 'work', 'about', 'contact'];
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
        onSelectTab={handleSelectTab}
      />

      {/* Mode Switcher Container */}
      {isRecruiterMode ? (
        <RecruiterMode onExitRecruiterMode={() => setIsRecruiterMode(false)} />
      ) : (
        <main className="flex flex-col">
          {/* Hero Section with Interactive Abdul Stickman Stage Avatar */}
          <Hero
            onExploreWork={() => scrollToSection('work')}
            onOpenContact={() => scrollToSection('contact')}
            onOpenResume={() => setIsRecruiterMode(true)}
          />

          {/* Streamlined Interactive Showcase Hub (Tabs: Software & AI, Design, AR Lenses, Skills) */}
          <ShowcaseHub
            activeTab={activeShowcaseTab}
            onSelectCaseStudy={(project) => setSelectedCaseStudy(project)}
          />

          {/* Crisp Experience & Education (Juni Ghana Limited National Service + BSc Degree) */}
          <AboutSection />

          {/* Contact Section */}
          <ContactSection
            initialServiceInterest={initialServiceInterest}
            onOpenResume={() => setIsRecruiterMode(true)}
          />
        </main>
      )}

      {/* Global Footer (Print-hidden, stealth admin login) */}
      <Footer />

      {/* Floating Interactive Stickman Companion (Abdul Characterized) */}
      {!isRecruiterMode && (
        <InteractiveStickman
          variant="floating"
          onOpenResume={() => setIsRecruiterMode(true)}
          onNavigateSection={scrollToSection}
        />
      )}

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
