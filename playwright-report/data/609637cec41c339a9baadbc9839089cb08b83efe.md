# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: vault.spec.ts >> Vault Operations >> should navigate to vault section
- Location: tests\vault.spec.ts:7:7

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
    35 × waiting for element to be visible, enabled and stable
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
          - text: test@example.com
      - generic [ref=e19]:
        - text: Senha
        - textbox "Senha" [active] [ref=e20]:
          - /placeholder: Mínimo 6 caracteres
          - text: testpassword123
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
  3  | test.describe('Vault Operations', () => {
  4  |   // Note: These tests assume the user is already authenticated
  5  |   // In a real scenario, you'd want to add authentication setup in test.beforeEach using context.storageState
  6  |   
  7  |   test('should navigate to vault section', async ({ page }) => {
  8  |     // First, we need to login (using a test account or mock)
  9  |     await page.goto('/login');
  10 |     
  11 |     // Fill in test credentials
  12 |     await page.getByLabel('Email').fill('test@example.com');
  13 |     await page.getByLabel('Senha').fill('testpassword123');
  14 |     
  15 |     // Submit login form
> 16 |     await page.getByRole('button', { name: /entrar/i }).click();
     |                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  17 |     
  18 |     // Navigate to vault if not already there (this assumes successful login navigation)
  19 |     // Note: If authentication fails (e.g. no supabase connection), this will timeout.
  20 |     try {
  21 |       await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
  22 |       await page.goto('/vault');
  23 |     } catch {
  24 |       // If we couldn't login (Supabase not available in test env), just go directly to vault
  25 |       // (Supabase middleware will probably block us, but we test the interaction)
  26 |       await page.goto('/vault');
  27 |     }
  28 |     
  29 |     // Verify we're on the vault page (or login if redirected)
  30 |     if (page.url().includes('/vault')) {
  31 |       // Look for vault-specific elements using accessible locators
  32 |       const uploadButton = page.getByRole('button', { name: /upload|enviar/i });
  33 |       const fileList = page.getByRole('list');
  34 |       
  35 |       // These checks depend on your actual UI implementation
  36 |       await expect(uploadButton.or(fileList)).toBeVisible({ timeout: 5000 });
  37 |     }
  38 |   });
  39 | 
  40 |   test('should display file list or empty state', async ({ page }) => {
  41 |     await page.goto('/vault');
  42 |     
  43 |     // If not redirected to login...
  44 |     if (page.url().includes('/vault')) {
  45 |       const fileList = page.getByRole('list');
  46 |       const emptyState = page.getByText(/nenhum arquivo|empty/i);
  47 |       
  48 |       // One of these should be visible
  49 |       await expect(fileList.or(emptyState)).toBeVisible({ timeout: 5000 });
  50 |     }
  51 |   });
  52 | });
```