export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational' | 'local';

export type ContentType = 
  | 'blog-post'
  | 'how-to'
  | 'listicle'
  | 'comparison'
  | 'product-review'
  | 'service-page'
  | 'landing-page'
  | 'pillar-page';

export type ArticleLength = 'short' | 'standard' | 'comprehensive';

export interface PlannerInputs {
  primaryKeyword: string;
  contentType: ContentType;
  searchIntent: SearchIntent;
  niche: string;
  customNiche?: string;
  targetAudience?: string;
  country?: string;
  brandName?: string;
  secondaryKeywords?: string;
  articleLength: ArticleLength;
  existingUrl?: string;
  specialInstructions?: string;
}

export interface SectionItem {
  id: string;
  level: 'H2' | 'H3';
  heading: string;
  searchPurpose: string;
  talkingPoints: string[];
  keywordOpportunity: string;
  estimatedWords: number;
  formatRecommendation: string;
  isExpanded?: boolean;
}

export interface SEOChecklistItem {
  id: string;
  category: 'Structure' | 'Keywords' | 'Technical' | 'User Experience' | 'Authority';
  title: string;
  description: string;
  recommendation: string;
  isCompleted?: boolean;
}

export interface AEORecommendation {
  id: string;
  category: string;
  title: string;
  actionItem: string;
  example: string;
}

export interface QualityRecommendation {
  id: string;
  factor: string;
  description: string;
  actionGuideline: string;
  relevanceTag: string;
}

export interface SEOBlueprint {
  id: string;
  createdAt: string;
  inputs: PlannerInputs;
  suggestedH1: string;
  alternativeH1s: string[];
  metaDescription: string;
  targetWordCountRange: string;
  estimatedReadingTime: string;
  sections: SectionItem[];
  checklist: SEOChecklistItem[];
  aeoRecommendations: AEORecommendation[];
  qualityRecommendations: QualityRecommendation[];
}

export type ActivePage = 'tool' | 'how-it-works' | 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
