# Production indexing enabled by owner request

All public HU/EN pages are index,follow. robots.txt permits crawling and references https://lokmira.com/sitemap.xml. The global X-Robots-Tag noindex rule was removed from _headers; noindex remains scoped to both workers.dev preview hosts and 404.html. Existing CSP and other security headers are retained.

Static and live checks now enforce production indexability and preview-host exclusion instead of requiring global noindex. Live route checks derive all 22 public routes from the sitemap. Canonicals, reciprocal hreflang, titles, descriptions and Google Search Console verification remain in place.

This enables crawling and indexing eligibility; actual inclusion in Google and Search Console sitemap submission are separate states.

## AI search discoverability

OAI-SearchBot and PerplexityBot have explicit Allow rules. Organization, WebSite, WebPage, Service and BreadcrumbList JSON-LD is generated from actual source titles, descriptions, canonicals and languages. No invented addresses, ratings, prices or case-study claims are added. Important content remains in server-rendered HTML. AI search inclusion and Google indexing are not guaranteed, and cannot be established by changing robots alone. No llms.txt or AI-specific ranking promises were introduced.

References: https://developers.openai.com/api/docs/bots ; https://docs.perplexity.ai/docs/resources/perplexity-crawlers ; https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/appearance/structured-data/organization
