---
name: docker-run
description: Build the Docker image and run the React app locally on port 8080 with smoke tests. Useful for offline preview, pre-deploy validation, and verifying the multi-stage Dockerfile + nginx config still works.
user_invocable: true
---

# Docker Run Skill

Build the production Docker image (multi-stage: Node build → nginx serve), run it on `localhost:8080`, and smoke-test the live container. Use this for offline preview or to validate the Dockerfile before pushing.

## When to use this vs `/deploy`

| Situation | Skill |
|-----------|-------|
| Offline preview / no internet | **`/docker-run`** |
| Validate `Dockerfile` + `nginx.conf` changes | **`/docker-run`** |
| Pre-flight before pushing to Cloudflare | **`/docker-run`** then `/deploy` |
| Ship to production on Cloudflare Pages | `/deploy` |

## Preconditions

- Docker Desktop / daemon running (`docker info` succeeds)
- `Dockerfile`, `nginx.conf`, `nginx-security-headers.conf` at repo root
- `handnote/` populated (the build stage copies these to `/handnote/`)

## Steps

### 1. Stop any previous instance

```bash
docker rm -f learning-hub 2>/dev/null
```

### 2. Build the image

```bash
docker build -t learning-hub:latest . 2>&1 | tail -30
```

Watch for:
- `tsc -b` errors → TypeScript regression
- `vite build` errors → import / lint break
- Chunk-size warnings (>800 KB) — informational, not fatal
- PWA precache count → confirms service worker generated

### 3. Run the container

```bash
docker run -d --name learning-hub -p 8080:80 learning-hub:latest
```

### 4. Wait for health + smoke-test routes

```bash
sleep 3
docker ps --filter name=learning-hub --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Smoke test key routes
for path in "/" "/handbooks" "/docs/ssh" "/docs/gate-cse/08-operating-system" "/sections/gate-cse"; do
  curl -s -o /dev/null -w "$path -> %{http_code}\n" "http://localhost:8080$path"
done
```

Expectations:
- `/` → 200
- `/handbooks` → 200
- `/docs/ssh` → 200 (public handbook)
- `/docs/gate-cse/*` → 200 (SPA serves shell; auth gate is client-side)
- `/sections/gate-cse` → 200 (same)

### 5. (Optional) Browser verification with Playwright MCP

For deeper checks, invoke `mcp__playwright__browser_navigate` against `http://localhost:8080` and verify:
- Page title contains "Learning Hub"
- Bangla hero "বাংলায় CS শেখো..." renders
- `/sections/gate-cse` redirects to `/login?next=...`
- Console has 0 app errors (Google Fonts CDN block in headless is OK to ignore)

## Lifecycle helpers

```bash
docker logs -f learning-hub        # tail logs
docker stop learning-hub           # pause
docker start learning-hub          # resume
docker rm -f learning-hub          # tear down
docker exec -it learning-hub sh    # shell inside the nginx container
```

## Report template

```md
## Docker Run Report

**Image:** learning-hub:latest
**Build time:** Ns
**Final image size:** N MB
**Container:** http://localhost:8080 (healthy)

### Smoke test
| Path | Status |
|------|--------|
| / | 200 |
| /handbooks | 200 |
| /docs/ssh | 200 |
| /docs/gate-cse/08-operating-system | 200 |
| /sections/gate-cse | 200 |

### Console errors (Playwright, optional)
0 application errors. (Google Fonts CDN blocked in headless — expected.)

### Verdict: PASS / FAIL
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `docker: command not found` | Docker not installed / daemon down | Start Docker Desktop |
| `port is already allocated` | Another container on 8080 | `docker rm -f learning-hub` or change `-p 9090:80` |
| Build stage fails on `npm run convert` | Bad markdown in `handnote/` | Fix the offending `.md` (see `convert-md-to-mdx.mjs` errors) |
| `tsc -b` error | TypeScript regression | Fix in `app/src/` |
| Healthcheck status: unhealthy | nginx fails to start / 500s | `docker logs learning-hub` to see nginx error |
| 404 on `/docs/<slug>` | Missing `_redirects` SPA fallback | Confirm `app/public/_redirects` has `/* /index.html 200` |

## Don't deploy from this skill

This is local validation only. To ship to production, use `/deploy`.
