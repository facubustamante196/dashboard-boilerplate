# Conventions

## Package manager

Use **pnpm** only (`pnpm install`, `pnpm test`, `pnpm lint`, `pnpm dev`).

## Paths and imports

- Alias `@/*` → `src/*` (see `tsconfig.json` and `vitest.config.mts`).
- Prefer `@/domain/...`, `@/services/...`, `@/adapters/...`, `@/controllers/...`, `@/components/...`, `@/lib/...`, `@/composition`.
- Do not import from `app/` into `src/`.
- `services/` and `domain/` must never import `@/adapters/...`.
- Ports live in `@/domain/ports/*`; entities in `@/domain/entities/*`.
## Naming

- Features: kebab-case ids matching `feature_list.json` (`wl-theme-tokens`).
- Files: kebab-case or descriptive camelCase for TS modules; React components PascalCase.
- Ports in domain: `SomethingRepository`, `Notifier` (interfaces).
- Adapters: `PrismaSomethingRepository`, `EmailNotifier`, `MeliClient`.
- Tests: under `tests/<feature>/` (logic + feature UI together).
- Progress artifacts: `progress/impl_<feature>.md`, `refactor_<feature>.md`, `review_<feature>.md`.

## Components

- `components/ui/*` — generic, dumb, no feature imports.
- `components/features/*` — feature-specific UI; keep `"use client"` at interactive leaves.

## TypeScript

- `strict` enabled.
- Domain modules stay free of React and Prisma types.
- Export explicit types for service public APIs and ports.

## Git / secrets

- Do not commit `.env*` with secrets.
- Do not commit product credentials or client-specific keys in the shared base.

## Agent discipline

- One feature `in_progress` at a time (`max_in_progress: 1`).
- Role boundaries in `AGENTS.md` are mandatory (any agent tool).
- Leader never edits `src/` or `tests/`.
