import React from 'react';
import {
  Info,
  ShieldCheck,
  Cpu,
  Users,
  Target,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ActivePage } from '../types/seo';

interface AboutPageProps {
  onStartPlanning: () => void;
  setActivePage: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onStartPlanning,
  setActivePage,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-slate-800">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Info className="w-3.5 h-3.5 text-slate-600" />
          <span>About Us & Editorial Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About SEO Article Structure Planner
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A minimalist, browser-based content planning utility designed to help creators, writers, and marketers outline intent-aligned articles before writing a single word.
        </p>
      </div>

      {/* 1. WHAT IS IT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <span>What is SEO Article Structure Planner?</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SEO Article Structure Planner is a focused, lightweight web utility designed to solve a foundational content problem: creating a rigorous, logical, and search-optimized article outline in seconds.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Instead of forcing you to navigate complex, bloated SEO suites or pay for heavy recurring subscriptions, this tool turns your primary target keyword, search intent, and niche into a structured content brief with suggested H1, H2, and H3 headings, talking points, target word counts, and search purposes.
        </p>
      </div>

      {/* 2. WHY WE BUILT IT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Why We Built It</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The single biggest mistake writers and content teams make is opening a blank Google Doc and writing without structural planning. When an article is written without clear structural hierarchy:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong>❌ Misaligned Search Intent:</strong> Writing an informational guide when the searcher wants a quick side-by-side comparison table.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong>❌ Missing Semantic Entities:</strong> Skipping foundational concepts and definitions that search engines need to understand topical depth.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong>❌ Poor Heading Hierarchy:</strong> Using random H2/H3 levels that confuse web crawlers and screen readers.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong>❌ No Answer Engine Optimization:</strong> Failing to format direct answers for Google AI Overviews and snippet extraction.
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pt-2">
          SEO Article Structure Planner bridges this gap by enforcing structured planning before drafting begins.
        </p>
      </div>

      {/* 3. WHO IS IT FOR? */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-700" />
          <span>Who Is It For?</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            { role: 'Bloggers & Publishers', desc: 'Structure weekly content quickly without writer’s block.' },
            { role: 'SEO Professionals', desc: 'Generate rapid content briefs for freelance writers.' },
            { role: 'Content Writers', desc: 'Organize complex topics into logical talking points.' },
            { role: 'Marketing Agencies', desc: 'Standardize outline quality across multiple client accounts.' },
            { role: 'Freelancers', desc: 'Deliver professionally structured outlines with proposals.' },
            { role: 'Small Businesses', desc: 'Rank for local or commercial queries without agency retainers.' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-0.5">{item.role}</h4>
              <p className="text-slate-500 text-[11px] leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. IS IT AI? & DATA PRIVACY TRANSPARENCY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3>Is It AI? (Full Transparency)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>No external AI APIs are required.</strong> The core planner operates directly in your browser using a deterministic heuristic rules engine and proven SEO structural frameworks.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            By avoiding black-box generative AI models for the core structure, the output remains predictable, mathematically structured, lightning-fast, and 100% free of hallucinated outlines.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3>Is My Keyword Data Stored?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Your data never leaves your browser.</strong> All keyword analysis, heading construction, and formatting occur locally in your browser memory.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not store your target keywords on any central database, sell your niche ideas to competitors, or use your queries for model training.
          </p>
        </div>
      </div>

      {/* 5. WHY SEARCH INTENT MATTERS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-slate-700" />
          <span>Why Search Intent Matters</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Search intent is the underlying reason a person searches for a specific term on Google. Google’s algorithms prioritize pages that satisfy this underlying psychology faster than competitors.
        </p>
        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900">1. Informational Intent:</strong> The user wants to learn how something works. They need concise definitions, step-by-step guidance, and clear explanations.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900">2. Commercial Intent:</strong> The user is evaluating solutions. They need comparison tables, pros & cons, feature breakdowns, and honest reviews.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900">3. Transactional Intent:</strong> The user is ready to buy or sign up. They need pricing transparency, trust signals, and clear conversion calls-to-action.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900">4. Local Intent:</strong> The user wants physical proximity. They need geographic service areas, local contact info, and verifiable local proof.
          </div>
        </div>
      </div>

      {/* 6. IMPORTANT DISCLAIMER */}
      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-6 space-y-2 text-xs text-amber-900">
        <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Important Ranking Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          SEO Article Structure Planner provides content planning recommendations and architectural outlines based on established industry best practices. We do <strong>NOT</strong> guarantee #1 Google rankings, specific traffic numbers, inclusion in Google AI Overviews, or featured snippets.
        </p>
        <p className="leading-relaxed">
          Search engine algorithms continuously evolve and evaluate hundreds of factors including domain authority, backlink profiles, technical site speed, and user experience.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onStartPlanning}
          className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Try the Planner Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
