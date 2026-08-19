import { ContentType, SearchIntent } from '../types/seo';

export interface ContentTypeOption {
  id: ContentType;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export const CONTENT_TYPE_OPTIONS: ContentTypeOption[] = [
  {
    id: 'blog-post',
    title: 'Blog Post',
    description: 'In-depth topical article with analysis, examples, and practical takeaways.',
    iconName: 'BookOpen',
    badge: 'Popular',
  },
  {
    id: 'how-to',
    title: 'How-To Guide',
    description: 'Sequential, action-oriented tutorial solving a specific user problem.',
    iconName: 'ListOrdered',
    badge: 'High Intent',
  },
  {
    id: 'listicle',
    title: 'Listicle',
    description: 'Curated list of items, tools, ideas, or methods organized logically.',
    iconName: 'ListFilter',
    badge: 'Shareable',
  },
  {
    id: 'comparison',
    title: 'Comparison / Vs',
    description: 'Side-by-side breakdown comparing two or more solutions, tools, or approaches.',
    iconName: 'Scale',
    badge: 'High Conversion',
  },
  {
    id: 'product-review',
    title: 'Product Review',
    description: 'Detailed analysis of a specific product with testing notes, pros, and cons.',
    iconName: 'Award',
    badge: 'Transactional',
  },
  {
    id: 'service-page',
    title: 'Service Page',
    description: 'Commercial page explaining a service, business benefits, and deliverables.',
    iconName: 'Briefcase',
    badge: 'B2B / Agency',
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Conversion-focused page designed around a direct value proposition and CTA.',
    iconName: 'Target',
    badge: 'Direct Lead',
  },
  {
    id: 'pillar-page',
    title: 'Pillar Page',
    description: 'Comprehensive high-level guide linking out to topic clusters and sub-guides.',
    iconName: 'Compass',
    badge: 'Authority',
  },
];

export interface SearchIntentOption {
  id: SearchIntent;
  title: string;
  shortDefinition: string;
  explanation: string;
  searcherMindset: string;
  exampleQueries: string[];
}

export const SEARCH_INTENT_OPTIONS: SearchIntentOption[] = [
  {
    id: 'informational',
    title: 'Informational',
    shortDefinition: 'Looking to learn or solve a concept',
    explanation: 'The searcher wants to understand a topic, answer a specific question, or find educational guidance.',
    searcherMindset: '“I want to learn how something works or understand the core facts.”',
    exampleQueries: ['what is keyword cannibalization', 'how to change tire', 'types of clouds'],
  },
  {
    id: 'commercial',
    title: 'Commercial',
    shortDefinition: 'Researching options before deciding',
    explanation: 'The searcher is comparing brands, researching reviews, or evaluating solutions before making a choice.',
    searcherMindset: '“I know I need a solution, but I need to compare my best choices.”',
    exampleQueries: ['best crm for startups', 'notion vs obsidian', 'ahrefs review'],
  },
  {
    id: 'transactional',
    title: 'Transactional',
    shortDefinition: 'Ready to buy, sign up, or take action',
    explanation: 'The searcher has high purchase intent and wants to acquire a product, start a trial, or hire a provider.',
    searcherMindset: '“I am ready to buy or register right now if the offer matches.”',
    exampleQueries: ['buy running shoes discount', 'figma pro subscription', 'book hotel in tokyo'],
  },
  {
    id: 'navigational',
    title: 'Navigational',
    shortDefinition: 'Seeking a specific brand, tool, or portal',
    explanation: 'The searcher already knows the brand or exact destination and is looking for the direct login or entry point.',
    searcherMindset: '“Take me directly to this brand or tool login.”',
    exampleQueries: ['canva login', 'semrush pricing page', 'stripe dashboard'],
  },
  {
    id: 'local',
    title: 'Local',
    shortDefinition: 'Searching within a geographic radius',
    explanation: 'The searcher wants physical services, venues, or businesses located in a specific town or city.',
    searcherMindset: '“I need a local service or venue near my current location.”',
    exampleQueries: ['plumber in austin tx', 'best coffee near me', 'chicago real estate attorney'],
  },
];

export const NICHE_OPTIONS: string[] = [
  'SEO & Digital Marketing',
  'SaaS & Software',
  'Technology & AI',
  'Finance & Investing',
  'Education & Learning',
  'Health & Wellness',
  'Travel & Hospitality',
  'Real Estate',
  'E-commerce & Retail',
  'Business & Management',
  'Fitness & Nutrition',
  'Food & Culinary',
  'Lifestyle & Parenting',
  'Legal & Compliance',
  'Automotive & Transport',
  'Home & Garden',
  'Careers & Recruitment',
  'Other / Custom',
];

export const EXAMPLE_KEYWORD_PROMPTS = [
  { keyword: 'best running shoes for beginners', intent: 'commercial' as SearchIntent, type: 'listicle' as ContentType, niche: 'Fitness & Nutrition' },
  { keyword: 'how to start a b2b podcast', intent: 'informational' as SearchIntent, type: 'how-to' as ContentType, niche: 'SEO & Digital Marketing' },
  { keyword: 'stripe vs paypal for ecommerce', intent: 'commercial' as SearchIntent, type: 'comparison' as ContentType, niche: 'Finance & Investing' },
  { keyword: 'project management software for remote teams', intent: 'commercial' as SearchIntent, type: 'blog-post' as ContentType, niche: 'SaaS & Software' },
  { keyword: 'commercial lease agreement checklist', intent: 'transactional' as SearchIntent, type: 'service-page' as ContentType, niche: 'Legal & Compliance' },
];
