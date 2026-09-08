<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS — Dashboard TDD harness

White-label dashboard base. Agents follow this file + `.cursor/rules/*.mdc`. Product work is TDD-only via `feature_list.json`.

## Roles

| Role | Rule | Touches | Does not touch |
|------|------|---------|----------------|
| **Leader** | `leader.mdc` | `feature_list.json`, `progress/` | `src/`, `tests/`, `app/` product logic |
| **Test-Author** | `test-author.mdc` | `tests/<feature>/`, `specs/<feature>/` | Production code (`src/`, `app/`) |
| **Implementer** | `implementer.mdc` | `src/`, `app/` (Green only) | Tests |
| **Refactorer** | `refactorer.mdc` | Production cleanup | Changing test intent |
| **Reviewer** | `reviewer.mdc` | `progress/review_*.md` only | Code / tests edits |

## Flow

```
pending → tests_ready → in_progress → refactor → done
```

1. **Red** (Test-Author): failing tests + `specs/<feature>/tests_rationale.md` → status `tests_ready`
2. **Human gate**: Leader stops. Status becomes `in_progress` **only** if the human says exactly: `aprobado`
3. **Green** (Implementer): minimal production code → `progress/impl_<feature>.md`
4. **Refactor** (Refactorer): cleanup with green suite → `progress/refactor_<feature>.md`
5. **Review** (Reviewer): CHECKPOINTS + traceability → `progress/review_<feature>.md` (`APROBADO` / `RECHAZADO`)

Constraints: `max_in_progress: 1`. One feature at a time. `tdd: true` features never skip Red.

## File map

```
AGENTS.md, CHECKPOINTS.md, feature_list.json
init.ps1 / init.sh
app/                              → routes / page composition
src/domain/entities/              → pure business types
src/domain/ports/                 → interfaces only
src/services/                     → use cases (ports injected)
src/adapters/repositories/        → DB (e.g. Prisma)
src/adapters/integrations/<x>/    → third-party (client/auth/mapper/index)
src/composition.ts                → wire adapters → ports
src/controllers/                  → thin orchestration
src/components/ui/                → generic dumb UI
src/components/features/          → feature UI
src/lib/                          → generic helpers (no I/O)
tests/<feature>/                  → all tests for that feature (`// T<n>:`)
specs/<feature>/                  → tests_rationale.md
progress/                         → current.md, history.md, impl_*, refactor_*, review_*
docs/                             → tdd, architecture, conventions, verification
.cursor/rules/                    → role rules
```
## Session start

1. Read `feature_list.json` and `progress/current.md`
2. Read `docs/tdd.md` and `docs/architecture.md` if implementing
3. Run `pnpm test` or `./init.ps1` before claiming done
4. Leader: update `progress/current.md` and append `progress/history.md` at phase boundaries
5. Never move `tests_ready` → `in_progress` without human `aprobado`
