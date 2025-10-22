# IntelliBid Design Guidelines

## Design Approach

**Selected Approach:** Design System-based with influences from Linear (clean enterprise), Material Design (data visualization), and Notion (information density)

**Justification:** IntelliBid is a utility-focused, information-dense enterprise tool where efficiency, trust, and data clarity are paramount. Users need to process complex vendor evaluations quickly and confidently.

**Key Design Principles:**
- **Clarity over decoration**: Clean, spacious layouts that prioritize readability
- **Data hierarchy**: Clear visual distinction between primary metrics, supporting details, and contextual information
- **Trust signals**: Professional, polished interface that conveys reliability for high-stakes decisions
- **Contextual density**: Dense information where needed (comparison tables), spacious where decisions happen (shortlisting cards)

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- **Background**: 220 15% 10% (deep slate, professional)
- **Surface**: 220 15% 14% (cards, panels)
- **Surface Elevated**: 220 15% 18% (elevated cards, modals)
- **Primary Brand**: 210 100% 60% (vibrant blue for CTAs, trust)
- **Success**: 142 71% 45% (green for positive scores, approvals)
- **Warning**: 38 92% 50% (amber for risks, gaps)
- **Error**: 0 84% 60% (red for rejections, critical issues)
- **Text Primary**: 220 15% 95%
- **Text Secondary**: 220 10% 70%
- **Border**: 220 15% 25%

**Light Mode:**
- **Background**: 0 0% 100%
- **Surface**: 220 15% 98%
- **Surface Elevated**: 0 0% 100% with shadow
- **Primary Brand**: 210 100% 50%
- **Success**: 142 71% 40%
- **Warning**: 38 92% 45%
- **Error**: 0 84% 55%
- **Text Primary**: 220 20% 15%
- **Text Secondary**: 220 10% 45%
- **Border**: 220 15% 90%

### B. Typography

**Font Families:**
- **Primary**: 'Inter' (body, UI elements) - clean, highly legible
- **Data/Code**: 'JetBrains Mono' (scores, technical specs, IDs)
- **Headings**: 'Inter' with varied weights

**Type Scale:**
- **H1 (Page Titles)**: text-3xl (30px), font-semibold, tracking-tight
- **H2 (Section Headers)**: text-2xl (24px), font-semibold
- **H3 (Card Titles)**: text-xl (20px), font-medium
- **Body**: text-base (16px), font-normal
- **Small (Metadata)**: text-sm (14px), font-normal
- **Tiny (Labels)**: text-xs (12px), font-medium, uppercase, tracking-wide
- **Data/Metrics**: text-lg to text-3xl (18-30px), font-bold, font-mono

### C. Layout System

**Spacing Primitives:** We will use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm (p-2, m-4, gap-6, space-y-8, py-12, px-16).

**Grid System:**
- **Dashboard Layout**: 12-column grid with 24-column support for dense tables
- **Sidebar Navigation**: Fixed 256px (w-64) left sidebar
- **Content Area**: max-w-7xl container with responsive padding (px-4 md:px-8 lg:px-12)
- **Card Grids**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6

**Responsive Breakpoints:**
- Mobile: Base (< 768px) - single column, stacked layouts
- Tablet: md (768px+) - 2-column grids, condensed sidebar
- Desktop: lg (1024px+) - full multi-column, expanded details
- Wide: xl (1280px+) - 3+ columns for comparison views

### D. Component Library

**Navigation:**
- **Top Bar**: 64px height, logo left, search center, user/settings right, border-b
- **Sidebar**: Fixed navigation with icon + label, collapsible on mobile, grouped sections (Upload, Analysis, Shortlist, Reports)
- **Breadcrumbs**: text-sm with chevron separators for deep navigation

**Data Display:**
- **Comparison Table**: Striped rows (odd:bg-surface), sticky header, sortable columns, freeze first column for vendor names
- **Score Cards**: Large metric (text-4xl, font-bold, font-mono) with label above, trend indicator, color-coded by range
- **Progress Bars**: Rounded, filled segments, percentage label, color-coded (green > 80%, amber 60-80%, red < 60%)
- **Status Badges**: Rounded-full, px-3 py-1, text-xs, uppercase - "Recommended" (green), "Under Review" (blue), "Risk Flagged" (amber)

**Forms & Inputs:**
- **File Upload Zone**: Dashed border (border-2 border-dashed), large drop area (min-h-64), drag-over state with primary border, file type icons
- **Text Inputs**: Ring-focus, rounded-md, consistent height (h-10), clear labels above
- **Select Dropdowns**: Custom styled with chevron, searchable for long lists
- **Weight Sliders**: For evaluation criteria weighting, with numeric input, visual scale

**Cards & Containers:**
- **Proposal Cards**: Rounded-lg, border, p-6, hover:border-primary transition, vendor logo top-left, score badge top-right
- **Insight Panels**: bg-surface-elevated, rounded-lg, p-6, icon + heading + description layout
- **Role View Tabs**: Horizontal tabs with underline indicator, icons + labels

**Charts & Visualizations:**
- **Radar Chart**: For multi-criteria comparison (tech fit, cost, risk, compliance)
- **Bar Charts**: For side-by-side metric comparison, labeled axes
- **Timeline**: For delivery risk visualization, milestone markers
- Use Chart.js or Recharts with dark mode palette

**Actions:**
- **Primary Button**: bg-primary, text-white, hover:bg-primary/90, rounded-md, px-6 py-2.5, font-medium
- **Secondary Button**: border, border-border, hover:bg-surface, rounded-md, px-6 py-2.5
- **Icon Buttons**: Square (h-10 w-10), hover:bg-surface, rounded-md, for actions in tables/cards
- **Split Button**: Primary action + dropdown for related actions

**Overlays:**
- **Modals**: max-w-2xl to max-w-5xl, centered, backdrop blur, slide-up animation
- **Tooltips**: bg-surface-elevated, border, text-sm, arrow pointer, 200ms delay
- **Popovers**: For filters, quick actions, similar styling to tooltips

### E. Animations

**Minimal, purposeful animations only:**
- **Page Transitions**: None - instant navigation for speed
- **Hover States**: opacity, border-color, background changes (150ms duration)
- **Loading States**: Subtle pulse on skeleton screens, spinner for long operations
- **Expand/Collapse**: 200ms ease for accordion sections, role view changes
- **Toast Notifications**: Slide-in from top-right, 300ms, auto-dismiss

---

## Images

**Hero Section (Landing/Marketing):**
- **Placement**: Full-width hero, split layout (60% content / 40% image)
- **Image Description**: Professional dashboard screenshot showing the comparison view with multiple vendor cards, scores, and radar chart - conveys enterprise credibility and data sophistication
- **Treatment**: Subtle shadow, slight tilt (2-3deg), rounded corners, desktop mockup frame optional

**Feature Illustrations (Landing):**
- **Document Upload**: Icon-based illustration showing PDF/Excel files flowing into system
- **AI Analysis**: Abstract representation of document parsing with highlight overlays
- **Scoring Dashboard**: Simplified chart/graph illustration
- **Treatment**: Flat illustration style, 2-color palette (primary + accent), svg format

**Application Interface:**
- **Empty States**: Simple line illustrations (e.g., empty folder for no uploads yet)
- **Vendor Logos**: Placeholder slots in proposal cards (grayscale, bg-surface)
- **User Avatars**: Circle crop, initials fallback, border ring

**Critical:** All images should reinforce enterprise professionalism. Avoid stock photos of people; prefer UI screenshots, data visualizations, and abstract illustrations.