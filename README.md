# senda-senior

plataforma de planejamento e assessoria sênior. next.js 16 + supabase.

## requisitos

- node 20+
- npm 10+
- projeto supabase com rls ativa

## setup

```
cp .env.example .env.local       # preencher NEXT_PUBLIC_SUPABASE_*
npm install
npm run dev                      # http://localhost:3000
```

aplicar migrations uma vez:

```
# via supabase cli
supabase db push

# ou cole supabase/migrations/*.sql no sql editor
```

## scripts

| comando              | ação                                   |
|----------------------|----------------------------------------|
| `npm run dev`        | servidor de desenvolvimento            |
| `npm run build`      | build de produção                      |
| `npm run start`      | serve build                            |
| `npm run lint`       | eslint                                 |
| `npm run typecheck`  | tsc --noEmit                           |

## estrutura

```
src/app/          rotas
src/proxy.ts      edge middleware (next 16)
src/config/       env validation (zod)
src/design/       primitivos de ui
src/features/     domínios: auth, dashboard, landing, manual
src/lib/          supabase clients, auth helpers, utils
supabase/migrations/  sql versionado
docs/             arquitetura, convenções, segurança
```

## documentação

- [architecture](docs/architecture.md) — camadas, fluxo de dados, contratos
- [schema](docs/schema.md) — tabelas, relações, storage, triggers (pós-0004)
- [conventions](docs/conventions.md) — nomeação, estilo, commits, proibições
- [security](docs/security.md) — controles, lgpd, pendências
- [env](docs/env.md) — variáveis de ambiente
- [vault/](docs/vault/readme.md) — cofre de documentos (requisitos, modelo, classificação)

## deploy

vercel, branch `main` = produção. env vars configuradas no dashboard.

## arquitetura

flowchart TB
    %% External Entities
    subgraph External[External Systems]
        User[User Browser]
        Supabase[(Supabase<br/>DB + Storage + Auth)]
        Upstash[(Upstash<br/>Redis)]
        Vercel[(Vercel<br/>Platform)]
        Email[Email Provider<br/>for Auth]
    end

    %% Edge Layer (Vercel Edge Network)
    subgraph Edge[Vercel Edge Network]
        Proxy[proxy.ts<br/>Edge Middleware]
        RateLimit[Rate Limiting<br/>(Upstash/Fallback)]
        CSP[Content Security Policy<br/>+ Security Headers]
        AuthResolve[Auth Resolution<br/>(NextAuth)]
        RedirectHandler[Redirect Logic<br/>(login ← protected routes)]
    end

    %% Application Layer (Next.js App)
    subgraph App[Next.js Application<br/>(src/app/)]
        AppRouter[App Router]
        
        %% Route Groups
        subgraph Routes[Route Groups]
            AuthRoutes[Auth Routes<br/>/login, /update-password, /auth/callback]
            DashboardRoutes[Dashboard Routes<br/>/dashboard, /vault]
            ManualRoutes[Manual Routes<br/>/manual, /manual/[slug]]
            LandingRoutes[Landing Routes<br/>/(landing)/*]
            APIRoutes[API Routes<br/>src/app/api/*]
        end
        
        %% Layouts
        subgraph Layouts[Layouts]
            RootLayout[Root Layout<br/>src/app/layout.tsx]
            AuthLayout[Auth Layout<br/>src/app/(auth)/layout.tsx]
            DashboardLayout[Dashboard Layout<br/>src/app/(dashboard)/layout.tsx]
            ManualLayout[Manual Layout<br/>src/app/(manual)/layout.tsx]
        end
        
        %% Connect App Router to children
        AppRouter --> Routes
        AppRouter --> Layouts
    end

    %% Feature Modules
    subgraph Features[Feature Modules<br/>(src/features/)]
        Auth[Auth<br/>src/features/auth/]
        Dashboard[Dashboard<br/>src/features/dashboard/]
        Landing[Landing<br/>src/features/landing/]
        Manual[Manual<br/>src/features/manual/]
        Vault[Vault<br/>src/features/vault/]
    end

    %% Vault Subsystem Detail
    subgraph VaultSys[Vault Subsystem<br/>(src/features/vault/)]
        VaultUI[UI Components<br/>components/*]
        VaultActions[Server Actions<br/>actions.ts]
        VaultClassifier[Classifier<br/>classifier.ts]
        VaultStorage[Storage<br/>storage.ts]
        VaultValidation[Validation<br/>validation.ts]
        VaultMappers[Mappers<br/>mappers.ts]
        VaultTypes[Types<br/>types.ts]
        VaultErrors[Errors<br/>errors.ts]
        VaultData[Data Queries<br/>data.ts]
        VaultClient[Client Utils<br/>client/*]
        
        %% Connections within Vault
        VaultActions -->|use| VaultClassifier
        VaultActions -->|use| VaultStorage
        VaultActions -->|use| VaultValidation
        VaultActions -->|use| VaultMappers
        VaultActions -->|use| VaultTypes
        VaultActions -->|use| VaultErrors
        VaultActions -->|use| VaultData
        VaultUI -->|call| VaultActions
        VaultClient -->|used by| VaultUI
    end

    %% Shared Libraries
    subgraph Lib[Shared Libraries<br/>(src/lib/)]
        SupabaseLib[Supabase Client<br/>src/lib/supabase/]
        ServerLib[Server Utils<br/>src/lib/server/]
        UtilsLib[Client Utils<br/>src/lib/utils/]
        ConfigLib[Config Validation<br/>src/config/]
    end

    %% Database Schema
    subgraph DB[Supabase Schema<br/>(PostgreSQL)]
        Tables[Tables<br/>vault_files<br/>vault_file_blobs<br/>vault_categories<br/>vault_tags<br/>vault_classifier_overrides<br/>vault_quotas<br/>auth.users<br/>etc.]
        RLS[Row Level Security<br/>Policies on all user_* tables<br/>auth.uid() = user_id]
        Functions[SQL Functions/Triggers]
        Indexes[Database Indexes]
    end

    %% Data Flow Connections
    %% Main Request Flow
    User -->|HTTPS Requests| Proxy
    Proxy -->|Processed Request| AppRouter
    AppRouter -->|Route to Feature| Routes
    Routes -->|Render Layout| Layouts
    Layouts -->|Render Components| Features
    Features -->|Use Shared Lib| Lib
    Features -->|Vault Specific| VaultSys
    
    %% Vault Specific Flows
    VaultSys -->|Database Operations| DB
    VaultSys -->|Supabase Client Calls| SupabaseLib
    ServerLib -->|Used by Proxy & Actions| Proxy
    ServerLib -->|Used by Actions| VaultActions
    ConfigLib -->|Env Validation| Proxy
    ConfigLib -->|Env Validation| VaultActions
    ConfigLib -->|Env Validation| Features
    
    %% External Service Connections
    Upstash -->|Rate Limiting Storage| RateLimit
    Supabase -->|DB Queries & Storage| DB
    Supabase -->|File Storage| VaultStorage
    Supabase -->|Auth Sessions| AuthResolve
    Supabase -->|Realtime Subscriptions| Features
    Email -->|Send Auth Emails| Auth
    
    %% Internal Vault Flows
    VaultClassifier -->|Classification Logic| VaultActions
    VaultActions -->|Persist to DB| DB
    VaultActions -->|Read/Write Overrides| VaultActions
    VaultStorage -->|Generate Signed URLs| Supabase
    VaultStorage -->|Get File Metadata| Supabase
    VaultData -->|Query DB| DB
    VaultMappers -->|Transform DB Records| VaultActions
    VaultValidation -->|Validate Input| VaultActions
    
    %% Styling
    classDef external fill:#f96,stroke:#333,stroke-width:2px;
    classDef edge fill:#9cf,stroke:#333,stroke-width:2px;
    classDef app fill:#9f9,stroke:#333,stroke-width:2px;
    classDef features fill:#ff9,stroke:#333,stroke-width:2px;
    classDef vault fill:#f99,stroke:#333,stroke-width:2px;
    classDef lib fill:#cf9,stroke:#333,stroke-width:2px;
    classDef db fill:#9fc,stroke:#333,stroke-width:2px;
    
    class User,Supabase,Upstash,Vercel,Email external;
    class Proxy,RateLimit,CSP,AuthResolve,RedirectHandler edge;
    class AppRouter,Routes,RootLayout,AuthLayout,DashboardLayout,ManualLayout app;
    class Auth,Dashboard,Landing,Manual,Vault features;
    class VaultUI,VaultActions,VaultClassifier,VaultStorage,VaultValidation,VaultMappers,VaultTypes,VaultErrors,VaultData,VaultClient vault;
    class SupabaseLib,ServerLib,UtilsLib,ConfigLib lib;
    class Tables,RLS,Functions,Indexes db;
    
    %% Line styling for cleaner look
    linkStyle default stroke:#666,stroke-width:1.5px
    
    %% Title
    title Senda Sênior Web Application Architecture
