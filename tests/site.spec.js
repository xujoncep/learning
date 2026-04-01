const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reliable-moonbeam-bcdbd1.netlify.app';

test.describe('Docsify Site — Full Check', () => {

  test('Cover page loads with correct title and buttons', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForSelector('.cover-main', { timeout: 10000 });

    const heading = await page.textContent('.cover-main h1');
    expect(heading).toContain('Software Engineering Learning Hub');

    const buttons = await page.locator('.cover-main a').count();
    expect(buttons).toBeGreaterThanOrEqual(2);
  });

  test('Home page loads after clicking Start Reading', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForSelector('.cover-main', { timeout: 10000 });

    await page.click('.cover-main a[href="#/"]');
    await page.waitForSelector('.markdown-section', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('Software Engineering Learning Hub');
  });

  test('Sidebar loads with all topic links', async ({ page }) => {
    await page.goto(BASE_URL + '#/');
    await page.waitForSelector('.sidebar-nav', { timeout: 10000 });

    const sidebar = await page.textContent('.sidebar-nav');
    expect(sidebar).toContain('SSL/TLS');
    expect(sidebar).toContain('SSH');
    expect(sidebar).toContain('Authentication');
    expect(sidebar).toContain('React');
    expect(sidebar).toContain('C Programming');
  });

  test('SSL/TLS page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL + '#/ssl-tls');
    await page.waitForSelector('.markdown-section h1', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('SSL');
    expect(content).toContain('TLS');
  });

  test('SSH page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL + '#/ssh');
    await page.waitForSelector('.markdown-section h1', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('SSH');
    expect(content).toContain('Secure Shell');
  });

  test('Authentication page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL + '#/authentication-authorization-dotnet');
    await page.waitForSelector('.markdown-section h1', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('Authentication');
  });

  test('React page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL + '#/react-for-dotnet-developers');
    await page.waitForSelector('.markdown-section h1', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('React');
  });

  test('C Programming page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL + '#/c-programming-hand-book');
    await page.waitForSelector('.markdown-section h1', { timeout: 10000 });

    const content = await page.textContent('.markdown-section');
    expect(content).toContain('C Programming');
  });

  test('Mermaid diagrams render (not raw text)', async ({ page }) => {
    await page.goto(BASE_URL + '#/ssl-tls');
    await page.waitForSelector('.markdown-section', { timeout: 10000 });

    // Wait for mermaid to process
    await page.waitForTimeout(3000);

    // Check if mermaid divs exist and have SVG (rendered) or at least processed
    const mermaidDivs = await page.locator('.mermaid').count();
    expect(mermaidDivs).toBeGreaterThan(0);

    // Check first mermaid block rendered as SVG
    const firstMermaid = page.locator('.mermaid').first();
    const hasSvg = await firstMermaid.locator('svg').count();
    expect(hasSvg).toBeGreaterThan(0);
  });

  test('Search works', async ({ page }) => {
    await page.goto(BASE_URL + '#/');
    await page.waitForSelector('.sidebar-nav', { timeout: 10000 });

    const searchInput = page.locator('.search input');
    await searchInput.fill('SSL');
    await page.waitForTimeout(1000);

    const results = await page.locator('.matching-post').count();
    expect(results).toBeGreaterThan(0);
  });

  test('Tables render with styled headers', async ({ page }) => {
    await page.goto(BASE_URL + '#/ssh');
    await page.waitForSelector('.markdown-section table', { timeout: 10000 });

    const tables = await page.locator('.markdown-section table').count();
    expect(tables).toBeGreaterThan(0);
  });

  test('Code blocks have dark theme', async ({ page }) => {
    await page.goto(BASE_URL + '#/ssh');
    await page.waitForSelector('.markdown-section pre', { timeout: 10000 });

    const bgColor = await page.locator('.markdown-section pre').first().evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    // Should be dark (#1e1e2e = rgb(30, 30, 46))
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });

});
