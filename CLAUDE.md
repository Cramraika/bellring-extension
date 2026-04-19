# Bellring Extension

## Claude Preamble
<!-- VERSION: 2026-04-19-v12 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws** (§4), **MCP routing** (§6), **Drift protocol** (§11), **Dynamic maintenance** (§14), **Capability resolution** (§15), **Subagent SKILL POLICY** (§16), **Session continuity** (§17), **Decision queue** (§17.a), **Attestation** (§18), **Cite format** (§19), **Three-way disagreement** (§20), **Pre-conditions** (§21), **Provenance markers** (§22), **Redaction rules** (§23), **Token budget** (§24), **Tool-failure fallback** (§25), **Prompt-injection rule** (§26), **Append-only discipline** (§27), **BLOCKED_BY markers** (§28), **Stop-loss ladder** (§29), **Business-invariant checks** (§30), **Plugin rent rubric** (§31), **Context ceilings** (§32), **Doc reference graph** (§33), **Anti-hallucination** (§34), **Past+Present+Future body** (§35), **Project trackers** (§36), **Doc ownership** (§37), **Archive-on-delete** (§38), **Sponsor + white-label** (§39), **Doc-vs-code drift** (§40), **Brand architecture** (§41), **Design system integration** (§42).

**Sources**: `~/.claude/conventions/universal-claudemd.md` (laws, MCP routing, lifecycle, rent rubric, doc-graph, anti-hallucination, brand architecture) + `~/.claude/conventions/project-hygiene.md` (doc placement, cleanup, archive-on-delete, ownership matrix) + `~/.claude/conventions/design-system.md` (per-repo Tier A/B/C design posture, Stitch wiring). Read relevant sections before significant work. Re-audit due **2026-07-19**. Sync: `~/.claude/scripts/sync-preambles.py`.

---

## 0. Status / Tier

**Tier B — maintained, production-touching.** v1.0.4 in production at CN (reference customer) since 2024; distributed via "Load unpacked". No active feature work pre-Bellring-multi-tenant-pivot; fixes land only when a user-impacting bug surfaces (memory leak + dead-code fix at `1cadc37`; CI upgrade at `7ba0e9a`). Chrome Web Store / Firefox Add-ons / Edge Add-ons submissions are Phase 3 of the Bellring commercialization spec. Product brand lives under **Vagary Labs → Product brands → Bellring** (universal §41).

## 1. Product Overview

**Bellring Extension** — the visible browser-extension half of **Bellring**, a whitelabel SaaS for sales-team celebration notifications. Brand philosophy: the sales-floor bell-ringing ritual every team does when a deal closes — unmissable, visceral, team-wide. Renders real-time celebratory popups (trophy animations) when a rep closes a sale, plus general announcements and private messages. Pairs with **`bellring-server`** (Node + Express + ws + SendGrid backend). v1.0.4 in production since 2024, ~300 BDEs at Coding Ninjas (reference customer). Distributed via "Load unpacked" in `chrome://extensions/` (not on Chrome Web Store yet — Phase 3 publishes to Chrome Web Store + Firefox Add-ons + Edge Add-ons).

Repo renamed from `sales-notification-extension` 2026-04-19 (Phase 3). Previously codenamed "Salvo" during whitelabel-pivot design. Remote: `Cramraika/bellring-extension` (migrated from SMPL562 2026-04-19; standard `gh` push).

**Product vision (roadmap north star)**: **Bellring** — generic $19-299+/mo whitelabel SaaS (browser ext + webhook receiver) for any sales team, on any CRM. Manifest V3 portable across Chrome, Firefox, Edge. Full spec at `~/.claude/specs/2026-04-19-sales-notification-whitelabel.md`.

---

## 2. References

- **Universal laws + MCP routing + rent rubric + ceilings + §41 Brand architecture (Bellring)**: `~/.claude/conventions/universal-claudemd.md`
- **Doc placement + cleanup + hygiene**: `~/.claude/conventions/project-hygiene.md`
- **Environments**: `docs/ENVIRONMENTS.md`
- **Bellring whitelabel spec (authoritative roadmap)**: `~/.claude/specs/2026-04-19-sales-notification-whitelabel.md` (renamed from Salvo 2026-04-19)
- **Brand rename proposal (Phase 3 rationale)**: `~/.claude/specs/2026-04-19-brand-rename-proposal.md`
- **Companion backend**: `~/Documents/Github/bellring-server/` (Cramraika/bellring-server)

---

## 3. Stack

- **Runtime**: Chrome Extension Manifest V3, service worker, vanilla JavaScript (no build step). Portable to Firefox MV3 (121+) and Edge Chromium without code changes (manifest variant only).
- **Chrome APIs**: `storage` (auth token in `chrome.storage.local`), `alarms` (keep-alive), `system.display` (multi-monitor popup placement), `activeTab`
- **Transport**: raw `WebSocket` against `wss://sales-notification-backend.onrender.com/ws?token=<uuid>` (Bellring-branded host TBD once domain chosen)
- **Auth**: OTP to `@codingninjas.com` email → UUID token → `Authorization: Bearer` for REST + `?token=` for WS (domain restriction lifted in Phase 1 multi-tenant rollout)
- **CSP**: `script-src 'self'; object-src 'self'` (no remote script execution)
- **Distribution**: Unpacked dev-mode load (Chrome Web Store + Firefox Add-ons + Edge Add-ons submissions planned Phase 3)

---

## 4. Active Role-Lanes

Based on present state + Bellring pinnacle:

- **Frontend engineer (extension)** — MV3 service worker lifecycle, Chrome API quirks, popup HTML/CSS/animations, keepalive + reconnect patterns
- **Backend integrator** — WebSocket protocol compat with `bellring-server`; canonical event schema (sale_made / notification / private)
- **Designer** — trophy popup UX, sound effects, bell-ringing animation/audio, brand config (Bellring multi-tenant theming)
- **QA / tester** — manual QA across Chrome/Firefox/Edge + multi-monitor setups; no automated extension tests today
- **Security** — token flow audit, CSP hardening, permission-minimization for CWS submission
- **Product / GTM** (Bellring commercialization phase) — pricing, CRM adapter roadmap, Chrome Web Store + Firefox + Edge listings, Product Hunt launch

---

## 5. Build / Test / Deploy

```bash
# Build
# — No build step. Chrome loads files directly.

# Install locally
# 1. Navigate to chrome://extensions/
# 2. Toggle Developer mode ON
# 3. Click "Load unpacked" → pick this repo root

# Test
# — Manual. Click icon → auth with @codingninjas.com OTP → verify WS connects
#   → trigger test webhook via bellring-server → verify popup renders
# — No automated test suite. CI only runs:
#     - JSON validity check on manifest.json
#     - `node --check` on all *.js files

# CI
# .github/workflows/ci.yml runs on push/PR to main (ignores *.md, docs/**, .claude/**, .vscode/**)

# Deploy
# — No deploy pipeline today. Distribution = share the folder; BDEs load unpacked.
# — Phase 3 (Bellring commercialization): Chrome Web Store + Firefox Add-ons + Edge Add-ons submissions.
```

---

## 6. Key Directories / Files

- `manifest.json` — MV3 config, permissions, service worker entry, host permissions pinned to `sales-notification-backend.onrender.com` (will update on Bellring-domain migration)
- `background.js` — `ExtensionManager` class: WebSocket lifecycle, OTP flow, popup dispatch, keepalive alarm, exponential backoff reconnect (max 5 attempts, 10s base delay). Base64-encoded API URL at `getApiBaseUrl()` (line ~88).
- `popup.html` / `popup.js` — rendered notification: trophy animation, sale_made / notification / private branches, sound effect, auto-dismiss
- `action.html` / `action.js` — browser-action dropdown UI: fullscreen auth popup when unauthenticated, settings panel (logout, popup-enable toggle) when authenticated
- `icon48.png`, `icon128.png` — extension icons
- `docs/ENVIRONMENTS.md` — local dev setup + deployment status + troubleshooting
- `.github/workflows/ci.yml` — manifest + JS syntax validation
- `.claude/settings.json` — per-project Claude Code config

**Never save working files to repo root.** Scratch → `/tmp/claude-scratch/`.

---

## 7. Dependency Graph

**Upstream (this extension consumes)**:
- `bellring-server` (Cramraika) — WebSocket server on Render, OTP REST endpoints (`/request-otp`, `/verify-otp`), webhook ingestion (`/webhook`). Hard-coded in base64 URL. If backend is down, no popups.
- SendGrid (via backend) — OTP email delivery. Outage = BDEs can't re-authenticate after 30 days.
- Chrome/Chromium runtime — MV3 service worker 30s lifecycle, `chrome.alarms`, `chrome.storage.local`, `chrome.system.display`.
- Render.com — backend host; free-tier cold starts delay first popup after idle.

**Downstream (this extension feeds)**:
- ~300 BDE Chrome installations at Coding Ninjas (reference customer) — the end-user UI surface.
- (Phase 3, Bellring commercialization) Chrome Web Store + Firefox Add-ons + Edge Add-ons listings.

**Sibling / related**:
- `bellring-server` — authoritative counterpart; schema and auth flow changes must land in both.
- `n8n-workflows` (private, Cramraika) — can POST to backend `/webhook` via `n8n.chinmayramraika.in` for automation drills.

---

## 8. Roadmap

### Near-term (v1.x, internal Coding Ninjas)
- **Fix silent disconnects** — add connection-state indicator in settings UI (user can see WS health). R12 in Bellring risk register.
- **Notification history** — `chrome.storage.local` ring buffer of last 50 events with timestamps; settings-panel "recent" tab.
- **Sound toggle per event_type** — mute announcements, keep sale_made audible (signature Bellring bell chime).
- **Better multi-monitor behavior** — remember last-used display per user.

### Bellring whitelabel commercialization (authoritative spec: `~/.claude/specs/2026-04-19-sales-notification-whitelabel.md`)
- **Phase 0 (Week 0, 2-3 days)**: strip all `@codingninjas.com` / "Coding Ninjas" branding; remove base64 URL hack; register `bellring.<tld>` domain + brand site.
- **Phase 1 (Weeks 1-2, 30h)**: swap `ws` for `@supabase/supabase-js` Realtime subscribe; drop standalone backend (Supabase Auth + Postgres + Realtime owns state); read `apiBaseUrl` + `workspaceSlug` from `chrome.storage.sync`; install-time onboarding popup reads workspace slug from invite URL query param; brand config loader fetches workspace `brand_config` on connect and themes popup.
- **Phase 2 (Week 3)**: Stripe tiers (Free $0 / Team $19 / Growth $79 / Enterprise $299+) wired via MCP; PostHog event taxonomy; Sentry browser SDK.
- **Phase 3 (Week 4)**: Chrome Web Store + Firefox Add-ons + Edge Add-ons submissions; privacy + ToS + DPA pages; docs site at `docs.bellring.<tld>`.
- **Phase 4 (Weeks 5-6)**: CRM adapters — LeadSquared (P0, flagship), Salesforce + HubSpot (P1), Pipedrive + Close (P2). Adapter wizard in dashboard. Product Hunt launch.
- **Phase 5 (ongoing)**: SAML/SCIM (Enterprise gate), analytics v2, custom animation uploader, self-host Docker image, SOC 2 Type II if Enterprise pipeline >3 deals.

### Cross-browser port (Bellring Phase 1)
- Single codebase, build script produces **three** `.zip` bundles with manifest variants:
  - Chrome: current manifest
  - Firefox MV3 (121+): add `browser_specific_settings.gecko.id`
  - Edge: ships as Chromium, same `.zip` works (separate Add-ons submission)

---

## 9. Past / History

- **v1.0.4** (current) — production since 2024 at Coding Ninjas (reference customer). Last 30 commits include: `1cadc37` fix memory leak + dead code + misleading connection status; `7ba0e9a` CI upgrade to ASM quality standard; `071fb86` MIT LICENSE; `05a97ba` environment setup guide; `501c1f8` initial CI workflow with manifest + JS syntax validation; `4d29ba1` Claude Code configuration.
- Pre-`501c1f8` history is noisy ("Update background.js", "Update popup.html" — ad-hoc commits). Post-CI rollout is conventional-commit clean.
- **Preamble bumped v4→v5→v6→v7→v7-compact→v8→...→v11** sequentially over 2026-04 sprint (universal-claudemd.md ratchet). v11 aligns with Phase 3 fleet rename (Bellring brand adoption).
- **Repo renamed 2026-04-19 (Phase 3)**: `sales-notification-extension` → `bellring-extension`. Consolidation under the Bellring brand (formerly codenamed Salvo).
- **Known design artefacts still in tree** carried forward deliberately: base64 URL (security theater; kept because backend token auth is the real gate, removing is make-work), hardcoded `@codingninjas.com` domain check (will only be stripped at multi-tenant Phase 1 — no point churning the internal tool).

---

## 10. Observability

**Currently thin** — a gap to close.

- **Client errors**: no Sentry wired in extension today. Bellring Phase 1 adds `@sentry/browser` with source maps + breadcrumb tagging per `event_type`.
- **WebSocket reconnection health**: logged to service-worker console only; no remote collection. BDEs don't know when they're disconnected (R12 in Bellring risk register, P0 fix).
- **Keep-alive + ping/pong**: alarms fire every 1 min; log line per reconnect attempt. No metric export.
- **User analytics**: none. Bellring adds PostHog — `extension_installed{browser}`, `extension_realtime_connected`, `extension_realtime_disconnected{code, duration_ms}`, `extension_popup_shown{event_type}`, `extension_popup_dismissed{time_visible_ms}`, `extension_popups_toggled{enabled}`.
- **Monitoring dashboards**: none for the extension itself. Backend monitored via Render logs only.
- **Per-Bellring**: Grafana alerts via `mcp__grafana__*` on Supabase concurrent-connection cap and per-workspace webhook error rate (R3, R4 in spec).

---

## 11. Known Limitations

- **Single-tenant** — everything hard-wired to Coding Ninjas: `@codingninjas.com` OTP domain check (backend), `sales-notification-backend.onrender.com` host pin, "Coding Ninjas IT Team" author in `manifest.json`. All stripped at Bellring Phase 0/1.
- **API URL is Base64-encoded** in `background.js:88` — security theater; mitigated by backend token auth. Remove at Bellring multi-tenant Phase 1 (`apiBaseUrl` from `chrome.storage.sync`).
- **No notification history** — missed popups (offline, asleep, closed Chrome) are gone forever.
- **No connection-state UI** — BDE has no way to see if they're currently disconnected.
- **No automated tests** — manual QA only. CI is manifest + JS syntax check only.
- **Chrome-only packaging today** — Firefox + Edge manifests not yet published. Bellring Phase 1 port (MV3 is already portable; work is manifest variant + store submissions).
- **30-day auth expiry** forces periodic re-auth via OTP; no refresh-token rotation.
- **MV3 service worker 30s lifecycle** — keepalive alarm works, but long gaps can still drop WS. Supabase Realtime will inherit this constraint; keepalive pattern carried forward to Bellring multi-tenant build.
- **No Chrome Web Store presence** — internal distribution only, limiting install reliability and user trust signals.
- **Render cold starts** — free-tier backend sleeps; first webhook after idle takes 10-30s to reach popup.

---

## 12. Security & Secrets

- **No secrets in extension code.** Auth is per-user UUID token stored in `chrome.storage.local` (per-profile, sandboxed to this extension by Chrome).
- **Base64 URL obfuscation** at `background.js:88` — cosmetic only, trivially decoded. Backend token auth + CORS + rate limit are the real defenses.
- **CSP**: `script-src 'self'; object-src 'self'` — blocks remote/inline script injection.
- **Permissions are minimal**: `storage`, `alarms`, `system.display`, `activeTab`. Audit `activeTab` usage before CWS submission — may be removable.
- **`host_permissions`** pinned to single origin — prevents arbitrary backend switching.
- **Never commit** `.env`, `.claude/settings.local.json`, or `.mcp.json`.
- **Token rotation**: 30-day expiry, full re-auth via OTP. No refresh token today.

---

## 13. External Services (MCPs, integrations)

- **Design system** — **Tier A** per `~/.claude/conventions/design-system.md`. Source of truth: `docs/design/` (brand, palette, typography, components, voice). Bellring is a Vagary-family brand (shares neutral ramp + typographic rhythm) with distinct primary (bellring-yellow) + voice. Paired `bellring-server` (Tier B) inherits this design.
- **GitHub**: `Cramraika/bellring-extension` (migrated from SMPL562 2026-04-19; normal `gh` push flow)
- **Render**: hosts the paired backend (`bellring-server`); no direct MCP routing
- **SendGrid** (via backend): OTP email delivery
- **n8n** (`n8n.chinmayramraika.in`): can POST test events to backend `/webhook` — set `N8N_WEBHOOK_URL` + `N8N_API_KEY` env if wiring a drill
- **Future (Bellring commercialization)**:
  - `supabase` MCP — auth + Postgres + Realtime + Storage for brand assets
  - `stripe` MCP — products/prices/webhooks for tier billing
  - `posthog` MCP — extension event taxonomy + funnels
  - `sentry` MCP — browser SDK error tracking
  - `stitch` + `claude_ai_Figma` — landing page + brand config UI design
  - `infisical` — secrets management across dev/staging/prod envs
  - `claude_ai_Gmail` — `support@bellring.<tld>` labels + triage
  - `linear` — Bellring project tickets (adapter roadmap)
  - `grafana` + `loki` — alerting on connection cap + webhook error rate
  - `claude_ai_Slack` — milestone broadcast to personal Slack
- **MCPs this project does NOT need**: `figma` is useful for Bellring brand UI but not core extension work — leave enabled, don't invoke for internal-tool bugfixes.

---

## 14. README curation stance

**Frozen** per `project-hygiene.md` (whitelabel SaaS brand surface; user owns framing). Only edit `README.md` on explicit user request. Claude can propose — never surprise-update.

---

## 14.a Doc Maintainers

| Doc | Posture | Update trigger |
|---|---|---|
| `CLAUDE.md` | **Live contract** | Stack shift, new permission / API, Bellring-pivot phase transition |
| `README.md` | **Frozen** per hygiene § README curation (whitelabel brand surface) | Explicit user request only (Chrome Web Store submission is the next likely trigger — Phase 3) |
| `docs/ENVIRONMENTS.md` | Live — ops-living | Config/setup change, new troubleshooting case |
| `manifest.json` | **Spec-SSOT** (not docs) — permission / host / version edits require justification | On behavior/permission change |
| Pair-repo (`bellring-server`) `CLAUDE.md` | Sibling — cross-reference on any schema / auth flow change | Any `event_type` schema / WebSocket protocol / OTP flow change |

Doc-maintainer: Chinmay. Claude edits CLAUDE.md + ENVIRONMENTS.md on request; `manifest.json` edits require explicit user review (permission expansion is a CWS-review risk).

## 14.b Future `CHANGELOG.md`

Not yet created. Introduce at Bellring Phase 3 (Chrome Web Store submission) — CWS listing requires versioned changelog, and Firefox Add-ons listing benefits from one. Format: Keep a Changelog + Conventional Commits. Placement: repo root (not `docs/`).

---

## 15. Deviations from Universal Laws

- **None structural.** Base64-encoded URL predates the universal law framework and is documented as intentional (§11) — kept for internal tool; removed at Bellring multi-tenant Phase 1. Not a deviation; a time-bounded carried artefact.
- **Normal push flow** — SMPL562 retired 2026-04-19; repo migrated to Cramraika with standard pre-push hook + branch protection.
- **No CHANGELOG.md** — release-having-repos-only rule (`project-hygiene.md` unsettled-rule #4) and this repo doesn't publish releases. Adopt CHANGELOG.md when Chrome Web Store submission lands (Phase 3 requires versioned changelog).
