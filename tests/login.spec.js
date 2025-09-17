const { test, expect } = require('@playwright/test');

test('Login to Rahul Shetty Academy', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  
  // Fill in the login credentials
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  
  // Click the sign in button
  await page.click('#signInBtn');
  
  // Wait for navigation and verify we're logged in by checking the URL
  await expect(page).toHaveURL(/.*shop/);
});