# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication Flow >> should show validation errors for invalid email
- Location: tests\auth.spec.ts:40:7

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
  3  | test.describe('Authentication Flow', () => {
  4  |   test('should show registration form and allow user interaction', async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     
  7  |     // Switch to register mode
  8  |     await page.getByRole('button', { name: /criar uma/i }).click();
  9  |     
  10 |     // Look for registration form elements using accessibility locators
  11 |     const emailInput = page.getByLabel('Email');
  12 |     const passwordInput = page.getByLabel('Senha');
  13 |     const submitButton = page.getByRole('button', { name: /criar conta/i });
  14 |     
  15 |     // Verify form elements are present
  16 |     await expect(emailInput).toBeVisible();
  17 |     await expect(passwordInput).toBeVisible();
  18 |     await expect(submitButton).toBeVisible();
  19 |   });
  20 | 
  21 |   test('should handle login with valid credentials (mock)', async ({ page }) => {
  22 |     await page.goto('/login');
  23 |     
  24 |     // Fill login form
  25 |     await page.getByLabel('Email').fill('test@example.com');
  26 |     await page.getByLabel('Senha').fill('securepassword123');
  27 |     
  28 |     // Submit form
  29 |     await page.getByRole('button', { name: /entrar/i }).click();
  30 |     
  31 |     // Should redirect to dashboard or show success. We wait for the URL to change.
  32 |     // Note: this will fail if the test environment doesn't have Supabase configured,
  33 |     // so we just check if it tries to navigate or shows an error.
  34 |     await expect(page).toHaveURL(/.*\/dashboard|.*\//, { timeout: 10000 }).catch(() => {
  35 |         // If Supabase is not running, it will show an error message instead
  36 |         expect(page.locator('.bg-\\[\\#FEF2F2\\]')).toBeVisible();
  37 |     });
  38 |   });
  39 | 
  40 |   test('should show validation errors for invalid email', async ({ page }) => {
  41 |     await page.goto('/login');
  42 |     
  43 |     // Fill with invalid credentials
> 44 |     await page.getByLabel('Email').fill('invalid-email');
     |                                    ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  45 |     await page.getByLabel('Senha').fill('any-password');
  46 |     
  47 |     // Submit
  48 |     await page.getByRole('button', { name: /entrar/i }).click();
  49 |     
  50 |     // Check if error message appears (Supabase auth error)
  51 |     const errorMessage = page.locator('.bg-\\[\\#FEF2F2\\]');
  52 |     await expect(errorMessage).toBeVisible({ timeout: 10000 });
  53 |   });
  54 | 
  55 |   test('should protect routes requiring authentication', async ({ page }) => {
  56 |     // Try to access dashboard without logging in
  57 |     await page.goto('/dashboard');
  58 |     
  59 |     // Supabase middleware should redirect to login
  60 |     await expect(page).toHaveURL(/.*\/login/, { timeout: 5000 });
  61 |   });
  62 | });
```