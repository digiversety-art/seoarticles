import React, { useState, useEffect, useMemo } from 'react';
import {
  PlannerInputs,
  ContentType,
  SearchIntent,
  ArticleLength,
  SEOBlueprint,
} from '../types/seo';
import {
  CONTENT_TYPE_OPTIONS,
  SEARCH_INTENT_OPTIONS,
  NICHE_OPTIONS,
  EXAMPLE_KEYWORD_PROMPTS,
} from '../data/categories';
import { generateSEOBlueprint } from '../engine/seoEngine';
import {
  getStoredDraft,
  saveDraftToStorage,
  clearDraftFromStorage,
  WizardDraft,
} from '../utils/storage';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ListOrdered,
  ListFilter,
  Scale,
  Award,
  Briefcase,
  Target,
  Compass,
  Check,
  Search,
  Sliders,
  ShieldCheck,
  History,
  RotateCcw,
  X,
  Clock,
} from 'lucide-react';

interface PlannerWizardProps {
  onBlueprintGenerated: (blueprint: SEOBlueprint) => void;
  initialInputs?: PlannerInputs;
}

export const PlannerWizard: React.FC<PlannerWizardProps> = ({
  onBlueprintGenerated,
  initialInputs,
}) => {
  // Check for stored draft on initial mount if initialInputs not supplied
  const storedDraft = useMemo(() => {
    if (initialInputs) return null;
    return getStoredDraft();
  }, [initialInputs]);

  const [primaryKeyword, setPrimaryKeyword] = useState(
    initialInputs?.primaryKeyword || storedDraft?.inputs.primaryKeyword || ''
  );
  const [contentType, setContentType] = useState<ContentType>(
    initialInputs?.contentType || storedDraft?.inputs.contentType || 'blog-post'
  );
  const [searchIntent, setSearchIntent] = useState<SearchIntent>(
    initialInputs?.searchIntent || storedDraft?.inputs.searchIntent || 'informational'
  );
  const [niche, setNiche] = useState<string>(
    initialInputs?.niche || storedDraft?.inputs.niche || 'SEO & Digital Marketing'
  );
  const [customNiche, setCustomNiche] = useState(
    initialInputs?.customNiche || storedDraft?.inputs.customNiche || ''
  );
  const [targetAudience, setTargetAudience] = useState(
    initialInputs?.targetAudience || storedDraft?.inputs.targetAudience || ''
  );
  const [country, setCountry] = useState(
    initialInputs?.country || storedDraft?.inputs.country || ''
  );
  const [brandName, setBrandName] = useState(
    initialInputs?.brandName || storedDraft?.inputs.brandName || ''
  );
  const [secondaryKeywords, setSecondaryKeywords] = useState(
    initialInputs?.secondaryKeywords || storedDraft?.inputs.secondaryKeywords || ''
  );
  const [articleLength, setArticleLength] = useState<ArticleLength>(
    initialInputs?.articleLength || storedDraft?.inputs.articleLength || 'standard'
  );
  const [existingUrl, setExistingUrl] = useState(
    initialInputs?.existingUrl || storedDraft?.inputs.existingUrl || ''
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    initialInputs?.specialInstructions || storedDraft?.inputs.specialInstructions || ''
  );

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(
    storedDraft?.isAdvancedOpen || false
  );
  const [activeIntentTooltip, setActiveIntentTooltip] = useState<string | null>(
    null
  );
  const [nicheSearchQuery, setNicheSearchQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  // Auto-save notification & tracking states
  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(
    !!storedDraft && (!!storedDraft.inputs.primaryKeyword || !!storedDraft.inputs.targetAudience || storedDraft.inputs.contentType !== 'blog-post')
  );
  const [restoredBannerDismissed, setRestoredBannerDismissed] = useState(false);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number | null>(
    storedDraft?.updatedAt || null
  );
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>(
    storedDraft ? 'saved' : 'idle'
  );

  // Multi-step loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');

  // Auto-save effect on input change
  useEffect(() => {
    const hasContent =
      primaryKeyword.trim().length > 0 ||
      customNiche.trim().length > 0 ||
      targetAudience.trim().length > 0 ||
      country.trim().length > 0 ||
      brandName.trim().length > 0 ||
      secondaryKeywords.trim().length > 0 ||
      existingUrl.trim().length > 0 ||
      specialInstructions.trim().length > 0 ||
      contentType !== 'blog-post' ||
      searchIntent !== 'informational' ||
      niche !== 'SEO & Digital Marketing' ||
      articleLength !== 'standard';

    if (!hasContent) {
      clearDraftFromStorage();
      setSaveStatus('idle');
      return;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      const draftData: WizardDraft = {
        inputs: {
          primaryKeyword: primaryKeyword.trim(),
          contentType,
          searchIntent,
          niche,
          customNiche: niche === 'Other / Custom' ? customNiche : undefined,
          targetAudience: targetAudience.trim() || undefined,
          country: country.trim() || undefined,
          brandName: brandName.trim() || undefined,
          secondaryKeywords: secondaryKeywords.trim() || undefined,
          articleLength,
          existingUrl: existingUrl.trim() || undefined,
          specialInstructions: specialInstructions.trim() || undefined,
        },
        updatedAt: Date.now(),
        isAdvancedOpen,
      };

      saveDraftToStorage(draftData);
      setLastSavedTimestamp(draftData.updatedAt);
      setSaveStatus('saved');
    }, 400);

    return () => clearTimeout(timer);
  }, [
    primaryKeyword,
    contentType,
    searchIntent,
    niche,
    customNiche,
    targetAudience,
    country,
    brandName,
    secondaryKeywords,
    articleLength,
    existingUrl,
    specialInstructions,
    isAdvancedOpen,
  ]);

  const handleClearDraft = () => {
    clearDraftFromStorage();
    setPrimaryKeyword('');
    setContentType('blog-post');
    setSearchIntent('informational');
    setNiche('SEO & Digital Marketing');
    setCustomNiche('');
    setTargetAudience('');
    setCountry('');
    setBrandName('');
    setSecondaryKeywords('');
    setArticleLength('standard');
    setExistingUrl('');
    setSpecialInstructions('');
    setIsAdvancedOpen(false);
    setValidationError('');
    setHasRestoredDraft(false);
    setLastSavedTimestamp(null);
    setSaveStatus('idle');
  };

  const formatSavedTime = (ts: number | null) => {
    if (!ts) return '';
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 10) return 'just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Icon map for Content Types
  const getContentTypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-slate-700" />;
      case 'ListOrdered':
        return <ListOrdered className="w-4 h-4 text-slate-700" />;
      case 'ListFilter':
        return <ListFilter className="w-4 h-4 text-slate-700" />;
      case 'Scale':
        return <Scale className="w-4 h-4 text-slate-700" />;
      case 'Award':
        return <Award className="w-4 h-4 text-slate-700" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-slate-700" />;
      case 'Target':
        return <Target className="w-4 h-4 text-slate-700" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-slate-700" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-700" />;
    }
  };

  const handleApplyExample = (ex: (typeof EXAMPLE_KEYWORD_PROMPTS)[0]) => {
    setPrimaryKeyword(ex.keyword);
    setSearchIntent(ex.intent);
    setContentType(ex.type);
    setNiche(ex.niche);
    setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!primaryKeyword.trim()) {
      setValidationError('Please enter a primary keyword to plan your article structure.');
      const el = document.getElementById('primary-keyword-input');
      el?.focus();
      return;
    }

    if (primaryKeyword.trim().length < 2) {
      setValidationError('Please enter a descriptive keyword phrase (e.g., "best project management software").');
      return;
    }

    setValidationError('');
    setIsGenerating(true);

    const inputs: PlannerInputs = {
      primaryKeyword: primaryKeyword.trim(),
      contentType,
      searchIntent,
      niche,
      customNiche: niche === 'Other / Custom' ? customNiche : undefined,
      targetAudience: targetAudience.trim() || undefined,
      country: country.trim() || undefined,
      brandName: brandName.trim() || undefined,
      secondaryKeywords: secondaryKeywords.trim() || undefined,
      articleLength,
      existingUrl: existingUrl.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    // Sequential premium simulated loading steps
    setLoadingStepText('Analyzing search keyword...');

    setTimeout(() => {
      setLoadingStepText('Aligning search intent & persona...');
    }, 450);

    setTimeout(() => {
      setLoadingStepText('Constructing heading architecture...');
    }, 900);

    setTimeout(() => {
      setLoadingStepText('Synthesizing AEO & SEO guidelines...');
    }, 1350);

    setTimeout(() => {
      setLoadingStepText('Structure Ready ✓');
      const blueprint = generateSEOBlueprint(inputs);
      setTimeout(() => {
        setIsGenerating(false);
        onBlueprintGenerated(blueprint);
      }, 350);
    }, 1750);
  };

  const filteredNiches = NICHE_OPTIONS.filter((n) =>
    n.toLowerCase().includes(nicheSearchQuery.toLowerCase())
  );

  const hasAnyInput =
    primaryKeyword.trim().length > 0 ||
    customNiche.trim().length > 0 ||
    targetAudience.trim().length > 0 ||
    secondaryKeywords.trim().length > 0;

  return (
    <div id="planner-wizard-section" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 transition-all">
        {/* Restored Session Notification Banner */}
        {hasRestoredDraft && !restoredBannerDismissed && (
          <div className="mb-6 p-3.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <History className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white">Unsaved session restored:</span>{' '}
                <span className="text-slate-300">
                  {lastSavedTimestamp
                    ? `Retrieved your in-progress article planner session (last updated ${formatSavedTime(lastSavedTimestamp)}).`
                    : 'Retrieved your in-progress inputs from browser local storage.'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={handleClearDraft}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-semibold text-[11px] cursor-pointer transition-colors"
              >
                Clear &amp; Start Blank
              </button>
              <button
                type="button"
                onClick={() => setRestoredBannerDismissed(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Card Header */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Create Your SEO Content Blueprint</span>
            </h2>

            <div className="flex items-center gap-2">
              {/* Auto-save status badge */}
              {saveStatus === 'saving' && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Saving progress...</span>
                </span>
              )}
              {saveStatus === 'saved' && (
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full"
                  title="Auto-saved to browser local storage"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Auto-saved {lastSavedTimestamp ? `(${formatSavedTime(lastSavedTimestamp)})` : ''}</span>
                </span>
              )}

              {hasAnyInput && (
                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="text-[11px] font-medium text-slate-500 hover:text-red-600 hover:underline px-1.5 py-0.5 cursor-pointer transition-colors"
                  title="Reset all inputs"
                >
                  Clear Form
                </button>
              )}

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                No Signup Required
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Define your core topic and content goals below. Your progress is auto-saved locally so you never lose your work.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: PRIMARY KEYWORD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="primary-keyword-input"
                className="text-sm font-bold text-slate-900 flex items-center gap-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <span>Primary Target Keyword</span>
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <span className="text-xs text-slate-600 font-medium">
                The main query you want to rank for
              </span>
            </div>

            <div className="relative">
              <input
                id="primary-keyword-input"
                type="text"
                value={primaryKeyword}
                onChange={(e) => {
                  setPrimaryKeyword(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="e.g. best running shoes for beginners, how to start a podcast..."
                className={`w-full px-4 py-3.5 rounded-xl border text-sm sm:text-base font-medium transition-all bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                  validationError
                    ? 'border-red-300 focus:ring-red-400 text-red-900'
                    : 'border-slate-300 focus:ring-slate-900 text-slate-900'
                }`}
              />
            </div>

            {validationError && (
              <p className="text-xs font-semibold text-red-600 flex items-center gap-1 animate-in fade-in">
                <span>⚠</span> {validationError}
              </p>
            )}

            {/* Quick Example Chips */}
            <div className="pt-1">
              <span className="text-[11px] font-medium text-slate-600 mr-2">
                Try an example:
              </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                {EXAMPLE_KEYWORD_PROMPTS.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyExample(ex)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
                  >
                    {ex.keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2: CONTENT TYPE CARDS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span>Content Type</span>
              </label>
              <span className="text-xs text-slate-600 font-medium">
                Determines the article archetype & hierarchy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CONTENT_TYPE_OPTIONS.map((opt) => {
                const isSelected = contentType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setContentType(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {getContentTypeIcon(opt.iconName)}
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold leading-tight mb-1">
                        {opt.title}
                      </h4>
                      <p
                        className={`text-[11px] leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {opt.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-end text-[10px] font-semibold text-emerald-300">
                        <Check className="w-3.5 h-3.5 mr-0.5" /> Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: SEARCH INTENT */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                <span>Search Intent</span>
              </label>
              <span className="text-xs text-slate-600 font-medium">
                Why the reader is typing this search
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {SEARCH_INTENT_OPTIONS.map((intent) => {
                const isSelected = searchIntent === intent.id;
                return (
                  <div
                    key={intent.id}
                    onClick={() => setSearchIntent(intent.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">{intent.title}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIntentTooltip(
                              activeIntentTooltip === intent.id ? null : intent.id
                            );
                          }}
                          className={`p-0.5 rounded focus:outline-none ${
                            isSelected ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="What is this?"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p
                        className={`text-[11px] leading-tight mb-2 ${
                          isSelected ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {intent.shortDefinition}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-0.5 mt-1">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}

                    {/* Intent Guide Dropdown/Popover */}
                    {activeIntentTooltip === intent.id && (
                      <div className="absolute left-0 right-0 top-full mt-2 z-30 p-3.5 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-700 animate-in fade-in">
                        <p className="font-semibold mb-1 text-amber-300">
                          {intent.title} Search Intent
                        </p>
                        <p className="text-slate-300 text-[11px] mb-2 leading-relaxed">
                          {intent.explanation}
                        </p>
                        <p className="text-[10px] italic text-slate-400 border-t border-slate-800 pt-1.5">
                          Mindset: {intent.searcherMindset}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: NICHE / INDUSTRY */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  4
                </span>
                <span>Niche / Industry</span>
              </label>
              <span className="text-xs text-slate-600 font-medium">
                Tailors terminology & E-E-A-T guidelines
              </span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={nicheSearchQuery}
                  onChange={(e) => setNicheSearchQuery(e.target.value)}
                  placeholder="Filter industry categories..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-100 rounded-lg">
                {filteredNiches.map((n) => {
                  const isSelected = niche === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNiche(n)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              {niche === 'Other / Custom' && (
                <div className="pt-2 animate-in fade-in">
                  <input
                    type="text"
                    value={customNiche}
                    onChange={(e) => setCustomNiche(e.target.value)}
                    placeholder="Enter your custom niche / vertical (e.g. Specialty Coffee, Solar Engineering)..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* STEP 5: COLLAPSIBLE ADVANCED / OPTIONAL INPUTS */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="w-full flex items-center justify-between py-2 text-left text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                <span>Advanced Inputs & Context Parameters (Optional)</span>
                <span className="text-[11px] font-normal text-slate-600">
                  {isAdvancedOpen ? '— Collapse' : '— Expand to customize word count, audience, & region'}
                </span>
              </span>
              {isAdvancedOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {isAdvancedOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 pb-2 animate-in slide-in-from-top-2">
                {/* Desired Article Length */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Target Article Length / Depth
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'short', label: 'Short & Focused', words: '800–1,200 words' },
                      { id: 'standard', label: 'Standard Depth', words: '1,500–2,500 words' },
                      { id: 'comprehensive', label: 'Comprehensive Pillar', words: '3,000–5,000 words' },
                    ].map((len) => (
                      <button
                        key={len.id}
                        type="button"
                        onClick={() => setArticleLength(len.id as ArticleLength)}
                        className={`p-2.5 rounded-lg border text-center text-xs transition-colors ${
                          articleLength === len.id
                            ? 'border-slate-900 bg-slate-900 text-white font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <span className="block">{len.label}</span>
                        <span className="text-[10px] opacity-75">{len.words}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Target Audience / Persona
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Startup CTOs, First-time marathoners..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* Country / Location */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Country / Target Region
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United States, United Kingdom, Global..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* Brand Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Brand / Business Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Acme Corp..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* Secondary Keywords */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Secondary Keywords / LSI Phrases
                  </label>
                  <input
                    type="text"
                    value={secondaryKeywords}
                    onChange={(e) => setSecondaryKeywords(e.target.value)}
                    placeholder="e.g. pricing, comparison, setup guide, best practices..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* Existing URL or Competitor URL */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Existing Article / Reference URL
                  </label>
                  <input
                    type="text"
                    value={existingUrl}
                    onChange={(e) => setExistingUrl(e.target.value)}
                    placeholder="https://example.com/blog/my-old-post"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                {/* Special Instructions */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Special Editorial Notes
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Emphasize B2B case studies, avoid overly technical jargon..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* PRIMARY SUBMIT ACTION BUTTON (Crafted with subtle micro-shine, multi-stage loading) */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full relative overflow-hidden py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white transition-all transform duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 group ${
                isGenerating
                  ? 'bg-slate-800 cursor-wait'
                  : 'bg-slate-900 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {/* Subtle light shimmer sweep */}
              {!isGenerating && (
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-subtle-shine pointer-events-none" />
              )}

              {isGenerating ? (
                <div className="flex items-center gap-2.5 text-amber-300 font-semibold animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{loadingStepText}</span>
                </div>
              ) : (
                <>
                  <span>Build My SEO Structure</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant deterministic calculation • Client-side privacy guaranteed</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
