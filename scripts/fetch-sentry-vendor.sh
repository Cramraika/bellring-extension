#!/usr/bin/env bash
# Fetch @sentry/browser as a single-file bundle for MV3 (CSP-safe local load).
# Run once after cloning (or to refresh the vendored copy).
#
# Output: vendor/sentry.bundle.js
#
# Pinned to @sentry/browser ^7.119.0 (matches bellring-server @sentry/node).

set -euo pipefail

cd "$(dirname "$0")/.."

SENTRY_VERSION="7.119.0"
URL="https://browser.sentry-cdn.com/${SENTRY_VERSION}/bundle.min.js"

mkdir -p vendor
echo "[fetch-sentry-vendor] downloading @sentry/browser ${SENTRY_VERSION}..."
curl --fail --silent --show-error -L -o vendor/sentry.bundle.js "$URL"
echo "[fetch-sentry-vendor] wrote vendor/sentry.bundle.js ($(wc -c < vendor/sentry.bundle.js) bytes)"
