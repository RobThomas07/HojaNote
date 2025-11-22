# HojaNote Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from productivity leaders: Notion (content organization), Linear (clean aesthetics), and Google Workspace (calendar/scheduling interfaces). This approach prioritizes clarity, efficiency, and seamless multitasking for student workflows.

## Core Design Principles
1. **Information Density with Breathing Room**: Dense content organized through clear hierarchy and strategic spacing
2. **Persistent Navigation**: Always-accessible sidebar for quick context switching
3. **Canvas Flexibility**: Distinct visual modes for typed vs. handwritten notes
4. **Purposeful Advertisements**: Integrated sidebar ads that don't disrupt workflow

---

## Typography System

**Font Families:**
- Primary: Inter (UI elements, body text)
- Monospace: JetBrains Mono (code snippets in notes)

**Type Scale:**
- Headlines: text-2xl (24px) font-semibold
- Section Headers: text-lg (18px) font-medium  
- Body Text: text-base (16px) font-normal
- Metadata/Labels: text-sm (14px) font-medium
- Captions: text-xs (12px)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 8, 12, and 16** consistently
- Component padding: p-4, p-8
- Section margins: mb-8, mb-12
- Tight spacing: gap-2
- Comfortable spacing: gap-4, gap-8

**Grid Structure:**
```
├── Left Sidebar (w-64): Navigation + Ad Slot
├── Main Content Area (flex-1): Dynamic workspace
└── Right Panel (w-80, toggleable): Context panel for metadata/tags
```

**Container Constraints:**
- Max content width: max-w-6xl for note editor
- Sidebar: Fixed 256px width
- Advertisement sections: Fixed within sidebar flow

---

## Component Library

### Navigation & Sidebar
**Main Sidebar:**
- Sticky positioning (sticky top-0 h-screen)
- Vertical navigation stack with icons + labels
- Sections: Dashboard, All Notes, Handwritten, Reminders, Schedule
- Advertisement slot at bottom (h-64) with subtle border separation
- User profile/settings at very bottom

### Dashboard View
**Layout:** 3-column grid (grid-cols-3 gap-8)
- Recent Notes card (full-width across columns)
- Upcoming Reminders panel
- Today's Schedule panel
- Quick Stats (notes count, pending tasks)

### Notes Editor
**Typed Notes:**
- Full-width editor with toolbar (sticky top-0)
- Toolbar: text-sm buttons with gap-2 spacing
- Content area: max-w-4xl mx-auto with generous py-12 px-8
- Side metadata panel: Tags, created/modified dates, category selector

**Handwritten Canvas:**
- Full-viewport canvas area (min-h-screen)
- Floating toolbar (fixed bottom-4 left-1/2 transform -translate-x-1/2)
- Tools: Pen sizes, eraser, colors, undo/redo with icon-only buttons
- Canvas background: subtle dot grid pattern for writing guides

### Reminders System
**List View:**
- Stacked reminder cards with gap-3
- Each card: Checkbox, title, time display, edit/delete actions
- Grouped by: Today, Upcoming, Completed
- Compact density: py-3 px-4 per card

**Add Reminder Modal:**
- Centered overlay (max-w-md)
- Vertical form stack with gap-4
- Date/time picker, title input, optional description textarea

### Schedule/Calendar
**Weekly View (Primary):**
- 7-column grid representing days
- Time slots as rows (hourly blocks)
- Event cards positioned absolutely within time blocks
- Header row: Day names with current day highlight
- Compact on mobile: Switch to agenda list view

**Month View (Secondary):**
- Traditional calendar grid
- Small event indicators (dots) within date cells
- Click to expand day details

### Advertisement Integration
**Sidebar Ad Slots:**
- 2 positions: Mid-sidebar (after navigation), Bottom-sidebar
- Fixed heights: h-48 (mid), h-64 (bottom)
- Border separation with subtle padding (p-4)
- Placeholder states with centered "Advertisement" label

---

## Form Inputs & Interactions

**Input Fields:**
- Consistent height: h-10 for single-line, h-24 for textarea
- Padding: px-4 py-2
- Border treatment and focus states consistent throughout

**Buttons:**
- Primary actions: px-6 py-2 rounded-lg font-medium
- Secondary actions: px-4 py-2 rounded-md  
- Icon buttons: p-2 square aspect ratio

**Search Bar:**
- Prominent placement in top navigation
- Icon prefix, placeholder text
- Width: w-80 on desktop, expands on mobile

---

## Special Features

### Note Organization
**Tag System:**
- Inline tags with rounded-full badges (px-3 py-1 text-xs)
- Tag colors assigned by subject/category (system-managed)
- Filter chips: Horizontal scrollable row when multiple filters active

### Context Panels
**Right Panel (Toggleable):**
- Metadata display
- Related notes suggestions
- Attachment previews
- Version history (for typed notes)
- Slide-in animation from right

### Empty States
- Centered icon + heading + description + CTA button
- Illustrations for: No notes yet, No reminders, Empty schedule
- Encouraging copy specific to each section

---

## Responsive Behavior

**Desktop (1024px+):** Full 3-panel layout with sidebar + main + right panel  
**Tablet (768px-1023px):** Collapsible sidebar (hamburger), hide right panel by default  
**Mobile (<768px):** Bottom tab navigation, single-column content, hide advertisements

**Touch Optimizations:**
- Handwriting canvas: Full-screen mode on tablets/touch devices
- Larger touch targets: min-h-12 for interactive elements on mobile
- Swipe gestures: Delete reminders, navigate calendar days

---

## Accessibility
- Semantic HTML throughout (nav, main, article, aside)
- ARIA labels for icon-only buttons
- Keyboard shortcuts displayed in tooltips
- Focus indicators consistent across all interactive elements
- Screen reader announcements for dynamic content (new reminders, note saves)

---

## Animation Philosophy
**Minimal and Purposeful:**
- Modal open/close: Fast fade + scale (duration-200)
- Sidebar toggle: Smooth width transition (duration-300)
- Success confirmations: Brief toast notifications (slide from top)
- No continuous animations - battery/performance priority for student devices