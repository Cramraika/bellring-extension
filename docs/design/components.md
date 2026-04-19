# Components — Bellring

Current stack: vanilla JS + HTML + CSS for Chrome MV3 extension (popup + background + content scripts). Keep lean — extensions are bandwidth-sensitive. Future web dashboard uses Next.js 15 + Tailwind v4 + Radix + shadcn.

## Component library (extension)

- **Primitives**: Hand-authored in `popup.html` / `popup.js` / inline CSS. No framework overhead — extension bundle must stay small.
- **Icons**: Inline SVG (Lucide source). Custom `bell` mark SVGs in `assets/icons/` (three variants: at-rest, mid-ring, full-ring).
- **Animation**: CSS transitions + `@keyframes` for bell-ring. Canvas-confetti for celebration bursts (`canvas-confetti` npm package — ~10KB).

## Custom components (Bellring-specific)

These carry Bellring's identity — celebration-first, respectful of focus contexts:

- **`<BellMark />`** — the Bellring logo. Three states: `at-rest` (static), `ringing` (animating 800ms), `glow` (celebration halo).
- **`<CelebrationToast />`** — in-page toast when a teammate closes. Shows: teammate avatar + "[Name] closed [Deal]!" + deal value + mini confetti burst. 4-second auto-dismiss, dismissible.
- **`<LeaderboardRow />`** — popup row showing rep, deals-this-week, total-value. Gold/silver/bronze-highlight for top 3.
- **`<DealTile />`** — recent-closes tile in popup; shows teammate, deal, amount, time-ago.
- **`<ConfettiBurst />`** — canvas-based confetti emission using 4-color palette. Triggered on local celebration moments.
- **`<FocusMuteChip />`** — small status chip in popup showing "Focus mode ON → celebrations muted". Respectful.
- **`<CRMConnectCard />`** — onboarding card for Salesforce/HubSpot OAuth connection.

## Extension-specific constraints

- **Popup width**: 360px (Chrome standard). Design scales no wider.
- **Bundle size target**: < 150KB total (popup + background + content). Confetti + bell animations must fit inside.
- **Sound default**: OFF. Reps work in meeting-heavy contexts; sound opt-in only.
- **Focus-mode respect**: when `chrome.idle` indicates focus / do-not-disturb, celebrations suppressed + queued.

## Animation approach

- **Bell-ring**: 800ms total, CSS `@keyframes` — scale 1.0 → 1.15 → 0.95 → 1.0 with subtle rotation +5deg → -5deg → 0. Chime-tone optional (opt-in).
- **Confetti**: 2.5s burst, canvas-based, 60fps on modest hardware.
- **Celebration toast**: 300ms slide-in-up, 4s dwell, 200ms fade-out.
- **Baseline timing**: 150ms micro, 300ms reveal.
- **Reduced motion**: celebrations fall back to static bell-highlight + "🎉 [Name] closed!" text toast. No motion, no confetti.

## Accessibility posture

- Contrast: popup text passes WCAG AA on both light/dark grounds.
- Screen readers announce celebrations via `aria-live="polite"` — "Sarah closed Acme Corp deal, $45,000."
- Keyboard navigable: all popup rows focusable + Enter-actionable.
- Sound is always opt-in; visual celebration + screen-reader message is the canonical announcement.

## Future web dashboard

When the server-side web dashboard ships (`bellring-server` + web UI), use Next.js 15 + Tailwind v4 + Radix + shadcn + Framer Motion. Port the `<BellMark />`, `<CelebrationToast />`, `<LeaderboardRow />` components into the web context — same brand identity, different primitives.
