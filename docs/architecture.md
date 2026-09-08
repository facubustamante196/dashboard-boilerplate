# Architecture

White-label **dashboard** base with **hexagonal / ports & adapters** decoupling. Domain and services never know concrete providers (Prisma, email APIs, Next.js).

## Stack

- **Next.js** (App Router) + **TypeScript**
- **pnpm** package manager
- **Vitest** for domain/services/UI unit tests

## Layout

```
app/                              # rutas — composición de páginas
src/
  domain/
    entities/                     # tipos y reglas puras
    ports/                        # interfaces (Notifier, repositories, …)
  services/                       # use cases — solo importan domain/
  adapters/
    repositories/                 # Prisma / DB concretas
    integrations/<name>/          # APIs de terceros
      client.ts
      auth.ts
      mapper.ts
      index.ts                    # implementa el/los port(s)
  composition.ts                  # composition root (inyecta adapters → ports)
  controllers/                    # input → service(+port) → output
  components/
    ui/                           # presentación pura (props)
    features/                     # UI de feature (compone ui/)
  lib/                            # utils sin negocio ni I/O
```

## Dependency rules

1. `domain/` imports **nothing** outside `domain/`.
2. `services/` import **only** `domain/`. Never `adapters/`.
3. `adapters/*` implement `domain/ports/*`. Integrations do not import each other.
4. Wire concrete adapters only in `composition.ts` or controllers (inject into use cases).
5. `controllers/` orchestrate; no domain business rules beyond input shape.
6. `components/ui/` — no domain/services/adapters (props only).
7. `components/features/` may type with `domain/entities`; call services only via controller/action/hook.
8. Never instantiate an adapter inside a service.

```
app → components → controllers → services → domain
                      ↓              ↑
                 composition    ports ← adapters
```

## Example: notify user

- Entity: `domain/entities/notification.ts`
- Port: `domain/ports/notifier.ts`
- Use case: `services/notifyUser.ts` (Notifier injected)
- Adapter: `adapters/integrations/fake-notifier/`
- Wire: `composition.ts` → `getNotifier()`
- Controller: `controllers/notifications/notifyUserController.ts`
- Test: `tests/notifications/notifyUser.test.ts` with a **mock** Notifier

## Next.js Server vs Client

- Default Server Component; `"use client"` only on interactive leaves.
- `components/ui/` pure → Server by default.

## Tests

`tests/<feature>/` holds logic + feature UI tests together. Mock ports at the service boundary.

## White-label

Swap adapters/theme per client; keep domain/services shared.
