# Palette — Bellring

Vagary-family member. **Shares neutral ramp** with other Vagary products. **Distinct primary** (bellring-yellow — the bell) + **distinct secondary** (bellring-blue — teammate accent).

## CSS custom-properties (authoritative)

```css
:root {
  /* PRIMARY — bellring yellow (the bell, celebration moments) */
  --brand-primary:        #FFD24A;     /* bellring yellow */
  --brand-primary-hover:  #FFE07A;
  --brand-primary-active: #DAB139;

  /* SECONDARY — teammate blue (avatars, "they closed" badges) */
  --brand-secondary:        #3B82F6;
  --brand-secondary-hover:  #5B95F7;
  --brand-secondary-active: #256AD9;

  /* TERTIARY — celebration magenta (rare, confetti only) */
  --brand-tertiary:       #E91E63;

  /* Neutral ramp — shared Vagary family */
  --neutral-50:  #F5F7FB;
  --neutral-100: #E6EAF2;
  --neutral-200: #C4CAD8;
  --neutral-300: #939BAF;
  --neutral-400: #646C83;
  --neutral-500: #424A60;
  --neutral-600: #2C3347;
  --neutral-700: #1C2134;
  --neutral-800: #121626;
  --neutral-900: #0A0D1A;
  --neutral-950: #05070F;

  /* Semantic */
  --semantic-success: #3CCB7F;   /* deal closed */
  --semantic-warning: #FFB547;
  --semantic-error:   #FF5E6F;
  --semantic-info:    #5EBAFF;

  /* Celebration surfaces */
  --bell-glow:      0 0 40px rgba(255, 210, 74, 0.5);
  --confetti-1:     var(--brand-primary);
  --confetti-2:     var(--brand-secondary);
  --confetti-3:     var(--brand-tertiary);
  --confetti-4:     var(--semantic-success);
}
```

## Tailwind-compatible names

```ts
colors: {
  brand: {
    primary:   { DEFAULT: '#FFD24A', hover: '#FFE07A', active: '#DAB139' },
    secondary: { DEFAULT: '#3B82F6', hover: '#5B95F7', active: '#256AD9' },
    tertiary:  '#E91E63',
  },
  neutral: {
    50: '#F5F7FB', 100: '#E6EAF2', 200: '#C4CAD8', 300: '#939BAF',
    400: '#646C83', 500: '#424A60', 600: '#2C3347', 700: '#1C2134',
    800: '#121626', 900: '#0A0D1A', 950: '#05070F',
  },
  semantic: {
    success: '#3CCB7F', warning: '#FFB547', error: '#FF5E6F', info: '#5EBAFF',
  },
}
```

## Usage notes
- Default popup ground: `--neutral-50` light mode / `--neutral-900` dark mode (Chrome preference-aware).
- Bellring yellow reserved for **celebration moments + the bell mark + primary CTAs**.
- Teammate blue for **avatars + "they closed" badges + leaderboard accents**.
- Confetti palette uses all four celebration colors at 50% saturation — never full-sat (too screamy).
- Bell glow for celebratory overlays ONLY — never ambient.
