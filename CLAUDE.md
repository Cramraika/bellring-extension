# Sales Notification Extension

## Claude Preamble (preloaded universal rules)
<!-- VERSION: 2026-04-18-v5 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

### Laws
- Never hardcode secrets. Use env vars + `.env.example`.
- Don't commit unless asked. Passing tests ≠ permission to commit.
- Never skip hooks (`--no-verify`) unless user asks. Fix root cause.
- Never force-push to main. Prefer NEW commits over amending.
- Stage files by name, not `git add -A`. Avoids .env/credential leaks.
- Conventional Commits (`feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:`). Subject ≤72 chars.
- Integration tests hit real systems (DB, APIs); mocks at unit level only.
- Never delete a failing test to make the build pass.
- Three similar lines > premature abstraction.
- Comments explain non-obvious WHY, never WHAT.
- Destructive ops (`rm -rf`, `git reset --hard`, force-push, drop table) → ask first.
- Visible actions (PRs, Slack, Stripe, Gmail) → confirm unless pre-authorized.

### Doc & scratch placement
- Plans: `docs/plans/YYYY-MM-DD-<slug>.md`
- Specs: `docs/specs/YYYY-MM-DD-<slug>.md`
- Architecture: `docs/architecture/`
- Runbooks: `docs/runbooks/`
- ADRs: `docs/adrs/ADR-NNN-<slug>.md`
- Scratch/temp: `/tmp/claude-scratch/<purpose>-YYYY-MM-DD.ext`
- Never create README unless explicitly asked.

### MCP routing (pull-tier — invoke when task signal matches)
**Design / UI:**
- Figma URL / design ref → `figma` / `claude_ai_Figma` (`get_design_context`)
- Design system / variants → `stitch`

**Engineer / SRE:**
- Prod error → `sentry`
- Grafana dashboard / Prometheus query / Loki logs / OnCall / Incidents → `grafana`
- Cloudflare Workers / D1 / R2 / KV / Hyperdrive → `claude_ai_Cloudflare_Developer_Platform`
- Supabase ops → `supabase`
- Stripe payment debugging → `stripe`

**Manager / Planner / Writer:**
- Linear issues → `linear`
- Slack comms → `slack` / `claude_ai_Slack`
- Gmail drafts/threads/labels → `claude_ai_Gmail`
- Calendar events → `claude_ai_Google_Calendar`
- Google Drive file access → `claude_ai_Google_Drive`

**Analyst / Marketer:**
- PostHog analytics/funnels → `posthog`
- Grafana time-series / Prometheus → `grafana`

**Security:**
- Secrets management → `infisical`

**Knowledge / Architecture:**
- Cross-repo knowledge ("which repos use X", "patterns across products") → `memory`
- Within-repo state → flat-file auto-memory (`~/.claude/projects/<id>/memory/`)

**Rule of thumb:** core tools (Read/Edit/Write/Glob/Grep/Bash) for local ops; MCPs for external-system state. Don't use MCPs as a slow alternative to core tools.

### Response discipline
- Tight responses — match detail to task.
- No "Let me..." / "I'll now...". Just do.
- End-of-turn summary: 1-2 sentences.
- Reference `file:line` when pointing to code.

### Drift detection
On first code-edit of the session, verify this preamble's VERSION tag matches `~/.claude/conventions/universal-claudemd.md` § 9. If stale, propose sync to user before proceeding.

### Re-audit status (check at session start in global workspace)
Last run: **2026-04-18-v1**. Next due: **2026-07-18** OR when `/context` > 50%, whichever first.
Methodology spec: `~/.claude/specs/2026-04-18-plugin-surface-audit.md`.
On session start in `~/Documents/Github/`, if today's date > next-due OR context feels heavy: remind user "Plugin audit overdue — want to run it per methodology spec?"

### Dynamic maintenance (self-adjust)
Environment is NOT static. Claude proactively handles:
- **Repo added/removed** → run `python3 ~/.claude/scripts/inventory-sync.py` to detect drift; propose inventory + profile + CLAUDE.md preamble
- **Stack change** (manifest drift) → narrow stack-line update in CLAUDE.md
- **universal-claudemd.md bumped** → run `python3 ~/.claude/scripts/sync-preambles.py` to propagate to 22 files
- **New marketplace / plugin surge** → propose audit via methodology spec
- **MCP added** → add routing hint; sync preambles
- See `~/.claude/conventions/universal-claudemd.md` § 14 for the full protocol

### Full detail
- Universal laws + architecture: `~/.claude/conventions/universal-claudemd.md`
- Doc placement + cleanup: `~/.claude/conventions/project-hygiene.md`
- Latest audit: `~/.claude/specs/2026-04-18-plugin-surface-audit.verdicts.md`

## Product Overview

| Product | Real-Time Sales Celebration System (Chrome Extension) |
|---------|-------------------------------------------------------|
| **What it does** | Chrome extension that displays real-time celebratory popups (trophy animations) when any BDE closes a sale. Also shows general announcements and private messages from managers. The visible, user-facing half of the Sales Notification system. |
| **Who uses it** | ~300 BDEs at Coding Ninjas install this in Chrome. They authenticate once with their `@codingninjas.com` email and passively receive notifications while working. No daily interaction required -- it runs in the background. |
| **Status** | Production (v1.0.4, Manifest V3). Distributed internally via Chrome Developer mode (Load unpacked). |
| **Organization** | SMPL562 |
| **Companion repo** | `sales-notification-backend` (backend API + WebSocket server) |

## Product Features and User Journeys

### 1. Sale Celebration Popup (Core Experience)
- **User journey**: BDE is working in Chrome. A colleague closes a sale. Within seconds, a trophy animation popup appears showing the seller's name, product sold, and manager name. Popup auto-dismisses after a few seconds.
- **Success signals**: Popup appears within 2-3 seconds of the sale webhook. Animation renders correctly. Sound effect plays. BDE feels the team energy and motivation.
- **Failure signals**: Popup never appears (WebSocket disconnected, backend down). Animation is broken or laggy. Popup appears on wrong monitor or is hidden behind windows. Too many popups stack and become annoying.

### 2. OTP Authentication (First-Time Setup)
- **User journey**: BDE installs extension via "Load unpacked" in `chrome://extensions/`. Clicks extension icon. Fullscreen auth popup appears. Enters `@codingninjas.com` email, requests OTP, checks email, enters OTP. Token stored for 30 days.
- **Success signals**: Auth completes in under 2 minutes. Token persists across Chrome restarts. Settings dropdown shows after auth.
- **Failure signals**: OTP email delayed or never arrives. Auth popup doesn't appear. Token expires unexpectedly. Re-auth required too frequently.

### 3. General Announcements (Passive Notifications)
- **User journey**: Manager sends an announcement via the backend webhook. All authenticated BDEs see a notification popup with the message.
- **Success signals**: Announcement visible and readable. Clearly distinct from sale celebrations.
- **Failure signals**: Announcement missed because BDE was offline. No way to review past announcements.

### 4. Private Messages (Targeted Communication)
- **User journey**: Manager targets a specific BDE by email via the webhook. Only that BDE's extension displays the private message.
- **Success signals**: Only the intended BDE sees the message. Message is clearly marked as private.
- **Failure signals**: Private message shown to wrong BDE. Target BDE is offline and never receives it.

### 5. WebSocket Reconnection (Reliability)
- **User journey**: If the backend goes down or network drops, the extension automatically attempts reconnection with exponential backoff (max 5 attempts, 10s base delay).
- **Success signals**: Connection recovers automatically. BDE doesn't notice brief outages.
- **Failure signals**: Reconnection fails after 5 attempts. BDE doesn't know they're disconnected. No visual indicator of connection status.

## Known Product Limitations
- No notification history -- missed popups are gone forever
- No visual indicator of connection health (BDE doesn't know if they're disconnected)
- Internal distribution only (not on Chrome Web Store)
- API URL is Base64-encoded in source (security through obscurity, mitigated by backend token auth)
- 30-day auth expiry requires re-authentication

---

## Technical Reference

### Stack
- Chrome Extension (Manifest V3), vanilla JavaScript, Chrome APIs (storage, alarms, system.display, activeTab)

### File Organization
- Never save working files to root folder
- `manifest.json` - Extension config (Manifest V3, permissions, service worker)
- `background.js` - Service worker: WebSocket connection, auth flow, popup management
- `popup.html` / `popup.js` - Notification display with animations and sound effects
- `action.html` / `action.js` - Auth UI (OTP flow) and settings panel
- `icon48.png` / `icon128.png` - Extension icons

### Key Architecture
- `ExtensionManager` class in `background.js` manages all state
- API URL is Base64-encoded in `background.js` (decodes to Render backend URL)
- Auth via OTP to `@codingninjas.com` emails, token stored in `chrome.storage.local`
- WebSocket reconnection with exponential backoff (max 5 attempts, 10s base delay)
- No build step required - plain JavaScript loaded directly by Chrome

### Build & Test
```bash
# No build step. Load unpacked in chrome://extensions/ with Developer mode enabled.
# To test: click extension icon, authenticate with OTP, verify WebSocket connection.
```

### n8n Workflow Automation

This project can trigger and receive n8n workflows at `https://n8n.chinmayramraika.in`.

- **Webhook URL:** Set in `N8N_WEBHOOK_URL` env var
- **API Key:** Set in `N8N_API_KEY` env var (unique per project)
- **Auth Header:** `X-API-Key: <N8N_API_KEY>`
- **Workflow repo:** github.com/Cramraika/n8n-workflows (private)

### Security Rules
- NEVER hardcode API keys, secrets, or credentials in any file
- NEVER pass credentials as inline env vars in Bash commands
- NEVER commit .env, .claude/settings.local.json, or .mcp.json to git
