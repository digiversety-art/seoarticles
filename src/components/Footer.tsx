import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { ActivePage } from '../types/seo';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20 pt-12 pb-10 text-slate-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="font-bold text-slate-900 text-base">
                SEO Article Structure Planner
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              A minimalist, privacy-first web utility for turning target keywords and search intent into actionable, high-ranking content blueprints in seconds.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Client-Side Engine • Zero External Tracking</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('tool')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Structure Planner Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  About Us &amp; Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Legal &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('disclaimer')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Ranking Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SEO Article Structure Planner. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built for writers, SEOs, and content teams.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
