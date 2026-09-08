#Requires -Version 5.1
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

function Ok($msg) { Write-Host "[OK] $msg" -ForegroundColor Green }
function Fail($msg) { Write-Host "[FAIL] $msg" -ForegroundColor Red; exit 1 }

Write-Host "=== dashboard harness init ===" -ForegroundColor Cyan

# Toolchain
try {
  $node = (node -v)
  Ok "Node $node"
} catch { Fail "Node.js not found" }

try {
  $pnpm = (pnpm -v)
  Ok "pnpm $pnpm"
} catch { Fail "pnpm not found (enable via: corepack enable && corepack prepare pnpm@latest --activate)" }

if (-not (Test-Path "package.json")) { Fail "package.json missing" }
Ok "package.json"

# Layout
$dirs = @(
  "src/domain/entities",
  "src/domain/ports",
  "src/services",
  "src/adapters/repositories",
  "src/adapters/integrations",
  "src/controllers",
  "src/components/ui",
  "src/components/features",
  "src/lib",
  "app",
  "tests",
  "specs",
  "progress",
  "docs",
  ".cursor/rules"
)
foreach ($d in $dirs) {
  if (-not (Test-Path $d)) { Fail "Missing directory: $d" }
  Ok "dir $d"
}

$files = @(
  "AGENTS.md",
  "CHECKPOINTS.md",
  "feature_list.json",
  "progress/current.md",
  "progress/history.md",
  "docs/tdd.md",
  "docs/architecture.md",
  "docs/conventions.md",
  "docs/verification.md",
  ".cursor/rules/leader.mdc",
  ".cursor/rules/test-author.mdc",
  ".cursor/rules/implementer.mdc",
  ".cursor/rules/refactorer.mdc",
  ".cursor/rules/reviewer.mdc",
  "vitest.config.mts"
)
foreach ($f in $files) {
  if (-not (Test-Path $f)) { Fail "Missing file: $f" }
  Ok "file $f"
}

Write-Host "Running pnpm test..." -ForegroundColor Cyan
pnpm test
if ($LASTEXITCODE -ne 0) { Fail "pnpm test failed" }
Ok "pnpm test"

Write-Host "=== init passed ===" -ForegroundColor Green
exit 0
