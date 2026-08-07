#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

COMPOSE_FILE="compose.prod.yml"
ENV_FILE=".env"
FRONT_PORT="${FRONT_PORT:-8080}"
REQUESTS="${REQUESTS:-300}"
CONCURRENCY="${CONCURRENCY:-20}"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Missing $COMPOSE_FILE"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

hit_travail_parallel() {
  local requests="$1"
  local concurrency="$2"
  local start end elapsed ok

  start=$(date +%s)
  ok=$(seq "$requests" | xargs -I{} -P "$concurrency" sh -c '
    code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:'"$FRONT_PORT"'/travail")
    if [ "$code" = "200" ]; then
      echo 1
    else
      echo 0
    fi
  ' | awk '{s+=$1} END {print s+0}')
  end=$(date +%s)
  elapsed=$((end - start))

  if [[ "$elapsed" -le 0 ]]; then
    elapsed=1
  fi

  echo "$ok $elapsed"
}

measure_scale() {
  local replicas="$1"

  docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --scale api="$replicas" --scale worker=1 --scale front=1 postgres api worker front >/dev/null
  sleep 8

  read -r ok elapsed < <(hit_travail_parallel "$REQUESTS" "$CONCURRENCY")
  local rps=$((ok / elapsed))

  echo "$ok $elapsed $rps"
}

resolve_images() {
  docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" config | awk '/^\s*image:/ {print $2}'
}

image_size_mb() {
  local image="$1"
  local bytes
  bytes=$(docker image inspect "$image" --format '{{.Size}}' 2>/dev/null || echo 0)
  awk -v b="$bytes" 'BEGIN { printf "%.1f", b/1024/1024 }'
}

DEPLOY_START=$(date +%s)
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d >/dev/null
until curl -fsS "http://127.0.0.1:${FRONT_PORT}/health" >/dev/null; do
  sleep 2
done
DEPLOY_END=$(date +%s)
DEPLOY_SECONDS=$((DEPLOY_END - DEPLOY_START))

echo "[phase8] Measuring throughput with api=1"
read -r ok1 elapsed1 rps1 < <(measure_scale 1)

echo "[phase8] Measuring throughput with api=3"
read -r ok3 elapsed3 rps3 < <(measure_scale 3)

echo
echo "==== Phase 8 measurement summary ===="
echo "Deploy convergence seconds: $DEPLOY_SECONDS"
echo "api=1 -> success=$ok1 elapsed=${elapsed1}s approx_rps=$rps1"
echo "api=3 -> success=$ok3 elapsed=${elapsed3}s approx_rps=$rps3"
echo

echo "Image sizes (MB):"
while read -r image; do
  [[ -z "$image" ]] && continue
  echo "- $image: $(image_size_mb "$image") MB"
done < <(resolve_images)

echo
echo "Copy this into README carnet:"
echo "| Coups encaisses par pouls, avec un exemplaire | $rps1 rps (proxy) | - | REQUESTS=$REQUESTS CONCURRENCY=$CONCURRENCY |"
echo "| Coups encaisses par pouls, avec trois exemplaires | - | $rps3 rps (proxy) | scale api=3 |"
echo "| Duree entre push et dernier carre a jour | - | ${DEPLOY_SECONDS}s (local compose convergence) | local approximation |"
