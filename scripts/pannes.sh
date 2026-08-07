#!/usr/bin/env bash
# pannes.sh: tire une panne au hasard et l'applique sur la machine cible.
# Usage: ./scripts/pannes.sh
# Optional env vars:
#   TARGET_SSH="ssh -i deploy_key -p 2222 root@localhost"
#   FLOTTE_DIR="/srv/flotte"
#   COMPOSE_FILE="compose.prod.yml"
#   DRY_RUN="1"  (print command instead of executing)

set -u

TARGET_SSH="${TARGET_SSH:-ssh -i deploy_key -p 2222 root@localhost}"
FLOTTE_DIR="${FLOTTE_DIR:-/srv/flotte}"
COMPOSE_FILE="${COMPOSE_FILE:-compose.prod.yml}"
DRY_RUN="${DRY_RUN:-0}"

run_remote() {
  local cmd="$1"
  if [[ "$DRY_RUN" == "1" ]]; then
    echo "[DRY-RUN] $TARGET_SSH \"$cmd\""
  else
    $TARGET_SSH "$cmd"
  fi
}

# Services that can be restarted/killed safely for incident simulation.
SERVICES=(front api worker)
VICTIME="${SERVICES[$RANDOM % ${#SERVICES[@]}]}"

# /data permission incident is relevant for services mounting pavillon volume.
DATA_SERVICES=(front api)
VICTIME_DATA="${DATA_SERVICES[$RANDOM % ${#DATA_SERVICES[@]}]}"

ID_CMD="docker ps -qf name=$VICTIME | head -1"
ID_DATA_CMD="docker ps -qf name=$VICTIME_DATA | head -1"

case $((RANDOM % 6)) in
  0)
    echo "[pannes] incident=0 action=kill service=$VICTIME"
    run_remote "docker kill \$($ID_CMD)"
    ;;
  1)
    echo "[pannes] incident=1 action=stop service=postgres"
    run_remote "docker stop \$(docker ps -qf name=postgres | head -1)"
    ;;
  2)
    echo "[pannes] incident=2 action=chmod000 service=$VICTIME_DATA target=/data"
    run_remote "docker exec \$($ID_DATA_CMD) chmod 000 /data"
    ;;
  3)
    echo "[pannes] incident=3 action=wipe_db_password service=api"
    run_remote "cd $FLOTTE_DIR && sed -i 's|^DB_PASSWORD=.*|DB_PASSWORD=|' .env && docker compose -f $COMPOSE_FILE --env-file .env up -d api"
    ;;
  4)
    echo "[pannes] incident=4 action=bad_tag service=$VICTIME"
    run_remote "cd $FLOTTE_DIR && sed -i 's|^TAG=.*|TAG=nexistepas|' .env && docker compose -f $COMPOSE_FILE --env-file .env up -d $VICTIME"
    ;;
  5)
    echo "[pannes] incident=5 action=bad_tableau_url service=$VICTIME"
    run_remote "cd $FLOTTE_DIR && sed -i 's|^TABLEAU_URL=.*|TABLEAU_URL=http://127.0.0.1:1|' .env && docker compose -f $COMPOSE_FILE --env-file .env up -d $VICTIME"
    ;;
esac

echo "Le tableau va parler. Qu est-ce qui s est eteint, et pourquoi ?"
