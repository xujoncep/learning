---
name: deploy
description: Build the React app and deploy to Cloudflare Pages — runs prebuild (convert + sitemap), tsc + vite build, then wrangler pages deploy, and smoke-tests the live URL.
user_invocable: true
---

# Deploy to Cloudflare Pages

Build the React app (including the md→mdx conversion and sitemap) and push it to Cloudflare Pages. Smoke-test the live URL at the end.

## Preconditions

- `app/node_modules/` installed (`npm install --legacy-peer-deps` once)
- Logged in to Cloudflare: `npx wrangler whoami` (run `npx wrangler login` if not)
- Cloudflare project `learning-hub` already exists (created with `wrangler pages project create`)

## Steps

### 1. Build

```bash
cd app
npm run build
```

This runs in order:
1. `npm run convert` — `handnote/**/*.md` → `src/generated/content/**/*.mdx` + `content-meta.json`
2. `npm run sitemap` — `public/sitemap.xml` + `public/robots.txt`
3. `tsc -b` — type-check
4. `vite build` — bundle to `dist/`

### 2. Deploy

```bash
npx wrangler pages deploy dist \
  --project-name=learning-hub \
  --branch=main \
  --commit-dirty=true
```

**Notes:**
- `--commit-dirty=true` allows deploy even if working tree has uncommitted changes (useful during iteration)
- `--branch=main` → production deployment
- Any other branch → preview deployment with a `<sha>.learning-hub-3gw.pages.dev` URL
- Expect ~3-5s upload for incremental deploys (many files already in CDN)

### 3. Smoke test

Wait for DNS propagation (usually < 60s), then verify:

```bash
until curl -sf -o /dev/null "https://learning-hub-3gw.pages.dev/"; do sleep 3; done
echo "✅ live"

# Hit key routes
for path in "/" "/docs/gate-cse/08-operating-system" "/docs/ssh" "/sections/gate-cse"; do
  curl -s -o /dev/null -w "$path -> %{http_code}\n" "https://learning-hub-3gw.pages.dev$path"
done

# Verify security headers + compression
curl -s -D- -o /dev/null "https://learning-hub-3gw.pages.dev/" \
  | grep -iE "content-security-policy|x-frame-options|cache-control|content-encoding|cf-cache-status"
```

All routes should return `200`. The asset layer should show `Content-Encoding: br` (Brotli) from Cloudflare.

### 4. (Optional) Playwright UI test

If behavior changes are significant, invoke the `/ui-test` skill to run the full UI suite against the new deployment.

### 5. Commit

Only commit if the deploy succeeded and smoke tests pass:

```bash
cd .. # back to repo root
git add -A
git commit -m "Describe the change"
git push
```

## If Something Fails

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `npm run convert` error | Bad markdown syntax in `handnote/*.md` | Check the offending file; fix MDX-unsafe chars manually or improve the script |
| `tsc -b` error | TypeScript type mismatch | Fix in `app/src/` |
| `vite build` error | Missing import, lint rule | Fix the offending file |
| `wrangler ... 8000007` | Project doesn't exist | `npx wrangler pages project create learning-hub --production-branch=main` |
| `522` or `ERR_FAILED` after deploy | CDN not propagated yet | Wait 30-60s and retry |
| 404 on deep link | Missing `_redirects` in `dist/` | Ensure `app/public/_redirects` exists with `/* /index.html 200` |

## Project Info

- **Cloudflare project name:** `learning-hub`
- **Production URL:** `https://learning-hub-3gw.pages.dev`
- **Project wrangler config:** root-level `wrangler.toml`
- **Pages build output dir:** `app/dist`
- **Security headers + redirects:** `app/public/_headers` + `app/public/_redirects`
