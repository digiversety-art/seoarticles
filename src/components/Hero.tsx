import React from 'react';
import { ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { ActivePage } from '../types/seo';

interface HeroProps {
  onStartPlanning: () => void;
  setActivePage: (page: ActivePage) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning, setActivePage }) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200/60 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Product Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Zero API Keys • 100% In-Browser Engine • Instant Blueprinting</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5 max-w-4xl mx-auto">
          Build a Better SEO Article Structure <span className="text-slate-900 underline decoration-slate-300 decoration-wavy underline-offset-8">in Seconds</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Turn a keyword and search intent into a clear, practical content blueprint — without complicated SEO software or expensive monthly subscriptions.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Build My Structure</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              setActivePage('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors border border-slate-200 shadow-2xs flex items-center justify-center cursor-pointer"
          >
            How It Works
          </button>
        </div>

        {/* Micro Value Prop Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto mb-10">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-snug">
              <strong className="text-slate-900 font-semibold block">Intent-Aligned Outlines</strong>
              Dynamic H1, H2, and H3 structures built for exact user search mindsets.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
            <Layers className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-snug">
              <strong className="text-slate-900 font-semibold block">AEO & Snippet Strategy</strong>
              Direct answer opportunities formatted for modern AI Search & Google Overviews.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-snug">
              <strong className="text-slate-900 font-semibold block">100% Private & Local</strong>
              Your keywords never touch an external server or training pipeline.
            </p>
          </div>
        </div>

        {/* Realistic Product UI Snippet / Live Mockup Hero */}
        <div className="relative rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-xl text-left max-w-3xl mx-auto overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="ml-2 text-xs font-mono font-medium text-slate-500">blueprint-preview.md</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              Interactive Schema Active
            </span>
          </div>

          <div className="space-y-2.5 font-sans">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">H1 Heading</span>
                <span className="text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">54 chars • Primary Keyword Front-Loaded</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                How to Start a B2B Podcast: Complete Step-by-Step Production Guide (2026)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-white shadow-2xs">
                <span className="font-semibold text-slate-900 block mb-0.5">H2: Direct Answer & Executive Summary</span>
                <span className="text-slate-500 text-[11px]">Format: Definition callout • Snippet Target</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-white shadow-2xs">
                <span className="font-semibold text-slate-900 block mb-0.5">H2: Equipment & Software Stack Matrix</span>
                <span className="text-slate-500 text-[11px]">Format: Comparison table • Budget vs Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
