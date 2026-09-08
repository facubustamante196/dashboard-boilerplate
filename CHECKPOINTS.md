# CHECKPOINTS — Red / Green / Refactor / Review

Objective gates. Reviewer signs each feature against these criteria.

## Red (Test-Author)

- [ ] Feature id matches `feature_list.json` and folder names (`tests/<id>/`, `specs/<id>/`)
- [ ] Every test case is tagged `// T<n>:` (stable ids, contiguous from 1)
- [ ] `specs/<feature>/tests_rationale.md` exists and maps each `T<n>` to intent
- [ ] `pnpm test` fails for the new/changed tests (failure is expected; not compile/syntax noise)
- [ ] No edits under `src/` or `app/` production code
- [ ] Status set to `tests_ready`; Leader stopped for human review

## Green (Implementer)

- [ ] Human said `aprobado`; status is `in_progress`
- [ ] Only production code changed (`src/`, `app/` as needed); tests untouched
- [ ] Dependency rules respected: `app` → controllers/services → domain (see `docs/architecture.md`)
- [ ] All `T<n>` for the feature pass under `pnpm test`
- [ ] `progress/impl_<feature>.md` maps each `T<n>` → files/symbols that satisfy it
- [ ] No drive-by refactors beyond what Green requires

## Refactor (Refactorer)

- [ ] Suite stays green (`pnpm test`) after every meaningful change
- [ ] Behavior and test intent unchanged (no rewriting assertions to “make green”)
- [ ] Coupling reduced or clarity improved within MVC layers
- [ ] `progress/refactor_<feature>.md` lists what changed and why
- [ ] Status moved to `refactor` then ready for review

## Reviewer signature

Reviewer is **read-only** on product code and tests. Writes only `progress/review_<feature>.md`.

### Verdict

- **APROBADO** — all Red/Green/Refactor checkboxes satisfied; `T<n>` traceability complete; architecture rules held; status may become `done`
- **RECHAZADO** — list failing checkpoints and required fixes; feature does **not** become `done`

```
Feature: <id>
Verdict: APROBADO | RECHAZADO
Reviewer notes:
- ...
Signed: reviewer / <date>
```
