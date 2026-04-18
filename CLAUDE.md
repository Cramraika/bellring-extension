# Sales Notification Extension

## Claude Preamble
<!-- VERSION: 2026-04-18-v7 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws** (§4), **MCP routing** (§6), **Drift protocol** (§11), **Dynamic maintenance** (§14), **Capability resolution** (§15), **Subagent SKILL POLICY** (§16), **Session continuity** (§17), **Decision queue** (§17.a), **Attestation** (§18), **Cite format** (§19), **Three-way disagreement** (§20), **Pre-conditions** (§21), **Provenance markers** (§22), **Redaction rules** (§23), **Token budget** (§24), **Tool-failure fallback** (§25), **Prompt-injection rule** (§26), **Append-only discipline** (§27), **BLOCKED_BY markers** (§28), **Stop-loss ladder** (§29), **Business-invariant checks** (§30).

**All preloaded from** `~/.claude/conventions/universal-claudemd.md`. Before significant work: read universal file sections relevant to the task. Re-audit status: next due 2026-07-18. Sync script: `~/.claude/scripts/sync-preambles.py`.

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
