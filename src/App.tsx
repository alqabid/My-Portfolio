import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseHub, ShowcaseTabType } from './components/ShowcaseHub';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveStickman } from './components/InteractiveStickman';
import { usePortfolio } from './context/PortfolioContext';
import { Project } from './types';

// Lazy-load heavy views & stealth admin modules so initial bundle stays ultra-fast
const RecruiterMode = lazy(() =>
  import('./components/RecruiterMode').then((m) => ({ default: m.RecruiterMode }))
);
const CaseStudyModal = lazy(() =>
  import('./components/CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
);
const AdminLoginModal = lazy(() =>
  import('./components/admin/AdminLoginModal').then((m) => ({ default: m.AdminLoginModal }))
);
const AdminPortal = lazy(() =>
  import('./components/admin/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);

export function App() {
  const { isAdminLoginModalOpen, isAdminPortalOpen } = usePortfolio();
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [initialServiceInterest] = useState<string>('');
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

  // Single IntersectionObserver to track active section for navbar
  useEffect(() => {
    if (isRecruiterMode) return;

    const sectionIds = ['hero', 'work', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isRecruiterMode]);

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        isRecruiterMode={isRecruiterMode}
        onToggleRecruiterMode={() => setIsRecruiterMode((prev) => !prev)}
        onOpenResume={() => setIsRecruiterMode(true)}
        activeSection={activeSection}
        onSelectTab={handleSelectTab}
      />

      {/* Mode Switcher Container */}
      {isRecruiterMode ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-white pt-28 px-4 sm:px-8 max-w-4xl mx-auto space-y-6 animate-pulse">
              <div className="h-14 rounded-2xl bg-neutral-100" />
              <div className="h-64 rounded-2xl bg-neutral-50" />
              <div className="h-64 rounded-2xl bg-neutral-50" />
            </div>
          }
        >
          <RecruiterMode onExitRecruiterMode={() => setIsRecruiterMode(false)} />
        </Suspense>
      ) : (
        <main className="flex flex-col">
          {/* Hero Section with Interactive Abdul Stickman Stage Avatar */}
          <Hero
            onExploreWork={() => scrollToSection('work')}
            onOpenContact={() => scrollToSection('contact')}
            onOpenResume={() => setIsRecruiterMode(true)}
          />

          {/* Streamlined Interactive Showcase Hub (Tabs: Software & Apps, Design, AR Lenses, Skills) */}
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

      {/* Full Case Study Modal (Only loaded when opened) */}
      {selectedCaseStudy && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
          />
        </Suspense>
      )}

      {/* Stealth Admin Modals (Only loaded when triggered via ?admin=true or Cmd+Shift+A) */}
      {isAdminLoginModalOpen && (
        <Suspense fallback={null}>
          <AdminLoginModal />
        </Suspense>
      )}

      {isAdminPortalOpen && (
        <Suspense fallback={null}>
          <AdminPortal />
        </Suspense>
      )}
    </div>
  );
}

export default App;
