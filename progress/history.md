# Progress history

Append-only log. Newest entries at the bottom.

## 2026-09-08 — harness bootstrap

- Installed TDD multi-agent harness + Next.js MVC skeleton
- Features `wl-theme-tokens`, `wl-shell-nav`, `wl-access-levels` seeded as `pending` (debate before Red)
- Smoke test `tests/harness/health.test.ts` green

## 2026-09-08 — architecture refinement

- Split `adapters/` (Prisma, notifiers, integrations) from `lib/` (generic helpers)
- Added `components/ui` + `components/features`; documented Server/Client leaf rule
- Feature-mirrored tests: logic + UI under `tests/<feature>/`

## 2026-09-08 — ports & adapters example (notify user)

- `domain/entities` + `domain/ports`; `adapters/repositories` + `integrations/<name>/`
- Neutral use case `notifyUser` + `FakeNotifier` + `composition.ts` + controller
- Test mocks `Notifier` with no real provider
