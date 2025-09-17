const { test, expect } = require('@playwright/test');

test.describe('Sample Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    // Example test checking the page title
    await expect(page).toHaveTitle(/My App/);
  });

  test('navigation works', async ({ page }) => {
    // Example test for navigation
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/.*about/);
  });

  test('form submission', async ({ page }) => {
    // Example test for form submission
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Assert successful submission
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('api interaction', async ({ request }) => {
    // Example test for API calls
    const response = await request.get('/api/users');
    expect(response.ok()).toBeTruthy();
    
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
  });
});

// Example of test hooks and fixtures
test.describe('Test with Custom Fixture', () => {
  test.beforeAll(async () => {
    // Setup before all tests in this describe block
    console.log('Setting up test suite');
  });

  test.afterAll(async () => {
    // Cleanup after all tests in this describe block
    console.log('Cleaning up test suite');
  });

  test('using custom fixture @smoke', async ({ page }) => {
    // Example of using test fixtures and tags
    await page.goto('/dashboard');
    await expect(page.locator('.dashboard-title')).toBeVisible();
  });
});