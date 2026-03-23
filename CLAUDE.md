# CLAUDE.md — Scaffold

## Project context

Scaffold is a personal knowledge base and learning site for UX/UI concepts, AI prompting techniques, web development fundamentals and agent workflows. It is built by a solo developer (Anthony) with a beginner-to-intermediate coding background, using Claude as the primary development tool. The intended audience is initially personal, with plans to make it public. The stack is Next.js (App Router, no TypeScript strict mode), plain CSS custom properties, and a flat JSON data structure — no database, no auth, no CMS.

---

## Commands

```bash
npm run dev        # Start local dev server at http://localhost:3000
npm run build      # Production build — run this before pushing to catch errors
npm run lint       # ESLint check

git add .
git commit -m "description of change"
git push           # Triggers automatic Vercel redeploy
```

---

## Architecture map

```
scaffold/
├── app/
│   ├── layout.tsx        # Root layout — imports globals.css, sets metadata
│   ├── page.tsx          # Homepage — entry grid, filter logic
│   ├── globals.css       # Global reset, CSS variables, font imports
│   └── [slug]/
│       └── page.tsx      # Entry detail page (to be built)
├── content/
│   └── entries.json      # All knowledge entries as structured data (to be built)
├── public/               # Static assets
├── next.config.ts        # Next.js config — do not edit unless necessary
├── package.json          # Dependencies and scripts
└── CLAUDE.md             # This file
```

---

## Design system

These values are locked. Do not deviate without explicit instruction.

```css
--serif:  'Instrument Serif', Georgia, serif       /* Titles, site name, card headings */
--mono:   'IBM Plex Mono', 'Courier New', monospace /* All UI text, body copy, labels */
--black:  #0A0A0A
--white:  #FFFFFF
--ochre:  #C49A2A   /* Accent — use sparingly: type labels, active states only */
--gray:   #888888   /* Secondary text, tags, meta */
--border: #E0E0E0   /* All dividers and card borders */
```

**Spacing system** — airy/generous:
- Card padding: `22px`
- Header bottom margin: `28px`
- Filter bottom margin: `24px`
- Grid: `0` gap, borders only

**Card anatomy** (in order, top to bottom):
1. Ochre type label — 9px mono, uppercase, `#C49A2A`
2. Serif title — 20px Instrument Serif
3. Mono description — 11px IBM Plex Mono, `--gray`
4. Tag pill — 9px mono, uppercase, border only

---

## Code style & rules

- **No TypeScript strict types** beyond what Next.js requires — keep it simple
- **Inline styles** are acceptable and preferred for one-off layout — no need for a separate CSS module unless a component is reused
- **No Tailwind** — use CSS custom properties defined in `globals.css`
- **No external UI libraries** — all components are hand-built to spec
- **Functional components only** — no class components
- **`'use client'`** directive required on any page or component using `useState`, `useEffect` or browser APIs
- Entry data lives in a single source — currently the `entries` array in `page.tsx`, moving to `entries.json` soon
- File names: lowercase, hyphenated (`entry-card.tsx` not `EntryCard.tsx`) for files; PascalCase for component function names

---

## Content schema

Each knowledge entry follows this structure:

```json
{
  "id": "001",
  "type": "Concept | Term | Method | Prompt pattern",
  "title": "Affordance",
  "desc": "One sentence. Plain language. No jargon without explanation.",
  "tags": ["ux-ui"],
  "body": "Extended explanation for the detail page. Markdown supported."
}
```

Valid tags: `ux-ui`, `ai-prompting`, `web-dev`, `agents`

---

## Avoidances

- **Do not install new dependencies** without flagging it — keep the bundle lean
- **Do not modify `next.config.ts`** unless something is broken
- **Do not add a database or auth layer** — flat JSON is intentional at this stage
- **Do not use `any` types** in TypeScript without a comment explaining why
- **Do not hardcode colours** outside of `globals.css` — always reference a CSS variable
- **Do not change the font stack** — Instrument Serif + IBM Plex Mono is a locked design decision
- **Do not nest this project inside another project directory** (e.g. Mizan)

---

## Vercel deployment

- Repo: `github.com/anthonynegulic/scaffold`
- Branch: `main` — every push to main triggers a redeploy
- Build command: `next build` (auto-detected)
- Output: static export via App Router
- Any build error will block deployment — always run `npm run build` locally first

---

## Upcoming work (in priority order)

1. Entry detail page — `app/[slug]/page.tsx`
2. Move entries to `content/entries.json`
3. Monitor motif / decorative element in header
4. Search input
5. Dark mode
6. Public launch
