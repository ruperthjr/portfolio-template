# SvelteKit Portfolio and Blog Template

A high-performance personal portfolio and blog template built with SvelteKit 2, Tailwind CSS v4, and mdsvex for Markdown-powered content. It includes a noise texture, kinetic typography, and seamless dark mode.

**Live Demo:** Add your deployed URL here.

## Features

- Performance-focused setup with strong Lighthouse scores.
- Blog support with mdsvex and full Svelte component integration.
- Dark mode that persists user preference in `localStorage` and respects system theme.
- Tailwind CSS v4 with the latest Oxide engine and Vite plugin.
- Responsive design that scales from mobile to ultrawide displays.
- Client-side fuzzy search for blog posts using Fuse.js.
- Reading time estimation and a progress bar for blog posts.
- Horizontally scrolling portfolio layout with detailed project pages.
- Modular Svelte 5 components using runes for reactivity.
- TypeScript support throughout the codebase.
- Preconfigured testing with Vitest and Playwright for unit and end-to-end tests.

## Tech Stack

- Framework: SvelteKit 2 with Svelte 5 runes
- Styling: Tailwind CSS v4
- Content: mdsvex, Markdown plus Svelte
- Animations: Native Svelte transitions and CSS keyframes
- Package Manager: pnpm
- Deployment: Vercel with support for Netlify and Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js v20 or later
- pnpm v9 or later

### Installation

1. Clone the template:
    ```bash
    git clone https://github.com/portfolio-template.git portfolio-template
    cd portfolio-template
    ```
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Start the development server:
    ```bash
    pnpm dev
    ```
4. Open `http://localhost:5173` in your browser.

## Customization Guide

This template is designed to be easily customized. Follow the checklist below to make it your own.

### 1. Site Metadata and Personal Info

#### `src/routes/+layout.svelte`

Replace `PORTFOLIO` in the top-left corner with your initials or brand.

#### `src/routes/+page.svelte`

Update the main `<h1>` text with your first and last name.

#### `src/routes/resume/+page.svelte`

Update the `<h1>` with your name.

Replace the href value of the "Download formal resume" link with a direct link to your PDF resume, such as a Google Drive or Dropbox URL.

Replace the inspirational quote with your own.

### 2. Managing Content

#### Blog Posts

Blog posts are stored as `.md` files in `src/lib/posts/`.

The filename, such as `my-first-post.md`, becomes the URL slug, for example `/blogs/my-first-post`.

Each file must start with frontmatter:

```yaml
---
title: "Your Post Title"
description: "A short description for SEO and previews."
date: "2024-05-20"
tags: ["svelte", "tutorial"]
featured: false
---
```

#### Projects

Edit the array in `src/lib/utils/projects.ts`.

Follow the `Project` type definition in `src/lib/types/site.ts`.

Add detailed project pages in `src/routes/portfolio/[slug]/+page.ts`. These can be static or dynamic. The template includes a dynamic detail page that reads from `projects.ts`.

#### Resume Data

Edit `src/lib/data/resume.ts` to update your education, skills, and certifications.

### 3. Styling and Theming

- Colors: The brutalist theme uses Tailwind's neutral palette. You can change the base colors in `src/app.css` by updating `@apply bg-neutral-50 text-neutral-900` and the dark mode variants.
- Fonts: Fonts are loaded in `src/app.html`. To change them, replace the Google Fonts links and update the `fontFamily` definitions in `tailwind.config.ts`.

### 4. RSS Feed

Update the `siteUrl` and author details in `src/routes/rss.xml/+server.ts` to match your live domain.

### 5. SEO and Favicons

- Favicons: Replace all files in `static/favicon/` with your own generated icons. Use a tool like RealFaviconGenerator.
- `robots.txt`: Update the Sitemap URL in `static/robots.txt` to point to `https://yourdomain.com/sitemap.xml`.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the development server with hot reloading. |
| `pnpm build` | Creates a production-ready build of the site. |
| `pnpm preview` | Previews the production build locally. |
| `pnpm check` | Runs type checking and Svelte diagnostics. |
| `pnpm format` | Formats the entire codebase with Prettier. |
| `pnpm test` | Runs unit tests with Vitest and end-to-end tests with Playwright. |

## Deployment

The project is preconfigured with the Vercel adapter. To deploy:

1. Push your customized repository to GitHub, GitLab, or Bitbucket.
2. Import the project on Vercel.
3. Vercel will automatically detect SvelteKit and apply the correct build settings.

For other platforms, such as Netlify or Cloudflare Pages, replace `@sveltejs/adapter-vercel` in `svelte.config.js` and `package.json` with the appropriate adapter.

## Project Structure

```text
src/
├── lib/
│   ├── components/    # Reusable Svelte components
│   ├── data/          # Static data for the resume page
│   ├── posts/         # Markdown blog posts (*.md)
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions for blogs, dates, and projects
├── routes/
│   ├── blogs/         # Blog index and dynamic [slug] route
│   ├── portfolio/     # Portfolio index and dynamic [slug] route
│   ├── resume/        # Resume page
│   ├── rss.xml/       # RSS feed endpoint
│   ├── +layout.svelte # Root layout, theme provider, navigation, footer
│   └── +page.svelte   # Homepage
├── app.css            # Global styles, Tailwind directives, noise overlay
└── app.html           # HTML template, font preloading, theme script
```

## TODO

- [ ] Write at least one blog post
- [ ] Build out the projects or work page
