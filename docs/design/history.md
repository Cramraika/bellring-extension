# Design History — Bellring Extension

## 2026-04-20 — Port spec to code + manifest rename

Per `~/.claude/specs/2026-04-20-per-repo-design-audit.md` + Track 2 port + bonus manifest fix.

**Situation A**: Spec declared bellring-yellow `#FFD24A` primary + teammate-blue `#3B82F6` + Inter + JetBrains Mono. Code (action.html + popup.html) shipped pastel gray-blue gradient (`#f5f7fa → #c3cfe2`) + orange accents (`#f16222`) + Work Sans / Oswald / Poppins fonts.

**Situation B**: manifest.json still advertised "Sales Notification" + "Coding Ninjas IT Team" + `homepage_url: https://codingninjas.com` — the 2026-04-19 Bellring rename landed in `docs/design/` but not the Chrome Web Store manifest.

**Action (A — palette port)**:
- `action.html` — inline CSS rewritten. `:root` now declares full bellring token set. Ground swapped from pastel gradient to `--neutral-50`. Buttons use `--brand-primary` yellow. Toggle switch uses yellow when active. Feature-info block uses `--brand-secondary` teammate blue as the left-border accent. Connection-status dots use `--semantic-success/error`. Font stack: Inter + JetBrains Mono (replacing Work Sans + Oswald).
- `popup.html` — inline CSS rewritten. Body gradient now uses bellring yellow (`--brand-primary` → `--brand-primary-active`), the signature celebration color. Confetti palette uses the 3 brand colors + success green. Fonts: Inter (700/800 for hero title) + JetBrains Mono (for the BDE-highlight chip that shows the rep's name, instrument-style). Replaced Poppins. Kept celebration animation structure + `fa-bell` icon.

**Action (B — manifest rename)**:
- `manifest.json` — `name: "Sales Notification"` → `"Bellring"`; `description` updated to be brand-neutral; `author: "Coding Ninjas IT Team"` → `"Chinmay Ramraika / Vagary Life Pvt Ltd"`; `homepage_url: "https://codingninjas.com"` → `"https://github.com/Cramraika/bellring-extension"`.
- Icon paths (`icon48.png`, `icon128.png`) unchanged — Track 6 will commission new brand icons.
- `host_permissions` unchanged — still points at `sales-notification-backend.onrender.com`. Bellring Phase 1 (multi-tenant migration) will swap that host.

**Not touched**: `background.js`, `action.js`, `popup.js` business logic, icon PNGs, CSP. Only inline styling + manifest metadata.
