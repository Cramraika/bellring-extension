// Sentry SDK init for bellring-extension (Glitchtip-compatible).
// Wired 2026-05-19 per OW-106 Glitchtip activation (project pid created
// 2026-05-19; reconcile output reported In-sync=10).
//
// DSN is sourced from the build-time-generated config.generated.js (gitignored),
// which is templated from the env var BELLRING_EXTENSION_GLITCHTIP_DSN at build.
// Operator pulls the DSN value from Infisical:
//   main-host:/host-page/BELLRING_EXTENSION_GLITCHTIP_DSN
// and runs scripts/build-config.sh before zipping the extension.
//
// At runtime this module also reads chrome.storage.local.bellringSentryDsn as
// a secondary override so the operator can paste a DSN via the options page
// without a rebuild.
//
// Loads @sentry/browser from vendor/sentry.bundle.js (fetched once via
// scripts/fetch-sentry-vendor.sh — see README). All paths are CSP-safe under
// MV3 script-src 'self'.
//
// This script is designed to no-op silently when DSN is absent OR the vendor
// bundle is missing — the extension keeps working without error reporting.

(function () {
  const BELLRING_DSN_STORAGE_KEY = 'bellringSentryDsn';

  function safeInit(dsn) {
    if (!dsn) return;
    try {
      if (typeof Sentry === 'undefined' || !Sentry.init) {
        console.warn('[sentry] @sentry/browser not loaded; skipping init.');
        return;
      }
      Sentry.init({
        dsn: dsn,
        environment: 'production',
        // Glitchtip ignores tracesSampleRate; keep init minimal.
        tracesSampleRate: 0,
      });
    } catch (e) {
      console.warn('[sentry] init failed:', e && e.message);
    }
  }

  // Build-time injected config (config.generated.js sets self.__BELLRING_SENTRY_DSN__).
  var buildDsn = (typeof self !== 'undefined' && self.__BELLRING_SENTRY_DSN__) || '';

  // Runtime override via chrome.storage (paste-via-options support).
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([BELLRING_DSN_STORAGE_KEY], function (state) {
        var dsn = (state && state[BELLRING_DSN_STORAGE_KEY]) || buildDsn;
        safeInit(dsn);
      });
    } else {
      safeInit(buildDsn);
    }
  } catch (e) {
    safeInit(buildDsn);
  }
})();
