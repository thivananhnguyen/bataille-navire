#!/usr/bin/env bash
set -euo pipefail

TABLEAU_URL="${TABLEAU_URL:-https://services-battle.vercel.app}"
GROUPE="${GROUPE:-${GROUPE_DISPLAY:-Bataille des Navires}}"
SERVICE="${SERVICE:-api}"
NOMBRE="${NOMBRE:-200}"
SALVES="${SALVES:-5}"

if [[ -z "$TABLEAU_URL" || -z "$GROUPE" || -z "$SERVICE" ]]; then
  echo "Missing required env: TABLEAU_URL, GROUPE (or GROUPE_DISPLAY), SERVICE"
  exit 1
fi

echo "Sending ${SALVES} salves of ${NOMBRE} coups to ${GROUPE}/${SERVICE} via ${TABLEAU_URL}"
for i in $(seq 1 "$SALVES"); do
  curl -fsS -X POST "${TABLEAU_URL}/api/coups" \
    -H 'Content-Type: application/json' \
    -d "{\"groupe\":\"${GROUPE}\",\"service\":\"${SERVICE}\",\"nombre\":${NOMBRE}}" >/dev/null
  echo "salve ${i}/${SALVES} sent"
  sleep 1
done

echo "Done. Watch Services Battle for pale->full transition."
