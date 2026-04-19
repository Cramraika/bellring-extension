# Design surface — Bellring

Design surface for **Bellring**. Tier A per `~/.claude/conventions/design-system.md §2`. Source of truth for palette, typography, components, voice. Any palette or typography value that appears in code (extension CSS, popup HTML, future web dashboard) MUST match this doc — mismatches are a drift-trigger per §40 `doc-vs-code drift`.

Bellring is **Vagary-family** — shares the neutral ramp and typographic rhythm with other Vagary products. Distinct primary (bellring-yellow), distinct voice (celebratory + grounded). Paired with `bellring-server` (Tier B, inherits this brand).

## File map

- `brand.md` — Name, story, mission, visual voice, audience.
- `palette.md` — Color tokens.
- `typography.md` — Display / body / mono fonts, scale.
- `components.md` — Chrome MV3 UI primitives + celebration moments.
- `voice.md` — Tone (energetic + respectful of sales-floor context).
- `references/stitch.md` — Stitch project ID pointer.
- `references/figma.md` — Figma file pointer.
- `assets/` — Bellring logo, bell icon variants, chrome-store screenshots.

## Maintenance rules

- Palette/typography changes authored here FIRST, then propagated to extension CSS + future dashboard.
- Web Store listing assets (icon, screenshots) follow this surface — update here BEFORE Web Store submission.
- Archive replaced assets to `_archive-YYYY-MM-DD/` before deletion (per §38).
