---
name: ui-test
description: Run Playwright MCP UI tests on the live Docsify site, fix issues, and generate a report
user_invocable: true
---

# UI Test Skill

Run comprehensive UI tests on the deployed Docsify site using Playwright MCP.

## Site Info
- **URL:** `https://reliable-moonbeam-bcdbd1.netlify.app`
- **Tech:** Docsify v4 + Mermaid.js + PrismJS
- **Pages:** 6 handnotes in `handnote/` folder

## Test Steps

### 1. Cover Page Check
- Navigate to the site root URL
- Take a screenshot of the cover page
- Verify: logo, title, subtitle, feature list, buttons visible
- Check dark theme contrast

### 2. Page Loading (All 6 Handnotes)
Navigate to each page and verify it loads:
- `#/handnote/ssl-tls`
- `#/handnote/ssh`
- `#/handnote/authentication-authorization-dotnet`
- `#/handnote/react-for-dotnet-developers`
- `#/handnote/computer-networking-hand-book`
- `#/handnote/c-programming-hand-book`

For each page check:
- H1 heading loaded
- Tables rendered
- Content is not empty

### 3. Mermaid Diagrams
On pages with mermaid diagrams, evaluate:
```js
() => {
  const mermaidDivs = document.querySelectorAll('.mermaid');
  const total = mermaidDivs.length;
  let rendered = 0;
  mermaidDivs.forEach(el => { if (el.querySelector('svg')) rendered++; });
  return { total, rendered, failed: total - rendered };
}
```
All mermaid blocks must render as SVG (0 failures).

### 4. Search
- Fill the search box with a keyword (e.g., "TCP" or "SSL")
- Wait 2 seconds for results
- Verify `.matching-post` count > 0

### 5. Sidebar Navigation
- Verify sidebar has all 6 topic links
- Check no `_sidebar.md` 404 errors in console

### 6. Console Errors
- Check browser console for errors
- Report any 404s or JS errors
- Fix if critical

## After Tests

### Fix Issues
If any test fails:
1. Identify the root cause
2. Fix the code
3. Commit and push (Netlify auto-deploys via hook)
4. Re-test to verify fix

### Generate Report
Output a markdown table report with:

```
## UI Test Report
**Site:** URL
**Date:** YYYY-MM-DD

| Test | Result | Details |
|------|--------|---------|
| Cover Page | PASS/FAIL | ... |
| Page Loading (6 pages) | PASS/FAIL | ... |
| Mermaid Diagrams | PASS/FAIL | X/Y rendered |
| Search | PASS/FAIL | N results |
| Sidebar | PASS/FAIL | ... |
| Console Errors | PASS/FAIL | N errors |

### Bugs Fixed
| Issue | Fix |
|-------|-----|
| ... | ... |

### Final Verdict: PASS/FAIL
```

## Tools Used
- `mcp__playwright__browser_navigate` — page navigation
- `mcp__playwright__browser_take_screenshot` — visual verification
- `mcp__playwright__browser_snapshot` — accessibility tree
- `mcp__playwright__browser_evaluate` — JS evaluation for mermaid/search checks
- `mcp__playwright__browser_fill_form` — search input
- `mcp__playwright__browser_click` — sidebar link clicks
- `mcp__playwright__browser_wait_for` — wait for content
- `mcp__playwright__browser_close` — cleanup
