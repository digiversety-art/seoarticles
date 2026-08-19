import React, { useState } from 'react';
import { ActivePage } from '../types/seo';
import {
  Sparkles,
  Menu,
  X,
  Bookmark,
  FileText,
  Compass,
  Info,
  Mail,
  ShieldCheck,
  Smartphone,
  QrCode,
} from 'lucide-react';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenQRModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  savedCount,
  onOpenSavedModal,
  onOpenQRModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'tool', label: 'Planner Studio', icon: FileText },
    { id: 'how-it-works', label: 'How It Works', icon: Compass },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('tool')}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4.5 h-4.5 text-amber-300" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-[15px] sm:text-base flex items-center gap-1.5">
              SEO Article Structure Planner
            </span>
            <span className="hidden sm:block text-[11px] text-slate-500 font-medium tracking-wide">
              Intent-Aligned Content Blueprints
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-slate-900 bg-slate-100/90 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Phone Preview Trigger */}
          {onOpenQRModal && (
            <button
              onClick={onOpenQRModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100/90 text-amber-900 transition-colors border border-amber-200/80 cursor-pointer shadow-2xs"
              title="Open or Scan on your Smartphone"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Phone Preview</span>
              <span className="sm:hidden text-[11px] font-bold">Phone</span>
            </button>
          )}

          {/* Saved Blueprints Trigger */}
          <button
            onClick={onOpenSavedModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors border border-slate-200 cursor-pointer"
            title="View saved outlines in browser storage"
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Saved Outlines</span>
            {savedCount > 0 && (
              <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none">
                {savedCount}
              </span>
            )}
          </button>

          {/* Privacy Badge / Indicator */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          {onOpenQRModal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQRModal();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-900 border border-amber-200 transition-colors text-left cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-amber-700" />
              <span>Preview on Smartphone (QR Code)</span>
            </button>
          )}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Private & Local-Only
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
