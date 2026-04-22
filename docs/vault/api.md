# vault/api

superfície de api do vault. server actions + edge functions.

## princípios

1. mutações = server actions (`'use server'`).
2. leituras pesadas = rsc chamando módulos de `features/vault/data.ts`.
3. streaming binário = route handlers (`/api/vault/*`) apenas quando necessário.
4. tudo retorna discriminated union `{ ok: true, data } | { ok: false, error }`.

## server actions (`features/vault/actions.ts`)

### `prepareUpload`

```ts
prepareUpload(input: {
  name: string        // nome original, max 255
  size: number        // bytes
  mime: string
  sha256: string      // calculado no cliente
}): Promise<
  | { ok: true; data: { fileId: string; uploadUrl: string; path: string; expiresAt: string } }
  | { ok: false; error: 'quota' | 'duplicate' | 'blocked_ext' | 'too_large' | 'invalid' }
>
```

side effects:
- insere `vault_files` com `status='pending'`
- gera signed upload url do storage (ttl 30 min)

### `confirmUpload`

```ts
confirmUpload(fileId: string): Promise<
  | { ok: true; data: { file: VaultFile; classification: { categorySlug: string; confidence: number } } }
  | { ok: false; error: 'not_found' | 'not_uploaded' | 'mime_mismatch' | 'size_mismatch' }
>
```

side effects:
- valida objeto no storage
- verifica magic bytes
- classifica
- atualiza `status='ready'`, `category_id`, `confidence`
- insere `vault_classification_results`
- atualiza `vault_quotas`
- log `upload`

### `listFiles`

```ts
listFiles(input: {
  page?: number
  pageSize?: number      // default 50, max 200
  categorySlug?: string
  tagIds?: string[]
  query?: string         // busca em display_name
  favorite?: boolean
  trashed?: boolean      // default false; true = lista deletados
  sort?: 'created_at' | 'updated_at' | 'name' | 'size'
  order?: 'asc' | 'desc'
}): Promise<{ ok: true; data: { items: VaultFile[]; total: number } } | { ok: false; error: string }>
```

### `getDownloadUrl`

```ts
getDownloadUrl(fileId: string): Promise<
  | { ok: true; data: { url: string; expiresAt: string } }
  | { ok: false; error: 'not_found' | 'forbidden' }
>
```

side effect: log `download`.

### `updateMetadata`

```ts
updateMetadata(fileId: string, patch: {
  displayName?: string
  description?: string
  categorySlug?: string
  tagSlugs?: string[]
  favorite?: boolean
}): Promise<{ ok: true } | { ok: false; error: string }>
```

se `categorySlug` muda → seta `manual_override = true`.

### `softDelete` / `restore`

```ts
softDelete(fileId: string): Promise<{ ok: true } | { ok: false; error: string }>
restore(fileId: string):    Promise<{ ok: true } | { ok: false; error: string }>
```

### `hardDeleteAll` (lgpd)

```ts
hardDeleteAll(): Promise<{ ok: true; data: { jobId: string } } | { ok: false; error: string }>
```

enfileira job. remoção real acontece em background.

## route handlers (`app/api/vault/*`)

idealmente tudo server action. usar route handler só quando:

- `GET /api/vault/stream/[fileId]` — streaming de arquivo grande sem signed url (futuro).
- `POST /api/vault/webhook/storage` — webhook do supabase storage (pós-upload).

## rsc helpers (`features/vault/data.ts`)

`server-only`. usados em server components:

```ts
getFile(userId: string, fileId: string): Promise<VaultFile | null>
getQuota(userId: string): Promise<VaultQuota>
getCategories(userId: string): Promise<VaultCategory[]>
getTags(userId: string): Promise<VaultTag[]>
```

## types públicos (`features/vault/types.ts`)

```ts
export interface VaultFile {
  id: string
  displayName: string
  extension: string
  mimeType: string
  sizeBytes: number
  category: { slug: string; label: string; icon: string; color: string } | null
  tags: Array<{ slug: string; label: string }>
  confidence: number | null
  manualOverride: boolean
  favorite: boolean
  description: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface VaultQuota {
  limitBytes: number
  usedBytes: number
  fileCount: number
  usedPercentage: number
}

export interface VaultCategory {
  slug: string
  label: string
  icon: string
  color: string
  type: 'system' | 'user'
}
```

## erros padronizados

strings de erro retornadas em `{ ok: false, error }` são machine-readable (enum) + mensagens amigáveis ficam na ui. mapeamento em `features/vault/errors.ts`:

```ts
export const VAULT_ERROR_MESSAGES: Record<string, string> = {
  quota:         'Você atingiu o limite de armazenamento.',
  duplicate:     'Este arquivo já existe no seu cofre.',
  blocked_ext:   'Este tipo de arquivo não é permitido.',
  too_large:     'Arquivo maior que o limite de 50 MB.',
  mime_mismatch: 'Conteúdo não corresponde ao tipo de arquivo.',
  not_found:     'Arquivo não encontrado.',
  forbidden:     'Sem permissão para acessar este arquivo.',
  invalid:       'Dados inválidos.',
}
```
