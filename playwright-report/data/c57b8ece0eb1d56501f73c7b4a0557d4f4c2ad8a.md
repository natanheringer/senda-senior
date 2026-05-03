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
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /entrar/i })
    - locator resolved to <button type="submit" id="login-submit" class="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 disabled:cursor-not-allowed bg-terracotta text-white shadow-[var(--shadow-terracotta-button)] hover:bg-terracotta-dark hover:-translate-y-0.5 focus-visible:ring-terracotta text-[15px] px-9 py-[17px]…>…</button>
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
    27 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <img alt="" sizes="45vw" decoding="async" data-nimg="fill" aria-hidden="true" src="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=3840&q=75" srcset="/_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=384&q=75 384w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=640&q=75 640w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=750&q=75 750w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=828&q=75 828w, /_next/image?url=%2Fbrand%2Fphotos%2Fprancheta-7.png&w=1080&q=75 1…/> from <div class="relative flex flex-col justify-center overflow-hidden flex-none min-h-[180px] p-[24px_20px] sm:min-h-[240px] sm:p-[32px_24px] md:flex-[0_0_45%] md:min-h-0 md:p-[clamp(40px,5vw,80px)]">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

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
          - text: invalid@test.com
      - generic [ref=e19]:
        - text: Senha
        - textbox "Senha" [active] [ref=e20]:
          - /placeholder: Mínimo 6 caracteres
          - text: wrongpassword
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
  33 |   await page.getByLabel('Email').fill('invalid@test.com');
  34 |   await page.getByLabel('Senha').fill('wrongpassword');
  35 |   
  36 |   // Attempt to submit
> 37 |   await page.getByRole('button', { name: /entrar/i }).click();
     |                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38 |   
  39 |   // Wait for the error message to appear
  40 |   const errorMessage = page.locator('.bg-\\[\\#FEF2F2\\]'); // Div de erro baseado nas suas classes do Tailwind
  41 |   await expect(errorMessage).toBeVisible({ timeout: 10000 });
  42 | });
```