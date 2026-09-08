# dashboard-boilerplate

Base white-label de un **dashboard/admin** reutilizable entre clientes (e-commerce, medios, telemedicina, etc.). No es un producto terminado: es la plantilla con arquitectura desacoplada y un arnés TDD multi-agente (Cursor, Claude Code u otro).

## Stack

- **Next.js** (App Router) + **TypeScript**
- **pnpm**
- **Vitest**

## Idea central

La lógica de negocio **nunca** conoce Prisma, Next.js ni un proveedor concreto (email, Mercado Libre, etc.). Solo conoce **interfaces (ports)**. Las implementaciones viven en **adapters** y se conectan en un único punto (`src/composition.ts`).

Así podés cambiar de cliente o de integración sin forkar los use cases.

```
app / components → controllers → services → domain (entities + ports)
                       ↓                         ↑
                  composition              adapters (repos / integrations)
```

## Estructura

```
app/                         # rutas — solo composición de UI
src/
  domain/
    entities/                # tipos y reglas puras
    ports/                   # contratos (Notifier, repositories, …)
  services/                  # casos de uso (inyectan ports; no importan adapters)
  adapters/
    repositories/            # DB concreta (ej. Prisma)
    integrations/<nombre>/   # APIs de terceros (client, auth, mapper, index)
  composition.ts             # cablea adapter concreto → port
  controllers/               # input → service → output (sin reglas de negocio)
  components/
    ui/                      # piezas tontas y genéricas (Button, Table, …)
    features/                # UI de una feature (compone ui/)
  lib/                       # utils sin negocio ni I/O
tests/<feature>/             # tests de esa feature (lógica + UI juntos)
```

**Reglas rápidas**

| Capa | Puede importar | No puede |
|------|----------------|----------|
| `domain/` | solo `domain/` | todo lo demás |
| `services/` | solo `domain/` | `adapters/`, `app/` |
| `adapters/` | `domain/ports` (+ su propia integración) | otras integraciones |
| `components/ui/` | nada de dominio/servicios | — (todo por props) |

Detalle completo: [`docs/architecture.md`](docs/architecture.md).

## Ejemplo incluido: notificar usuario

Caso de uso neutro para probar el desacople (sirve para stock, turnos, publicaciones, etc.):

1. Entity `Notification` + port `Notifier`
2. Use case `notifyUserUseCase(notification, notifier)` — el notifier se **inyecta**
3. Adapter `FakeNotifier` (consola / memoria; sin SendGrid/Twilio)
4. Controller que resuelve el port vía `composition`
5. Test con **mock** del port — el service se prueba sin integración real

## Arnés TDD (multi-agente)

El repo incluye gobernanza TDD (no es lógica de producto), usable con cualquier agente:

- `AGENTS.md` — roles y flujo (Leader, Test-Author, Implementer, Refactorer, Reviewer)
- `feature_list.json` — features (`pending → tests_ready → in_progress → refactor → done`)
- `CHECKPOINTS.md` — criterios Red / Green / Refactor / review
- Gate humano: `tests_ready` → `in_progress` solo con el mensaje **`aprobado`**
- Una sola feature `in_progress` a la vez

Las reglas locales de IDE (p. ej. Cursor) son opcionales y no se versionan en este repo.

Ver también `docs/tdd.md`.

## Cómo arrancar

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # Vitest
```

Verificación del harness + entorno:

```bash
# Windows
./init.ps1

# macOS / Linux
./init.sh
```

## Docs

| Doc | Contenido |
|-----|-----------|
| [`docs/architecture.md`](docs/architecture.md) | Capas, dependencias, Server vs Client |
| [`docs/tdd.md`](docs/tdd.md) | Red / Green / Refactor |
| [`docs/conventions.md`](docs/conventions.md) | Naming e imports |
| [`docs/verification.md`](docs/verification.md) | Cómo verificar trabajo |

## Qué sigue

Las features de producto white-label están en `feature_list.json` como `pending` (theme tokens, shell/nav, access levels). Se debaten y se implementan vía el arnés TDD, no ad hoc.
