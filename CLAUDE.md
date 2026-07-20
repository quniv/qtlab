# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev       # start Vite dev server
bun run build     # production build to dist/
bun run preview   # serve production build locally
bun run lint      # ESLint (src/ only)
```

No test framework is configured. Use `bun run build` as baseline validation; test CV generation manually with the "Download CV" button in the browser.

## Architecture

Single-page Svelte 5 + Vite app deployed on Vercel. Two pages (`news`, `aboutme`) controlled by `activeTab` state in `App.svelte`, which also owns global body styles and the nebula background overlay.

```
src/
  main.js              # mounts App
  App.svelte           # root shell — Sidebar + tab-switched content area
  CV.svelte            # CV layout rendered into a hidden DOM node for PDF export
  cvData.js            # all CV content as structured JS objects
  components/
    Sidebar.svelte     # fixed 220px nav, drives activeTab via bind:
    Starfield.svelte   # canvas starfield background
    TerminalBoot.svelte
    GameOfLife.svelte
    MotivationSection.svelte
    HangingScroll.svelte
    TechStack.svelte
  pages/
    AboutMe.svelte     # profile, bio, tech stack, decorative components; owns PDF download logic
    News.svelte        # placeholder terminal-style feed
```

**CV PDF generation** (`AboutMe.svelte → downloadCV`): Svelte `mount()` renders `CV.svelte` into a hidden off-screen `<div>`, html2pdf.js captures it, then `unmount()` tears it down. CV content lives exclusively in `src/cvData.js`.

## Styling

- Global body/reset styles live in `App.svelte`'s `:global()` blocks — not in `public/global.css`.
- Component-scoped `<style>` blocks for everything else.
- Design system: dark universe theme (`#030308` background, `#a78bfa` purple accent, `#fbbf24` gold, `#f472b6` pink). Fonts: Inter (body) + JetBrains Mono (monospace/labels), both loaded via Google Fonts in `index.html`.
- CSS utility library: `tenoxui` (available but usage is minimal).

## CI/CD

Three GitHub Actions workflows on push/PR to `main`:
- **CI** (`ci.yml`): build + `bun audit --audit-level=high` + ESLint
- **CodeQL** (`codeql.yml`): SAST on JS/TS, also runs weekly
- **Dependency Review** (`dependency-review.yml`): blocks PRs with high-severity new deps

## Commit Style

Conventional Commits: `feat:`, `fix:`, `chore:` prefixes. Keep messages short and imperative.
