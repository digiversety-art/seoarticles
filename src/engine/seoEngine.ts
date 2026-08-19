import {
  PlannerInputs,
  SEOBlueprint,
  SectionItem,
  SEOChecklistItem,
  AEORecommendation,
  QualityRecommendation,
} from '../types/seo';

/**
 * Utility to title case a string safely with small-word awareness
 */
function toTitleCase(str: string): string {
  const smallWords = new Set([
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for', 'if', 'in', 'of',
    'on', 'or', 'the', 'to', 'v', 'via', 'vs', 'vs.', 'with',
  ]);

  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index, arr) => {
      if (index > 0 && index < arr.length - 1 && smallWords.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Extracts core topic noun or phrase by stripping common modifier prefixes
 */
function extractCoreTopic(keyword: string): string {
  const cleaned = keyword
    .trim()
    .replace(/^(the|a|an)\s+/i, '')
    .replace(/^(best|top|essential|ultimate|guide to|how to|what is|how do i|ways to)\s+/i, '')
    .replace(/\s+(for beginners|for small business|for 2026|in 2026|review|guide|tips|checklist|vs|versus)$/i, '')
    .trim();

  return cleaned || keyword.trim();
}

/**
 * Generates natural H1 titles matching intent and content type
 */
function generateH1s(inputs: PlannerInputs): { primary: string; alternatives: string[] } {
  const kw = toTitleCase(inputs.primaryKeyword);
  const coreTopic = toTitleCase(extractCoreTopic(inputs.primaryKeyword));
  const currentYear = new Date().getFullYear();

  let primary = '';
  const alternatives: string[] = [];

  switch (inputs.contentType) {
    case 'how-to':
      if (/^how to/i.test(inputs.primaryKeyword)) {
        primary = `${kw}: Complete Step-by-Step Guide`;
        alternatives.push(`The Practical Guide to ${toTitleCase(inputs.primaryKeyword.replace(/^how to\s+/i, ''))}`);
        alternatives.push(`${kw} (Without Making Common Mistakes)`);
      } else {
        primary = `How to Master ${coreTopic}: A Step-by-Step Practical Guide`;
        alternatives.push(`The Complete Guide to ${kw} for Better Results`);
        alternatives.push(`${kw}: 7 Proven Steps for Measurable Success`);
      }
      break;

    case 'comparison':
      if (inputs.primaryKeyword.toLowerCase().includes(' vs ')) {
        primary = `${kw}: An In-Depth Side-by-Side Comparison (${currentYear})`;
        alternatives.push(`${kw}: Which Option Is Actually Better for You?`);
        alternatives.push(`${kw}: Features, Pricing, and Real Performance Tested`);
      } else {
        primary = `${kw} Comparison: Which Solution Wins in ${currentYear}?`;
        alternatives.push(`Evaluating ${coreTopic}: Side-by-Side Breakdown & Recommendations`);
        alternatives.push(`${kw}: Complete Buyer's Comparison Matrix`);
      }
      break;

    case 'listicle':
      primary = `11 Best ${coreTopic} in ${currentYear} (Tested & Compared)`;
      alternatives.push(`The Top ${coreTopic} Ranked by Value and Performance`);
      alternatives.push(`${kw}: 9 Standout Options You Should Know`);
      break;

    case 'product-review':
      primary = `${kw} In-Depth Review: Is It Actually Worth It in ${currentYear}?`;
      alternatives.push(`${coreTopic} Tested: Hands-On Pros, Cons, and Verdict`);
      alternatives.push(`An Honest Look at ${kw}: Features, Pricing & Alternatives`);
      break;

    case 'service-page':
      if (inputs.searchIntent === 'local' || inputs.country) {
        const loc = inputs.country || 'Your Area';
        primary = `Professional ${coreTopic} Services in ${loc} | Trusted Experts`;
        alternatives.push(`Reliable ${kw} Solutions for Modern Businesses`);
        alternatives.push(`${coreTopic} Services: Transparent Pricing & Proven Results`);
      } else {
        primary = `Comprehensive ${kw} Services Designed for Measurable Growth`;
        alternatives.push(`Expert ${coreTopic} Solutions: Strategy, Execution, & Support`);
        alternatives.push(`Custom ${kw} Built to Scale Your Organization`);
      }
      break;

    case 'landing-page':
      primary = `Streamline ${coreTopic} With Faster, Smarter Execution`;
      alternatives.push(`The Modern Solution for ${kw} — Built for High Performance`);
      alternatives.push(`Simplify ${coreTopic} Today: Discover What Works`);
      break;

    case 'pillar-page':
      primary = `The Definitive Guide to ${coreTopic}: Everything You Need to Know`;
      alternatives.push(`${kw}: The Complete Framework for Strategy & Execution`);
      alternatives.push(`Mastering ${coreTopic}: The Ultimate Reference Guide (${currentYear})`);
      break;

    case 'blog-post':
    default:
      if (inputs.searchIntent === 'informational') {
        primary = `Understanding ${coreTopic}: Key Concepts, Practical Insights & Best Practices`;
        alternatives.push(`What You Need to Know About ${kw} in ${currentYear}`);
        alternatives.push(`A Practical Perspective on ${coreTopic} and Why It Matters`);
      } else {
        primary = `The Essential Guide to ${kw} for Smart Decision Making`;
        alternatives.push(`${coreTopic}: Critical Insights, Trends, and Actionable Steps`);
        alternatives.push(`How to Approach ${kw} for Optimal Results`);
      }
      break;
  }

  return { primary, alternatives };
}

/**
 * Generates an intent-optimized Meta Description
 */
function generateMetaDescription(inputs: PlannerInputs, h1: string): string {
  const kw = inputs.primaryKeyword.toLowerCase();
  const audience = inputs.targetAudience ? ` for ${inputs.targetAudience}` : '';

  switch (inputs.contentType) {
    case 'how-to':
      return `Learn how to execute ${kw}${audience} step-by-step. Discover proven best practices, actionable frameworks, and key pitfalls to avoid.`;
    case 'comparison':
      return `Comparing ${kw}? Read our unbiased breakdown of features, real-world pricing, pros, and cons to choose the right solution.`;
    case 'listicle':
      return `Discover the top-rated options for ${kw}. Explore detailed evaluations, key advantages, and expert recommendations.`;
    case 'product-review':
      return `Our detailed, hands-on review of ${kw}. Read our transparent assessment of capabilities, usability, pricing, and honest drawbacks.`;
    case 'service-page':
      return `Looking for expert ${kw}? We deliver high-impact, tailor-made solutions with dedicated support and clear deliverables.`;
    case 'pillar-page':
      return `The complete, comprehensive blueprint for ${kw}. Master foundational concepts, advanced workflows, and strategic insights.`;
    default:
      return `Looking for clear guidance on ${kw}? Explore our practical overview covering key definitions, strategic advice, and actionable takeaways.`;
  }
}

/**
 * Builds the structural section cards for the outline
 */
function buildSections(inputs: PlannerInputs): SectionItem[] {
  const kw = inputs.primaryKeyword;
  const core = toTitleCase(extractCoreTopic(kw));
  const isShort = inputs.articleLength === 'short';
  const isComprehensive = inputs.articleLength === 'comprehensive';

  const sections: SectionItem[] = [];
  let secIndex = 1;

  const createSec = (
    heading: string,
    level: 'H2' | 'H3',
    searchPurpose: string,
    talkingPoints: string[],
    keywordOpportunity: string,
    words: number,
    formatRecommendation: string
  ): SectionItem => ({
    id: `sec-${secIndex++}`,
    heading,
    level,
    searchPurpose,
    talkingPoints,
    keywordOpportunity,
    estimatedWords: words,
    formatRecommendation,
    isExpanded: true,
  });

  // Base Section 1: Direct Answer / Executive Summary for AEO & Quick Skim
  sections.push(
    createSec(
      `Quick Summary: What You Need to Know About ${core}`,
      'H2',
      'Satisfies fast informational intent immediately; optimizes for Google AI Overviews and snippet extraction.',
      [
        `Provide a 2-3 sentence clear, unambiguous direct answer defining ${kw}.`,
        'Highlight the top 3 critical takeaways or decision factors as scannable bullet points.',
        'Include a short anchor link or table of contents pointing to key sections below.',
      ],
      `${kw} summary, ${kw} quick overview`,
      isShort ? 120 : 180,
      'Direct callout box + bulleted key takeaways'
    )
  );

  // Structural generation based on Content Type & Intent
  switch (inputs.contentType) {
    case 'how-to':
      sections.push(
        createSec(
          `What Is ${core} and Why Is It Important?`,
          'H2',
          'Establishes foundational context and grounds semantic entities before diving into instructions.',
          [
            `Define ${core} using clear, jargon-free terminology.`,
            `Explain the primary benefits of mastering ${kw}.`,
            'Address who will benefit most from this process.',
          ],
          `what is ${kw}, importance of ${core}`,
          isShort ? 150 : 250,
          'Conceptual definition paragraph + visual diagram/infographic'
        ),
        createSec(
          `Prerequisites & What You Need Before Getting Started`,
          'H2',
          'Filters readiness and reduces user drop-off by clarifying required tools, time, and budget.',
          [
            'List required tools, software, or preliminary assets.',
            'Estimated time commitment and skill level required.',
            'Initial setup checklist before executing Step 1.',
          ],
          `${kw} requirements, ${kw} tools needed`,
          isShort ? 120 : 200,
          'Structured checklist format with checkboxes'
        ),
        createSec(
          `Step 1: Planning and Initial Preparation`,
          'H2',
          'Kicks off the core sequential workflow with the foundational first milestone.',
          [
            'Audit current baseline or environment.',
            'Establish concrete, measurable goals for the project.',
            'Gather critical data inputs before execution.',
          ],
          `${kw} step 1, how to start with ${core}`,
          isShort ? 180 : 280,
          'Numbered step with highlighted actionable tips'
        ),
        createSec(
          `Step 2: Core Execution & Implementation`,
          'H2',
          'Delivers the main tactical meat of the tutorial.',
          [
            'Detailed walkthrough of the primary action items.',
            'Specific settings, workflows, or techniques to apply.',
            'Annotated screenshots or real-world configuration examples.',
          ],
          `${kw} execution, how to do ${kw}`,
          isShort ? 250 : 400,
          'Step-by-step procedure with sub-bullets & code/visual example'
        ),
        createSec(
          `Step 3: Verification, Testing, and Quality Assurance`,
          'H2',
          'Ensures the user can validate that their work was successful.',
          [
            'How to verify that everything is operating correctly.',
            'Key metrics or indicators of proper setup.',
            'Sanity check benchmarks for standard performance.',
          ],
          `verify ${kw}, test ${core}`,
          isShort ? 150 : 250,
          'QA checklist + troubleshooting pointers'
        )
      );

      if (!isShort) {
        sections.push(
          createSec(
            `Common Mistakes to Avoid With ${core}`,
            'H2',
            'Captures high-intent problem-solving searches and adds credible depth.',
            [
              'Mistake #1: Skipping initial research or configuration checks.',
              'Mistake #2: Overcomplicating the implementation too early.',
              'Mistake #3: Neglecting ongoing monitoring and maintenance.',
            ],
            `${kw} mistakes, ${core} errors`,
            250,
            'Side-by-side "Wrong Way vs. Right Way" callout boxes'
          ),
          createSec(
            `Expert Best Practices & Pro Tips for ${core}`,
            'H2',
            'Enhances E-E-A-T signals with nuanced practitioner advice.',
            [
              'Time-saving shortcuts used by veteran specialists.',
              'Advanced workflow automations or optimizations.',
              'Recommended cadence for reviewing results.',
            ],
            `${kw} best practices, pro tips for ${core}`,
            250,
            'Numbered tip list with "Pro Tip" badges'
          )
        );
      }
      break;

    case 'comparison':
      sections.push(
        createSec(
          `Quick Comparison Matrix: Key Differences at a Glance`,
          'H2',
          'Offers immediate high-conversion utility for users ready to compare specs.',
          [
            'Structured side-by-side table comparing core features, pricing, and suitability.',
            'Scorecard rating for ease of use, power, and support.',
            'Quick recommendation for different budget tiers.',
          ],
          `${kw} comparison table, ${kw} vs`,
          200,
          'Interactive comparison table + winner badges'
        ),
        createSec(
          `Evaluation Methodology: How We Tested & Compared`,
          'H2',
          'Strengthens E-E-A-T trust signals by detailing transparent criteria.',
          [
            'Core criteria used: functionality, reliability, value for money, learning curve.',
            'Testing environment and timeframe.',
            'Disclosure of testing methodology and real-world scenarios.',
          ],
          `how we evaluated ${kw}`,
          180,
          'Structured criteria list with evaluation weights'
        ),
        createSec(
          `Feature-by-Feature Breakdown`,
          'H2',
          'Deep dive into specific competitive vectors that drive the buying decision.',
          [
            'Category 1: Core capabilities and day-to-day usability.',
            'Category 2: Performance, speed, and system limits.',
            'Category 3: Integrations, API access, and ecosystem.',
          ],
          `${kw} features comparison`,
          350,
          'Sectioned analysis with individual winner callouts'
        ),
        createSec(
          `Pricing, Plans, and Total Cost of Ownership`,
          'H2',
          'Critical transactional section answering hidden costs and tier limits.',
          [
            'Transparent breakdown of entry-level vs enterprise pricing tiers.',
            'Hidden fees, add-on costs, or scaling penalties to watch for.',
            'Best value pick for small teams vs large organizations.',
          ],
          `${kw} pricing, ${core} cost`,
          250,
          'Pricing comparison cards with "Best Value" highlight'
        ),
        createSec(
          `Pros and Cons: Balanced Breakdown`,
          'H2',
          'Essential for Google Product Review guidelines compliance and user confidence.',
          [
            'Option A: Top 3 strengths and top 2 trade-offs.',
            'Option B: Top 3 strengths and top 2 trade-offs.',
            'Objective assessment without exaggerated marketing hype.',
          ],
          `${kw} pros and cons`,
          300,
          'Two-column green/red checkmark pros and cons layout'
        ),
        createSec(
          `The Verdict: Which Solution Should You Choose?`,
          'H2',
          'Drives the final conversion decision by matching persona to recommendation.',
          [
            'Choose Option A if: you prioritize simplicity, low budget, or fast setup.',
            'Choose Option B if: you require advanced customization or enterprise scale.',
            'Final summary verdict and next steps.',
          ],
          `${kw} verdict, who should buy ${kw}`,
          200,
          'Decision decision-tree boxes with direct CTAs'
        )
      );
      break;

    case 'listicle':
      sections.push(
        createSec(
          `Our Selection Criteria for Choosing the Best ${core}`,
          'H2',
          'Establishes editorial standards and justifies why items were included.',
          [
            'What baseline standards an item had to meet to make the list.',
            'How we weeded out subpar or outdated alternatives.',
            'Key factors: build quality, performance, user ratings, price-to-value ratio.',
          ],
          `how to choose ${kw}`,
          180,
          'Scannable criteria pill tags with short explanations'
        ),
        createSec(
          `Top Pick #1: Best Overall Option for Most Users`,
          'H2',
          'Showcases the leading recommendation with detailed evidence.',
          [
            'Key specifications and standout advantages.',
            'Real-world performance observations and standout features.',
            'Who it is best suited for and current price point.',
          ],
          `best ${kw} overall`,
          250,
          'Feature card + specs breakdown + pros/cons mini-table'
        ),
        createSec(
          `Top Pick #2: Best Budget-Friendly Alternative`,
          'H2',
          'Catches price-sensitive searchers seeking maximum value.',
          [
            'Where it excels despite the lower price.',
            'What trade-offs or compromises were made.',
            'Why it remains a reliable choice for frugal buyers.',
          ],
          `affordable ${kw}, budget ${core}`,
          220,
          'Value-focused product review card'
        ),
        createSec(
          `Top Pick #3: Best for Advanced / Power Users`,
          'H2',
          'Appeals to high-end professionals with demanding requirements.',
          [
            'Advanced capabilities that standard options lack.',
            'Reliability under high stress or heavy workloads.',
            'ROI justification for the premium investment.',
          ],
          `premium ${kw}, professional ${core}`,
          220,
          'High-performance product highlight card'
        )
      );

      if (!isShort) {
        sections.push(
          createSec(
            `Key Buying Considerations: What to Look for in ${core}`,
            'H2',
            'Educates the reader so they can evaluate options independently.',
            [
              'Factor 1: Durability and expected lifecycle.',
              'Factor 2: Compatibility with existing setups.',
              'Factor 3: Warranty, customer service, and community support.',
            ],
            `${kw} buying guide, what to look for in ${core}`,
            250,
            'Accordion or card grid with explanatory icons'
          )
        );
      }
      break;

    case 'product-review':
      sections.push(
        createSec(
          `Product Overview & Key Specifications`,
          'H2',
          'Gives readers immediate clarity on what the product is and its core specs.',
          [
            'Core technical specifications, dimensions, or software specs.',
            'Target demographic and intended use cases.',
            'What comes in the package / onboarding experience.',
          ],
          `${kw} specs, ${kw} overview`,
          200,
          'Quick-spec grid table with key metrics'
        ),
        createSec(
          `Hands-On Testing: Real-World Performance & Daily Usability`,
          'H2',
          'Delivers unique first-hand proof required by Google search quality raters.',
          [
            'How the product performed under actual daily conditions.',
            'Strengths observed during multi-week testing.',
            'Quirks, bugs, or friction points noticed during use.',
          ],
          `${kw} testing, ${kw} performance`,
          350,
          'Narrative review with benchmark graphs and callout quotes'
        ),
        createSec(
          `Standout Features That Make a Real Difference`,
          'H2',
          'Deep dives into the distinctive USPs of the product.',
          [
            'Feature 1: The primary killer feature and how it functions.',
            'Feature 2: Secondary benefits that improve productivity.',
            'Feature 3: Unique software or hardware integration perks.',
          ],
          `${kw} features`,
          280,
          'Detailed feature spotlight cards with screenshots'
        ),
        createSec(
          `Honest Drawbacks and Areas for Improvement`,
          'H2',
          'Builds immense credibility by pointing out genuine weaknesses.',
          [
            'Weakness 1: A specific limitation that users should be aware of.',
            'Weakness 2: Any software or design inconveniences.',
            'Who should avoid this product based on these limitations.',
          ],
          `${kw} cons, ${kw} drawbacks`,
          220,
          'Red/warning highlighted callout box'
        ),
        createSec(
          `Pricing, Value, and Top Alternatives to Consider`,
          'H2',
          'Contextualizes value and offers alternative paths if the product isn’t a fit.',
          [
            'Is the price justified given the market alternatives?',
            'Alternative 1: Better for lower budgets.',
            'Alternative 2: Better for users needing different features.',
          ],
          `${kw} alternatives, ${kw} worth it`,
          250,
          'Alternative cards comparison with price tags'
        ),
        createSec(
          `Final Verdict & Rating`,
          'H2',
          'Concludes the review with a clear recommendation score.',
          [
            'Overall editorial rating (e.g., 4.5/5 stars).',
            'Summary recommendation: Should you buy it?',
            'Ideal user profile match.',
          ],
          `${kw} review score, ${kw} verdict`,
          160,
          'Rating summary badge with "Buy if / Don’t buy if" pills'
        )
      );
      break;

    case 'service-page':
      sections.push(
        createSec(
          `Why Businesses Need Professional ${core}`,
          'H2',
          'Frames the business problem and quantifies the cost of inaction.',
          [
            'The core business pain points solved by this service.',
            'Why DIY or substandard attempts frequently fail.',
            'The tangible business ROI and efficiency gains.',
          ],
          `benefits of ${kw}, why hire ${core}`,
          220,
          '3-card problem-solution matrix'
        ),
        createSec(
          `Our ${core} Methodology & Deliverables`,
          'H2',
          'Removes ambiguity by outlining exact deliverables and process stages.',
          [
            'Phase 1: Discovery, audit, and strategic blueprinting.',
            'Phase 2: Execution, optimization, and milestone delivery.',
            'Phase 3: Ongoing reporting, analytics, and refinement.',
          ],
          `${kw} deliverables, ${kw} process`,
          300,
          'Horizontal milestone timeline with deliverable lists'
        ),
        createSec(
          `What Sets Our Approach Apart`,
          'H2',
          'Provides clear differentiation from generic agency or contractor services.',
          [
            'Specialized industry expertise and proven track record.',
            'Dedicated communication channels and transparent SLAs.',
            'Proprietary tools, custom frameworks, or certified talent.',
          ],
          `trusted ${kw}, expert ${core}`,
          200,
          'Trust badges grid with SLA guarantee bullets'
        ),
        createSec(
          `Case Studies & Proven Client Outcomes`,
          'H2',
          'Provides empirical proof of success to convert cautious commercial prospects.',
          [
            'Example 1: Client challenge, implemented strategy, and percentage gain.',
            'Example 2: Timeline to positive return on investment.',
            'Verified client feedback and testimonial summary.',
          ],
          `${kw} case study, ${core} results`,
          250,
          'Metric-highlighted case study snippet card'
        ),
        createSec(
          `Transparent Pricing & Engagement Models`,
          'H2',
          'Addresses the primary commercial friction: cost and commitment terms.',
          [
            'Clear breakdown of project-based vs retainer models.',
            'What is included in each service tier.',
            'Guarantees, turnaround times, and onboarding expectations.',
          ],
          `${kw} pricing, hire ${core}`,
          220,
          'Transparent tier pricing table with "Schedule Consultation" CTA'
        )
      );
      break;

    case 'landing-page':
      sections.push(
        createSec(
          `The Problem: Why Traditional ${core} Is Broken`,
          'H2',
          'Validates the prospect’s current frustrations and creates urgency.',
          [
            'Highlight the 3 most common pain points prospects experience today.',
            'Quantify the wasted hours or revenue lost to inefficient methods.',
          ],
          `problems with ${kw}`,
          180,
          'High-contrast problem callouts with pain point icons'
        ),
        createSec(
          `The Solution: A Faster, Smarter Way to Handle ${core}`,
          'H2',
          'Presents the primary value proposition with crystal clarity.',
          [
            'How our system eliminates friction in 3 simple steps.',
            'Key features engineered for maximum output.',
          ],
          `${kw} solution, how ${kw} works`,
          200,
          'Feature illustration with benefit annotations'
        ),
        createSec(
          `Key Benefits You Experience on Day One`,
          'H2',
          'Focuses strictly on outcomes rather than dry features.',
          [
            'Benefit 1: Save 10+ hours per week on manual workflows.',
            'Benefit 2: Eliminate costly errors with standardized QA.',
            'Benefit 3: Scale capacity without hiring additional headcount.',
          ],
          `benefits of ${kw}`,
          220,
          '3-column benefit card grid with bold lead metrics'
        ),
        createSec(
          `Zero-Risk Guarantee and Next Steps`,
          'H2',
          'Eliminates conversion hesitation with risk-reversal terms.',
          [
            'Details of the trial period or money-back guarantee.',
            'Instant access upon registration.',
          ],
          `get started with ${kw}`,
          140,
          'Prominent CTA box with trust assurance badges'
        )
      );
      break;

    case 'pillar-page':
      sections.push(
        createSec(
          `Foundational Pillars: The Core Principles of ${core}`,
          'H2',
          'Provides the conceptual anchor that links out to satellite cluster articles.',
          [
            'Pillar 1: Fundamental theory and strategic alignment.',
            'Pillar 2: Technical architecture and tooling infrastructure.',
            'Pillar 3: Measurement, KPIs, and continuous improvement loops.',
          ],
          `${kw} fundamentals, core ${core}`,
          320,
          'Cluster navigation grid linking out to sub-topics'
        ),
        createSec(
          `Strategic Implementation: Building Your ${core} Roadmap`,
          'H2',
          'Acts as the macro-level master framework for the whole discipline.',
          [
            'Phase 1: Readiness audit and capability assessment.',
            'Phase 2: Phased deployment and milestone tracking.',
            'Phase 3: Scaling operations across teams.',
          ],
          `${kw} strategy, ${core} framework`,
          400,
          'Multi-phase strategic roadmap diagram'
        ),
        createSec(
          `Essential Tools and Resources for ${core}`,
          'H2',
          'Curates the authoritative resource stack for readers seeking companion tools.',
          [
            'Recommended software categories and benchmark tools.',
            'Free vs premium resource recommendations.',
            'Downloadable templates or cheat sheets.',
          ],
          `${kw} tools, ${core} resources`,
          280,
          'Resource directory with direct links and utility tags'
        ),
        createSec(
          `Future Trends & Predictions for ${core}`,
          'H2',
          'Positions the guide as forward-looking, driving organic backlinks and citations.',
          [
            'Emerging industry shifts over the next 2-3 years.',
            'How AI and automation are reshaping workflows.',
            'How to future-proof your strategy against algorithmic shifts.',
          ],
          `${kw} trends, future of ${core}`,
          250,
          'Trend forecast callout cards with expert predictions'
        )
      );
      break;

    case 'blog-post':
    default:
      sections.push(
        createSec(
          `Why ${core} Is Crucial in Today's Landscape`,
          'H2',
          'Establishes relevance, urgency, and current industry context.',
          [
            'Recent shifts or developments affecting the topic.',
            'Why outdated approaches are no longer effective.',
            'Key data points illustrating current market trends.',
          ],
          `why ${kw} matters, ${core} importance`,
          220,
          'Contextual explanation with highlighted key stat'
        ),
        createSec(
          `Key Strategies & Core Methodologies`,
          'H2',
          'Delivers actionable advice that readers can implement immediately.',
          [
            'Strategy 1: Foundational setup and core mechanics.',
            'Strategy 2: Optimizing for efficiency and high output.',
            'Strategy 3: Measuring impact with clear KPIs.',
          ],
          `${kw} strategy, ${core} methods`,
          350,
          'Modular strategy cards with practical action items'
        ),
        createSec(
          `Real-World Examples and Case Illustrations`,
          'H2',
          'Proves abstract concepts with concrete, relatable applications.',
          [
            'Example 1: A practical breakdown of a successful application.',
            'Example 2: What happens when core principles are neglected.',
            'Key takeaways derived from both scenarios.',
          ],
          `${kw} examples, ${core} in practice`,
          260,
          'Before-and-After comparison case card'
        )
      );

      if (isComprehensive) {
        sections.push(
          createSec(
            `Advanced Nuances & Edge Cases`,
            'H2',
            'Captures long-tail search intent and answers complex edge cases.',
            [
              'Handling unique scenarios or constrained environments.',
              'Workarounds for common platform or budget limitations.',
              'How to troubleshoot unexpected variations.',
            ],
            `advanced ${kw}, ${core} edge cases`,
            300,
            'Collapsible deep-dive panels with code/config tips'
          )
        );
      }
      break;
  }

  // FAQ Section (Crucial for all SEO content)
  sections.push(
    createSec(
      `Frequently Asked Questions About ${core}`,
      'H2',
      'Captures People Also Ask (PAA) queries and qualifies for FAQ schema rich snippets.',
      [
        `FAQ 1: What is the most common misconception about ${kw}?`,
        `FAQ 2: How long does it typically take to see results with ${core}?`,
        `FAQ 3: Can beginners implement ${kw} without expensive tools?`,
        `FAQ 4: How often should ${core} strategies be updated?`,
      ],
      `${kw} faq, ${kw} questions`,
      isShort ? 180 : 300,
      'FAQ Accordion with structured JSON-LD Schema markup'
    )
  );

  // Conclusion / Final Actionable CTA
  sections.push(
    createSec(
      `Conclusion & Immediate Next Steps`,
      'H2',
      'Summarizes the core insight and directs the reader toward a definitive conversion action.',
      [
        `Recap the single most important rule when approaching ${kw}.`,
        'Provide a 3-step mini checklist to execute today.',
        'Clear, contextual Call-to-Action (download template, contact team, or explore next guide).',
      ],
      `${kw} checklist, summary of ${core}`,
      isShort ? 120 : 180,
      'Summary takeaway card + prominent action button'
    )
  );

  return sections;
}

/**
 * Builds the comprehensive On-Page SEO Checklist
 */
function buildChecklist(inputs: PlannerInputs): SEOChecklistItem[] {
  const kw = inputs.primaryKeyword;

  return [
    {
      id: 'chk-1',
      category: 'Structure',
      title: 'H1 Title Tag Optimization',
      description: 'Single H1 tag containing the exact primary keyword naturally near the front.',
      recommendation: `Keep between 50-60 characters. Recommended: Include "${kw}" in the first 4 words.`,
      isCompleted: false,
    },
    {
      id: 'chk-2',
      category: 'Keywords',
      title: 'First 100 Words Keyword Placement',
      description: 'Mention the primary keyword and topic entity within the introductory paragraph.',
      recommendation: `Ensure "${kw}" is included in the opening 2-3 sentences to confirm relevance immediately.`,
      isCompleted: false,
    },
    {
      id: 'chk-3',
      category: 'Technical',
      title: 'Search-Friendly Clean Slug (URL)',
      description: 'Short, clean URL slug without numbers, stop words, or dates.',
      recommendation: `Suggested slug: /${inputs.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/`,
      isCompleted: false,
    },
    {
      id: 'chk-4',
      category: 'Structure',
      title: 'Strict Heading Hierarchy (H1 → H2 → H3)',
      description: 'Ensure logical nesting. Never jump from H1 directly to H3 or use headings purely for styling.',
      recommendation: 'Use H2 for main topics, H3 for sub-points under that specific H2.',
      isCompleted: false,
    },
    {
      id: 'chk-5',
      category: 'User Experience',
      title: 'Direct Answer / Snippet Optimization',
      description: 'Provide a concise 40-60 word definition or answer right beneath the first H2.',
      recommendation: 'Use direct language: "[Keyword] is [concise factual definition]..."',
      isCompleted: false,
    },
    {
      id: 'chk-6',
      category: 'Keywords',
      title: 'Semantic LSI & Secondary Keywords',
      description: 'Incorporate natural synonyms and related terminology throughout body copy.',
      recommendation: inputs.secondaryKeywords
        ? `Integrate your secondary keywords: ${inputs.secondaryKeywords}`
        : 'Include variations such as definitions, cost factors, steps, and alternatives.',
      isCompleted: false,
    },
    {
      id: 'chk-7',
      category: 'Technical',
      title: 'Meta Description with Active CTA',
      description: 'Compelling summary under 155 characters that drives organic click-through rate.',
      recommendation: 'Include primary keyword + clear reason to click (no keyword stuffing).',
      isCompleted: false,
    },
    {
      id: 'chk-8',
      category: 'Authority',
      title: 'Internal Linking Strategy',
      description: 'Link out to 3-5 relevant contextual internal pages, and link back from related cluster articles.',
      recommendation: 'Use descriptive anchor text matching the target page topic (avoid "click here").',
      isCompleted: false,
    },
    {
      id: 'chk-9',
      category: 'Authority',
      title: 'Authoritative External Citations',
      description: 'Cite 2-4 authoritative primary sources, studies, or official documentation.',
      recommendation: 'Links open in new tabs with rel="noopener noreferrer" for safety.',
      isCompleted: false,
    },
    {
      id: 'chk-10',
      category: 'User Experience',
      title: 'Image Optimization & Descriptive Alt Text',
      description: 'Compress images into modern formats (WebP/AVIF) and add descriptive alt tags.',
      recommendation: 'Alt text should describe the image context accurately for screen readers.',
      isCompleted: false,
    },
    {
      id: 'chk-11',
      category: 'Technical',
      title: 'Structured Schema Markup (JSON-LD)',
      description: 'Implement appropriate schema markup based on content type.',
      recommendation: inputs.contentType === 'how-to'
        ? 'Deploy HowTo and FAQPage schema.'
        : inputs.contentType === 'product-review'
        ? 'Deploy Review and Product schema.'
        : 'Deploy Article / BlogPosting and FAQPage schema.',
      isCompleted: false,
    },
    {
      id: 'chk-12',
      category: 'Authority',
      title: 'E-E-A-T Author Bio & Transparency Signals',
      description: 'Visible author byline with credentials, review date, and editorial policy link.',
      recommendation: 'State the author’s relevant background and hands-on experience in the niche.',
      isCompleted: false,
    },
    {
      id: 'chk-13',
      category: 'User Experience',
      title: 'Mobile-First Readability & Scannability',
      description: 'Short paragraphs (2-3 sentences max), ample whitespace, bold key phrases, and bullet lists.',
      recommendation: 'Ensure font size is at least 16px with comfortable line-height (1.6+).',
      isCompleted: false,
    },
    {
      id: 'chk-14',
      category: 'Technical',
      title: 'Content Freshness Timestamp',
      description: 'Display both "Published on" and "Last Updated on" dates prominently.',
      recommendation: 'Signals active maintenance to both users and web crawlers.',
      isCompleted: false,
    },
  ];
}

/**
 * Builds AEO / AI Search & Answer Engine Optimization recommendations
 */
function buildAEORecommendations(inputs: PlannerInputs): AEORecommendation[] {
  const core = toTitleCase(extractCoreTopic(inputs.primaryKeyword));

  return [
    {
      id: 'aeo-1',
      category: 'Direct Answers',
      title: 'Direct-Answer "Inverted Pyramid" Construction',
      actionItem: `Place a 45-word direct answer defining or answering "${inputs.primaryKeyword}" immediately under the first H2.`,
      example: `"${core} is a [category/system] that enables [target audience] to [primary outcome] by [core mechanism]."`,
    },
    {
      id: 'aeo-2',
      category: 'Question Headers',
      title: 'Conversational & Question-Based Subheadings',
      actionItem: 'Format H2/H3 headings as natural language questions that match voice search and AI chat prompts.',
      example: `Instead of "${core} Cost", use "How Much Does ${core} Cost in ${new Date().getFullYear()}?"`,
    },
    {
      id: 'aeo-3',
      category: 'Entity Triples',
      title: 'Entity & Fact-Density Formatting',
      actionItem: 'Structure factual statements in clear subject-predicate-object semantic triples that AI extractors parse easily.',
      example: 'Use clear tables and bulleted attribute-value pairs (e.g., "Pricing: $29/mo", "Compatibility: iOS, Android, Web").',
    },
    {
      id: 'aeo-4',
      category: 'Citation Defense',
      title: 'Original Data & Quotable Statistics',
      actionItem: 'Include unique data points, benchmarks, or original surveys so AI search engines cite your page as the primary source.',
      example: 'Conduct an in-house test or aggregate proprietary observations that cannot be scraped elsewhere.',
    },
    {
      id: 'aeo-5',
      category: 'Schema Alignment',
      title: 'Entity Disambiguation via SameAs Schema',
      actionItem: 'Reference canonical Wikidata and Wikipedia URLs for mentioned concepts in your JSON-LD structured data.',
      example: 'Helps AI engines link your content directly into Google Knowledge Graph and search entity databases.',
    },
  ];
}

/**
 * Builds Content Quality and E-E-A-T matrix
 */
function buildQualityRecommendations(inputs: PlannerInputs): QualityRecommendation[] {
  return [
    {
      id: 'qual-1',
      factor: 'First-Hand Experience (Experience)',
      description: 'Demonstrate genuine testing, usage, or client management rather than generic regurgitation.',
      actionGuideline: 'Include original photos, unedited screenshots, personal trial observations, and timeline benchmarks.',
      relevanceTag: 'E-E-A-T Foundation',
    },
    {
      id: 'qual-2',
      factor: 'Subject-Matter Expertise (Expertise)',
      description: 'Highlight technical depth that only a seasoned practitioner in the niche would know.',
      actionGuideline: 'Explain edge cases, subtle configuration errors, and realistic trade-offs that generic summaries miss.',
      relevanceTag: 'Authority Signal',
    },
    {
      id: 'qual-3',
      factor: 'Authoritativeness & Citations (Authoritativeness)',
      description: 'Back up major factual assertions with reputable third-party studies or industry standards.',
      actionGuideline: 'Link directly to verified research, official government or academic reports, or benchmark repositories.',
      relevanceTag: 'Credibility',
    },
    {
      id: 'qual-4',
      factor: 'Trust Signals & Objectivity (Trustworthiness)',
      description: 'Maintain balanced, objective critique without aggressive hyperbolic sales pressure.',
      actionGuideline: 'Always disclose affiliate relationships, provide genuine negatives/cons, and outline when NOT to choose a solution.',
      relevanceTag: 'Trust & Compliance',
    },
    {
      id: 'qual-5',
      factor: 'Information Gain & Originality',
      description: 'Provide net-new value that does not exist on the current top 10 search results.',
      actionGuideline: 'Create a custom decision tree, downloadable worksheet, proprietary calculator, or unique workflow diagram.',
      relevanceTag: 'Ranking Differentiation',
    },
  ];
}

/**
 * Main Deterministic Generation Function
 */
export function generateSEOBlueprint(inputs: PlannerInputs): SEOBlueprint {
  const { primary: suggestedH1, alternatives: alternativeH1s } = generateH1s(inputs);
  const metaDescription = generateMetaDescription(inputs, suggestedH1);
  const sections = buildSections(inputs);
  const checklist = buildChecklist(inputs);
  const aeoRecommendations = buildAEORecommendations(inputs);
  const qualityRecommendations = buildQualityRecommendations(inputs);

  const totalEstimatedWords = sections.reduce((acc, sec) => acc + sec.estimatedWords, 0);
  const targetWordCountRange = `${Math.max(600, totalEstimatedWords - 250).toLocaleString()} – ${(totalEstimatedWords + 350).toLocaleString()} words`;
  const estimatedReadingTime = `${Math.ceil(totalEstimatedWords / 220)} min read`;

  return {
    id: `blueprint-${Date.now()}`,
    createdAt: new Date().toISOString(),
    inputs,
    suggestedH1,
    alternativeH1s,
    metaDescription,
    targetWordCountRange,
    estimatedReadingTime,
    sections,
    checklist,
    aeoRecommendations,
    qualityRecommendations,
  };
}
