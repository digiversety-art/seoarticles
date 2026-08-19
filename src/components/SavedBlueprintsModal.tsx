import React, { useState } from 'react';
import { SEOBlueprint } from '../types/seo';
import {
  X,
  Trash2,
  ExternalLink,
  Search,
  Bookmark,
  Calendar,
  Layers,
} from 'lucide-react';
import { deleteBlueprintFromStorage } from '../utils/storage';

interface SavedBlueprintsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBlueprints: SEOBlueprint[];
  onSelectBlueprint: (blueprint: SEOBlueprint) => void;
  onUpdateSavedList: (updated: SEOBlueprint[]) => void;
}

export const SavedBlueprintsModal: React.FC<SavedBlueprintsModalProps> = ({
  isOpen,
  onClose,
  savedBlueprints,
  onSelectBlueprint,
  onUpdateSavedList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = savedBlueprints.filter(
    (b) =>
      b.inputs.primaryKeyword
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      b.suggestedH1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.inputs.niche.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this saved outline from browser storage?')) {
      const updated = deleteBlueprintFromStorage(id);
      onUpdateSavedList(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-slate-800" />
            <h3 className="text-base font-bold text-slate-900">
              Saved Content Blueprints
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700">
              {savedBlueprints.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved blueprints by keyword, title, or niche..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <p className="font-semibold text-slate-700 mb-1">
                {savedBlueprints.length === 0
                  ? 'No saved blueprints yet.'
                  : 'No blueprints matching your search.'}
              </p>
              <p>
                Click &quot;Save to Browser&quot; on any generated structure to keep
                it stored locally in your browser.
              </p>
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  onSelectBlueprint(b);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {b.inputs.primaryKeyword}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">
                      {b.inputs.contentType} • {b.inputs.searchIntent}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {b.suggestedH1}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" /> {b.sections.length} sections
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{' '}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDelete(b.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Stored privately in browser local storage.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
