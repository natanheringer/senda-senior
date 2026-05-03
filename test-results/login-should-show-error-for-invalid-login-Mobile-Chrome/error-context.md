# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> should show error for invalid login
- Location: tests\login.spec.ts:29:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Email')

```

# Page snapshot

```yaml
- generic [ref=e2]: Too Many Requests
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('should load login page and show title', async ({ page }) => {
  4  |   // Navigate to the login page
  5  |   await page.goto('/login');
  6  |   
  7  |   // Check that the page has loaded correctly
  8  |   await expect(page).toHaveURL(/.*\/login/);
  9  |   
  10 |   // Look for common login page elements using Accessibility Locators (Best Practice)
  11 |   const emailInput = page.getByLabel('Email');
  12 |   const passwordInput = page.getByLabel('Senha');
  13 |   const submitButton = page.getByRole('button', { name: /entrar/i });
  14 |   
  15 |   // Verify that key elements are present
  16 |   await expect(emailInput).toBeVisible();
  17 |   await expect(passwordInput).toBeVisible();
  18 |   await expect(submitButton).toBeVisible();
  19 |   
  20 |   // Try to fill in test credentials
  21 |   await emailInput.fill('test@example.com');
  22 |   await passwordInput.fill('testpassword123');
  23 |   
  24 |   // Verify the values were entered
  25 |   await expect(emailInput).toHaveValue('test@example.com');
  26 |   await expect(passwordInput).toHaveValue('testpassword123');
  27 | });
  28 | 
  29 | test('should show error for invalid login', async ({ page }) => {
  30 |   await page.goto('/login');
  31 |   
  32 |   // Fill with invalid credentials using Accessible Locators
> 33 |   await page.getByLabel('Email').fill('invalid@test.com');
     |                                  ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  34 |   await page.getByLabel('Senha').fill('wrongpassword');
  35 |   
  36 |   // Attempt to submit
  37 |   await page.getByRole('button', { name: /entrar/i }).click();
  38 |   
  39 |   // Wait for the error message to appear
  40 |   const errorMessage = page.locator('.bg-\\[\\#FEF2F2\\]'); // Div de erro baseado nas suas classes do Tailwind
  41 |   await expect(errorMessage).toBeVisible({ timeout: 10000 });
  42 | });
```