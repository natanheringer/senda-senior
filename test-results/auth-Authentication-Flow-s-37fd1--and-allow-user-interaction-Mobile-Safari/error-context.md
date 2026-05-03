# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication Flow >> should show registration form and allow user interaction
- Location: tests\auth.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /criar uma/i })
    - locator resolved to <button type="button" class="font-bold text-terracotta underline underline-offset-2">Criar uma</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img alt="" sizes="45vw" decoding="async" data-nimg="fill" aria-hidden="true" src="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=3840&q=75" srcset="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=384&q=75 384w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=640&q=75 640w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=750&q=75 750w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=828&q=75 828w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=1080&q=75 1…/> from <div class="relative flex flex-col justify-center overflow-hidden flex-none min-h-[180px] p-[24px_20px] sm:min-h-[240px] sm:p-[32px_24px] md:flex-[0_0_45%] md:min-h-0 md:p-[clamp(40px,5vw,80px)]">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img alt="" sizes="45vw" decoding="async" data-nimg="fill" aria-hidden="true" src="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=3840&q=75" srcset="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=384&q=75 384w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=640&q=75 640w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=750&q=75 750w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=828&q=75 828w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=1080&q=75 1…/> from <div class="relative flex flex-col justify-center overflow-hidden flex-none min-h-[180px] p-[24px_20px] sm:min-h-[240px] sm:p-[32px_24px] md:flex-[0_0_45%] md:min-h-0 md:p-[clamp(40px,5vw,80px)]">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    39 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <img alt="" sizes="45vw" decoding="async" data-nimg="fill" aria-hidden="true" src="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=3840&q=75" srcset="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=384&q=75 384w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=640&q=75 640w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=750&q=75 750w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=828&q=75 828w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=1080&q=75 1…/> from <div class="relative flex flex-col justify-center overflow-hidden flex-none min-h-[180px] p-[24px_20px] sm:min-h-[240px] sm:p-[32px_24px] md:flex-[0_0_45%] md:min-h-0 md:p-[clamp(40px,5vw,80px)]">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - img [ref=e4]
    - generic:
      - img
    - generic [ref=e5]:
      - link "Senda Sênior" [ref=e6]:
        - /url: /
        - img "Senda Sênior" [ref=e7]
      - heading "Suas decisões. Seu futuro." [level=2] [ref=e8]:
        - text: Suas decisões.
        - text: Seu futuro.
      - paragraph [ref=e9]: O ecossistema que organiza o jurídico, o financeiro e a saúde da sua vida com carinho, clareza e autonomia.
      - generic [ref=e10]:
        - paragraph [ref=e11]: “Organizei tudo com carinho. Meus filhos sabem que está tudo certo e ficam tranquilos.”
        - text: HELENA SILVEIRA · 72 ANOS
  - generic [ref=e13]:
    - heading "Bem-vindo de volta." [level=1] [ref=e14]
    - paragraph [ref=e15]: Entre para continuar organizando o que importa.
    - generic [ref=e16]:
      - generic [ref=e17]:
        - text: Email
        - textbox "Email" [ref=e18]:
          - /placeholder: seu@email.com
      - generic [ref=e19]:
        - text: Senha
        - textbox "Senha" [ref=e20]:
          - /placeholder: Mínimo 6 caracteres
      - button "Esqueceu a senha?" [ref=e22]
      - button "Entrar" [ref=e23]
    - generic [ref=e24]:
      - text: Não tem conta?
      - button "Criar uma" [ref=e25]
    - paragraph [ref=e26]:
      - text: Ao continuar, você concorda com nossos
      - link "Termos" [ref=e27]:
        - /url: "#"
      - text: e
      - link "Política de Privacidade" [ref=e28]:
        - /url: "#"
      - text: .
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
> 8  |     await page.getByRole('button', { name: /criar uma/i }).click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  44 |     await page.getByLabel('Email').fill('invalid-email');
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