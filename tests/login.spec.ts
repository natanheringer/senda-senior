import { test, expect } from '@playwright/test';

test('should load login page and show title', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login');
  
  // Check that the page has loaded correctly
  await expect(page).toHaveURL(/.*\/login/);
  
  // Look for common login page elements using Accessibility Locators (Best Practice)
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Senha');
  const submitButton = page.getByRole('button', { name: /entrar/i });
  
  // Verify that key elements are present
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(submitButton).toBeVisible();
  
  // Try to fill in test credentials
  await emailInput.fill('test@example.com');
  await passwordInput.fill('testpassword123');
  
  // Verify the values were entered
  await expect(emailInput).toHaveValue('test@example.com');
  await expect(passwordInput).toHaveValue('testpassword123');
});

test('should show error for invalid login', async ({ page }) => {
  await page.goto('/login');
  
  // Fill with invalid credentials using Accessible Locators
  await page.getByLabel('Email').fill('invalid@test.com');
  await page.getByLabel('Senha').fill('wrongpassword');
  
  // Attempt to submit
  await page.getByRole('button', { name: /entrar/i }).click();
  
  // Wait for the error message to appear
  const errorMessage = page.locator('.bg-\\[\\#FEF2F2\\]'); // Div de erro baseado nas suas classes do Tailwind
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});