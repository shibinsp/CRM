#!/bin/sh
set -e

echo "==> START Registering cron jobs"

cd /app/packages/beeax-server
yarn command:prod cron:register:all

echo "==> DONE"
