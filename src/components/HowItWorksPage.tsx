import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  Layers,
  FileCheck2,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ActivePage } from '../types/seo';

interface HowItWorksPageProps {
  onStartPlanning: () => void;
  setActivePage: (page: ActivePage) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onStartPlanning,
  setActivePage,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Primary Keyword',
      subtitle: 'Identify the exact organic query you wish to rank for',
      description:
        'Start with a single clear keyword or search phrase (e.g., "how to conduct an SEO audit" or "best CRM for real estate"). Our engine cleans and lemmatizes the query, isolating the core subject entity from modifier words.',
      uiMockup: {
        badge: 'Step 1: Input Engine',
        content: 'Primary Keyword: "best running shoes for flat feet"',
        details: 'Topic extraction: [running shoes] | Qualifier: [flat feet] | Angle: [comparative/listicle]',
      },
    },
    {
      number: '02',
      title: 'Define Intent & Archetype',
      subtitle: 'Align content hierarchy with user psychology',
      description:
        'Select the search intent (Informational, Commercial, Transactional, Navigational, Local) and content format (How-To Guide, Comparison, Listicle, Review, Pillar Page). This directs how heading levels are constructed.',
      uiMockup: {
        badge: 'Step 2: Intent Alignment',
        content: 'Intent: Commercial Research • Archetype: Comparison Matrix',
        details: 'Triggers: Side-by-side specs, evaluation methodology, pricing tiers, and pros/cons.',
      },
    },
    {
      number: '03',
      title: 'Build & Customize Your Structure',
      subtitle: 'Receive a full, editable H1/H2/H3 blueprint in milliseconds',
      description:
        'Our deterministic rules engine combines proven SEO frameworks, talking points, target word counts, and search purposes into an interactive outline. Reorder sections, add custom H2/H3 points, or edit headings inline.',
      uiMockup: {
        badge: 'Step 3: Heading Constructor',
        content: 'H1: 9 Best Running Shoes for Flat Feet in 2026 (Tested & Compared)',
        details: '8 Section Cards Generated • On-Page SEO Checklist (14 points) • AEO Strategy Ready',
      },
    },
    {
      number: '04',
      title: 'Export & Start Writing',
      subtitle: 'One-click copy to Markdown, Docs, or Print PDF',
      description:
        'Copy the structured Markdown directly into your CMS (WordPress, Ghost, Webflow) or writing app (Notion, Google Docs). Use the embedded On-Page SEO Checklist and AEO recommendations as your editorial brief.',
      uiMockup: {
        badge: 'Step 4: Seamless Export',
        content: 'Export Options: Copy Markdown | JSON Schema | Print / Save PDF | Save Locally',
        details: '100% Client-Side • No Data Uploaded • Zero External API Latency',
      },
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Compass className="w-3.5 h-3.5 text-slate-600" />
          <span>How It Works</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How SEO Article Structure Planner Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From a raw keyword to an intent-aligned editorial blueprint in four simple, transparent steps. No complicated SEO dashboards or monthly subscriptions required.
        </p>
      </div>

      {/* 4-Step Visual Timeline */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200 hidden sm:block">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-start gap-8 pl-0">
            {/* Step Number Circle */}
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md ring-4 ring-white z-10">
              {step.number}
            </div>

            {/* Step Card */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Phase {step.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {step.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {/* Realistic UI Simulation Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{step.uiMockup.badge}</span>
                  <span className="text-emerald-600 font-bold">Active Engine</span>
                </div>
                <p className="font-bold text-slate-900">
                  {step.uiMockup.content}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {step.uiMockup.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Stacking Version */}
      <div className="sm:hidden space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                {step.number}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500">{step.subtitle}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {step.description}
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <p className="font-bold text-slate-900">{step.uiMockup.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Card */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to plan your next high-ranking article?
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Start now for free. No credit card, no sign-up, and 100% in-browser processing.
        </p>
        <button
          onClick={onStartPlanning}
          className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Launch Structure Planner</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
