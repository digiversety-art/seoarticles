import React, { useState } from 'react';
import {
  SEOBlueprint,
  SectionItem,
  SEOChecklistItem,
} from '../types/seo';
import {
  exportBlueprintAsMarkdown,
  exportBlueprintAsJSON,
  saveBlueprintToStorage,
} from '../utils/storage';
import { PhoneQRModal } from './PhoneQRModal';
import { MobileSimulator } from './MobileSimulator';
import {
  Copy,
  Check,
  Printer,
  Bookmark,
  RotateCcw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  MoveUp,
  MoveDown,
  Edit3,
  Sparkles,
  Layers,
  CheckSquare,
  Bot,
  ShieldCheck,
  FileDown,
  Share2,
  ArrowRight,
  ExternalLink,
  Smartphone,
  QrCode,
  LayoutTemplate,
} from 'lucide-react';

interface BlueprintResultProps {
  blueprint: SEOBlueprint;
  onUpdateBlueprint: (updated: SEOBlueprint) => void;
  onReset: () => void;
}

type TabType = 'structure' | 'checklist' | 'aeo' | 'quality';
type ViewMode = 'editor' | 'mobile';

export const BlueprintResult: React.FC<BlueprintResultProps> = ({
  blueprint,
  onUpdateBlueprint,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('structure');
  const [viewMode, setViewMode] = useState<ViewMode>('editor');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Section editing state
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editHeadingText, setEditHeadingText] = useState('');
  const [editPurposeText, setEditPurposeText] = useState('');
  const [editTalkingPointsText, setEditTalkingPointsText] = useState('');

  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(blueprint.suggestedH1);

  // New section form state
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSecLevel, setNewSecLevel] = useState<'H2' | 'H3'>('H2');
  const [newSecHeading, setNewSecHeading] = useState('');
  const [newSecPurpose, setNewSecPurpose] = useState('');
  const [newSecPoints, setNewSecPoints] = useState('');
  const [newSecFormat, setNewSecFormat] = useState('Standard paragraph + bullet list');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSaveToLocalStorage = () => {
    const success = saveBlueprintToStorage(blueprint);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Section operations
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...blueprint.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    onUpdateBlueprint({ ...blueprint, sections: newSections });
  };

  const deleteSection = (id: string) => {
    const newSections = blueprint.sections.filter((s) => s.id !== id);
    onUpdateBlueprint({ ...blueprint, sections: newSections });
  };

  const toggleSectionExpand = (id: string) => {
    const newSections = blueprint.sections.map((s) =>
      s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
    );
    onUpdateBlueprint({ ...blueprint, sections: newSections });
  };

  const toggleAllSections = (expand: boolean) => {
    const newSections = blueprint.sections.map((s) => ({
      ...s,
      isExpanded: expand,
    }));
    onUpdateBlueprint({ ...blueprint, sections: newSections });
  };

  const startEditSection = (section: SectionItem) => {
    setEditingSectionId(section.id);
    setEditHeadingText(section.heading);
    setEditPurposeText(section.searchPurpose);
    setEditTalkingPointsText(section.talkingPoints.join('\n'));
  };

  const saveEditSection = (id: string) => {
    const points = editTalkingPointsText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const newSections = blueprint.sections.map((s) =>
      s.id === id
        ? {
            ...s,
            heading: editHeadingText,
            searchPurpose: editPurposeText,
            talkingPoints: points.length > 0 ? points : s.talkingPoints,
          }
        : s
    );

    onUpdateBlueprint({ ...blueprint, sections: newSections });
    setEditingSectionId(null);
  };

  const handleAddNewSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecHeading.trim()) return;

    const points = newSecPoints
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const newSec: SectionItem = {
      id: `custom-sec-${Date.now()}`,
      level: newSecLevel,
      heading: newSecHeading.trim(),
      searchPurpose: newSecPurpose.trim() || 'Custom strategic section.',
      talkingPoints: points.length > 0 ? points : ['Cover core contextual concepts.', 'Include practical examples.'],
      keywordOpportunity: blueprint.inputs.primaryKeyword,
      estimatedWords: 200,
      formatRecommendation: newSecFormat,
      isExpanded: true,
    };

    onUpdateBlueprint({
      ...blueprint,
      sections: [...blueprint.sections, newSec],
    });

    setShowAddSectionModal(false);
    setNewSecHeading('');
    setNewSecPurpose('');
    setNewSecPoints('');
  };

  const toggleChecklistItem = (id: string) => {
    const updatedChecklist = blueprint.checklist.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    onUpdateBlueprint({ ...blueprint, checklist: updatedChecklist });
  };

  const completedChecklistCount = blueprint.checklist.filter(
    (item) => item.isCompleted
  ).length;
  const checklistProgressPercent = Math.round(
    (completedChecklistCount / blueprint.checklist.length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* ACTION TOOLBAR (Top Bar) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              SEO Content Blueprint Generated
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              ({blueprint.sections.length} sections)
            </span>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Full Editor</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              <span>Phone Preview</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Real Phone QR Trigger */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors border border-amber-200 cursor-pointer shadow-2xs"
            title="Scan QR code to open directly on your mobile phone"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-700" />
            <span>Scan on Phone</span>
          </button>

          {/* Save to browser */}
          <button
            onClick={handleSaveToLocalStorage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Saved Locally</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-600" />
                <span>Save to Browser</span>
              </>
            )}
          </button>

          {/* Copy Markdown */}
          <button
            onClick={() =>
              copyToClipboard(
                exportBlueprintAsMarkdown(blueprint),
                'markdown'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
          >
            {copiedType === 'markdown' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          {/* Export JSON / Plain text */}
          <button
            onClick={() =>
              copyToClipboard(exportBlueprintAsJSON(blueprint), 'json')
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
            title="Copy structured JSON representation"
          >
            {copiedType === 'json' ? (
              <span className="text-emerald-600 font-bold">Copied JSON!</span>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5 text-slate-500" />
                <span>JSON</span>
              </>
            )}
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          {/* Reset / Start Over */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to start over? Any unsaved edits to this structure will be cleared.'
                )
              ) {
                onReset();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 transition-colors border border-red-200 cursor-pointer"
            title="Start over with a new topic"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* MOBILE SIMULATOR VIEW (When Phone Preview tab is active) */}
      {viewMode === 'mobile' ? (
        <MobileSimulator
          blueprint={blueprint}
          onClose={() => setViewMode('editor')}
          onOpenQRModal={() => setIsQRModalOpen(true)}
        />
      ) : (
        <>

      {/* BLUEPRINT SUMMARY HEADER CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Metadata badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-xs font-semibold">
            KEYWORD: {blueprint.inputs.primaryKeyword}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
            INTENT: {blueprint.inputs.searchIntent}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
            TYPE: {blueprint.inputs.contentType}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
            NICHE: {blueprint.inputs.niche}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
            TARGET: {blueprint.targetWordCountRange}
          </span>
        </div>

        {/* Suggested H1 Title with Copy / Edit */}
        <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200 mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Recommended H1 Title Tag</span>
            </span>
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={() => setIsEditingTitle(!isEditingTitle)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingTitle ? 'Done' : 'Edit Title'}</span>
              </button>
              <button
                onClick={() => copyToClipboard(blueprint.suggestedH1, 'h1')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 ml-2"
              >
                {copiedType === 'h1' ? (
                  <span className="text-emerald-600 font-bold">Copied!</span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy H1</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {isEditingTitle ? (
            <input
              type="text"
              value={titleText}
              onChange={(e) => {
                setTitleText(e.target.value);
                onUpdateBlueprint({
                  ...blueprint,
                  suggestedH1: e.target.value,
                });
              }}
              className="w-full text-base sm:text-lg font-bold text-slate-900 p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          ) : (
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {blueprint.suggestedH1}
            </h1>
          )}

          {/* Alternative H1 Options */}
          {blueprint.alternativeH1s && blueprint.alternativeH1s.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Alternative Title Angles:
              </span>
              <div className="space-y-1">
                {blueprint.alternativeH1s.map((alt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onUpdateBlueprint({ ...blueprint, suggestedH1: alt });
                      setTitleText(alt);
                    }}
                    className="text-xs text-slate-700 hover:text-slate-900 flex items-center justify-between p-1.5 rounded hover:bg-slate-200/60 cursor-pointer group transition-colors"
                  >
                    <span className="font-medium">
                      {idx + 1}. {alt}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-800 font-semibold">
                      Use as Main H1 →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Meta Description */}
        <div className="p-3.5 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">
              Suggested Meta Description
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {blueprint.metaDescription.length} / 155 chars
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {blueprint.metaDescription}
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="border-b border-slate-200 no-print">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'structure'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Article Structure & Outline</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700">
              {blueprint.sections.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'checklist'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>On-Page SEO Checklist</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[11px] bg-emerald-100 text-emerald-800 font-bold">
              {completedChecklistCount}/{blueprint.checklist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('aeo')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'aeo'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>AI Search & AEO Strategy</span>
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'quality'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Content Quality & E-E-A-T</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ARTICLE STRUCTURE & OUTLINE */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Interactive Outline:
              </span>
              <span>Reorder, edit, add talking points, or customize.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAllSections(true)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
              >
                Expand All
              </button>
              <button
                onClick={() => toggleAllSections(false)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
              >
                Collapse All
              </button>
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Section</span>
              </button>
            </div>
          </div>

          {/* Section Cards List */}
          <div className="space-y-3.5">
            {blueprint.sections.map((section, index) => {
              const isEditing = editingSectionId === section.id;

              return (
                <div
                  key={section.id}
                  className="blueprint-card bg-white rounded-xl border border-slate-200/90 shadow-2xs transition-all hover:border-slate-300"
                >
                  {/* Card Header Bar */}
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 mt-0.5 ${
                          section.level === 'H2'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {section.level}
                      </span>

                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <div className="space-y-3 pt-1">
                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Heading Text
                              </label>
                              <input
                                type="text"
                                value={editHeadingText}
                                onChange={(e) =>
                                  setEditHeadingText(e.target.value)
                                }
                                className="w-full text-sm font-bold text-slate-900 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Search Purpose
                              </label>
                              <input
                                type="text"
                                value={editPurposeText}
                                onChange={(e) =>
                                  setEditPurposeText(e.target.value)
                                }
                                className="w-full text-xs text-slate-700 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Talking Points (one per line)
                              </label>
                              <textarea
                                rows={3}
                                value={editTalkingPointsText}
                                onChange={(e) =>
                                  setEditTalkingPointsText(e.target.value)
                                }
                                className="w-full text-xs text-slate-700 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900"
                              />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => saveEditSection(section.id)}
                                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => setEditingSectionId(null)}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3
                              onClick={() => toggleSectionExpand(section.id)}
                              className="text-sm sm:text-base font-bold text-slate-900 leading-snug cursor-pointer hover:text-slate-700 flex items-center gap-2"
                            >
                              <span>{section.heading}</span>
                            </h3>

                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                              <span>
                                Purpose:{' '}
                                <strong className="text-slate-700 font-medium">
                                  {section.searchPurpose}
                                </strong>
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Section actions (Reorder, Edit, Delete, Toggle) */}
                    {!isEditing && (
                      <div className="flex items-center gap-1 shrink-0 no-print">
                        <button
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Move Up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === blueprint.sections.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Move Down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => startEditSection(section)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                          title="Edit Section"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                          title="Delete Section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleSectionExpand(section.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                        >
                          {section.isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Expanded Body: Talking Points, Word Count, Format */}
                  {section.isExpanded && !isEditing && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100/80 mt-2 space-y-3 text-xs">
                      {/* Format and keyword metadata pill row */}
                      <div className="flex flex-wrap items-center gap-2 pt-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[11px]">
                          Format: {section.formatRecommendation}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[11px]">
                          Target Length: ~{section.estimatedWords} words
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 font-medium text-[11px]">
                          Target Query: {section.keywordOpportunity}
                        </span>
                      </div>

                      {/* Suggested Talking Points List */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Suggested Talking Points & Sub-Topics:
                        </span>
                        <ul className="space-y-1.5 pl-1">
                          {section.talkingPoints.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2 text-slate-700 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ON-PAGE SEO CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                On-Page SEO Optimization Checklist
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Ensure all critical on-page ranking and readability factors are satisfied before publishing.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${checklistProgressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {checklistProgressPercent}% Complete
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {blueprint.checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!item.isCompleted}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-1 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`font-bold ${
                        item.isCompleted ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed mb-1">
                    {item.description}
                  </p>
                  <p className="text-slate-800 font-medium text-[11px] bg-white/80 p-2 rounded border border-slate-200/60">
                    💡 <strong>Action:</strong> {item.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI SEARCH & AEO STRATEGY */}
      {activeTab === 'aeo' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">
                AI Search & Answer Engine Optimization (AEO) Playbook
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Strategies to ensure your content is indexed, extracted, and cited by Google AI Overviews, Perplexity, ChatGPT Search, and Copilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blueprint.aeoRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {rec.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {rec.category}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {rec.actionItem}
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 font-mono">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    Structure Example:
                  </span>
                  {rec.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONTENT QUALITY & E-E-A-T */}
      {activeTab === 'quality' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Content Quality & E-E-A-T Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Guidelines based on Google Search Quality Evaluator standards to establish genuine expertise, original insight, and trustworthy credibility.
            </p>
          </div>

          <div className="space-y-3">
            {blueprint.qualityRecommendations.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{q.factor}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {q.relevanceTag}
                  </span>
                </div>
                <p className="text-slate-600 text-xs">{q.description}</p>
                <p className="text-slate-900 font-medium bg-slate-50 p-2 rounded border border-slate-200/80">
                  ⚡ <strong>Guideline:</strong> {q.actionGuideline}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}

      {/* PHONE QR MODAL */}
      <PhoneQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        blueprint={blueprint}
      />

      {/* MODAL: ADD CUSTOM SECTION */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Add Custom Outline Section
            </h3>

            <form onSubmit={handleAddNewSection} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Heading Level
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSecLevel('H2')}
                    className={`flex-1 py-1.5 rounded-lg font-bold border ${
                      newSecLevel === 'H2'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    H2 (Main Topic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSecLevel('H3')}
                    className={`flex-1 py-1.5 rounded-lg font-bold border ${
                      newSecLevel === 'H3'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    H3 (Sub-Topic)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Heading Title *
                </label>
                <input
                  type="text"
                  required
                  value={newSecHeading}
                  onChange={(e) => setNewSecHeading(e.target.value)}
                  placeholder="e.g. Real-World Benchmarks & Performance Metrics"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Search Purpose
                </label>
                <input
                  type="text"
                  value={newSecPurpose}
                  onChange={(e) => setNewSecPurpose(e.target.value)}
                  placeholder="e.g. Answers specific technical performance queries."
                  className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Talking Points (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newSecPoints}
                  onChange={(e) => setNewSecPoints(e.target.value)}
                  placeholder="Key sub-points to mention..."
                  className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
