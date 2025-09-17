const { test, expect } = require('@playwright/test');

test('Login and purchase iPhone X', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');
  
  // Verify successful login by checking URL
  await expect(page).toHaveURL(/.*shop/);
  
  // Step 2: Select iPhone X and add to cart
  const cards = page.locator('.card');
  const titles = page.locator('.card-title a');
  const count = await cards.count();
  
  // Find iPhone X card and click its Add button
  for(let i = 0; i < count; i++) {
    const title = await titles.nth(i).textContent();
    if(title.trim() === 'iphone X') {
      // Click the Add button in the same card
      await cards.nth(i).locator('.card-footer button').click();
      console.log('Added iPhone X to cart');
      break;
    }
  }
  
  // Step 3: Go to cart and checkout
  // Click on Checkout button (cart icon)
  await page.locator('#navbarResponsive a.nav-link').click();
  
  // Step 4: Verify cart contents
  // Check if iPhone X is in the cart
  const cartItem = await page.locator('.media-heading a').textContent();
  await expect(cartItem).toContain('iphone X');
  
  // Verify we're on the checkout page
  await expect(page).toHaveURL(/.*checkout/);
  
  // Optional: Log success message
  console.log('Successfully added iPhone X to cart and verified on checkout page');
});