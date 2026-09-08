# Verification

## Quick commands

| Check | Command |
|-------|---------|
| Unit tests | `pnpm test` |
| Watch tests | `pnpm test:watch` |
| Lint | `pnpm lint` |
| Dev server | `pnpm dev` |
| Full harness gate | `./init.ps1` (Windows) or `./init.sh` |

## Before claiming a phase done

1. **Red:** `pnpm test` shows failing `T<n>` for the feature (expected).
2. **Green / Refactor / done:** `pnpm test` all green.
3. Run `init.ps1` or `init.sh` after harness or scaffold changes.
4. Confirm `feature_list.json` status matches the phase.
5. Confirm progress files exist for the phase (`impl_`, `refactor_`, `review_`).

## Init script expectations

The init scripts verify:

- Node.js and pnpm available
- `package.json` present
- Folders: `src/domain`, `src/services`, `src/controllers`, `tests`, `specs`, `progress`
- Harness entrypoints: `AGENTS.md`, `CHECKPOINTS.md`, `feature_list.json`
- `pnpm test` exits 0 (after Green; during Red, Leader/Test-Author document intentional failure instead of claiming init green)

## Reviewer

Verification is incomplete without CHECKPOINTS review and `progress/review_<feature>.md` verdict.
