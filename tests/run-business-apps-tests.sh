#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
test_output_dir=$(mktemp -d /tmp/wdp-business-apps-tests.XXXXXX)
trap 'rm -rf "$test_output_dir"' EXIT
./node_modules/.bin/tsc src/lib/business-apps-api.ts \
  --outDir "$test_output_dir" --rootDir src --module commonjs \
  --moduleResolution node --target es2022 --lib es2022,dom \
  --esModuleInterop --strict --skipLibCheck
BUSINESS_APPS_TEST_MODULE="$test_output_dir/lib/business-apps-api.js" \
NODE_PATH="$PWD/node_modules" node --test tests/business-apps-api.test.cjs
