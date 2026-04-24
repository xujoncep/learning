---
name: ui-test
description: Run end-to-end UI tests on the live React site (Cloudflare Pages) using Playwright MCP — course layout, article layout, search, sidebar collapse, bookmark, dark mode, mobile responsive.
user_invocable: true
---

# UI Test Skill — React Learning Hub

Systematic UI verification of the deployed site using Playwright MCP.

## Target

- **Production:** `https://learning-hub-3gw.pages.dev`
- **Local dev:** `http://localhost:5173` (after `cd app && npm run dev`)
- **Docker:** `http://localhost:8080` (after `docker run`)

## Page Taxonomy

| Route | Layout type | Things to test |
|-------|-------------|----------------|
| `/` | Home | Hero, stats, course cards, handbook cards, social icons |
| `/sections/:id` | Section listing | Chapter cards, section title, breadcrumb |
| `/docs/gate-cse/*` | **Course** | Course sidebar, top Prev/Next, Bookmark, bottom PrevNext, sidebar collapse |
| `/docs/<slug>` (root) | **Article** | No sidebar, no prev/next, clean breadcrumb, narrow column |
| `/404` | Not found | Any unknown URL |

## Test Flow

### 1. Home page
- Navigate to base URL → expect `200`, title contains "Learning Hub"
- Verify hero headline + "Start Learning" CTA
- Verify both sections render: "Comprehensive Learning Guides" + "Individual Handbooks"

### 2. Course page (Course layout)
- Navigate to `/docs/gate-cse/08-operating-system`
- Expect title prefix "Operating System"
- **Sidebar:** visible on desktop, contains 13 chapters, current one highlighted
- **Top controls:** Previous button + Next button visible; Bookmark icon present
- **Breadcrumb:** `Home › GATE CSE`
- **Reading time + word count badges** present
- Scroll down: bottom PrevNext card visible

### 3. Sidebar collapse
- Click "Collapse sidebar" button
- Sidebar disappears, small rail button appears on left
- Click rail → sidebar re-expands
- Reload page → state persisted via `localStorage` key `course-sidebar-open`

### 4. Bookmark
- Click Bookmark icon on a course page → icon fills + color changes
- Reload → still filled (localStorage `learning-bookmarks`)
- Click again → unmark

### 5. Article page (Article layout)
- Navigate to `/docs/ssh`
- Expect: **no sidebar**, **no Prev/Next**, no hamburger button
- Breadcrumb: `Home › Handbooks`
- Narrower content column

### 6. Search (⌘K)
- On any page, press `Ctrl+K` or `/` → dialog opens
- Type "algorithms" → at least one result
- Arrow down / Enter → navigate to doc

### 7. Dark / light toggle
- Click theme button → root class flips `dark` ↔ `light`
- Reload → persisted in `learning-theme`

### 8. Font size menu
- Open "Text size" dropdown → three options (Small/Medium/Large)
- Pick Large → prose font-size changes

### 9. Mobile view
- `browser_resize` to 390×844
- Hamburger button visible in header
- Course page: tap hamburger → drawer shows course chapters only
- Article page: no hamburger (nothing to open)

### 10. Console errors
- On every page visited, check `browser_console_messages level=error`
- Zero critical errors expected (ignore known Google Fonts flaky load)

## After Tests

### Report template

```md
## UI Test Report
**Site:** <URL> **Date:** YYYY-MM-DD **Commit:** <sha>

| Area | Result | Notes |
|------|--------|-------|
| Home | ✅ / ❌ | ... |
| Course layout | ✅ / ❌ | ... |
| Sidebar collapse | ✅ / ❌ | ... |
| Bookmark | ✅ / ❌ | ... |
| Article layout | ✅ / ❌ | ... |
| Search (⌘K) | ✅ / ❌ | ... |
| Theme toggle | ✅ / ❌ | ... |
| Font size | ✅ / ❌ | ... |
| Mobile | ✅ / ❌ | ... |
| Console errors | ✅ / ❌ | N errors |

### Issues found
| Issue | Page | Severity | Suggested fix |
|-------|------|----------|----------------|

### Verdict: PASS / FAIL
```

### Fix workflow
If a test fails:
1. Identify root cause (usually a component file under `app/src/components/`)
2. Fix the code
3. `cd app && npm run build`
4. `npx wrangler pages deploy dist --project-name=learning-hub --branch=main --commit-dirty=true`
5. Re-test to confirm

## MCP tools used

- `mcp__playwright__browser_navigate`
- `mcp__playwright__browser_snapshot`
- `mcp__playwright__browser_click`
- `mcp__playwright__browser_type`
- `mcp__playwright__browser_take_screenshot`
- `mcp__playwright__browser_console_messages`
- `mcp__playwright__browser_resize`
- `mcp__playwright__browser_wait_for`
- `mcp__playwright__browser_close`
