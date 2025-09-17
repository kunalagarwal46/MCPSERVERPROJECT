const { test, expect } = require('@playwright/test');

test('Purchase iPhone X flow', async ({ page }) => {
  // Navigate to the login page and sign in
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');
  
  // Wait for navigation to shop page
  await expect(page).toHaveURL(/.*shop/);
  
  // Find and click Add button for iPhone X
  // First, find all product titles
  const products = page.locator('.card-title');
  const count = await products.count();
  
  // Find iPhone X and click its Add button
  for(let i = 0; i < count; i++) {
    const title = await products.nth(i).textContent();
    if(title.includes('iphone X')) {
      // Click the Add button in the same card
      await page.locator('.card-footer button').nth(i).click();
      break;
    }
  }
  
  // Click on Checkout button
  await page.locator('a.nav-link.btn.btn-primary').click();
  
  // Verify iPhone X is in the cart
  const productInCart = await page.locator('h4.media-heading').textContent();
  expect(productInCart).toContain('iphone X');
  
  // Verify checkout page URL
  await expect(page).toHaveURL(/.*checkout/);
});