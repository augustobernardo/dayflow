---
name: High-Efficiency Dark Mode System
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#494949'
  on-secondary-container: '#b9b8b8'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1rem
  margin: 1.5rem
  sidebar_width: 240px
---

## Brand & Style
The design system is engineered for high-performance productivity, blending the utilitarian precision of developer tools with the refined elegance of premium SaaS interfaces. It adopts a **Minimalist-Technical** aesthetic, characterized by deep-space backgrounds, high-contrast typography, and a "low-noise" philosophy. 

The visual narrative centers on "Focus through Depth." By stripping away unnecessary ornamentation and relying on subtle tonal shifts, the UI disappears into the background, allowing the user's tasks and data to take center stage. Every interaction should feel instantaneous and intentional, evoking the speed of a command-line interface with the accessibility of a modern web app.

## Colors
This design system utilizes a monochromatic foundation punctuated by high-vibrancy functional accents.

- **Foundations:** The primary background is a true deep black (`#0A0A0A`). Surface layers use charcoal (`#1A1A1A`) to create hierarchy.
- **Borders:** Component boundaries are defined by a subtle dark gray (`#262626`), ensuring structure without visual clutter.
- **Accents:** 
  - **Blue:** Primary actions and selection states.
  - **Purple:** Features, AI enhancements, or power-user flows.
  - **Emerald:** Success states, completed tasks, and positive growth analytics.
  - **Orange:** High-priority warnings, urgent deadlines, and critical focus areas.
- **Typography:** Pure white is reserved for headings. Secondary text uses a 70% opacity white to maintain hierarchy and reduce eye strain in low-light environments.

## Typography
The system utilizes **Geist** for its clean, geometric, yet technical feel, ensuring maximum legibility at small sizes. **JetBrains Mono** is introduced as a secondary typeface for metadata, labels, and status indicators to reinforce the high-productivity, tool-like nature of the application.

- **Scale:** Use tight line heights for headlines to create a dense, professional look. Increase line height for body text to `1.6` for long-form task descriptions.
- **Tracking:** Apply slight negative letter-spacing to large headlines and slight positive tracking to mono labels for enhanced readability.
- **Mobile:** Scale `display` and `headline-lg` down by 20% on mobile devices, while keeping body text and labels consistent to ensure touch-target alignment.

## Layout & Spacing
The design system follows a **Fixed-Fluid Hybrid** model. The sidebar remains fixed at `240px`, while the main content area utilizes a fluid 12-column grid.

- **The 4px Rule:** All spacing increments must be multiples of 4px. This creates a rhythmic, predictable density common in pro-level tools.
- **Density:** Use `sm` (8px) for internal component padding (e.g., inside buttons or inputs) and `md` (16px) for layout spacing between cards and widgets.
- **Breakpoints:**
  - **Desktop (1280px+):** Full sidebar visibility, 3-column widget layout.
  - **Tablet (768px - 1279px):** Collapsed sidebar (icon only), 2-column layout.
  - **Mobile (<767px):** Bottom navigation or hamburger menu, single column fluid layout with `1rem` horizontal margins.

## Elevation & Depth
In a true-black environment, depth is communicated through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Surface 0 (Base):** `#0A0A0A` - The primary canvas.
- **Surface 1 (Cards/Widgets):** `#1A1A1A` - Used for task cards and main containers.
- **Surface 2 (Popovers/Modals):** `#262626` - Used for elements that sit on top of the primary UI.
- **Outlines:** Every elevated element must have a `1px` solid border of `#262626` or a semi-transparent white (`rgba(255,255,255,0.1)`). 
- **Shadows:** Use a single, highly-diffused shadow for modals only: `0 20px 40px rgba(0,0,0,0.4)`. Avoid shadows on standard cards to maintain a flat, fast aesthetic.

## Shapes
The system uses a **Rounded** shape language to soften the high-contrast technical aesthetic.

- **Standard Elements:** Buttons, inputs, and small cards use `0.5rem` (8px) corners.
- **Large Containers:** Sidebar sections, main content areas, and large analytics widgets use `1rem` (16px) for a more structured, modern container feel.
- **Interactive States:** On hover, interactive elements should maintain their corner radius but may scale slightly (1.02x) or brighten in border-color to provide tactile feedback.

## Components
Consistent styling across the MUI + Tailwind architecture:

- **Buttons:**
  - **Primary:** White background, black text, no border.
  - **Secondary:** Transparent background, `#262626` border, white text. Hover state: background becomes `rgba(255,255,255,0.05)`.
- **Task Cards:**
  - Background: Surface 1 (`#1A1A1A`).
  - Border: `1px solid #262626`.
  - On Hover: Border changes to Blue Accent or a brighter gray.
- **Input Fields:**
  - Background: Black (`#0A0A0A`).
  - Border: `#262626`.
  - Focus State: Border color moves to Primary Blue with a subtle `2px` outer glow.
- **Sidebar Navigation:**
  - Clean vertical list with 8px spacing between items.
  - Active state: Subtle background tint (`#262626`) and a vertical 2px accent line on the far left.
- **Analytics Widgets:**
  - Use mono-labels for axes. Charts should use the Accent Palette (Emerald for growth, Orange for risk).
- **Chips/Status:**
  - Use JetBrains Mono at 10px. Rounded-full (pill). Low-opacity background fills with high-opacity text colors (e.g., Emerald text on `rgba(16, 185, 129, 0.1)` background).
