#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

COMPOSE_FILE="compose.prod.yml"
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Missing $COMPOSE_FILE"
  exit 1
fi

echo "[1/4] Validate compose syntax with current .env"
docker compose -f "$COMPOSE_FILE" --env-file .env config >/dev/null

echo "[2/4] Validate TABLEAU_URL-empty scenario (services should still be configurable)"
tmp_no_tableau="$(mktemp)"
grep -v '^TABLEAU_URL=' .env > "$tmp_no_tableau"
docker compose -f "$COMPOSE_FILE" --env-file "$tmp_no_tableau" config >/dev/null
rm -f "$tmp_no_tableau"

echo "[3/4] Validate DB_PASSWORD-required scenario (must fail)"
tmp_no_dbpass="$(mktemp)"
grep -v '^DB_PASSWORD=' .env > "$tmp_no_dbpass"
if docker compose -f "$COMPOSE_FILE" --env-file "$tmp_no_dbpass" config >/dev/null 2>&1; then
  echo "ERROR: compose should fail when DB_PASSWORD is missing"
  rm -f "$tmp_no_dbpass"
  exit 1
fi
rm -f "$tmp_no_dbpass"

echo "[4/4] Show resolved image names"
docker compose -f "$COMPOSE_FILE" --env-file .env config | grep -E '^\s*image:' || true

echo "Phase 3 config checks passed."
