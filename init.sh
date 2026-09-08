#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

ok() { printf '[OK] %s\n' "$1"; }
fail() { printf '[FAIL] %s\n' "$1" >&2; exit 1; }

echo "=== dashboard harness init ==="

command -v node >/dev/null 2>&1 || fail "Node.js not found"
ok "Node $(node -v)"

command -v pnpm >/dev/null 2>&1 || fail "pnpm not found (corepack enable && corepack prepare pnpm@latest --activate)"
ok "pnpm $(pnpm -v)"

[[ -f package.json ]] || fail "package.json missing"
ok "package.json"

dirs=(
  src/domain/entities
  src/domain/ports
  src/services
  src/adapters/repositories
  src/adapters/integrations
  src/controllers
  src/components/ui
  src/components/features
  src/lib
  app
  tests
  specs
  progress
  docs
  .cursor/rules
)
for d in "${dirs[@]}"; do
  [[ -d "$d" ]] || fail "Missing directory: $d"
  ok "dir $d"
done

files=(
  AGENTS.md
  CHECKPOINTS.md
  feature_list.json
  progress/current.md
  progress/history.md
  docs/tdd.md
  docs/architecture.md
  docs/conventions.md
  docs/verification.md
  .cursor/rules/leader.mdc
  .cursor/rules/test-author.mdc
  .cursor/rules/implementer.mdc
  .cursor/rules/refactorer.mdc
  .cursor/rules/reviewer.mdc
  vitest.config.mts
)
for f in "${files[@]}"; do
  [[ -f "$f" ]] || fail "Missing file: $f"
  ok "file $f"
done

echo "Running pnpm test..."
pnpm test
ok "pnpm test"

echo "=== init passed ==="
