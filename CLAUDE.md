# CLAUDE.md — Project Rules for AI Assistance

Conventions that apply to **all** work in this directory.

## Language & Voice

- Answer the user in **Bangla** (বাংলা)
- Technical **keywords stay in English** (protocols, code, APIs, library names)
- Target reader: an average / weak student — explain simply, build intuition first

## Deliverable Convention

- The final artifact for any discussion is a `.md` file under `handnote/`
- Structure: **What → Why → How → Details → Summary** (not a Q&A dump)
- Must feel like a well-organized tutorial / guide
- Use **Mermaid** diagrams generously for visual explanation
- Use **KaTeX** for math (`$...$` inline, `$$...$$` block)

## Design System

Warm-sand editorial palette (Porhi). All new UI should speak this vocabulary:

| Token | Role |
|-------|------|
| `sand` / `sand-2` / `sand-3` | Page + subtle panel backgrounds |
| `surface` / `surface-2` | Card surfaces |
| `ink` / `ink-2..5` | Text hierarchy (headings → body → muted → placeholder) |
| `amber` / `amber-50..700` | Brand accent (italic emphasis, primary CTA in dark mode) |
| `clay` / `sage` / `ink-blue` | Secondary accents |
| `line` / `line-2` | Hairlines and stronger borders |

Fonts: **Fraunces** (serif headings) · **Geist** (sans body) · **Geist Mono** (code) · **Tiro Bangla** (Bangla serif; applied via `.bn` class inside prose).

Utility classes defined in `index.css`: `.serif`, `.bn`, `.mono-font`, `.dots`, `.hairline`, `.chip`, `.chip-amber`, `.chip-ink`, `.chip-outline`, `.btn`, `.btn-primary`, `.btn-amber`, `.btn-ghost`, `.btn-sm`, `.btn-lg`, `.card-surface`, `.meta`.

## Content Layout Rules

Two kinds of content, two folder placements:

| Type | Location | Layout on site |
|------|----------|----------------|
| Course chapter (part of a multi-chapter series like GATE CSE) | `handnote/gate-cse/<NN>-<slug>.md` | Course layout with left sidebar + Prev/Next + Bookmark |
| Standalone handbook | `handnote/<slug>.md` | Article layout (no sidebar, no Prev/Next, clean reader) |

The site auto-detects which layout to use based on whether the `.md` lives in a subfolder or at the root of `handnote/`.

## Authentication (client-side gate)

The site uses a **shared-password** gate — no backend. All content is client-side; this is a UX gate, not real security.

- **Shared password constant:** `SHARED_PASSWORD` in `app/src/lib/auth.tsx`
- **Current value:** `admin` — to rotate, edit the constant + redeploy. Login page placeholders + a visible "Demo credentials" banner display `admin / admin` so anyone landing on `/login` can sign in.
- **Session storage:** localStorage keys `learning:auth`, `learning:display-name`, `learning:logged-in-at`
- **Login flow:** user types a display name + shared password → session set → redirect to `?next=` or `/dashboard`

### Route gate map

| Path | Access |
|------|--------|
| `/` | 🌐 public |
| `/handbooks` | 🌐 public |
| `/docs/<handbook-slug>` (root handbooks like ssh, ssl-tls) | 🌐 public |
| `/login` | 🌐 public |
| `/sections/gate-cse` | 🔒 login required |
| `/docs/gate-cse/*` | 🔒 login required |
| `/dashboard` | 🔒 login required |

Gating is done inside `SectionPage` and `DocPage` based on `doc.section === 'gate-cse'`; `/dashboard` uses `<ProtectedRoute>` wrapper from `lib/auth.tsx`.

## Build & Publish Flow

1. Edit / create a `.md` under `handnote/`
2. In `app/`: `npm run dev` (auto-converts to .mdx) or `npm run build`
3. The `convert-md-to-mdx.mjs` script writes to `app/src/generated/content/` (gitignored)
4. Deploy: `npx wrangler pages deploy app/dist --project-name=learning-hub --branch=main --commit-dirty=true`

## Hosting

- **Cloudflare Pages:** <https://learning-hub-3gw.pages.dev>
- Docker deployment also supported via the root `Dockerfile` (static nginx serve)

## Skills (user-invocable)

Use `/<skill-name>` to invoke. Lives under `.claude/skills/`:

- **`/add-chapter`** — author a new GATE CSE chapter (9-section template)
- **`/new-handbook`** — author a new standalone handbook (What→Why→How flow)
- **`/build-check`** — run production build and report size/warnings (no deploy)
- **`/deploy`** — build + push to Cloudflare Pages + smoke-test live URL
- **`/ui-test`** — Playwright MCP tests of the live site (home, course, article, search, dark mode, mobile)

## Agents

Available under `.claude/agents/`:

- **`content-writer`** — specialist subagent for drafting / expanding .md content. Invoke via the `Agent` tool with `subagent_type: content-writer`. Use when the task is pure content authoring; do not use it for code or deploy.

## Scope

These rules apply to ALL conversations and all AI agents in this directory.
