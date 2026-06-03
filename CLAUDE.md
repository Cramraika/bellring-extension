# bellring-extension — CLAUDE.md v2

**Date:** 2026-04-28 (S11B authoring)
**Supersedes:** v1 (commit-sha pending S11C verification)
**Tier:** B (production-touching v1.0.4 since 2024)

## Claude Preamble
<!-- VERSION: 2026-06-03-v50 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws (§1–§55) load via user-level `~/.claude/conventions/` and are ALWAYS in context** — `universal-claudemd.summary.md` (≤43-line salient view, read FIRST) → `universal-claudemd.md` (full) + `project-hygiene.md`. Do **NOT** assume their content from memory; consult + verify before asserting (§34 / §43.6 / §43.7). The `## Active Cluster Playbooks` block below names this repo's situational playbooks **read-on-demand** (§49.10): Read the named playbook when its trigger fires — never guess its contents; always-load guardrails are inline. Sync: `~/.claude/scripts/sync-preambles.py` (manual cadence; run after any source edit).

## Active Cluster Playbooks (read-on-demand — §49.10; bodies at ~/.claude/conventions/playbooks/)
<!-- BEGIN PLAYBOOKS BLOCK (managed by sync-preambles.py — read-on-demand pointers per §49.10; bodies at ~/.claude/conventions/playbooks/) -->

These cluster playbooks apply to this repo. You do NOT know their contents from memory —
**Read the named file when its trigger fires; never assume** (§49.10, §34, §43.6). Bodies are
NOT inlined and NOT @-imported; the always-load GUARDRAILs below are the only parts that must
hold without a Read.

- `tier-a-design.md` — when: design / UI / Figma / Stitch / component / palette / typography work.
- `commercial-bound.md` — when: license / sponsor-readiness / graph-tool-output / white-label work. GUARDRAIL: never commit/ship GitNexus (PolyForm-NC) graph output from a commercial-bound repo — CGC is the canonical graph source.
- `brand-registry.md` — when: brand / positioning / brand-canon / cross-repo brand work.
- `bellring-cluster.md` — when: Bellring server/extension cross-repo work (v1-stub).

<!-- END PLAYBOOKS BLOCK -->

## Identity & Role

`bellring-extension` is the **visible browser-extension half of Bellring** — Chrome MV3 extension that renders real-time celebratory popups (trophy animations, bell chime sound, multi-monitor placement) when a rep closes a sale. Pairs with `bellring-server`. Currently distributed via "Load unpacked" at CN (~300 BDEs reference customer); Chrome Web Store + Firefox Add-ons + Edge Add-ons submissions = Phase 3 of Bellring commercialization spec.

Repo renamed from `sales-notification-extension` 2026-04-19; previously codenamed "Salvo". Vagary Labs brand: **Bellring** (product brand).

## Coverage Today (post-PCN-S6/S7/S11A)

Per matrix row `bellring-extension`:

```
Mail | DNS | RP | Orch | Obs | Backup | Sup | Sec | Tun | Err | Wflw | Spec
 NA  | NA  | NA | NA   | NA  | NA     | T   | U   | NA  | NA  | NA   | NA
```

- USED: Sec (per-user UUID token in `chrome.storage.local`; CSP `script-src 'self'`; minimal `host_permissions`).
- TRIGGER-TO-WIRE: Sup (Cosign post-PR-#50 fanout — extension distribution itself is signed via Chrome Web Store / Firefox Add-ons signing once published; CI signing is for the build pipeline).
- NA: Mail, DNS, RP, Orch, Obs, Backup, Tun, Err, Wflw, Spec — extension is a client-side artefact distributed via Chrome Web Store (when published).

## What's Wired (current state)

- **v1.0.4** in production at CN (reference customer) since 2024.
- **Distribution:** "Load unpacked" in `chrome://extensions/`. NOT on Chrome Web Store yet (Phase 3 publishes).
- **CI:** GitHub Actions — `node --check` on all `*.js` + JSON validity check on `manifest.json`. **GREEN.**
- **Auth:** OTP to `@codingninjas.com` email → UUID token → `Authorization: Bearer` for REST + `?token=` for WS (domain restriction lifted in Phase 1 multi-tenant rollout).
- **Backend:** `wss://sales-notification-backend.onrender.com/ws?token=<uuid>` (Bellring-branded host TBD).

## Stack

- **Runtime:** Chrome Extension Manifest V3, service worker, vanilla JavaScript (no build step). Portable to Firefox MV3 (121+) and Edge Chromium.
- **Chrome APIs:** `storage`, `alarms`, `system.display`, `activeTab`
- **Transport:** raw `WebSocket`
- **CSP:** `script-src 'self'; object-src 'self'`

## Roadmap (post-S11A)

### Cluster 3 — Cosign per-repo CI fanout
- T (post host_page PR #50 merge); applies to the build/publish pipeline (CI-signed `.zip` bundles before CWS submission).

### Bellring whitelabel commercialization (`~/.claude/specs/2026-04-19-sales-notification-whitelabel.md`)
- **Phase 0 (Week 0, 2-3 days):** strip CN branding; remove base64 URL hack; register `bellring.<tld>` + brand site.
- **Phase 1 (Weeks 1-2, 30h):** swap `ws` for `@supabase/supabase-js` Realtime; drop standalone backend (Supabase Auth + Postgres + Realtime owns state); read `apiBaseUrl` + `workspaceSlug` from `chrome.storage.sync`; install-time onboarding popup; brand config loader.
- **Phase 2 (Week 3):** Stripe tiers; PostHog; Sentry browser SDK.
- **Phase 3 (Week 4):** Chrome Web Store + Firefox Add-ons + Edge Add-ons submissions; privacy + ToS + DPA; docs site.
- **Phase 4 (Weeks 5-6):** CRM adapters (LeadSquared P0, Salesforce + HubSpot P1); Product Hunt launch.
- **Phase 5 (ongoing):** SAML/SCIM, custom animation uploader, SOC 2 Type II.

### Cross-browser port (Bellring Phase 1)
- Single codebase → 3 manifest variants (Chrome, Firefox MV3 with `browser_specific_settings.gecko.id`, Edge Chromium same .zip).

### Near-term (v1.x internal CN)
- Fix silent disconnects; connection-state indicator.
- Notification history (`chrome.storage.local` ring buffer of last 50 events).
- Sound toggle per event_type.
- Better multi-monitor behavior.

## ADR Compliance

- **ADR-038 personal-scope:** ✓ — Cramraika org; SMPL562 retired 2026-04-19.
- **ADR-033 Renovate canonical:** ✓ — `.github/workflows/renovate.yml` active.
- **ADR-041 Trivy gate:** N/A (Chrome extension; no container image).
- **SOC2 risk-register cross-ref:** SAML/SCIM = Phase 5+; CWS submission gates publish.

## Cross-references

- `platform-docs/05-architecture/part-B-service-appendices/products/bellring-extension.md` (pending S11B authoring)
- `~/.claude/specs/2026-04-19-sales-notification-whitelabel.md`
- Pair repo: `bellring-server`
- `~/.claude/conventions/universal-claudemd.md` §41 brand architecture (Bellring)
- `~/.claude/conventions/design-system.md` (Tier A; bellring-yellow)

## Migration from v1

**Major v1 → v2 changes:**
1. Per-project-service-matrix row added — only Sec USED + Sup T; rest NA (extension is a client-side artefact).
2. Cosign per-repo CI fanout queued post-PR-#50 (applies to build pipeline pre-CWS submission).
3. Bellring brand architecture §41 cited.
