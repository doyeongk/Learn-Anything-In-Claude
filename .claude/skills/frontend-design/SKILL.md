# Distinctive UI Generation

Guidelines for generating landing pages and site components that avoid generic "AI-generated" aesthetics. The goal is a page that looks like a human designer made deliberate choices, not like a template was filled in.

## The Core Principle

AI-generated websites share a recognisable sameness: centred layouts, safe colour palettes, identical card grids, stock illustration style, "Get Started" buttons that lead nowhere. This sameness is the enemy. Every design decision in this guide is oriented towards breaking that pattern.

Being distinctive does not mean being chaotic. It means making COMMITTED aesthetic choices. A brutalist site commits to brutalism. A Swiss grid site commits to the grid. The worst outcome is a site that hedges — a bit of brutalism here, a bit of gradient there, rounded corners on half the elements. Commit.

## Commit to an Aesthetic

Before generating any UI, choose ONE aesthetic direction. The choice should match the learning topic's character.

### Aesthetic Options

| Aesthetic | Character | Best For | Signature Elements |
|-----------|-----------|----------|-------------------|
| **Brutalist** | Raw, honest, confrontational | Technical topics, systems programming, security | Exposed structure, monospace type, harsh borders, no curves, raw HTML feel |
| **Editorial** | Sophisticated, typographic, magazine-like | Writing, design, humanities, business | Large serif headings, generous whitespace, pull quotes, multi-column layouts |
| **Retro-futuristic** | Nostalgic tech, CRT vibes, synthwave | Game dev, retro computing, creative coding | Scanlines, neon on dark, pixel elements, terminal fonts, glow effects |
| **Neo-grotesque** | Clean, contemporary, Bauhaus-influenced | Modern web dev, UX design, startups | Tight grids, bold sans-serif, limited colour, strong hierarchy |
| **Organic/warm** | Handcrafted, approachable, human | Education, cooking, arts, personal development | Warm colours, textured backgrounds, hand-drawn elements, rounded shapes |
| **Swiss/grid** | Precise, rational, systematic | Data science, engineering, mathematics | Strict grid, Akzidenz/Helvetica style, asymmetric balance, rules and lines |
| **Maximalist gradient** | Bold, playful, attention-grabbing | Creative tools, social media, marketing | Multi-stop gradients, oversized type, layered elements, motion |
| **Paper/print** | Tactile, bookish, scholarly | Academic subjects, history, literature, philosophy | Paper textures, serif type, footnote style, muted palette, print-inspired layout |

### Selection Heuristic

If the topic does not suggest an obvious match:
1. **Technical/engineering topics** → Neo-grotesque or Swiss/grid
2. **Creative/artistic topics** → Editorial or maximalist gradient
3. **Academic/scholarly topics** → Paper/print or editorial
4. **Beginner-friendly topics** → Organic/warm
5. **Default for this project** → Paper/print with scholarly warmth (matches the "learn anything" brand)

## Typography

### The Anti-Pattern

Never use: Inter, Arial, Roboto, Open Sans, Lato, or system-ui as display fonts. These are safe defaults that signal "I didn't make a choice." They are fine for body text in applications, but not for a landing page that needs character.

### Type Pairing Strategy

Choose a **display face** (for headings, hero text) and a **body face** (for paragraphs, UI text). They should contrast but not clash.

**Contrast axes:**
- Serif + Sans-serif (classic contrast)
- High-contrast + Low-contrast (thick/thin strokes vs uniform strokes)
- Decorative + Neutral (personality heading, readable body)

### Project Default Pairing

- **Headings**: Source Serif 4 — scholarly warmth, variable weight, excellent at large sizes
- **Body**: DM Sans — clean geometric sans, good readability, slightly distinctive letterforms (the lowercase 'a' and 'g' have character)

### Alternative Pairings by Aesthetic

| Aesthetic | Heading | Body |
|-----------|---------|------|
| Brutalist | Space Mono, JetBrains Mono | System monospace, Courier |
| Editorial | Playfair Display, Fraunces | Source Sans 3, Libre Franklin |
| Retro-futuristic | Press Start 2P (sparingly), Space Grotesk | IBM Plex Mono, Fira Code |
| Neo-grotesque | Clash Display, General Sans | Satoshi, Plus Jakarta Sans |
| Organic/warm | Lora, Merriweather | Nunito, Quicksand |
| Swiss/grid | Bebas Neue, Anton | Work Sans, Barlow |
| Maximalist gradient | Outfit, Syne | Inter Tight, Manrope |
| Paper/print | Cormorant Garamond, EB Garamond | Literata, Spectral |

### Loading Fonts

Use Google Fonts via `<link>` tags in `docusaurus.config.js` headTags or in the component's `<Head>`:

```jsx
<Head>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;1,8..60,400&family=DM+Sans:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</Head>
```

Always use `display=swap` to prevent invisible text during loading.

## Colour Palette

### Define as CSS Variables

Every palette should be defined as CSS custom properties for consistency and easy theming:

```css
:root {
  --color-primary: hsl(30, 50%, 20%);      /* deep brown */
  --color-secondary: hsl(30, 30%, 40%);    /* warm mid-tone */
  --color-accent: hsl(35, 80%, 55%);       /* amber */
  --color-background: hsl(40, 30%, 95%);   /* warm cream */
  --color-text: hsl(30, 20%, 15%);         /* near-black warm */
  --color-text-muted: hsl(30, 15%, 45%);   /* subdued text */
  --color-surface: hsl(40, 25%, 92%);      /* slightly darker cream */
  --color-border: hsl(30, 20%, 80%);       /* subtle warm border */
}
```

### Use HSL for Systematic Variations

HSL (hue, saturation, lightness) makes it easy to derive variations:
- **Lighter**: increase lightness
- **Darker**: decrease lightness
- **Muted**: decrease saturation
- **Vibrant**: increase saturation
- **Harmonious**: rotate hue by 30 for analogous, 180 for complementary

### The Warm Palette (Project Default)

The project's base aesthetic is scholarly warmth. The palette:

| Role | HSL | Hex | Description |
|------|-----|-----|-------------|
| Primary | `hsl(30, 50%, 20%)` | `#4D3319` | Deep brown — headings, emphasis |
| Secondary | `hsl(30, 30%, 40%)` | `#856647` | Warm mid-tone — secondary text |
| Accent | `hsl(35, 80%, 55%)` | `#D9942B` | Amber — links, highlights, CTA |
| Background | `hsl(40, 30%, 95%)` | `#F5F0E8` | Warm cream — page background |
| Text | `hsl(30, 20%, 15%)` | `#302620` | Near-black warm — body text |
| Surface | `hsl(40, 25%, 92%)` | `#EDE7DC` | Slightly darker cream — cards |
| Border | `hsl(30, 20%, 80%)` | `#D4C9BC` | Subtle warm — dividers |

### Palette Anti-Patterns

- **Pure white backgrounds** (`#FFFFFF`): Too clinical. Use an off-white with a hint of warmth or coolness.
- **Pure black text** (`#000000`): Too harsh. Use a near-black with a colour cast.
- **Rainbow gradients**: Screams "AI generated". Use gradients within a single hue family.
- **Neon accent on neutral base**: The "startup landing page" cliche. Avoid unless the aesthetic calls for it.

## Spatial Composition

### Breaking the AI Pattern

The standard AI layout: hero (centred text, CTA button) → three-column feature cards → testimonials → footer. This is the McDonald's of web design — universally recognisable and utterly forgettable.

### Alternative Compositions

**Asymmetric hero**: Place the heading off-centre. Use the empty space intentionally. A heading aligned to the left third with a decorative element in the right two-thirds creates tension and interest.

**Varied section heights**: Not every section needs to be 100vh. Some sections can be compact (200px). Others can breathe (80vh). Variation creates rhythm.

**Overlapping elements**: A card that breaks out of its container's bounds. A heading that extends into the section above. An image that bleeds to the edge. These create visual interest and suggest intentional design.

**Non-uniform grids**: Instead of 3 equal columns, try 1fr 2fr, or a masonry-like arrangement, or a single wide element followed by two narrow ones.

**Full-bleed elements**: Let some elements stretch edge-to-edge while others are constrained to a content width. The contrast between contained and uncontained creates spatial hierarchy.

### Layout Principles

1. **The grid is a tool, not a prison.** Use CSS Grid. Set up a grid. Then let elements break it occasionally.
2. **White space is not wasted space.** It directs attention. Large gaps between sections create breathing room. But be intentional — too much space between related elements suggests they are unrelated.
3. **Asymmetry signals intention.** Centred layouts are safe but passive. Asymmetric layouts suggest a designer made a choice.
4. **Size communicates importance.** The most important thing should be the largest. The second most important should be findable. Everything else should be discoverable.

## Motion

### When to Animate

- **Page load**: Fade in the hero content. Stagger element entrances. This sets the tone.
- **Scroll reveals**: Elements that enter the viewport can fade/slide in. Use `IntersectionObserver`.
- **Hover states**: Buttons, cards, links — subtle scale, colour shift, or underline animations on hover.
- **State transitions**: Loading states, accordion open/close, tab switches.

### When NOT to Animate

- **Decorative loops**: Spinning logos, pulsing backgrounds, bouncing elements. These are distracting and add no information.
- **Content that is already visible**: If an element is above the fold on load, animating it is a delay, not a reveal.
- **Navigation**: Page transitions should be near-instant. Users navigating want speed.
- **Text**: Never animate body text (fade, slide, etc.). It hinders reading.

### Implementation

Prefer CSS transitions and animations over JavaScript animation libraries. CSS animations are hardware-accelerated and more performant.

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

For scroll-triggered reveals, use a minimal `IntersectionObserver`:

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

### Respecting Preferences

Always include:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is not optional. Users who set `prefers-reduced-motion` may have vestibular disorders or motion sensitivity.

## Atmosphere

### Backgrounds That Create Mood

Flat solid colours for hero sections are a missed opportunity. Instead:

**Subtle gradients**: A gentle shift between two related colours across the section. Use radial gradients offset to a corner for natural light-source feeling.

```css
.hero {
  background: radial-gradient(
    ellipse at 30% 20%,
    hsl(40, 35%, 97%),
    hsl(35, 25%, 90%)
  );
}
```

**Grain texture**: A subtle noise overlay adds tactile warmth. Use an SVG filter or a tiny tiling PNG:

```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}
```

**Geometric patterns**: Subtle repeated shapes (dots, lines, grids) at very low opacity. Use CSS gradients to generate them without image assets.

**Decorative elements**: Abstract shapes positioned in the background using CSS — circles, rotated squares, blurred blobs. Keep them subtle (low opacity, large blur radius).

## Content Hierarchy

### The Rule of Three Levels

1. **Unmissable**: The hero heading and primary CTA. The user sees this first, without scrolling.
2. **Findable**: The value proposition, key features, or curriculum overview. The user finds this by scrolling once.
3. **Discoverable**: Secondary information — how it works, FAQ, about. The user discovers this when exploring.

### Hierarchy Tools

- **Size**: The most important text is the largest. This is non-negotiable.
- **Weight**: Bold for emphasis, regular for body. Do not bold entire paragraphs.
- **Space**: More whitespace around important elements. Elements surrounded by space receive more attention.
- **Colour**: Use accent colour sparingly for maximum impact. If everything is accented, nothing is.
- **Position**: Top of page > bottom of page. Left (in LTR) > right for reading order. But asymmetric placement can subvert this for artistic effect.

### Do NOT rely on colour alone. Size, weight, and space should be sufficient to communicate hierarchy even in greyscale.

## Dark Mode

### Not an Afterthought

Dark mode is not "invert the colours." It requires a separate palette designed for comfort on dark backgrounds.

### Dark Mode Palette Guidelines

- **Background**: Not pure black (`#000`). Use a very dark grey with a colour cast: `hsl(30, 10%, 10%)` for warm, `hsl(220, 15%, 12%)` for cool.
- **Text**: Not pure white (`#FFF`). Use a slightly muted light: `hsl(30, 10%, 85%)`. This reduces contrast glare.
- **Accent**: Lighten the light-mode accent. An amber that works on cream may look muddy on dark backgrounds. Increase lightness by 10-15%.
- **Surfaces**: Lighter than background, darker than text. `hsl(30, 10%, 15%)` for cards on a 10% lightness background.
- **Borders**: Subtle. `hsl(30, 10%, 20%)`. Should separate, not dominate.

```css
[data-theme='dark'] {
  --color-primary: hsl(35, 60%, 70%);
  --color-secondary: hsl(30, 25%, 60%);
  --color-accent: hsl(35, 85%, 65%);
  --color-background: hsl(30, 10%, 10%);
  --color-text: hsl(30, 10%, 85%);
  --color-text-muted: hsl(30, 10%, 55%);
  --color-surface: hsl(30, 10%, 15%);
  --color-border: hsl(30, 10%, 22%);
}
```

### Dark Mode Considerations

- Reduce contrast slightly. Light-on-dark is more fatiguing than dark-on-light at the same contrast ratio.
- Shadows are less effective on dark backgrounds. Use borders or subtle background differences instead.
- Images may look too bright. Consider adding a slight opacity reduction or a dark overlay on decorative images.
- Test both modes. Generating a dark mode palette without viewing it leads to surprises.

## Anti-Patterns to Avoid

### The "AI Slop" Checklist

Avoid ALL of the following. If your generated page has any of these, redesign:

- **Centred everything**: Not every heading and paragraph should be `text-align: center`. Use left alignment as the default; centre only for hero text or short labels.
- **Identical card grids**: Three cards in a row, same size, same padding, icon top, heading middle, text bottom. This is the #1 AI layout. Break it: vary card sizes, use a different layout for one card, use a list instead.
- **Stock illustration style**: Flat vector people in abstract poses, pastel colours, geometric shapes. Do not describe or request these. Use typography, colour, and space instead of illustrations.
- **"Get Started" CTAs that lead nowhere**: If the button says "Get Started", it must lead to a real starting point. Better: use specific language ("Clone the Repo", "Begin the Curriculum").
- **Rainbow gradients**: Multiple hues in one gradient. Stick to analogous colours (30-degree hue range).
- **Excessive whitespace between sections**: Each section floating in a sea of space with no visual connection to its neighbours. Use overlapping elements, shared backgrounds, or continuous lines to connect sections.
- **Generic hero images**: Abstract shapes, blurred gradients, stock photos of "learning". Use typography and colour to create the hero, not imagery.
- **Five-item feature grids**: Five features with icons in a uniform grid. This is a template, not a design.
- **"Powered by AI" badges**: The user already knows. Do not advertise it on the landing page.
- **Testimonial carousels**: Especially with fake placeholder testimonials. Just don't.

## Implementation

### Output Format

Generate the landing page as a React component for Docusaurus's `src/pages/index.js`. The component should be self-contained — all styles inline or in a CSS module imported from the same directory.

### Component Structure

```jsx
import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

export default function Home() {
  // Scroll reveal logic here if using animations

  return (
    <Layout
      title="Your Course Title"
      description="One-line description">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
      </Head>
      <main style={styles.main}>
        {/* Hero section */}
        {/* Content sections */}
        {/* Footer / CTA */}
      </main>
    </Layout>
  );
}

const styles = {
  main: {
    fontFamily: "'DM Sans', sans-serif",
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-background)',
  },
  // ... more styles
};
```

### Style Approach

- **Inline styles**: Use for simple, one-off styles. Fine for landing pages where components are not reused.
- **CSS modules**: Use for anything with pseudo-classes (`:hover`, `::before`), media queries, or complex selectors. Create a `index.module.css` alongside `index.js`.
- **CSS custom properties**: Always use for colours, fonts, and spacing values. Defined in `:root` and `[data-theme='dark']`.
- **No external CSS frameworks**: Do not import Tailwind, Bootstrap, or any CSS framework. The component should be self-contained and opinionated.

### Responsive Design

- Use CSS Grid and Flexbox for layout. No fixed widths.
- Test at three breakpoints: 375px (mobile), 768px (tablet), 1200px+ (desktop).
- Mobile-first: base styles for mobile, use `@media (min-width: ...)` for larger screens.
- Typography should scale: use `clamp()` for fluid type sizing.

```css
.heroHeading {
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
  line-height: 1.1;
}
```

### Performance

- No external JavaScript libraries for animation. CSS only, plus a small `IntersectionObserver` if needed.
- Fonts: max 2 families, max 3 weights total. Each additional weight is a network request.
- Images: lazy-load below-the-fold images with `loading="lazy"`.
- Total page weight for the landing page should be under 200KB excluding fonts.
