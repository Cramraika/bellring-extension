# Typography — Bellring

Approachable + energetic but not playful. Inter workhorse with a slightly warmer display font to carry celebration moments.

## Font stack

- **Display (celebrations, big numbers)**: `DM Sans` — variable, modern, slightly warm. Used for celebration moment headlines + leaderboard numbers.
- **Body (popup UI + notifications)**: `Inter` — variable, 400–600 dominant.
- **Monospace (rare — deal IDs, integration tokens)**: `JetBrains Mono`.

## Scale (px / rem / line-height)

Extension popup is small (typically 320–400px wide), so scale skews compact.

| Role | px | rem | line-height |
|---|---|---|---|
| celebration-headline | 28 | 1.75 | 1.15 (DM Sans 600) |
| h1 — popup main | 20 | 1.25 | 1.2 |
| h2 — section | 16 | 1.0 | 1.3 |
| h3 — card title | 14 | 0.875 | 1.35 |
| h4 — small label | 13 | 0.8125 | 1.4 |
| eyebrow | 11 | 0.6875 | 1.5 (uppercase, tracking +0.08em) |
| body | 14 | 0.875 | 1.55 |
| body-sm | 12 | 0.75 | 1.5 |
| leaderboard-metric | 24 | 1.5 | 1.0 (DM Sans 600) |
| caption | 11 | 0.6875 | 1.4 |

## Weights available

- DM Sans (variable): 400, 500, 600, 700.
- Inter (variable): 400, 500, 600.
- JetBrains Mono: 400, 500.

## Usage notes

- Celebration headlines use DM Sans 600 + bellring-yellow + bell-glow shadow.
- Popup body in Inter 400 at 14px (popup constraints).
- Leaderboard rep-name in Inter 500; deal-value in DM Sans 600 monospace-like feel.
- Never use all-caps beyond eyebrow micro-labels — feels aggressive in sales context.
