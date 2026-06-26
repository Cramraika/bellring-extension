---
# Machine-readable brand-voice instance — schema per platform-docs
# 02-governance/brand-voice.md §V.2 (L1.3). Derived (not copied) from the prose below.
# tone_axes + voice_attributes are DRAFT seeds (spec L1.4) — operator/brand-owner RATIFY pending (§V.7).
brand_voice:
  brand: bellring                     # canonical brand id (parked product; bellring-extension + bellring-server)
  entity_umbrella: "{{legal-entity}}" # thin billing/legal umbrella — NEVER a hardcoded registered string
  derives_from: "~/.claude/conventions/Vagary-Brand-Guidelines.pdf §13"  # reference, not mandate
  independence: family                # shares Vagary Labs family DNA (spec L1.4)
  last_reviewed: 2026-06-26
  owner: chinmay
  status: draft-unratified            # axis values + attributes are illustrative seeds (spec L1.4), not ratified

  # tone dimensions: 1..5 position on each named axis (DRAFT seeds — operator-ratify)
  tone_axes:
    formality:        2   # sales-floor energy (rep-facing); formal only in RevOps admin copy
    warmth:           4   # respectful, celebratory of the individual rep
    authority:        3   # peer-celebratory, not lecturing
    playfulness:      3   # celebratory but selective (not an emoji party)
    energy:           4   # sales floors are loud in spirit; Bellring echoes that
    directness:       4   # active verbs (closed, landed, won, shipped)
    technicality:     2   # real sales language, no MBA-speak

  voice_attributes: [celebratory, energetic, simple]   # spec L1.4 seed

  audience: "Sales reps (celebration-facing) + RevOps admins (install/config-facing)"
  reading_level: grade-8
  primary_locale: en-US
  locales: [en-US, en-IN]

  lexicon:
    prefer:   [closed, landed, won, shipped, "your win"]
    avoid:    [synergy, "closed bigger than", "we (when the rep deserves you)"]
    banned:   []
    capitalization:
      product_name: "Bellring"
      never_lowercase: true

  do:
    - "Name the rep by name (Sarah closed Acme!) — recognition is the point."
    - "Cite the deal value when it's visible in the CRM (honors the work)."
    - "Use active verbs: closed, landed, won, shipped; celebrate small wins too."
    - "Write installation copy for RevOps admins as clearly as a CRM tutorial."
  dont:
    - "Don't turn every close into an emoji party — selective > saturated."
    - "Don't compare reps publicly in celebration copy — Bellring isn't a ranking tool."
    - "Don't use 'we' when the rep deserves 'you' — celebrate the individual."
    - "Don't use emojis in admin-facing copy; only trigger celebrations for closed-won."

  surfaces: [web-store-listing, celebration-toast, onboarding, admin-config, error]
---

# Voice — Bellring

## Tone adjectives
- **Energetic** — sales floors are loud in spirit; Bellring echoes that energy.
- **Respectful** — of the rep closing, of the team watching, of the context (call-heavy work).
- **Specific** — name names, cite numbers, honor the win.
- **Unpretentious** — no MBA-speak, no "synergy" — real sales language.

## Do's

- **Do** name the rep by name ("Sarah closed Acme!") — recognition is the point.
- **Do** cite the deal value when it's visible in the CRM (honors the work).
- **Do** use active verbs: "closed", "landed", "won", "shipped".
- **Do** celebrate small wins too — first-close-of-the-month matters.
- **Do** write installation copy for RevOps admins as clearly as a CRM tutorial.

## Don'ts

- **Don't** turn every close into an emoji party — selective > saturated.
- **Don't** compare reps publicly in celebration copy ("Sarah closed bigger than Mike!") — Bellring isn't a ranking tool.
- **Don't** use "we" when the rep deserves "you" — celebrate the individual, not the company.
- **Don't** use emojis in admin-facing copy (RevOps reads formally).
- **Don't** trigger celebrations for pipeline stage changes — only for **closed won**.

## Sample copy

- **Web Store one-liner**: *"Celebrate every closed deal with your team — without leaving the CRM."*
- **Celebration toast**: *"Sarah just closed Acme Corp — $45,000. The team's at $182K this week."*
- **Onboarding CTA**: *"Connect your CRM →"*
- **Focus-mode chip**: *"Focus mode on — celebrations muted until 3pm."*
- **Error (CRM auth fails)**: *"Salesforce sign-in didn't complete. Try again, or reach out: support@bellring.app"*
- **Empty state (no deals this week)**: *"Your team's quiet this week. First close gets a double bell."*
