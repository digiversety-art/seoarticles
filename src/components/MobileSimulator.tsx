import React, { useState } from 'react';
import { SEOBlueprint } from '../types/seo';
import {
  Smartphone,
  Tablet,
  Laptop,
  QrCode,
  Sun,
  Moon,
  Search,
  BookOpen,
  List,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  ExternalLink,
  Clock,
  User,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowLeft,
  Copy,
  Check,
  Globe,
  Sliders,
} from 'lucide-react';

interface MobileSimulatorProps {
  blueprint: SEOBlueprint;
  onClose?: () => void;
  onOpenQRModal: () => void;
}

type DeviceSkin = 'iphone' | 'pixel' | 'frameless';
type PhoneTab = 'reader' | 'serp' | 'sections' | 'aeo';

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  blueprint,
  onClose,
  onOpenQRModal,
}) => {
  const [deviceSkin, setDeviceSkin] = useState<DeviceSkin>('iphone');
  const [phoneTab, setPhoneTab] = useState<PhoneTab>('reader');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedH1, setCopiedH1] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-0');
  const [tocOpen, setTocOpen] = useState(false);

  const calculateReadingTime = (wordsRange: string) => {
    const match = wordsRange.match(/(\d+)/);
    const words = match ? parseInt(match[0], 10) : 1500;
    const mins = Math.ceil(words / 220);
    return `${mins} min read`;
  };

  const handleCopyH1 = () => {
    navigator.clipboard.writeText(blueprint.suggestedH1);
    setCopiedH1(true);
    setTimeout(() => setCopiedH1(false), 2000);
  };

  // Extract FAQs from sections or checklist for preview
  const faqSections = blueprint.sections.filter(
    (s) =>
      s.heading.toLowerCase().includes('faq') ||
      s.heading.toLowerCase().includes('frequently') ||
      s.heading.toLowerCase().includes('question') ||
      s.heading.toLowerCase().includes('what is') ||
      s.heading.toLowerCase().includes('how to')
  );

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Mobile Phone Live Preview</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Dekhein ki yeh article mobile screens par kaisa dikhega
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Skin Toggle */}
          <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setDeviceSkin('iphone')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                deviceSkin === 'iphone'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              iPhone 16 Pro
            </button>
            <button
              onClick={() => setDeviceSkin('pixel')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                deviceSkin === 'pixel'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pixel / Android
            </button>
            <button
              onClick={() => setDeviceSkin('frameless')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                deviceSkin === 'frameless'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Frameless
            </button>
          </div>

          {/* Dark / Light Phone Screen Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch Phone to Light Mode' : 'Switch Phone to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Open on Actual Phone QR */}
          <button
            onClick={onOpenQRModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan with Real Phone</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Editor</span>
            </button>
          )}
        </div>
      </div>

      {/* Screen Mode Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700 text-xs font-semibold gap-1">
          <button
            onClick={() => setPhoneTab('reader')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              phoneTab === 'reader'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mobile Article Reader</span>
          </button>
          <button
            onClick={() => setPhoneTab('serp')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              phoneTab === 'serp'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Google Mobile SERP</span>
          </button>
          <button
            onClick={() => setPhoneTab('aeo')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              phoneTab === 'aeo'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Mobile AI Overview</span>
          </button>
          <button
            onClick={() => setPhoneTab('sections')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              phoneTab === 'sections'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Section Cards ({blueprint.sections.length})</span>
          </button>
        </div>
      </div>

      {/* PHONE SIMULATOR CONTAINER */}
      <div className="flex justify-center py-4">
        {/* Device Frame */}
        <div
          className={`relative transition-all duration-300 select-none ${
            deviceSkin === 'iphone'
              ? 'w-[375px] sm:w-[390px] h-[780px] bg-slate-950 rounded-[50px] p-3.5 shadow-2xl ring-1 ring-slate-700/80 border-[5px] border-slate-800'
              : deviceSkin === 'pixel'
              ? 'w-[375px] sm:w-[390px] h-[780px] bg-slate-950 rounded-[42px] p-3 shadow-2xl ring-1 ring-slate-700/80 border-[4px] border-slate-700'
              : 'w-full max-w-[420px] h-[740px] bg-slate-950 rounded-2xl p-1 shadow-2xl border border-slate-700'
          }`}
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Hardware Buttons (for iPhone styling) */}
          {deviceSkin === 'iphone' && (
            <>
              {/* Volume Buttons Left */}
              <div className="absolute -left-[9px] top-28 w-[4px] h-10 bg-slate-700 rounded-l-md" />
              <div className="absolute -left-[9px] top-42 w-[4px] h-10 bg-slate-700 rounded-l-md" />
              {/* Power Button Right */}
              <div className="absolute -right-[9px] top-32 w-[4px] h-14 bg-slate-700 rounded-r-md" />
            </>
          )}

          {/* INNER PHONE SCREEN */}
          <div
            className={`w-full h-full rounded-[38px] overflow-hidden flex flex-col relative ${
              isDarkMode
                ? 'bg-slate-950 text-slate-100'
                : 'bg-white text-slate-900'
            }`}
          >
            {/* Status Bar */}
            <div
              className={`h-11 px-6 flex items-center justify-between text-[11px] font-semibold tracking-tight z-30 shrink-0 select-none ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>9:41</span>

              {/* Dynamic Island (iPhone) or Punchhole (Pixel) */}
              {deviceSkin === 'iphone' ? (
                <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto -mt-1 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900/80" />
                  <div className="w-2 h-2 rounded-full bg-blue-900/40" />
                </div>
              ) : deviceSkin === 'pixel' ? (
                <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto -mt-1" />
              ) : null}

              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-4 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-current rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Mobile Browser Top Bar */}
            <div
              className={`px-4 py-2 border-b flex items-center gap-2 text-xs shrink-0 ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-slate-100/90 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-mono border border-slate-300/40 dark:border-slate-700/50 truncate">
                <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">example.com/blog/{blueprint.inputs.primaryKeyword.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <button
                onClick={onOpenQRModal}
                className="p-1 rounded text-slate-400 hover:text-current"
                title="Scan to view on your phone"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* SCROLLABLE PHONE CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-xs font-sans">
              {/* TAB 1: MOBILE ARTICLE READER */}
              {phoneTab === 'reader' && (
                <div className="space-y-4">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300 font-bold uppercase tracking-wider">
                      {blueprint.inputs.niche}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {calculateReadingTime(blueprint.targetWordCountRange)}
                    </span>
                  </div>

                  {/* Primary H1 */}
                  <h1 className="text-base sm:text-lg font-extrabold leading-snug tracking-tight">
                    {blueprint.suggestedH1}
                  </h1>

                  {/* Author / Metadata Row */}
                  <div
                    className={`flex items-center gap-2 pb-3 border-b text-[11px] ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                      ✍️
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Editorial Team</span>
                      <span className="mx-1">•</span>
                      <span>Updated {new Date(blueprint.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Key Takeaways Callout (AI Summary) */}
                  <div
                    className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                      isDarkMode
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : 'bg-amber-50/80 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Quick Executive Summary</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      {blueprint.sections[0]?.searchPurpose ||
                        `Everything you need to know about ${blueprint.inputs.primaryKeyword} with structured insights.`}
                    </p>
                  </div>

                  {/* Quick Mobile TOC Accordion */}
                  <div
                    className={`rounded-xl border overflow-hidden ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => setTocOpen(!tocOpen)}
                      className="w-full p-2.5 flex items-center justify-between text-[11px] font-bold text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <List className="w-3.5 h-3.5 text-amber-500" />
                        <span>Table of Contents ({blueprint.sections.length} sections)</span>
                      </span>
                      {tocOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {tocOpen && (
                      <div className="px-3 pb-3 space-y-1.5 text-[11px] border-t border-slate-200 dark:border-slate-800 pt-2">
                        {blueprint.sections.map((s, idx) => (
                          <div
                            key={s.id}
                            className={`flex items-start gap-1.5 ${
                              s.level === 'H3' ? 'pl-3 text-slate-500 dark:text-slate-400' : 'font-semibold text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <span className="text-[10px] text-amber-500 font-mono">{idx + 1}.</span>
                            <span className="truncate">{s.heading}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rendered Article Sections */}
                  <div className="space-y-4 pt-1">
                    {blueprint.sections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className={`space-y-2 pb-3 border-b ${
                          isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                              sec.level === 'H2'
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                                : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {sec.level}
                          </span>
                          <h2
                            className={`font-bold tracking-tight ${
                              sec.level === 'H2' ? 'text-sm' : 'text-xs text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {sec.heading}
                          </h2>
                        </div>

                        {/* Search purpose info */}
                        <p
                          className={`text-[11px] italic ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {sec.searchPurpose}
                        </p>

                        {/* Talking points preview */}
                        <ul className="space-y-1 pl-1">
                          {sec.talkingPoints.slice(0, 3).map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="text-[11px] flex items-start gap-1.5 leading-snug"
                            >
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Mobile Format pill */}
                        <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-medium">
                            Format: {sec.formatRecommendation}
                          </span>
                          <span>~{sec.estimatedWords} words</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FAQ Accordion Section Preview */}
                  {faqSections.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-1.5">
                        {faqSections.slice(0, 3).map((faq, fIdx) => (
                          <div
                            key={faq.id}
                            className={`rounded-xl border p-2.5 text-[11px] ${
                              isDarkMode
                                ? 'bg-slate-900 border-slate-800'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <button
                              onClick={() =>
                                setExpandedFaqId(
                                  expandedFaqId === faq.id ? null : faq.id
                                )
                              }
                              className="w-full flex items-center justify-between font-bold text-left cursor-pointer"
                            >
                              <span>{faq.heading}</span>
                              {expandedFaqId === faq.id ? (
                                <ChevronUp className="w-3 h-3 shrink-0 ml-1" />
                              ) : (
                                <ChevronDown className="w-3 h-3 shrink-0 ml-1" />
                              )}
                            </button>
                            {expandedFaqId === faq.id && (
                              <p className="mt-1.5 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-1.5">
                                {faq.talkingPoints.join(' ')}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile Call To Action Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center space-y-1.5">
                    <h4 className="font-bold text-xs">Ready to optimize your content?</h4>
                    <p className="text-[10px] text-slate-300">
                      Targeting <span className="text-amber-300 font-semibold">{blueprint.inputs.primaryKeyword}</span>
                    </p>
                    <button className="w-full py-1.5 bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] shadow-sm">
                      Get Started
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GOOGLE MOBILE SERP PREVIEW */}
              {phoneTab === 'serp' && (
                <div className="space-y-3">
                  {/* Google Search Bar Mock */}
                  <div className="bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-2 flex items-center gap-2 text-[11px] shadow-xs">
                    <Search className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-medium truncate">{blueprint.inputs.primaryKeyword}</span>
                  </div>

                  {/* SERP Tabs */}
                  <div className="flex gap-4 text-[10px] font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-1.5 px-1">
                    <span className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1">All</span>
                    <span>Images</span>
                    <span>Videos</span>
                    <span>News</span>
                  </div>

                  {/* Google Search Result Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1.5 shadow-xs">
                    {/* URL Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                      <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[8px]">
                        🌐
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-slate-800 dark:text-slate-200">example.com</span>
                        <span className="mx-1">›</span>
                        <span>blog</span>
                        <span className="mx-1">›</span>
                        <span className="truncate">{blueprint.inputs.primaryKeyword.toLowerCase().replace(/\s+/g, '-')}</span>
                      </div>
                    </div>

                    {/* Blue Title Link */}
                    <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 leading-snug hover:underline cursor-pointer">
                      {blueprint.suggestedH1}
                    </h3>

                    {/* Meta description */}
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Comprehensive guide on <strong className="text-slate-900 dark:text-white font-bold">{blueprint.inputs.primaryKeyword}</strong>. Learn step-by-step strategies, comparison insights, and key best practices for {new Date().getFullYear()}.
                    </p>

                    {/* Sitelinks or Rich snippets */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
                      {blueprint.sections.slice(0, 2).map((s) => (
                        <div key={s.id} className="p-1.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200/60 dark:border-slate-700">
                          <span className="font-bold text-blue-700 dark:text-blue-400 block truncate">{s.heading}</span>
                          <span className="text-[9px] text-slate-500 truncate block">Overview &amp; tips</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second Result Mock */}
                  <div className="opacity-50 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1">
                    <div className="text-[10px] text-slate-400">competitor.com › guide</div>
                    <div className="text-xs font-bold text-blue-600 truncate">{blueprint.inputs.primaryKeyword}: The 2026 Manual</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">Alternative approaches to ranking and optimizing topics...</div>
                  </div>
                </div>
              )}

              {/* TAB 3: MOBILE AI OVERVIEW (AEO) */}
              {phoneTab === 'aeo' && (
                <div className="space-y-3">
                  {/* Google AI Overview Box */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Google AI Overview</span>
                    </div>

                    <p className="text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                      For <strong className="font-bold">{blueprint.inputs.primaryKeyword}</strong>, searchers prioritize structured, intent-aligned answers. Key highlights include:
                    </p>

                    <ul className="space-y-1 pl-1 text-[11px] text-slate-700 dark:text-slate-300">
                      {blueprint.sections.slice(0, 3).map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span><strong>{s.heading.replace(/^(\d+\.?\s*)/, '')}:</strong> {s.searchPurpose}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-between text-[10px] text-indigo-700 dark:text-indigo-300">
                      <span>Source: example.com</span>
                      <span className="font-bold">AEO Optimized ✓</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-1.5">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Why this matters for Mobile:
                    </span>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Over 60% of Google mobile searches now trigger AI Overviews or direct featured answers above organic links. Formatting your first section with concise 40-word definitions maximizes mobile AI citation rate.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: SECTION CARDS */}
              {phoneTab === 'sections' && (
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-1">
                    Structured Hierarchy ({blueprint.sections.length} total)
                  </div>
                  {blueprint.sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          #{idx + 1} • {sec.level}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          ~{sec.estimatedWords} words
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {sec.heading}
                      </h4>
                      <p className="text-[10px] text-slate-500 italic">
                        {sec.searchPurpose}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Home Bar */}
            <div className="h-5 flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Simulator Controls & Tips */}
      <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Real-time mobile simulation synced with blueprint edits</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQRModal}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Open directly on your physical smartphone</span>
          </button>
        </div>
      </div>
    </div>
  );
};
