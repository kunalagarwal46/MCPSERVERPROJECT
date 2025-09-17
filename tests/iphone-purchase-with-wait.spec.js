const { test, expect } = require('@playwright/test');

test('Login and purchase iPhone X with wait', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');
  
  // Wait for login and add 2 second delay
  await expect(page).toHaveURL(/.*shop/);
  await page.waitForTimeout(2000); // 2 second wait
  
  // Step 2: Select iPhone X and add to cart
  const cards = page.locator('.card');
  const titles = page.locator('.card-title a');
  const count = await cards.count();
  
  // Find iPhone X card and click its Add button
  let iphoneFound = false;
  for(let i = 0; i < count; i++) {
    const title = await titles.nth(i).textContent();
    if(title.trim() === 'iphone X') {
      // Click the Add button in the same card
      await cards.nth(i).locator('.card-footer button').click();
      console.log('Added iPhone X to cart');
      iphoneFound = true;
      break;
    }
  }
  
  // Verify iPhone was found and added
  expect(iphoneFound, 'iPhone X product should be found').toBeTruthy();
  
  // Step 3: Go to cart and checkout
  await page.locator('#navbarResponsive a.nav-link').click();
  
  // Step 4: Verify cart contents
  // Wait for cart page to load
  await page.waitForSelector('.media-heading');
  
  // Check if iPhone X is in the cart
  const cartItem = await page.getByRole('heading', { name: 'iphone X' }).textContent();
  await expect(cartItem).toBe('iphone X');

  // Click the checkout button
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Verify we're on the checkout page
  await expect(page).toHaveURL(/.*checkout/);
  
  // Optional: Log success message
  console.log('Successfully added iPhone X to cart and verified on checkout page');
});