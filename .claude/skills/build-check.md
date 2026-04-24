---
name: build-check
description: Run a production build of the React app and report on size, warnings, and broken imports. Doesn't deploy — pure sanity check before committing.
user_invocable: true
---

# Build Check Skill

Run the production build and produce a concise health report. Use this before committing significant changes or before invoking `/deploy`.

## Steps

### 1. Clean-ish build

```bash
cd app
rm -rf dist/
npm run build
```

### 2. Capture output

- Errors → fail fast
- Warnings → report (especially chunk-size)
- Final bundle sizes

### 3. Generate report

```md
## Build Health Report

**Build time:** Ns
**Generated chunks:** N files
**Total dist size:** N MB

### Main entry
- `index-<hash>.js`: <raw> → <gzip>
- `mermaid-<hash>.js`: <raw> → <gzip>
- `katex-<hash>.js`: <raw> → <gzip>
- `react-vendor-<hash>.js`: <raw> → <gzip>

### Lazy content chunks (per .mdx)
| Doc | Raw | Gzip |
|-----|-----|------|

### Warnings
- [ ] Chunk size warnings (any > 800 KB)
- [ ] Unused imports
- [ ] Type errors (should be zero — `tsc -b` runs first)

### Public artifacts generated
- [ ] dist/sitemap.xml present
- [ ] dist/robots.txt present
- [ ] dist/_headers present
- [ ] dist/_redirects present
- [ ] dist/manifest.webmanifest present
- [ ] dist/sw.js present (PWA)

### Budget guardrails
- Main entry gzip should stay < 250 KB
- Per-chapter chunk gzip should stay < 100 KB
- Total dist should stay < 10 MB
```

### 4. If anything's off

- Chunk too large → consider `manualChunks` tweak in `vite.config.ts`
- TS error → fix in `app/src/`
- Missing public artifact → check `app/public/` and `scripts/generate-sitemap.mjs`

## Useful commands

```bash
# Per-file sizes (sorted largest first)
ls -Sl dist/assets/*.js | head -15

# Quick grep for the main entry
ls dist/assets/index-*.js

# Sanity: confirm generated content exists
ls src/generated/content-meta.json src/generated/content/ | head

# Check gzip compression ratio
SIZE_RAW=$(wc -c < dist/assets/index-*.js)
SIZE_GZ=$(gzip -c dist/assets/index-*.js | wc -c)
echo "raw=$SIZE_RAW gzip=$SIZE_GZ ratio=$(echo "scale=2; $SIZE_GZ*100/$SIZE_RAW" | bc)%"
```

## Don't deploy from this skill

This is a pre-flight check only. If everything looks good, use `/deploy` to ship.
