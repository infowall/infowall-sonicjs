# Infowall.net Frontend

Astro-powered static site for Infowall.net, fetching content from SonicJS CMS.

## Local Development

```bash
npm run dev
# Runs on http://localhost:4321
```

Ensure the backend CMS is running on port 8788.

## Environment Variables

- `PUBLIC_API_URL` - SonicJS API endpoint
  - Development: `http://localhost:8788`
  - Production: `https://infowall-staging.workers.dev`

Copy `.env.example` to `.env.development` and `.env.production` with appropriate values.

## Deployment

Deployed to Cloudflare Pages via GitHub Actions on push to main.

## Project Structure

```
www/
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Page layouts
│   ├── lib/            # Utility functions and API client
│   ├── pages/          # Route pages
│   └── styles/         # Global CSS and Tailwind
├── public/             # Static assets
└── astro.config.mjs    # Astro configuration
```

## Collections

The site expects these collections from the CMS:

- **blog-posts** (or `blog_posts`) - Blog articles
- **projects** - Project showcase items
