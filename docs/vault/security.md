# vault/security

controles específicos do vault.

## modelo de ameaça

| ameaça                                  | mitigação                                      |
|-----------------------------------------|------------------------------------------------|
| usuário a acessa arquivo do usuário b   | rls em `vault_files` + storage policy por path |
| upload de arquivo malicioso             | allowlist de extensões + validação mime server |
| quota esgotada → dos                    | `vault_quotas.limit_bytes` enforced pré-upload |
| bucket público exposto                  | bucket `vault` privado; sempre signed url      |
| signed url vazado                       | ttl 5 min                                      |
| path traversal (`../`)                  | path é sempre `{user_id}/{uuid}.{ext}`, sem user input |
| rename para extensão perigosa           | extensão deriva de magic bytes, não do nome    |
| stuffing de metadados (xss no nome)     | escape em render; limite 255 chars             |
| replay de upload                        | sha256 único por user_id                       |

## criptografia

### em trânsito

- tls 1.2+ obrigatório (vercel + supabase).
- signed urls https-only.

### em repouso

- **padrão** (mvp): aes-256 nativo do supabase storage (sem chave de usuário).
- **opcional** (pós-mvp, fr-18): pastas privadas com client-side encryption.
  - chave derivada da senha via pbkdf2 (sha256, 600000 iter).
  - aes-gcm 256 no browser antes do upload.
  - servidor vê apenas blob opaco; não pode classificar conteúdo.
  - reset de senha = perda dos arquivos privados (documentado).

### chaves

- `SUPABASE_SERVICE_ROLE_KEY`: usada exclusivamente em `lib/supabase/admin.ts`, para operações de cron (hard-delete, purge). nunca em request-response de usuário.

## validação do upload

server action `prepareUpload` rejeita antes de gerar signed url se:

1. extensão em `BLOCKED_EXTENSIONS`
2. mime em `BLOCKED_MIMES`
3. `size > MAX_FILE_SIZE` (50 mb mvp)
4. `used_bytes + size > limit_bytes` (quota)
5. `sha256` já existe em `vault_files where user_id = ? and sha256 = ? and deleted_at is null`

após upload, `confirmUpload` valida:

1. objeto existe no storage (head request)
2. tamanho reportado bate com storage
3. magic bytes bate com mime declarado (via biblioteca `file-type`)

se algo falhar, marca `status = 'failed'` e remove o objeto.

## lista de extensões

```ts
export const BLOCKED_EXTENSIONS = [
  'exe','bat','cmd','sh','ps1','scr','msi','dll','com','vbs','vbe',
  'wsf','wsh','hta','jar','app','dmg','iso','reg','inf','lnk','so',
]

export const BLOCKED_MIMES = [
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-sh',
  'application/x-bsh',
]

export const ALLOWED_EXTENSIONS_HINT = [
  // documentos
  'pdf','doc','docx','odt','rtf','txt','md',
  // planilhas
  'xls','xlsx','ods','csv',
  // apresentações
  'ppt','pptx','odp',
  // imagens
  'jpg','jpeg','png','gif','webp','heic','tiff','bmp',
  // dados
  'json','xml','yaml','yml',
  // arquivos
  'zip','rar','7z',
  // saúde
  'dcm','dicom',
  // email
  'eml','msg',
]
```

lista "hint" não é enforcement — só serve para ui sugerir. enforcement é por blocklist.

## auditoria

tabela de access log não existe na migration vigente: foi removida do modelo mínimo até o fluxo de produto definir o que entra em trilha (e retenção). para v1, ações sensíveis dependem de rls + logs de aplicação (vercel) se necessário. futuro: tabela `audit` ou `vault_access_log` com particionamento.

## signed urls

- **download**: `supabase.storage.from('vault').createSignedUrl(path, 300)` (5 min).
- **upload**: `createSignedUploadUrl(path)` com ttl padrão (30 min).
- nunca retornar signed url sem verificar que `auth.uid() = file.user_id` antes.

## lgpd

| direito           | endpoint                                         |
|-------------------|--------------------------------------------------|
| acesso            | listagem + download (api normal)                 |
| correção          | `updateMetadata`                                 |
| exclusão          | `hardDeleteAll` — server action que remove tudo. |
| portabilidade     | `exportVaultZip` — pós-mvp.                      |
| oposição          | desativar classificação automática (toggle user) |

hard delete é assíncrono: marca `deleted_at` e dispara job. resposta imediata é 202 com job id.

## cron

job diário (`purge_vault`), roda via supabase cron (pg_cron):

```sql
delete from vault_files
  where deleted_at < now() - interval '30 days';
-- trigger on delete → storage cleanup via edge function
```

storage cleanup precisa de service role — fica em edge function separada.
