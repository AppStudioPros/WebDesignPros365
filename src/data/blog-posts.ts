export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  meta: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-is-choosing-winners-right-now",
    title: "AI Is Choosing Winners Right Now. Is Your Business One of Them?",
    category: "AI Visibility",
    date: "July 14, 2026",
    readTime: "6 min read",
    excerpt: "70-80% of people in finance, real estate, and professional services are now using AI to find and vet providers before making contact. The business that shows up in those results wins. The one that does not may never know the deal was lost.",
    meta: "AI-powered search has fundamentally changed how buyers find businesses. Here's what it means for you and exactly what to do about it.",
    content: `
<h2>The way people find businesses has changed. Most business owners haven't caught up.</h2>
<p>When someone needs a mortgage broker, a web designer, a contractor, or an attorney in 2026, they don't just Google it. They ask ChatGPT. They ask Perplexity. They ask Google's AI Overview. They ask Siri. And the answer they get back is not a list of links — it's a name. One or two names. Maybe three.</p>
<p>One of those names closes the deal. The rest lose it before the phone even rings.</p>
<p>This is the new reality: AI is actively choosing which businesses get seen and which ones don't. And most businesses have no idea it's happening.</p>

<h2>What the data actually says</h2>
<p>The numbers are not subtle:</p>
<ul>
<li>68% of all Google searches now end without a single click (SparkToro / Similarweb, 2026)</li>
<li>When a Google AI Overview is present, 83% of searches end without a click</li>
<li>In mortgage, real estate, and financial services, 70-80% of consumers now report using AI to research and vet providers before reaching out</li>
<li>ChatGPT alone surpassed 1 billion monthly users in early 2026</li>
</ul>
<p>The shift is not coming. It already happened.</p>

<h2>How AI decides who to recommend</h2>
<p>AI engines don't rank websites the way Google does. They look for a different set of signals:</p>
<ul>
<li><strong>Structured content</strong> — Is your site written in a way that AI can extract clean, quotable answers from?</li>
<li><strong>Consistent brand presence</strong> — Do authoritative sources across the web mention your name in connection with your service and market?</li>
<li><strong>FAQ and direct-answer formats</strong> — Does your content answer the exact questions people ask AI engines?</li>
<li><strong>Technical credibility signals</strong> — Schema markup, local business data, review signals, Core Web Vitals</li>
</ul>
<p>This is what GEO (Generative Engine Optimization) addresses. It is a fundamentally different discipline from traditional SEO, even though both matter.</p>

<h2>Three types of businesses right now</h2>
<p>At this moment, businesses fall into one of three categories:</p>
<p><strong>1. Invisible.</strong> No structured content, no schema, no AI-readable format. These businesses do not appear in AI responses regardless of how good they actually are. They are losing deals they will never know they lost.</p>
<p><strong>2. Appearing but not winning.</strong> Some presence, some citations, but not the top recommendation. These businesses show up occasionally but don't consistently convert the AI-driven referral.</p>
<p><strong>3. AI-cited winners.</strong> Their name appears when someone in their target market asks the relevant question. They are getting introductions before their competitors even know there was a conversation.</p>
<p>The gap between category one and category three is not talent or price. It is visibility infrastructure — built deliberately.</p>

<h2>What to do about it</h2>
<p>The good news: this is an engineering problem, not a mystery. Getting cited by AI engines requires:</p>
<ul>
<li>A website built on a fast, crawlable stack (Next.js with proper schema markup, not WordPress with a slow builder theme)</li>
<li>Content written in direct question-and-answer formats that AI engines prefer to extract</li>
<li>Consistent brand mention seeding across authoritative sources</li>
<li>Technical optimization that allows all major AI crawlers — GPTBot, PerplexityBot, ClaudeBot, Google-Extended — to fully access and index your content</li>
<li>Daily optimization, not monthly, because the models update constantly</li>
</ul>
<p>We built the AI Visibility Stack to handle exactly this. It combines technical SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) into a single daily program that compounds over time.</p>
<p>If you're a loan officer, a real estate agent, an attorney, or a local business owner in a competitive market: the window to establish AI citations before your competitors do is still open. It will not stay open forever.</p>
    `,
  },
  {
    slug: "geo-vs-seo-whats-the-difference",
    title: "GEO vs SEO: What's the Difference and Why Both Matter in 2026",
    category: "GEO",
    date: "June 28, 2026",
    readTime: "7 min read",
    excerpt: "SEO gets you ranked on Google. GEO gets you cited by ChatGPT, Perplexity, and Claude. They require different strategies, different content formats, and different technical infrastructure. Here's how to think about both.",
    meta: "Most businesses are still optimizing for a search engine landscape that no longer exists. Here is how GEO differs from SEO and what you need to do about it.",
    content: `
<h2>A tale of two searches</h2>
<p>Picture two people searching for a mortgage broker in Denver right now.</p>
<p>Person A opens Google and types "mortgage broker Denver." They see a map pack, some ads, a few organic results. They click through to two or three websites and make a decision.</p>
<p>Person B opens ChatGPT and types "who is a good mortgage broker for first-time buyers in Denver?" They get back a direct paragraph with one or two names, a brief explanation of why, and possibly a link. They pick up the phone and call.</p>
<p>Person A's journey is what SEO was built to win. Person B's journey is what GEO is built to win. Both are happening at massive scale right now. Most businesses are only optimizing for Person A.</p>

<h2>What SEO actually is</h2>
<p>SEO (Search Engine Optimization) is the practice of making your website appear higher in traditional search engine results pages. The signals it relies on are well-understood:</p>
<ul>
<li>Keyword targeting and content depth</li>
<li>Backlinks from authoritative domains</li>
<li>Technical performance — page speed, mobile-friendliness, Core Web Vitals</li>
<li>Structured data that helps Google understand your content</li>
<li>Local citations and Google Business Profile for local searches</li>
</ul>
<p>SEO is not dead. It still drives significant traffic. But its effectiveness is eroding as more searches end without a click, and its reach does not extend to AI chat engines at all.</p>

<h2>What GEO actually is</h2>
<p>GEO (Generative Engine Optimization) is the practice of getting your business cited when AI engines generate responses to relevant queries. The goal is not a high ranking — it is a direct citation or recommendation in the AI's generated answer.</p>
<p>GEO relies on different signals:</p>
<ul>
<li><strong>Brand mention density</strong> — How often is your name associated with your service and market across the web?</li>
<li><strong>Content citation patterns</strong> — Is your content written in a format that AI engines extract cleanly? Direct answers, clear claims, quotable sentences.</li>
<li><strong>Crawlability by AI bots</strong> — Many older sites block AI crawlers in their robots.txt without realizing it. GPTBot, PerplexityBot, ClaudeBot, and Google-Extended all need to be allowed.</li>
<li><strong>Authority signals in context</strong> — AI models weight mentions from recognized sources differently than obscure links.</li>
<li><strong>Consistency</strong> — The models train and update continuously. A one-time optimization decays. Daily maintenance compounds.</li>
</ul>

<h2>AEO: the bridge between them</h2>
<p>There's a third discipline that often gets lumped in with SEO but belongs in its own category: AEO (Answer Engine Optimization).</p>
<p>AEO focuses specifically on getting your content selected as the direct answer in AI Overviews, voice search, and featured snippets. It's the practice of writing content that answers questions so clearly and directly that AI engines extract it as the definitive response.</p>
<p>FAQs are the most obvious application. But AEO also applies to how you structure service descriptions, how you write "About" sections, and how you frame your positioning. The question is always: if someone asked an AI this exact question, would our answer be clean enough to cite?</p>

<h2>What this means for your website</h2>
<p>A website optimized for traditional SEO but not for GEO/AEO is leaving a growing share of buyer discovery on the table. The technical foundation you need for all three is the same:</p>
<ul>
<li>A fast, well-structured site that all crawlers can fully access</li>
<li>FAQPage, LocalBusiness, and Service schema markup</li>
<li>Content written in direct question-and-answer formats</li>
<li>Consistent brand presence across multiple authoritative sources</li>
<li>robots.txt that explicitly allows AI crawlers</li>
</ul>
<p>This is what we build and optimize daily for our clients. If your current site was built on WordPress, there's a good chance it's blocking AI crawlers, scores below 50 on Google PageSpeed Mobile, and has no schema markup at all.</p>
<p>The good news: it's fixable. And the businesses that fix it first in each market will hold a compounding advantage that gets harder to overcome every month.</p>
    `,
  },
  {
    slug: "why-your-lighthouse-score-matters",
    title: "Why Your Website's Performance Score Matters More Than Ever",
    category: "SEO",
    date: "June 10, 2026",
    readTime: "5 min read",
    excerpt: "A slow website doesn't just frustrate visitors. It signals to Google, AI crawlers, and every ranking algorithm that your site is not trustworthy. Here's what your performance score is actually telling the internet about you.",
    meta: "Google Lighthouse is a free tool that scores your site on performance, accessibility, SEO, and best practices. Most business websites score below 50. Here's why that matters and what you can do about it.",
    content: `
<h2>Your website has a report card. Most owners have never seen it.</h2>
<p>Google Lighthouse is a publicly available tool that scores any website from 0 to 100 on four dimensions: Performance, Accessibility, Best Practices, and SEO. You can run it yourself at pagespeed.web.dev in about 60 seconds.</p>
<p>Most small business websites score between 30 and 55 on the Performance metric. Many score lower. What does that mean in practice?</p>
<ul>
<li>A site scoring 35 on mobile Performance typically takes 8-12 seconds to show meaningful content</li>
<li>A site scoring 90+ typically loads in under 2 seconds</li>
<li>According to Portent research, a site that loads in 1 second converts at 3x the rate of a site that loads in 5 seconds</li>
<li>Google's ranking algorithm uses Core Web Vitals — the metrics behind the Performance score — as a direct ranking signal</li>
</ul>
<p>A low score is not just a technical embarrassment. It is an active penalty on your business.</p>

<h2>What the score actually measures</h2>
<p>The four metrics that make up the Lighthouse Performance score:</p>
<p><strong>LCP (Largest Contentful Paint)</strong> — How long until the main content of your page is visible. Google's target: under 2.5 seconds. A WordPress site with a heavy page builder and unoptimized images often takes 5-8 seconds.</p>
<p><strong>CLS (Cumulative Layout Shift)</strong> — How much the page "jumps around" while loading. Ads loading after text, images without defined dimensions, web fonts swapping in — all cause CLS. A score above 0.1 is a failing grade.</p>
<p><strong>TBT (Total Blocking Time)</strong> — How long JavaScript blocks the main thread. Every jQuery plugin, every tracking pixel, every unnecessarily loaded library adds to TBT. WordPress sites with 15+ plugins routinely see TBT above 1,000ms.</p>
<p><strong>FCP (First Contentful Paint)</strong> — How long until any content appears at all. This is the "blank white screen" problem. Render-blocking CSS and JavaScript delay FCP significantly.</p>

<h2>Why WordPress struggles with this</h2>
<p>WordPress was built in 2003. The performance problems it has in 2026 are not bugs — they are the result of a 20-year-old architecture trying to serve a modern web.</p>
<p>A typical WordPress business site:</p>
<ul>
<li>Runs 12-25 plugins, each adding JavaScript and CSS to every page load</li>
<li>Uses a page builder (Elementor, Divi) that generates bloated HTML output</li>
<li>Serves unoptimized images in JPEG format instead of WebP</li>
<li>Has no server-side caching configured correctly</li>
<li>Blocks AI crawlers by default via restrictive robots.txt configurations</li>
</ul>
<p>These issues can be partially addressed with caching plugins and CDNs. But you're patching a fundamentally slow foundation. The ceiling on a well-optimized WordPress site is around 65-70 on Lighthouse. A Next.js site built correctly starts at 85+ and stays there.</p>

<h2>What 88 looks like on the real site</h2>
<p>Our own site — webdesignpros365.com — currently scores 88 on Lighthouse Mobile. That's up from 73 when we migrated it to the current stack. Here's how we got there:</p>
<ul>
<li>Removed all entrance animations from the hero section so the LCP element paints immediately</li>
<li>Converted all images from PNG/JPEG to WebP (average 85% size reduction)</li>
<li>Set preload="none" on all video elements so they don't auto-download on page load</li>
<li>Replaced a non-composited CSS animation (background-position) with a GPU-composited transform, bringing CLS to zero</li>
<li>Used LazyMotion from Framer Motion instead of the full bundle, reducing JS by ~65%</li>
</ul>
<p>None of these are tricks or shortcuts. They are the standard practices of building on a modern stack correctly. The result is a site that loads fast, ranks better, and gets fully indexed by AI crawlers.</p>

<h2>The one thing to do right now</h2>
<p>Go to pagespeed.web.dev and run your site on mobile. If your Performance score is below 70, you are competing with one hand tied behind your back in both traditional search and AI visibility.</p>
<p>Every month you wait is another month your competitors — the ones who figure this out first — are compounding their advantage. The fix is not complicated. The delay is.</p>
    `,
  },
  {
    slug: "zero-click-search-and-what-it-means",
    title: "The No-Click Era: What Zero-Click Search Means for Your Business",
    category: "SEO",
    date: "May 22, 2026",
    readTime: "5 min read",
    excerpt: "68% of all Google searches now end without a click. When a Google AI Overview is present, that number jumps to 83%. The traffic you've been counting on from search is structurally declining. Here's what to do instead.",
    meta: "The era of driving traffic from search results is ending. AI Overviews, featured snippets, and answer engines are giving users what they need without sending them anywhere. Here's how to adapt.",
    content: `
<h2>The traffic from search is declining. This is not a traffic problem.</h2>
<p>A few years ago, showing up on the first page of Google meant traffic. Clicks. Visitors. Revenue. The game was clear: rank high, get clicks, convert them.</p>
<p>That game has changed fundamentally.</p>
<p>In 2026, 68% of Google searches end without any click at all. Users get their answer directly on the results page — from an AI Overview, a featured snippet, a knowledge panel, or a direct answer box — and they never visit a website.</p>
<p>When Google's AI Overview is active for a query (which it increasingly is), that number climbs to 83% zero-click.</p>
<p>This is not a temporary trend. It is the intended direction of every major search and AI product company on earth.</p>

<h2>What actually happens when someone searches now</h2>
<p>Take a real example. Someone searches "how much does a custom website cost?"</p>
<p>In 2022, they'd see 10 blue links and click the most compelling one.</p>
<p>In 2026, they see a Google AI Overview that gives them a direct answer — typically a range, a brief explanation of what factors affect it, and a citation to one or two sources. Most users read that and move on. A small percentage click through.</p>
<p>The businesses that get cited in that AI Overview get seen. Everyone else is invisible for that query.</p>
<p>The same dynamic plays out across ChatGPT, Perplexity, Claude, and every other AI assistant. The user asks a question. The AI gives a direct answer with one or two citations. The cited business wins the consideration. The uncited business doesn't exist for that interaction.</p>

<h2>Why this is not actually bad news</h2>
<p>Here's the thing most businesses miss when they first understand zero-click search: the citation is more valuable than the click used to be.</p>
<p>When an AI engine says "Jane Smith at Denver Mortgage is a highly-regarded loan officer for first-time buyers in the Denver metro area," that is an endorsement. It is a direct recommendation to a buyer who is actively looking. The conversion rate on an AI citation is significantly higher than the conversion rate on a random click from a search result.</p>
<p>The goal is not to maximize clicks. The goal is to be the business that gets named. Getting named is better than getting clicked.</p>

<h2>The three things that determine whether you get named</h2>
<p><strong>1. Content authority.</strong> AI engines cite businesses whose content is structured, clear, and consistently aligned with what people ask. If your website content answers questions the way an AI would want to extract an answer, you get cited. If it doesn't, you don't.</p>
<p><strong>2. Brand presence.</strong> AI models learn from patterns across the web. If your name appears consistently in connection with your service area and specialty across multiple sources, the model learns to associate you with that space. If your only presence is a single website, that signal is too weak.</p>
<p><strong>3. Technical accessibility.</strong> AI crawlers — GPTBot, PerplexityBot, ClaudeBot, Applebot — need to fully access and parse your site. If your robots.txt blocks them, or your site takes 8 seconds to load, or your content is hidden behind JavaScript that these crawlers can't execute, you're invisible to the models regardless of how good your content is.</p>

<h2>The practical implication</h2>
<p>The businesses that adapt to zero-click search and AI citation will grow. The businesses that keep optimizing for a click-driven model that no longer exists will see their search-driven revenue slowly compress over the next 18-24 months.</p>
<p>This is not a reason to panic. It is a reason to act now, before this understanding is widespread and the competitive window closes.</p>
<p>The businesses that establish AI citations in their market before their competitors do will hold a compounding advantage that is genuinely hard to overturn. The models update slowly. The citations you earn today last months.</p>
<p>The window is open. It will not stay open.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
