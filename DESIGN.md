# BeeAX CRM — DESIGN.md

> The BeeAX visual system. Source of truth for brand color, typography, logo, and how the
> theme is applied across the product (`packages/beeax-front`, `packages/beeax-ui`) and the
> landing/auth surfaces. Derived from the official **Beeax AI Tech — Brand Color Palette**.

## Brand identity

**Beeax AI Tech Private Limited.** The mark is a hand-drawn honeybee over a warm cream field —
approachable, crafted, a little playful. The wordmark is lowercase **beeax**. The personality is
**warm · intelligent · grounded**: an AI-native CRM that feels human, not corporate.

- **Logo:** the bee mark (`packages/beeax-front/public/images/icons/**`, app favicon + PWA icons).
- **Tone:** confident and friendly. Honey-gold does the talking; backgrounds stay calm.

## Theme

The product ships **light and dark** themes (`packages/beeax-ui/src/theme-constants/theme-light.css`
and `theme-dark.css`). The honey-gold accent is identical in both; only the surfaces invert.
Dark mode = deep navy/near-black surfaces with gold accents (matches the brand's dashboard cards).

## Color

The accent is **honey-gold** (`#D4A017`). It carries CTAs, active states, links, focus rings, and
selection highlights. Everything else is a calm neutral (cream in light, navy/near-black in dark).
Use gold deliberately — one strong accent, not a rainbow.

### Tokens (from the Brand Color Palette)

**Primary — gold (CTAs, icons, active states)**

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-primary` | `#D4A017` | Golden Yellow — primary CTAs, icons, active nav |
| `--color-primary-light` | `#F5C542` | Light Gold — hover states |
| `--color-primary-dark` | `#B8860B` | Dark Gold — pressed states |

> In the app these map onto the theme's `--t-color-blue*` / `--t-accent-*` ramps (Radix `amber`),
> so the historical "blue" primary now renders as BeeAX gold everywhere.

**Background**

| Token | Hex | Usage |
| --- | --- | --- |
| `--bg-page` | `#FDF5E6` | Warm Cream — page background (light) |
| `--bg-card-light` | `#FFF8E7` | Light Cream — feature cards |
| `--bg-card-dark` | `#1E2A3A` | Dark Navy — dashboard cards / dark surfaces |
| `--bg-navbar` | `#1A1A1A` | Near Black — sticky navbar / primary buttons |

**Text**

| Token | Hex | Usage |
| --- | --- | --- |
| `--text-heading` | `#1A1A1A` | Near Black — main headings |
| `--text-heading-hero` | `#FFFFFF` | White — hero headings on dark/gold |
| `--text-body` | `#6B7280` | Medium Gray — body text |
| `--text-body-light` | `#9CA3AF` | Light Gray — secondary text |
| `--text-section-label` | `#D4A017` | Gold — section labels / eyebrows |

**Buttons**

| Token | Value | Usage |
| --- | --- | --- |
| `--btn-primary-bg` | `#1A1A1A` | Dark "Get Started" button background |
| `--btn-cta-text` | `#D4A017` | Gold CTA text links |

**Accent (functional)**

| Token | Hex | Usage |
| --- | --- | --- |
| `--accent-orange` | `#E67E22` | Tech-stack rows |
| `--accent-red` | `#C0392B` | Bottom gradient / destructive |
| `--accent-green` | `#27AE60` | Success / "running" badge |
| `--accent-teal` | `#2ABFBF` | Contact / info accent |

**Gradient band** (hero / dividers): `#F5D547 → #F0C040 → #E8A030 → #E07020 → #C83020`
(bright yellow → gold → orange → deep orange → red). Use sparingly, large surfaces only.

## Typography

- **Hierarchy by scale + weight**, not color. Headings near-black (or white on dark/gold);
  gold reserved for eyebrows/section labels and links.
- Keep body text in the gray ramp (`#6B7280` / `#9CA3AF`) for calm contrast against cream.

## Application rules

1. **One accent.** Gold is the only brand color that should appear with intent; functional accents
   (green/red/teal/orange) are for status only.
2. **Dark buttons, gold text-CTAs.** Primary action buttons are dark (`#1A1A1A`); inline CTA links
   are gold. This matches the brand kit and the existing app button styling.
3. **Whitespace + warmth.** Cream surfaces and generous spacing — avoid cramped, cold layouts.
4. **Gold for state, not decoration.** Active nav, selected rows, focus, hover → gold tints
   (`--color-primary-light` for hover, `--color-primary-dark` for pressed).

## Accessibility

- Gold (`#D4A017`) on white/cream passes AA for large text and UI components; for **small body
  text never use gold on light** — use the near-black/gray text tokens instead.
- Maintain visible focus rings (gold) and keyboard operability on all interactive elements.

---

© 2026 Beeax AI Tech Private Limited · Confidential Brand Assets
