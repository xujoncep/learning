---
name: add-chapter
description: Author a new GATE CSE chapter under handnote/gate-cse/ following the standard 9-section template (Syllabus, Weightage, Concepts, Formulas, Patterns, PYQs, Practice, Traps, Revision) with Bangla explanations and Mermaid diagrams.
user_invocable: true
---

# Add GATE CSE Chapter Skill

Create a new GATE CSE chapter as a `.md` file under `handnote/gate-cse/`. After writing, the build pipeline automatically compiles it to MDX and the sidebar auto-regenerates from the file.

## Before You Start

Ask the user (or decide from context):
1. **Subject name** (e.g. "Discrete Mathematics", "Cryptography")
2. **Chapter number** — pick the next unused `NN-` prefix (look at `ls handnote/gate-cse/`)
3. **Difficulty** — Easy / Medium / Hard
4. **Average GATE marks** — reference last 5 years

## File Location and Naming

```
handnote/gate-cse/<NN>-<slug-with-hyphens>.md
```

Example: `handnote/gate-cse/12-cryptography.md`

## Required 9-Section Template

Follow the exact structure used in existing chapters (e.g. [handnote/gate-cse/08-operating-system.md](handnote/gate-cse/08-operating-system.md)).

### Frontmatter (first line — MUST match)

```md
# <Subject> — GATE CSE <emoji>

> **Priority:** 🔴 High / 🟡 Medium / 🟢 Low | **Avg Marks:** N | **Difficulty:** Easy/Medium/Hard
> <one-line-hook>
```

### Section skeleton

```md
## 📚 1. Syllabus Overview
<GATE official syllabus list>

## 📊 2. Weightage Analysis (Last 5 Years)
<table: year vs marks vs most-asked topics>
<pie chart of sub-topic frequency — via mermaid>

## 🧠 3. Core Concepts
3.1 <sub-topic> — What / Why / How / Example with mermaid diagram
3.2 ...

## 📐 4. Formulas & Shortcuts
<tables + KaTeX $$formulas$$>

## 🎯 5. Common Question Patterns
<bulleted list of GATE question types>

## 📜 6. Previous Year Questions (PYQ) — Solved
<20-30 worked PYQs from the last 5-10 years, grouped by sub-topic>
- Format per PYQ:
  #### PYQ N (GATE YYYY) — <Topic>
  **Q:** ...
  **Solution:**
  ...
  **Answer:** X ✅

## 🏋️ 7. Practice Problems
<5-10 problems with collapsible <details> answer block>

## ⚠️ 8. Traps & Common Mistakes
<bulleted list of classic student mistakes>

## 📝 9. Quick Revision Summary
<mermaid mindmap + must-remember facts + cheat sheet>

## 🔗 Navigation
- Back to [Master Index](00-master-index.md)
- Previous: [<prev chapter>](NN-prev.md)
- Next: [<next chapter>](NN-next.md)
```

## Writing Rules (from CLAUDE.md)

- **Language:** Bangla explanations with **English technical keywords**
- **Audience:** Average / weak student — keep vocabulary simple, build intuition before formalism
- **Flow:** beginner → advanced (never dump facts; guide the reader)
- **Mermaid:** use generously — flowcharts, pie charts, state diagrams, mindmaps
- **Code:** C or pseudocode for algorithms; fenced blocks with language tag
- **Math:** KaTeX-style `$$...$$` for display, `$...$` for inline

## PYQ Scaling Rule

- Hard / big topic → **20-30 PYQs**
- Medium → 15-20
- Easy / small → 8-12

## After Writing

1. Run build — the convert script auto-picks up the new .md:
   ```bash
   cd app && npm run build
   ```
2. Dev check:
   ```bash
   npm run dev
   # visit /docs/gate-cse/<NN>-<slug>
   ```
3. Verify: sidebar shows the new chapter, Prev/Next pick it up, reading time looks reasonable
4. Commit: `git add handnote/gate-cse/<NN>-<slug>.md && git commit -m "Add GATE CSE chapter: <subject>"`
5. Deploy: invoke `/deploy` skill or `npx wrangler pages deploy app/dist --project-name=learning-hub --branch=main --commit-dirty=true`

## Useful References

- Template source to copy: [handnote/gate-cse/08-operating-system.md](handnote/gate-cse/08-operating-system.md)
- Master index: [handnote/gate-cse/00-master-index.md](handnote/gate-cse/00-master-index.md) — update its table after adding
- Exam pattern: [handnote/gate-cse/00-exam-pattern-strategy.md](handnote/gate-cse/00-exam-pattern-strategy.md)
