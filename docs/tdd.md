# TDD protocol

Stack: **Vitest** (`pnpm test` / `pnpm test:watch`). Tests live under `tests/<feature>/`.

## Cycle

1. **Red** — write failing tests only. Prove failure with `pnpm test`.
2. **Green** — minimal production code in `src/` / `app/` until tests pass. Do not edit tests.
3. **Refactor** — clean structure; keep the suite green.

Human gate between Red and Green: status `tests_ready` → `in_progress` only after the human says `aprobado`.

## Test layout

```
tests/<feature-id>/
  *.test.ts                 # domain / services / controllers
  components/*.test.tsx     # feature UI (optional)
specs/<feature-id>/tests_rationale.md
```

- One feature folder holds **all** tests for that feature (logic + UI), not separate top-level “unit vs UI” trees.
- Import production modules via `@/` (maps to `src/`).
- Prefer domain/services first; controllers next; feature UI last.
- Mock **ports** at the service boundary; do not hit real Prisma/notifiers in unit tests.
- Harness smoke lives in `tests/harness/` (not a product feature).
## `// T<n>:` tags

Every behavioral assertion group must carry a stable tag above the `it(...)`:

```ts
// T1: theme config exposes required CSS variable keys
it("exposes token keys", () => { ... });
```

- Number from `T1` upward without gaps for that feature.
- `specs/<feature>/tests_rationale.md` explains why each `T<n>` exists.
- Implementer maps `T<n>` → code in `progress/impl_<feature>.md`.

## Red exit criteria

- New tests fail for the right reason (missing behavior), not broken imports from edited production code.
- No production edits in Red.
- Feature status → `tests_ready`; stop for human review.

## Green / Refactor exit criteria

See [CHECKPOINTS.md](../CHECKPOINTS.md).
