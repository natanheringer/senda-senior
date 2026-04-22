# vault/model

modelo lógico após [0004_remodel_context_vault.sql](../../supabase/migrations/0004_remodel_context_vault.sql). supabase postgres, tabelas com rls, exceto leitura global controlada.

## princípios

- **um documento** (`vault_files`) e **N blobs** (`vault_file_blobs`); a versão ativa é `vault_files.current_blob_id`.
- **categorias** em duas tabelas: `vault_system_categories` (seed, pk = `slug`) e `vault_categories` (só do usuário, `user_id` obrigatório).
- **escopo categoria** no ficheiro: xor entre `system_category_slug` e `user_category_id` quando `status` é `ready`. em `pending` / `failed` os dois podem ser null.
- `profiles` 1:1 com `auth.users`; cota `vault_quotas` 1:1; checklist em `care_checklist_items` (domínio de prevenção, não o cofre).
- tabelas removidas neste desenho: `vault_classification_results`, `vault_access_log`, `vault_shares` (reintroduzir com produto/fluxo).

## er (texto)

```
auth.users ─┬─1:1─► profiles
            ├─1:1─► vault_quotas
            ├─1:n─► care_checklist_items   (ex-user_checklist; domínio care)
            ├─1:n─► vault_categories       (só custom do utilizador)
            ├─1:n─► vault_tags
            └─1:n─► vault_files
                      ├─n:1─► current_blob  ─► vault_file_blobs
                      ├─n:1─► vault_system_categories  (por slug, opcional)
                      ├─n:1─► vault_categories (opcional, pasta do user)
                      └─n:m─► vault_tags (vault_file_tags)

vault_system_categories   (leitura global, sem per-user; seed fixo)
```

## tabelas centrais

### `vault_files`

metadado lógico. não armazena `storage_path` nem `size_bytes` (isso fica no blob ativo).

| coluna                 | notas |
|------------------------|-------|
| `current_blob_id`      | fk `vault_file_blobs.id`; nulo em estados excecionais; ativo = blob corrente |
| `system_category_slug` / `user_category_id` | xor quando `ready` (check `vault_files_category_scope`) |
| `version_count`        | denormalizado; trigger a partir de contagens em `vault_file_blobs` |
| `search_vector`        | trigger em `display_name`, `description`, `text_content` |

### `vault_file_blobs`

ficheiro físico (storage). `version` 1, 2, … por `file_id`. `storage_path` único global.

### `vault_system_categories`

| coluna    | notas        |
|----------|-------------|
| `slug`   | pk (`juridico`, `outros`, …) |
| `label` / `icon` / `color` / `sort_order` | apresentação |

### `vault_categories`

apenas `user_id` not null. `unique (user_id, slug)`.

### `vault_quotas`

`used_bytes` / `file_count` somam só ficheiros `ready`, `deleted_at` null, via blob atual

(`join vault_file_blobs` on `current_blob_id`).

### `care_checklist_items`

pk composta `(user_id, item_key)`; mesmo contrato de chaves de item que o catálogo em código.

## storage

bucket `vault` (privado). objectos: `{user_id}/{file_id}.{ext}` (ver `buildStoragePath`).

política: primeiro segmento do path = `auth.uid()::text`.

## rls (resumo)

- `vault_files`, `vault_file_blobs`, `vault_tags`, `vault_file_tags`, `vault_categories`: dono = `user_id` / ficheiro dono.
- `vault_system_categories`: `select` para `authenticated` (dados de referência partilháveis).
- `vault_quotas`, `care_checklist_items`, `profiles`: apenas a própria linha do utilizador.

## trigers relevantes

- `vault_file_blobs_sync_version_count`: mantém `vault_files.version_count`.
- `vault_quotas_recalc` + gatilhos em `vault_files` e `vault_file_blobs`: cota.
- `handle_new_user` após `insert` em `auth.users`: cria `profiles` + `vault_quotas` se ainda não existir.

## estados

```
 pending ─(confirmUpload)──► ready ─(soft delete)──► com deleted_at
                                 └─(restore)──► ready, deleted_at null
 pending ─(falha de upload)──► failed
```

## histórico de migrations

- `0001` / `0002` / `0003`: evolução anterior; aplica-se em repositórios legados.
- `0004`: reset controlado; estado canónico de greenfield alinha-se ao `0004` após aplicação.
