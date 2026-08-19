import { SEOBlueprint, PlannerInputs } from '../types/seo';

const STORAGE_KEY = 'seo_article_planner_blueprints';
const DRAFT_STORAGE_KEY = 'seo_article_planner_wizard_draft';

export interface WizardDraft {
  inputs: PlannerInputs;
  updatedAt: number;
  isAdvancedOpen?: boolean;
}

export function getStoredDraft(): WizardDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.inputs && typeof parsed.inputs.primaryKeyword === 'string') {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Failed to load wizard draft from localStorage', e);
    return null;
  }
}

export function saveDraftToStorage(draft: WizardDraft): boolean {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch (e) {
    console.error('Failed to save wizard draft to localStorage', e);
    return false;
  }
}

export function clearDraftFromStorage(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear wizard draft from localStorage', e);
  }
}

export function getSavedBlueprints(): SEOBlueprint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load blueprints from localStorage', e);
    return [];
  }
}

export function saveBlueprintToStorage(blueprint: SEOBlueprint): boolean {
  try {
    const existing = getSavedBlueprints();
    // Filter out if already exists with same id
    const filtered = existing.filter((b) => b.id !== blueprint.id);
    const updated = [blueprint, ...filtered].slice(0, 25); // store up to 25 blueprints
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save blueprint to localStorage', e);
    return false;
  }
}

export function deleteBlueprintFromStorage(id: string): SEOBlueprint[] {
  try {
    const existing = getSavedBlueprints();
    const updated = existing.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete blueprint from localStorage', e);
    return [];
  }
}

export function exportBlueprintAsMarkdown(blueprint: SEOBlueprint): string {
  const date = new Date(blueprint.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let md = `# ${blueprint.suggestedH1}\n\n`;
  md += `> **SEO Content Blueprint** generated on ${date}\n\n`;
  md += `--- \n\n`;
  md += `## Overview & Metadata\n`;
  md += `- **Primary Keyword:** \`${blueprint.inputs.primaryKeyword}\`\n`;
  md += `- **Search Intent:** ${blueprint.inputs.searchIntent.toUpperCase()}\n`;
  md += `- **Content Type:** ${blueprint.inputs.contentType}\n`;
  md += `- **Niche / Industry:** ${blueprint.inputs.niche === 'Other / Custom' ? blueprint.inputs.customNiche || 'Custom' : blueprint.inputs.niche}\n`;
  if (blueprint.inputs.targetAudience) md += `- **Target Audience:** ${blueprint.inputs.targetAudience}\n`;
  if (blueprint.inputs.country) md += `- **Target Region:** ${blueprint.inputs.country}\n`;
  if (blueprint.inputs.secondaryKeywords) md += `- **Secondary Keywords:** ${blueprint.inputs.secondaryKeywords}\n`;
  md += `- **Target Length:** ${blueprint.targetWordCountRange} (~${blueprint.estimatedReadingTime})\n`;
  md += `- **Meta Description:** ${blueprint.metaDescription}\n\n`;

  if (blueprint.alternativeH1s && blueprint.alternativeH1s.length > 0) {
    md += `### Alternative H1 Title Options\n`;
    blueprint.alternativeH1s.forEach((alt, idx) => {
      md += `${idx + 1}. ${alt}\n`;
    });
    md += `\n`;
  }

  md += `--- \n\n`;
  md += `## Recommended Article Outline & Structure\n\n`;

  blueprint.sections.forEach((sec, idx) => {
    md += `### [${sec.level}] ${sec.heading}\n`;
    md += `- **Search Purpose:** ${sec.searchPurpose}\n`;
    md += `- **Target Word Count:** ~${sec.estimatedWords} words\n`;
    md += `- **Format Recommendation:** ${sec.formatRecommendation}\n`;
    md += `- **Keyword Target:** \`${sec.keywordOpportunity}\`\n`;
    md += `- **Suggested Talking Points:**\n`;
    sec.talkingPoints.forEach((tp) => {
      md += `  - ${tp}\n`;
    });
    md += `\n`;
  });

  md += `--- \n\n`;
  md += `## On-Page SEO Checklist\n\n`;
  blueprint.checklist.forEach((item) => {
    md += `- [${item.isCompleted ? 'x' : ' '}] **${item.title}** (${item.category})\n`;
    md += `  - *Why:* ${item.description}\n`;
    md += `  - *Action:* ${item.recommendation}\n`;
  });

  md += `\n--- \n\n`;
  md += `## AI Search & AEO (Answer Engine Optimization)\n\n`;
  blueprint.aeoRecommendations.forEach((item) => {
    md += `### ${item.title} (${item.category})\n`;
    md += `- **Action Item:** ${item.actionItem}\n`;
    md += `- **Example / Best Practice:** ${item.example}\n\n`;
  });

  md += `--- \n\n`;
  md += `## Content Quality & E-E-A-T Guidelines\n\n`;
  blueprint.qualityRecommendations.forEach((item) => {
    md += `- **${item.factor}:** ${item.description}\n`;
    md += `  - *Guideline:* ${item.actionGuideline}\n`;
  });

  return md;
}

export function exportBlueprintAsJSON(blueprint: SEOBlueprint): string {
  return JSON.stringify(blueprint, null, 2);
}
