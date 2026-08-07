#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .env.images ]]; then
  echo "Missing .env.images. Create it from .env.images.example first."
  exit 1
fi

set -a
source .env.images
set +a

missing=0
for var in DOCKERHUB_USERNAME FRONT_IMAGE API_IMAGE WORKER_IMAGE; do
  if [[ -z "${!var:-}" ]]; then
    echo "Missing variable: $var"
    missing=1
  fi
done

if [[ $missing -ne 0 ]]; then
  exit 1
fi

echo "Etape 2 config looks good:"
echo "- FRONT_IMAGE=$FRONT_IMAGE"
echo "- API_IMAGE=$API_IMAGE"
echo "- WORKER_IMAGE=$WORKER_IMAGE"

echo "Next manual step: create these 3 repositories on Docker Hub."
