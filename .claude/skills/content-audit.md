---
name: content-audit
description: Lint all handnote/*.md files for compliance with project conventions — H1 frontmatter, blockquote hook, Mermaid blocks, code-fence language tags, broken inter-doc links, missing diagrams in non-trivial chapters. Reports a punch list, no auto-fixes.
user_invocable: true
---

# Content Audit Skill

Scan every `.md` under `handnote/` and produce a compliance report against [CLAUDE.md](CLAUDE.md) rules. **No auto-fixes** — produce a punch list the user (or `content-writer` agent) can act on.

## When to use

- Before invoking `/deploy` (catch broken docs early)
- After bulk-importing notes from another source
- Before publicizing the site to a wider audience
- Periodically (monthly) on stale chapters

## What to check

For each `handnote/**/*.md`:

### Frontmatter / structure
- [ ] Line 1 starts with `# ` (single H1) — required for the build script
- [ ] Line 2-3 has a `>` blockquote with priority/hook info (chapters) or scope description (handbooks)
- [ ] Headings use `## N. Title` numbering pattern (not bare `## Title` for course chapters)

### Mermaid usage
- [ ] At least one ` ```mermaid ` block exists (mandatory for non-trivial topics — chapters, deep handbooks)
- [ ] Mermaid blocks have a recognizable diagram type as line 1 (`flowchart`, `sequenceDiagram`, `mindmap`, `pie`, `stateDiagram-v2`, `classDiagram`, etc.)
- [ ] No `{` or `}` inside Mermaid node labels (interacts with MDX escaping)

### Code fences
- [ ] Every ` ``` ` block has a language tag (` ```c `, ` ```py `, ` ```bash `, ` ```js `, ...)
- [ ] No bare ` ``` ` opens

### Links
- [ ] Internal `.md` links resolve (target file exists under `handnote/`)
- [ ] No links to `.mdx` (always reference `.md` source — build script rewrites)
- [ ] Course-chapter docs include navigation footer: links to Master Index + Prev + Next

### KaTeX
- [ ] Math expressions use `$...$` or `$$...$$` (not `\(...\)` or `\[...\]`)
- [ ] No unescaped `$` in plain prose (would break math rendering)

### Language voice (heuristic)
- [ ] Bangla explanations present (look for Bangla Unicode characters)
- [ ] Technical keywords kept in English (not transliterated unless the keyword has no English equivalent)

### File placement
- [ ] Course chapter (multi-part series) lives under `handnote/gate-cse/NN-<slug>.md`
- [ ] Standalone handbook lives under `handnote/<slug>.md` (root)
- [ ] Slug is lowercase-hyphenated

### Build readiness
- [ ] `npm run convert` runs cleanly on the file (no MDX-breaking chars left unescaped)
- [ ] `app/src/generated/content/` contains a corresponding `.mdx` after build

## How to run

```bash
# 1. List all source files
find handnote -name '*.md' -type f | sort

# 2. For each, run the checks above. Use Read + Grep tools, not bash regex.
#    Group findings by severity: ERROR (build will fail), WARNING (style violation),
#    INFO (suggested improvement).

# 3. Cross-reference: convert script output
cd app && npm run convert 2>&1 | tail -50
```

## Report template

```md
## Content Audit Report
**Date:** YYYY-MM-DD
**Files scanned:** N
**Errors:** E · **Warnings:** W · **Info:** I

### 🚨 Errors (will break build or render)

| File | Line | Issue | Fix |
|------|------|-------|-----|
| handnote/foo.md | 1 | Missing H1 frontmatter | Add `# Title` as first line |
| handnote/bar.md | 42 | Broken link to `baz.md` | Target file doesn't exist — fix or remove |
| handnote/qux.md | 88 | Code fence without language tag | Add `c`, `bash`, etc. |

### ⚠️ Warnings (style violations)

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| handnote/gate-cse/12-foo.md | — | No Mermaid diagram in non-trivial chapter | Add at least one flowchart/mindmap |
| handnote/foo.md | 33 | Mermaid label contains `{` | Rephrase to avoid braces |

### ℹ️ Info / Improvements

| File | Suggestion |
|------|------------|
| handnote/foo.md | Could benefit from a comparison table in section 5 |
| handnote/gate-cse/05-algorithms.md | PYQ count low (only 8) — chapter weight suggests 20+ |

### Summary verdict
- ✅ All-clear → ready to `/deploy`
- ⚠️ Warnings only → ship if user accepts; queue cleanup
- 🚨 Errors present → fix before deploy (build will likely fail)
```

## Severity definitions

| Severity | Meaning | Block deploy? |
|----------|---------|---------------|
| 🚨 ERROR | Build will fail OR page won't render correctly OR a link 404s | YES |
| ⚠️ WARNING | Violates CLAUDE.md style rules but page still renders | NO (user discretion) |
| ℹ️ INFO | Improvement opportunity, not a violation | NO |

## Followup

If the report has errors:
1. For content fixes (rewording, adding diagrams) → invoke `content-writer` agent on the specific files
2. For broken links / missing tags → fix directly with `Edit` tool
3. Re-run audit to confirm zero errors
4. Then proceed with `/build-check` → `/deploy`

## Don't auto-fix

This skill **reports only**. Auto-fixing risks corrupting nuanced content (e.g. removing a Mermaid block that uses `{}` legitimately for a state machine label). The user/agent decides each fix.

## References

- [CLAUDE.md](CLAUDE.md) — full rule set
- [.claude/agents/content-writer.md](.claude/agents/content-writer.md) — agent to fix flagged content
- [app/scripts/convert-md-to-mdx.mjs](app/scripts/convert-md-to-mdx.mjs) — actual MDX conversion logic (source of truth for what breaks)
