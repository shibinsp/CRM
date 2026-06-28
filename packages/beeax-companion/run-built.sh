#!/bin/sh

set -e

echo "==> Packaging BeeAX Desktop..."
SKIP_SIGN=1 npx electron-forge package

echo "==> Ad-hoc signing BeeAX.app..."
codesign --force --deep --sign - out/BeeAX-darwin-arm64/BeeAX.app

echo "==> Starting local server..."
node src/server.js &
SERVER_PID=$!

trap "echo '==> Stopping server...'; kill $SERVER_PID 2>/dev/null" EXIT INT TERM

echo "==> Launching BeeAX.app..."
./out/BeeAX-darwin-arm64/BeeAX.app/Contents/MacOS/BeeAX
