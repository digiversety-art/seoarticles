import React, { useState, useEffect } from 'react';
import { ActivePage, SEOBlueprint } from './types/seo';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlannerWizard } from './components/PlannerWizard';
import { BlueprintResult } from './components/BlueprintResult';
import { SavedBlueprintsModal } from './components/SavedBlueprintsModal';
import { PhoneQRModal } from './components/PhoneQRModal';
import { HowItWorksPage } from './components/HowItWorksPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { getSavedBlueprints } from './utils/storage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('tool');
  const [activeBlueprint, setActiveBlueprint] = useState<SEOBlueprint | null>(null);
  const [savedBlueprints, setSavedBlueprints] = useState<SEOBlueprint[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Load saved blueprints from local storage on mount
  useEffect(() => {
    setSavedBlueprints(getSavedBlueprints());
  }, []);

  const handleBlueprintGenerated = (blueprint: SEOBlueprint) => {
    setActiveBlueprint(blueprint);
    setActivePage('tool');
    // Smooth scroll down to blueprint result
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setActiveBlueprint(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPlanning = () => {
    setActivePage('tool');
    const wizardEl = document.getElementById('planner-wizard-section');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC] text-[#0F172A]">
      {/* Sticky Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        savedCount={savedBlueprints.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenQRModal={() => setIsQRModalOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'tool' && (
          <div>
            {!activeBlueprint ? (
              <>
                <Hero
                  onStartPlanning={handleStartPlanning}
                  setActivePage={setActivePage}
                />
                <PlannerWizard
                  onBlueprintGenerated={handleBlueprintGenerated}
                />
              </>
            ) : (
              <BlueprintResult
                blueprint={activeBlueprint}
                onUpdateBlueprint={(updated) => setActiveBlueprint(updated)}
                onReset={handleReset}
              />
            )}
          </div>
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage
            onStartPlanning={handleStartPlanning}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onStartPlanning={handleStartPlanning}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'contact' && <ContactPage />}

        {(activePage === 'privacy' ||
          activePage === 'terms' ||
          activePage === 'disclaimer') && (
          <LegalPages
            pageType={activePage}
            onBackToTool={() => {
              setActivePage('tool');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Saved Outlines Modal */}
      <SavedBlueprintsModal
        isOpen={isSavedModalOpen}
        onClose={() => {
          setIsSavedModalOpen(false);
          setSavedBlueprints(getSavedBlueprints());
        }}
        savedBlueprints={savedBlueprints}
        onSelectBlueprint={(b) => {
          setActiveBlueprint(b);
          setActivePage('tool');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onUpdateSavedList={(updated) => setSavedBlueprints(updated)}
      />

      {/* Global Phone Preview QR Modal */}
      <PhoneQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        blueprint={activeBlueprint}
      />

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
