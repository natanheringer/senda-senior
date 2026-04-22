# env

variáveis de ambiente. validadas por zod no boot — build falha se faltar obrigatória.

## client (`NEXT_PUBLIC_*`)

validado em `src/config/env.ts`. disponível em client e server.

| chave                        | obrigatória | descrição                                            |
|------------------------------|-------------|------------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`   | sim         | url do projeto supabase                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sim      | anon/public key, rls aplica sempre                   |
| `NEXT_PUBLIC_SITE_URL`       | não         | url canônica (ex: `https://senda-senior.vercel.app`) |

## server (`server-only`)

validado em `src/config/env.server.ts`. bundle quebra se importado pelo cliente.

| chave                           | obrigatória | descrição                              |
|---------------------------------|-------------|----------------------------------------|
| `SUPABASE_SERVICE_ROLE_KEY`     | não         | ignora rls; operações administrativas  |
| `UPSTASH_REDIS_REST_URL`        | não         | rate-limit distribuído (recomendado em prod) |
| `UPSTASH_REDIS_REST_TOKEN`      | não         | token rest da mesma instância upstash  |

## setup local

```
cp .env.example .env.local
# preencher
npm install
npm run dev
```

## setup vercel

configurar as mesmas chaves em `Settings → Environment Variables`, escopo `Production` + `Preview` + `Development`.

## rotação

1. gerar nova chave no dashboard supabase
2. atualizar em vercel e `.env.local`
3. redeploy
4. revogar chave antiga

nenhuma chave é hardcoded no código; rotação não altera nenhum arquivo.
