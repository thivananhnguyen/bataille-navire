#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .env.vm ]]; then
  echo "Missing .env.vm. Copy from .env.vm.example and fill values."
  exit 1
fi

set -a
source .env.vm
set +a

for var in VM_HOST VM_PORT VM_USER VM_SSH_KEY_FILE; do
  if [[ -z "${!var:-}" ]]; then
    echo "Missing variable: $var"
    exit 1
  fi
done

if [[ ! -f "$VM_SSH_KEY_FILE" ]]; then
  echo "SSH key file does not exist: $VM_SSH_KEY_FILE"
  exit 1
fi

echo "Checking SSH access to $VM_USER@$VM_HOST:$VM_PORT ..."
ssh -i "$VM_SSH_KEY_FILE" -p "$VM_PORT" -o BatchMode=yes \
  "$VM_USER@$VM_HOST" \
  'echo "CONNECTED_HOST=$(hostname)"; docker --version; docker ps --format "table {{.Names}}\t{{.Status}}" | head -n 15'

echo "VM check passed. You can now run GitHub workflow deploy (workflow_dispatch)."
