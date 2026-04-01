const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
  },
  reporter: 'list',
});
