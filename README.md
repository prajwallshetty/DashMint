# 🍃 DashMint

DashMint is a premium, accessibility-first React 19 component library designed specifically for modern SaaS dashboards and productivity applications. It is styled with **Tailwind CSS v4** and animated using **Framer Motion** springs.

## 🎨 Design Philosophy

Inspired by premium productivity layouts (like Linear, Cron, and Notion):
- **Forest Green & Cream Pastel Aesthetic**: Deep forest greens (`#0C270E`), soft cream backdrops (`#F4F7F4`), and light minty accent markers.
- **Extreme Roundness**: Large rounded corners (`24px` to `32px`) for card and button interfaces.
- **Fluid Layout Transitions**: Smooth spring motion transitions when dragging cards, collapsing sidebars, or launching sheet drawers.
- **Accessibility & Focus states**: Radix UI primitives backing inputs, selections, modals, and switches.

---

## 📁 Package Architecture

DashMint uses a clean, fast `pnpm` workspaces monorepo structure:

```
packages/
 ├── themes/      # Tailwind CSS v4 design tokens and CSS variables (@theme)
 ├── icons/       # Curated wrapper and exports for Lucide React
 ├── core/        # 30+ Foundation, Layout, Productivity, and AI React components
 ├── charts/      # Custom responsive SVG charts (Area, Bar, Donut, Comparative)
 ├── templates/   # 5 full-page dashboard layout blueprints (SaaS, CRM, AI, etc.)
 └── docs/        # Vite + React 19 documentation and live playground site
```

---

## ⚡ Getting Started

### 1. Installation

Install the library packages and peer dependencies:

```bash
npm install @prajwalshetty/core @prajwalshetty/themes @prajwalshetty/icons framer-motion @radix-ui/react-dialog @radix-ui/react-select
```

### 2. Configure Tailwind CSS v4

Import the DashMint design variables directly at the top of your global CSS stylesheet:

```css
@import "tailwindcss";
@import "@prajwalshetty/themes";
```

---

## ⚙️ Development

Launch the interactive local documentation and playground site:

```bash
pnpm install
pnpm build
pnpm --filter docs dev
```