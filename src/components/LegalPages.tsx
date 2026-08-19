import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ActivePage } from '../types/seo';

interface LegalPagesProps {
  pageType: 'privacy' | 'terms' | 'disclaimer';
  onBackToTool: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  pageType,
  onBackToTool,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-slate-800">
      <button
        onClick={onBackToTool}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Planner Studio</span>
      </button>

      {/* PRIVACY POLICY */}
      {pageType === 'privacy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm leading-relaxed shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-1">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h1>Privacy Policy</h1>
            </div>
            <p className="text-xs text-slate-500">
              Last updated: August 2026 • Privacy-First Architecture
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              1. 100% Client-Side In-Browser Processing
            </h2>
            <p className="text-slate-600">
              SEO Article Structure Planner is engineered as a privacy-first web utility. All keyword inputs, search intent classifications, and content outlines are generated locally in your browser’s JavaScript runtime.
            </p>
            <p className="text-slate-600 font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              Your keywords, topic ideas, and content blueprints are never transmitted to our servers, logged to an external database, or used to train public machine-learning models.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              2. Local Storage
            </h2>
            <p className="text-slate-600">
              When you click &quot;Save to Browser&quot;, your content blueprint is stored in your device’s browser `localStorage`. This data remains entirely under your control and can be cleared at any time through your browser settings or the in-app delete controls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              3. Contact Form Information
            </h2>
            <p className="text-slate-600">
              If you submit an inquiry through our Contact Us form, we receive the name, email address, and message text you provide solely for the purpose of answering your inquiry. We do not sell or rent this contact information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              4. Cookies & Analytics
            </h2>
            <p className="text-slate-600">
              We do not use tracking cookies or invasive third-party ad pixels. Any anonymous performance monitoring is strictly limited to core web vitals and uptime metrics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              5. Contact Information
            </h2>
            <p className="text-slate-600">
              For questions regarding privacy practices, please contact us via our Contact form.
            </p>
          </section>
        </div>
      )}

      {/* TERMS OF USE */}
      {pageType === 'terms' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm leading-relaxed shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-1">
              <FileText className="w-6 h-6 text-slate-800" />
              <h1>Terms of Use</h1>
            </div>
            <p className="text-xs text-slate-500">
              Last updated: August 2026
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600">
              By accessing and using SEO Article Structure Planner, you agree to comply with and be bound by these Terms of Use. If you disagree with any part of these terms, please do not use the tool.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              2. Tool Purpose & Educational Scope
            </h2>
            <p className="text-slate-600">
              The tool provides heuristic-based content outlines, heading suggestions, and on-page SEO checklists for educational, planning, and editorial drafting purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              3. No Ranking Guarantees or Warranties
            </h2>
            <p className="text-slate-600">
              The blueprints and checklists provided are recommendations. We make no guarantees regarding search engine rank positioning, organic traffic volumes, Google AI Overview inclusions, or revenue outcomes resulting from content created using this tool.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              4. Intellectual Property & Ownership
            </h2>
            <p className="text-slate-600">
              You retain 100% ownership of all content, outlines, and articles you produce using our blueprints. We claim no intellectual property rights over your generated outlines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              5. Limitation of Liability
            </h2>
            <p className="text-slate-600">
              In no event shall SEO Article Structure Planner or its creators be liable for any direct, indirect, or consequential damages arising out of your use or inability to use the service.
            </p>
          </section>
        </div>
      )}

      {/* DISCLAIMER */}
      {pageType === 'disclaimer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm leading-relaxed shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-1">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h1>Editorial & Ranking Disclaimer</h1>
            </div>
            <p className="text-xs text-slate-500">
              Last updated: August 2026
            </p>
          </div>

          <section className="space-y-3">
            <p className="text-slate-600">
              The information provided by SEO Article Structure Planner is for general editorial and structural planning purposes only. All recommendations regarding headings, search intent, keywords, and word count targets are based on general SEO industry heuristics and standards.
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-2">
              <strong className="block font-bold">Important Notice:</strong>
              <p>
                Search engines such as Google, Bing, and DuckDuckGo continually refine and update their ranking algorithms. Real-world search rankings depend on a multitude of dynamic factors including domain authority, quality of backlink profiles, technical web vitals, site architecture, and competitive topical authority.
              </p>
            </div>
            <p className="text-slate-600">
              We are not affiliated with Google LLC, Microsoft, OpenAI, or Perplexity AI. All product and company names mentioned are trademarks™ or registered® trademarks of their respective holders.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
