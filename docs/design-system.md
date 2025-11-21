# FlowList - UI/UX Design System
**Version:** 1.0
**Date:** 2025-11-20
**Design Philosophy:** Minimal, Modern, Card-Based Interface

**Reference Screens:** [`plan/screen.png`](../plan/screen.png), [`plan/sample-screens.png`](../plan/sample-screens.png)
**Color Palette:** [`plan/color palette.png`](../plan/color%20palette.png)

> **Note:** This design system maintains the visual style and patterns shown in the reference screens ([`screen.png`](../plan/screen.png)) while adapting them for FlowList's specific features and functionality.

---

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Component Library](#component-library)
3. [Screen Designs](#screen-designs)
4. [Interaction Patterns](#interaction-patterns)
5. [Responsive Behavior](#responsive-behavior)

---

## Design Tokens

### Color Palette

**Primary Colors:**
```
Primary Purple: #546FFF
  - Used for: Primary actions, active states, mood indicators
  - Accessibility: WCAG AA compliant on white backgrounds

Background White: #FCFCFC
  - Used for: Main background, card backgrounds
  - Creates soft, non-harsh white surface

White: #6055F2
  - Used for: Pure white elements, overlays
  - High contrast elements
```

**Neutral Colors:**
```
Black: #23262F
  - Used for: Primary text, headings
  - High contrast for readability

Grey: #292D32
  - Used for: Secondary text, icons, borders
  - Subtle UI elements

Light Grey: #F5F5F5
  - Used for: Disabled states, subtle backgrounds
  - Hover states on white backgrounds
```

**Semantic Colors:**
```
Success: #4CAF50
  - Task completion, positive feedback

Warning: #FF9800
  - Time-slip actions, caution states

Error: #F44336
  - Delete actions, error states

Info: #2196F3
  - Informational messages, tips
```

**Mood Colors (derived from Primary Purple):**
```
Energized: #FF6B6B (Red-orange tint)
Focused: #546FFF (Primary Purple)
Calm: #4ECDC4 (Teal)
Creative: #FFE66D (Yellow)
Tired: #95A5A6 (Grey-blue)
Stressed: #E74C3C (Red)
```

### Typography

**Font Family:**
```
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Fallback: System font stack for performance
```

**Type Scale (8px base unit):**
```
Display Large:
  - Size: 48px (6 units)
  - Weight: 700 (Bold)
  - Line Height: 56px (1.167)
  - Use: Flow Mode task title

Heading 1:
  - Size: 32px (4 units)
  - Weight: 700 (Bold)
  - Line Height: 40px (1.25)
  - Use: Screen titles

Heading 2:
  - Size: 24px (3 units)
  - Weight: 600 (Semi-bold)
  - Line Height: 32px (1.333)
  - Use: Section headers, cluster names

Heading 3:
  - Size: 20px (2.5 units)
  - Weight: 600 (Semi-bold)
  - Line Height: 28px (1.4)
  - Use: Card titles, modal headers

Body Large:
  - Size: 16px (2 units)
  - Weight: 400 (Regular)
  - Line Height: 24px (1.5)
  - Use: Task descriptions, body text

Body Regular:
  - Size: 14px (1.75 units)
  - Weight: 400 (Regular)
  - Line Height: 20px (1.429)
  - Use: Secondary text, labels

Body Small:
  - Size: 12px (1.5 units)
  - Weight: 400 (Regular)
  - Line Height: 16px (1.333)
  - Use: Captions, metadata, timestamps

Button Text:
  - Size: 14px (1.75 units)
  - Weight: 500 (Medium)
  - Line Height: 20px (1.429)
  - Letter Spacing: 0.5px
  - Use: All button labels
```

### Spacing System (8px Grid)

**Base Unit:** 8px

```
Spacing Scale:
  - xs: 4px (0.5 units)   - Tight spacing within components
  - sm: 8px (1 unit)      - Default component padding
  - md: 16px (2 units)    - Standard spacing between elements
  - lg: 24px (3 units)    - Section spacing
  - xl: 32px (4 units)    - Large section spacing
  - 2xl: 48px (6 units)   - Screen margins
  - 3xl: 64px (8 units)   - Extra large spacing

Component-Specific:
  - Card Padding: 16px (md)
  - Card Gap: 12px (1.5 units)
  - Button Padding: 12px 24px (vertical: 1.5 units, horizontal: 3 units)
  - Input Padding: 12px 16px
  - Screen Padding: 24px (lg) mobile, 32px (xl) desktop
```

### Border Radius

```
Radius Scale:
  - xs: 4px   - Small elements, tags
  - sm: 8px   - Buttons, inputs
  - md: 12px  - Cards, modals
  - lg: 16px  - Large cards, containers
  - xl: 24px  - Hero elements
  - full: 9999px - Pills, circular elements
```

### Shadows

```
Shadow Scale:
  - xs: 0 1px 2px rgba(35, 38, 47, 0.05)
    Use: Subtle elevation, hover states

  - sm: 0 2px 4px rgba(35, 38, 47, 0.08)
    Use: Cards at rest

  - md: 0 4px 8px rgba(35, 38, 47, 0.12)
    Use: Elevated cards, dropdowns

  - lg: 0 8px 16px rgba(35, 38, 47, 0.16)
    Use: Modals, popovers

  - xl: 0 16px 32px rgba(35, 38, 47, 0.20)
    Use: Flow Mode card, major overlays
```

### Grid System

**Breakpoints:**
```
Mobile: 320px - 767px
  - Columns: 4
  - Gutter: 16px
  - Margin: 16px

Tablet: 768px - 1024px
  - Columns: 8
  - Gutter: 24px
  - Margin: 32px

Desktop: 1025px+
  - Columns: 12
  - Gutter: 24px
  - Margin: 48px
  - Max Width: 1440px (centered)
```

---

## Component Library

### 1. Buttons

#### Primary Button
```
Visual Specs:
  - Background: #546FFF (Primary Purple)
  - Text Color: #FFFFFF
  - Border Radius: 8px (sm)
  - Padding: 12px 24px
  - Font: Button Text (14px, 500 weight)
  - Shadow: sm (at rest)
  - Min Height: 44px (touch target)
  - Min Width: 120px

States:
  - Default: Background #546FFF, Shadow sm
  - Hover: Background #4158D9 (darker 10%), Shadow md
  - Active: Background #3647B8 (darker 20%), Shadow xs
  - Disabled: Background #E0E0E0, Text #9E9E9E, No shadow
  - Focus: 2px outline #546FFF with 4px offset

Transition: all 200ms ease-in-out
```

#### Secondary Button
```
Visual Specs:
  - Background: Transparent
  - Text Color: #546FFF
  - Border: 2px solid #546FFF
  - Border Radius: 8px (sm)
  - Padding: 10px 22px (adjusted for border)
  - Font: Button Text (14px, 500 weight)
  - Min Height: 44px
  - Min Width: 120px

States:
  - Default: Border #546FFF, Text #546FFF
  - Hover: Background #F5F6FF (light purple tint), Border #4158D9
  - Active: Background #EBEEFF, Border #3647B8
  - Disabled: Border #E0E0E0, Text #9E9E9E
  - Focus: 2px outline #546FFF with 4px offset

Transition: all 200ms ease-in-out
```

#### Ghost Button
```
Visual Specs:
  - Background: Transparent
  - Text Color: #292D32 (Grey)
  - Border: None
  - Border Radius: 8px (sm)
  - Padding: 12px 24px
  - Font: Button Text (14px, 500 weight)
  - Min Height: 44px

States:
  - Default: Text #292D32
  - Hover: Background #F5F5F5, Text #23262F
  - Active: Background #EBEBEB, Text #23262F
  - Disabled: Text #9E9E9E
  - Focus: 2px outline #546FFF with 4px offset

Transition: all 200ms ease-in-out
```

#### Icon Button
```
Visual Specs:
  - Size: 44x44px (touch target)
  - Icon Size: 24x24px
  - Background: Transparent
  - Border Radius: 8px (sm)
  - Icon Color: #292D32

States:
  - Default: Icon #292D32
  - Hover: Background #F5F5F5, Icon #23262F
  - Active: Background #EBEBEB, Icon #23262F
  - Disabled: Icon #9E9E9E
  - Focus: 2px outline #546FFF with 4px offset

Transition: all 200ms ease-in-out
```

#### Floating Action Button (FAB)
```
Visual Specs:
  - Size: 56x56px
  - Background: #546FFF
  - Icon Size: 24x24px
  - Icon Color: #FFFFFF
  - Border Radius: full (circular)
  - Shadow: lg
  - Position: Fixed, bottom-right
  - Offset: 24px from edges (mobile), 32px (desktop)

States:
  - Default: Background #546FFF, Shadow lg
  - Hover: Background #4158D9, Shadow xl, Scale 1.05
  - Active: Background #3647B8, Shadow md, Scale 0.95
  - Focus: 2px outline #FFFFFF with 4px offset

Transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1)
```

### 2. Task Card

```
Visual Specs:
  - Background: #FFFFFF
  - Border Radius: 12px (md)
  - Padding: 16px
  - Shadow: sm (at rest)
  - Border: 1px solid transparent
  - Min Height: 72px

Layout:
  - Checkbox: 24x24px, left-aligned, 16px from left edge
  - Content Area: Flex-grow, 12px gap from checkbox
  - Action Buttons: Right-aligned, 8px gap between buttons
  - Title: Body Large (16px), #23262F, max 2 lines with ellipsis
  - Description: Body Regular (14px), #292D32, max 3 lines with ellipsis
  - Metadata: Body Small (12px), #757575, 8px top margin

States:
  - Default: Shadow sm, Border transparent
  - Hover: Shadow md, Border #E0E0E0, Cursor pointer
  - Active: Shadow xs, Border #546FFF
  - Completed: Opacity 0.6, Title strikethrough
  - Dragging: Shadow xl, Opacity 0.8, Rotate 2deg

Gestures (Mobile):
  - Swipe Right (50px+): Reveal Time-Slip action (orange background)
  - Swipe Left (50px+): Reveal Delete action (red background)
  - Tap: Select/Edit task
  - Long Press (500ms): Enter drag mode

Transition: all 200ms ease-in-out
```

### 3. Mood Selector

```
Visual Specs:
  - Container: Horizontal scroll on mobile, flex row on desktop
  - Background: #FFFFFF
  - Border Radius: 12px (md)
  - Padding: 8px
  - Shadow: sm
  - Gap: 8px between mood pills

Mood Pill:
  - Size: 44px height (touch target)
  - Padding: 8px 16px
  - Border Radius: full (pill shape)
  - Font: Body Regular (14px, 500 weight)
  - Icon: 20x20px emoji, 4px right margin
  - Min Width: 100px

States:
  - Default: Background #F5F5F5, Text #292D32
  - Hover: Background #EBEBEB, Text #23262F
  - Active/Selected: Background [Mood Color], Text #FFFFFF, Shadow sm
  - Focus: 2px outline #546FFF with 2px offset

Mood Options:
  1. Energized ⚡ - Background #FF6B6B
  2. Focused ⚙️ - Background #546FFF
  3. Calm 🌿 - Background #4ECDC4
  4. Creative 🎨 - Background #FFE66D, Text #23262F
  5. Tired 😴 - Background #95A5A6
  6. Stressed 🔥 - Background #E74C3C

Transition: all 200ms ease-in-out
```

### 4. Smart Cluster Section

```
Visual Specs:
  - Container: Full width
  - Background: Transparent
  - Margin Bottom: 24px (lg)

Header:
  - Height: 48px
  - Padding: 12px 16px
  - Background: #F5F5F5
  - Border Radius: 8px (sm)
  - Cursor: pointer

  Layout:
    - Cluster Icon: 24x24px, colored dot matching cluster color
    - Cluster Name: Heading 3 (20px, 600 weight), #23262F
    - Task Count: Body Small (12px), #757575, in parentheses
    - Expand Icon: 20x20px chevron, right-aligned, rotates 180deg when expanded

Content:
  - Padding: 8px 0
  - Gap: 12px between task cards
  - Animation: Expand/collapse with max-height transition (300ms ease-in-out)

States:
  - Collapsed: Content hidden, chevron pointing down
  - Expanded: Content visible, chevron pointing up
  - Hover: Header background #EBEBEB

Cluster Colors (8 colors cycling):
  1. #546FFF (Primary Purple)
  2. #4ECDC4 (Teal)
  3. #FFE66D (Yellow)
  4. #FF6B6B (Red)
  5. #95A5A6 (Grey)
  6. #9B59B6 (Purple)
  7. #3498DB (Blue)
  8. #E67E22 (Orange)
```

### 5. Input Field

```
Visual Specs:
  - Background: #FFFFFF
  - Border: 2px solid #E0E0E0
  - Border Radius: 8px (sm)
  - Padding: 12px 16px
  - Font: Body Large (16px, 400 weight)
  - Min Height: 48px
  - Placeholder Color: #9E9E9E

States:
  - Default: Border #E0E0E0
  - Focus: Border #546FFF, Shadow sm with purple tint
  - Error: Border #F44336, Helper text in red below
  - Disabled: Background #F5F5F5, Border #E0E0E0, Text #9E9E9E
  - Filled: Border #292D32

Label:
  - Font: Body Regular (14px, 500 weight)
  - Color: #23262F
  - Margin Bottom: 8px

Helper Text:
  - Font: Body Small (12px)
  - Color: #757575 (default), #F44336 (error)
  - Margin Top: 4px

Transition: all 200ms ease-in-out
```

### 6. Checkbox

```
Visual Specs:
  - Size: 24x24px
  - Border: 2px solid #E0E0E0
  - Border Radius: 6px
  - Background: #FFFFFF

States:
  - Unchecked: Border #E0E0E0, Background #FFFFFF
  - Checked: Border #546FFF, Background #546FFF, White checkmark icon
  - Hover: Border #546FFF (unchecked), Scale 1.1
  - Disabled: Border #E0E0E0, Background #F5F5F5, Opacity 0.5
  - Focus: 2px outline #546FFF with 2px offset

Animation:
  - Check: Scale from 0 to 1 with bounce (300ms cubic-bezier(0.68, -0.55, 0.265, 1.55))
  - Uncheck: Fade out (200ms ease-out)

Transition: all 200ms ease-in-out
```

### 7. Modal/Dialog

```
Visual Specs:
  - Background: #FFFFFF
  - Border Radius: 16px (lg)
  - Padding: 24px
  - Shadow: xl
  - Max Width: 480px (mobile: 90vw)
  - Min Height: 200px

Overlay:
  - Background: rgba(35, 38, 47, 0.6)
  - Backdrop Blur: 4px (if supported)

Header:
  - Margin Bottom: 16px
  - Title: Heading 2 (24px, 600 weight)
  - Close Button: Icon button, top-right corner

Content:
  - Padding: 16px 0
  - Max Height: 60vh
  - Overflow: Auto with custom scrollbar

Footer:
  - Margin Top: 24px
  - Buttons: Right-aligned, 12px gap
  - Primary action on right

Animation:
  - Enter: Fade in overlay (200ms), Scale modal from 0.9 to 1 (300ms cubic-bezier(0.4, 0, 0.2, 1))
  - Exit: Fade out overlay (200ms), Scale modal from 1 to 0.9 (200ms ease-in)
```

### 8. Toast Notification

```
Visual Specs:
  - Background: #23262F
  - Text Color: #FFFFFF
  - Border Radius: 8px (sm)
  - Padding: 12px 16px
  - Shadow: lg
  - Min Width: 280px
  - Max Width: 400px
  - Position: Fixed, bottom-center
  - Offset: 24px from bottom

Layout:
  - Icon: 20x20px, left-aligned (optional)
  - Message: Body Regular (14px), flex-grow
  - Action Button: Ghost button style, right-aligned (optional)
  - Close Button: Icon button, 20x20px (optional)

Variants:
  - Default: Background #23262F
  - Success: Background #4CAF50
  - Warning: Background #FF9800
  - Error: Background #F44336
  - Info: Background #2196F3

Animation:
  - Enter: Slide up from bottom (300ms cubic-bezier(0.4, 0, 0.2, 1))
  - Exit: Fade out and slide down (200ms ease-in)
  - Auto-dismiss: 3 seconds (with progress bar)

Progress Bar:
  - Height: 2px
  - Background: rgba(255, 255, 255, 0.3)
  - Fill: #FFFFFF
  - Animation: Width from 100% to 0% over 3 seconds
```

### 9. Empty State

```
Visual Specs:
  - Container: Centered, max-width 400px
  - Padding: 48px 24px
  - Text Align: Center

Illustration:
  - Size: 200x200px
  - Style: Simple line art or icon
  - Color: #E0E0E0 (subtle)
  - Margin Bottom: 24px

Title:
  - Font: Heading 2 (24px, 600 weight)
  - Color: #23262F
  - Margin Bottom: 8px

Description:
  - Font: Body Large (16px)
  - Color: #757575
  - Margin Bottom: 24px

Action Button:
  - Primary button style
  - Centered
```

### 10. Loading Skeleton

```
Visual Specs:
  - Background: Linear gradient
    - Base: #F5F5F5
    - Shimmer: #EBEBEB
  - Border Radius: Matches component (4px, 8px, 12px)
  - Animation: Shimmer effect moving left to right

Task Card Skeleton:
  - Height: 72px
  - Border Radius: 12px
  - Contains:
    - Circle: 24x24px (checkbox)
    - Rectangle: 60% width, 16px height (title)
    - Rectangle: 40% width, 14px height (description)

Animation:
  - Shimmer: 1.5s infinite linear
  - Gradient moves from -100% to 100% position
```

---

## Screen Designs

### Screen 1: Main Task List View

**Layout Structure:**
```
┌─────────────────────────────────────┐
│ Header (64px height)                │
│  - App Logo/Name (left)             │
│  - Settings Icon (right)            │
├─────────────────────────────────────┤
│ Mood Selector (60px height)         │
│  - Horizontal scrollable pills      │
├─────────────────────────────────────┤
│ Quick Add Bar (56px height)         │
│  - "+ Add Task" input field         │
├─────────────────────────────────────┤
│                                     │
│ Task List (scrollable)              │
│                                     │
│  ┌─ Smart Cluster 1 ─────────────┐ │
│  │ 📧 Email (3 tasks)        ▼   │ │
│  ├───────────────────────────────┤ │
│  │ [✓] Task Card 1               │ │
│  │ [ ] Task Card 2               │ │
│  │ [ ] Task Card 3               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌─ Smart Cluster 2 ─────────────┐ │
│  │ 💼 Work (5 tasks)         ▼   │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌─ Other ───────────────────────┐ │
│  │ 📝 Unclustered (2 tasks)  ▼   │ │
│  └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ Bottom Action Bar (72px height)    │
│  - "Enter Flow Mode" button         │
│  - Task count indicator             │
└─────────────────────────────────────┘
│ FAB: + (Add Task)                   │
└─────────────────────────────────────┘
```

**Detailed Specifications:**

**Header:**
- Height: 64px
- Padding: 16px 24px
- Background: #FFFFFF
- Border Bottom: 1px solid #E0E0E0
- Logo: 32px height, left-aligned
- Settings Icon: 24x24px, right-aligned, icon button

**Mood Selector:**
- Height: 60px
- Padding: 8px 24px
- Background: #FCFCFC
- Horizontal scroll on mobile (no scrollbar visible)
- Snap scroll to each mood pill
- Gap: 8px between pills

**Quick Add Bar:**
- Height: 56px
- Padding: 8px 24px
- Background: #FFFFFF
- Input: Full width, placeholder "+ Add a task..."
- On focus: Expands to show description field below

**Task List:**
- Padding: 16px 24px
- Background: #FCFCFC
- Gap: 24px between clusters
- Infinite scroll (load more on scroll)

**Bottom Action Bar:**
- Height: 72px
- Padding: 16px 24px
- Background: #FFFFFF
- Border Top: 1px solid #E0E0E0
- Shadow: 0 -2px 8px rgba(35, 38, 47, 0.08)
- Button: Primary, full width on mobile, max 320px centered on desktop
- Task Count: Body Small, centered above button, #757575

**Responsive Behavior:**

Mobile (< 768px):
- Single column layout
- Mood selector: Horizontal scroll
- Quick add: Full width
- Task cards: Full width
- Bottom bar: Fixed position
- FAB: Visible

Tablet (768px - 1024px):
- Single column, max-width 640px centered
- Mood selector: All visible, no scroll
- Quick add: Max-width 640px
- Task cards: Max-width 640px
- Bottom bar: Fixed position
- FAB: Visible

Desktop (> 1024px):
- Max-width 800px centered
- Mood selector: All visible, centered
- Quick add: Max-width 800px
- Task cards: Max-width 800px
- Bottom bar: Static position (not fixed)
- FAB: Hidden (use quick add bar instead)

---

### Screen 2: Flow Mode

**Layout Structure:**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         [Exit Flow Mode] ✕          │
│                                     │
│                                     │
│     ┌─────────────────────────┐    │
│     │                         │    │
│     │   Task Title            │    │
│     │   (Large, Centered)     │    │
│     │                         │    │
│     │   Task Description      │    │
│     │   (Optional, smaller)   │    │
│     │                         │    │
│     └─────────────────────────┘    │
│                                     │
│                                     │
│     ┌─────────────────────────┐    │
│     │  [✓] Complete           │    │
│     ├─────────────────────────┤    │
│     │  [→] Skip / Next        │    │
│     ├─────────────────────────┤    │
│     │  [⏰] Time-Slip          │    │
│     └─────────────────────────┘    │
│                                     │
│                                     │
│     Progress: 3 of 12 tasks         │
│                                     │
└─────────────────────────────────────┘
```

**Detailed Specifications:**

**Container:**
- Full screen (100vh)
- Background: #FCFCFC
- Padding: 48px 24px (mobile), 64px 48px (desktop)
- Display: Flex, column, center-aligned

**Exit Button:**
- Position: Absolute, top-right
- Offset: 24px from edges
- Icon button: 44x44px
- Icon: ✕ (close), 24x24px
- Background: rgba(255, 255, 255, 0.9)
- Border Radius: full
- Shadow: md

**Task Card:**
- Max Width: 600px
- Background: #FFFFFF
- Border Radius: 16px (lg)
- Padding: 48px 32px
- Shadow: xl
- Text Align: Center
- Margin Bottom: 48px

Task Title:
- Font: Display Large (48px, 700 weight) on desktop
- Font: Heading 1 (32px, 700 weight) on mobile
- Color: #23262F
- Margin Bottom: 16px
- Line Height: 1.2

Task Description:
- Font: Body Large (16px)
- Color: #757575
- Max Width: 480px
- Margin: 0 auto
- Line Height: 1.6

**Action Buttons:**
- Container: Max-width 400px, centered
- Gap: 16px between buttons
- All buttons: Full width

Complete Button:
- Primary button style
- Background: #4CAF50 (Success green)
- Icon: ✓ checkmark, 20x20px, left-aligned
- Text: "Complete"
- Height: 56px

Skip Button:
- Secondary button style
- Icon: → arrow, 20x20px, left-aligned
- Text: "Skip / Next"
- Height: 56px

Time-Slip Button:
- Secondary button style
- Border Color: #FF9800 (Warning orange)
- Text Color: #FF9800
- Icon: ⏰ clock, 20x20px, left-aligned
- Text: "Time-Slip to Tomorrow"
- Height: 56px

**Progress Indicator:**
- Position: Bottom center
- Font: Body Regular (14px)
- Color: #757575
- Margin Top: 32px

**Keyboard Shortcuts (displayed on hover):**
- Complete: Enter or C
- Skip: Space or N
- Time-Slip: T
- Exit: Escape

**Animations:**
- Task Card Enter: Fade in + scale from 0.95 to 1 (400ms cubic-bezier(0.4, 0, 0.2, 1))
- Task Card Exit: Fade out + scale to 0.95 (300ms ease-in)
- Complete: Card slides right + fade out (300ms)
- Skip: Card slides left + fade out (300ms)
- Time-Slip: Card slides down + fade out (300ms)

**Responsive Behavior:**

Mobile (< 768px):
- Padding: 24px 16px
- Task Card: Padding 32px 24px
- Task Title: 32px font size
- Action Buttons: Full width, stacked
- Exit Button: 16px offset

Tablet (768px - 1024px):
- Padding: 48px 32px
- Task Card: Max-width 560px
- Task Title: 40px font size
- Action Buttons: Max-width 400px

Desktop (> 1024px):
- Padding: 64px 48px
- Task Card: Max-width 600px
- Task Title: 48px font size
- Action Buttons: Max-width 400px

---

### Screen 3: Task Creation/Edit Modal

**Layout Structure:**
```
┌─────────────────────────────────────┐
│ Create New Task              [✕]    │
├─────────────────────────────────────┤
│                                     │
│ Title *                             │
│ ┌─────────────────────────────────┐ │
│ │ Enter task title...             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Description (Optional)              │
│ ┌─────────────────────────────────┐ │
│ │ Add more details...             │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Detected Keywords:                  │
│ [work] [email] [urgent]             │
│                                     │
├─────────────────────────────────────┤
│                    [Cancel] [Save]  │
└─────────────────────────────────────┘
```

**Detailed Specifications:**

**Modal Container:**
- Max Width: 480px
- Background: #FFFFFF
- Border Radius: 16px (lg)
- Padding: 24px
- Shadow: xl

**Header:**
- Margin Bottom: 24px
- Title: Heading 2 (24px, 600 weight)
- Close Button: Icon button, top-right

**Title Input:**
- Label: Body Regular (14px, 500 weight), #23262F
- Input: Full width, 48px height
- Placeholder: "Enter task title..."
- Required indicator: Red asterisk
- Margin Bottom: 16px

**Description Input:**
- Label: Body Regular (14px, 500 weight), #23262F
- Textarea: Full width, 120px min-height
- Placeholder: "Add more details..."
- Resize: Vertical only
- Margin Bottom: 16px

**Keyword Detection:**
- Label: Body Regular (14px, 500 weight), #757575
- Keywords: Pill-shaped tags
  - Background: #F5F6FF (light purple)
  - Text: #546FFF
  - Padding: 4px 12px
  - Border Radius: full
  - Font: Body Small (12px)
  - Gap: 8px between tags
- Margin Bottom: 24px

**Footer:**
- Display: Flex, right-aligned
- Gap: 12px between buttons

Cancel Button:
- Ghost button style
- Text: "Cancel"
- Width: Auto, min 100px

Save Button:
- Primary button style
- Text: "Save Task"
- Width: Auto, min 120px
- Disabled: When title is empty

**Validation:**
- Title required: Show error border and message if empty on submit
- Max length: 200 characters for title, 1000 for description
- Character count: Show below input when approaching limit

**Keyboard Shortcuts:**
- Save: Cmd/Ctrl + Enter
- Cancel: Escape

**Animations:**
- Modal Enter: Fade in overlay + scale modal (300ms)
- Modal Exit: Fade out overlay + scale modal (200ms)
- Input Focus: Border color transition (200ms)

---

### Screen 4: Completed Tasks View

**Layout Structure:**
```
┌─────────────────────────────────────┐
│ [←] Completed Tasks                 │
├─────────────────────────────────────┤
│ Filter: [All] [Today] [This Week]   │
├─────────────────────────────────────┤
│                                     │
│ Today - 5 tasks                     │
│  [✓] Task 1 (completed 2h ago)      │
│  [✓] Task 2 (completed 3h ago)      │
│  [✓] Task 3 (completed 5h ago)      │
│                                     │
│ Yesterday - 3 tasks                 │
│  [✓] Task 4 (completed yesterday)   │
│  [✓] Task 5 (completed yesterday)   │
│                                     │
│ This Week - 12 tasks                │
│  [✓] Task 6 (completed 2 days ago)  │
│  [✓] Task 7 (completed 3 days ago)  │
│                                     │
│                                     │
│ [Clear All Completed]               │
│                                     │
└─────────────────────────────────────┘
```

**Detailed Specifications:**

**Header:**
- Height: 64px
- Padding: 16px 24px
- Background: #FFFFFF
- Border Bottom: 1px solid #E0E0E0
- Back Button: Icon button, left-aligned
- Title: Heading 2 (24px, 600 weight)

**Filter Bar:**
- Height: 56px
- Padding: 8px 24px
- Background: #FCFCFC
- Buttons: Segmented control style
  - Default: Background transparent, Text #757575
  - Active: Background #546FFF, Text #FFFFFF
  - Border Radius: 8px
  - Padding: 8px 16px
  - Gap: 8px between buttons

**Task List:**
- Padding: 16px 24px
- Background: #FCFCFC
- Grouped by date sections

**Date Section:**
- Margin Bottom: 24px
- Header:
  - Font: Heading 3 (20px, 600 weight)
  - Color: #23262F
  - Margin Bottom: 12px
  - Task count in parentheses

**Completed Task Card:**
- Same as regular task card but:
  - Opacity: 0.7
  - Checkbox: Checked, green color
  - Title: Strikethrough
  - Timestamp: Body Small, #757575, below title
  - Hover: Opacity 1, show "Restore" button

**Clear All Button:**
- Position: Bottom of list
- Secondary button style
- Text Color: #F44336 (Error red)
- Border Color: #F44336
- Centered
- Margin: 32px auto
- Confirmation dialog on click

**Empty State:**
- Centered content
- Icon: ✓ checkmark in circle, 80x80px, #E0E0E0
- Title: "No completed tasks yet"
- Description: "Completed tasks will appear here"

**Responsive Behavior:**
- Same as Main Task List View
- Filter bar: Horizontal scroll on mobile if needed

---

## Interaction Patterns

### 1. Task Completion Animation

```
Sequence:
1. User clicks checkbox
2. Checkbox animates to checked state (300ms bounce)
3. Task card background fades to light green (#E8F5E9) (200ms)
4. Task title gets strikethrough animation (300ms)
5. After 500ms delay, card slides up and fades out (300ms)
6. Remaining cards slide up to fill space (300ms)
7. Toast appears: "Task completed" with Undo button

Timing: Total 1.4 seconds
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### 2. Time-Slip Gesture (Mobile)

```
Sequence:
1. User swipes right on task card (threshold: 50px)
2. Card follows finger with resistance (0.8x speed)
3. Orange background reveals behind card
4. Clock icon (⏰) appears on revealed background
5. At 50px threshold, haptic feedback (if supported)
6. On release:
   - If > 50px: Card continues sliding right, fades out (300ms)
   - If < 50px: Card snaps back to position (200ms elastic)
7. Toast appears: "Task moved to tomorrow" with Undo button

Timing: Gesture-based, snap animation 200-300ms
Easing: Elastic for snap back, ease-out for completion
```

### 3. Mood Change Transition

```
Sequence:
1. User taps new mood pill
2. Selected mood pill animates:
   - Scale to 1.05 (100ms)
   - Background color transition to mood color (200ms)
   - Scale back to 1 (100ms)
3. Previous mood pill fades to default state (200ms)
4. Task list reorders:
   - All cards fade to 0.5 opacity (150ms)
   - Cards animate to new positions (400ms staggered, 50ms delay each)
   - Cards fade back to full opacity (200ms)
5. Subtle pulse animation on reordered cards (300ms)

Timing: Total 1 second
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### 4. Flow Mode Task Transition

```
Sequence:
1. User clicks "Complete" button
2. Button scales down (100ms)
3. Task card:
   - Slides right (300ms)
   - Fades out (300ms)
   - Scales down to 0.9 (300ms)
4. Next task card enters from left:
   - Starts at scale 0.95, opacity 0
   - Slides in from left (400ms)
   - Scales to 1 (400ms)
   - Fades to full opacity (400ms)
5. Progress indicator updates with number animation

Timing: 400ms overlap between exit and enter
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### 5. Smart Cluster Expand/Collapse

```
Sequence:
1. User clicks cluster header
2. Chevron icon rotates 180deg (300ms)
3. Content area:
   - If expanding:
     - Max-height animates from 0 to auto (300ms)
     - Opacity fades from 0 to 1 (200ms, 100ms delay)
     - Cards stagger in (50ms delay each)
   - If collapsing:
     - Opacity fades from 1 to 0 (200ms)
     - Max-height animates from auto to 0 (300ms, 100ms delay)

Timing: 400ms total
Easing: ease-in-out
```

### 6. Quick Add Task

```
Sequence:
1. User types in quick add input
2. On Enter key or blur:
   - Input content validates
   - If valid:
     - New task card appears at top of list
     - Slides down from 0 height (300ms)
     - Fades in (200ms)
     - Subtle bounce at end (100ms)
     - Input clears with fade (150ms)
   - If invalid:
     - Input border flashes red (200ms)
     - Shake animation (300ms)

Timing: 400ms for success, 300ms for error
Easing: cubic-bezier(0.68, -0.55, 0.265, 1.55) for bounce
```

### 7. Delete Task Confirmation

```
Sequence:
1. User clicks delete button
2. Modal appears:
   - Overlay fades in (200ms)
   - Modal scales from 0.9 to 1 (300ms)
3. User confirms:
   - Modal scales to 0.9 (200ms)
   - Overlay fades out (200ms)
   - Task card:
     - Background flashes red (100ms)
     - Slides left (300ms)
     - Fades out (300ms)
     - Scales down to 0.8 (300ms)
4. Toast appears: "Task deleted" with Undo button (3s)

Timing: Modal 300ms, deletion 300ms
Easing: ease-in-out
```

### 8. Drag and Drop Reorder (Desktop)

```
Sequence:
1. User clicks and holds task card (200ms)
2. Card lifts:
   - Shadow increases to xl (200ms)
   - Scale to 1.02 (200ms)
   - Opacity to 0.9 (200ms)
   - Cursor changes to grabbing
3. While dragging:
   - Card follows cursor smoothly
   - Other cards shift to make space (200ms)
   - Drop zone highlights (border pulse)
4. On drop:
   - Card snaps to new position (300ms elastic)
   - Shadow returns to sm (200ms)
   - Scale returns to 1 (200ms)
   - Opacity returns to 1 (200ms)

Timing: Lift 200ms, drop 300ms
Easing: Elastic for drop, ease-out for lift
```

---

## Responsive Behavior

### Breakpoint Strategy

**Mobile First Approach:**
- Design for mobile (320px) first
- Enhance for larger screens
- Use CSS media queries for breakpoints

**Breakpoints:**
```css
/* Mobile: Default styles */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet-specific styles */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Desktop-specific styles */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Large screen optimizations */
}
```

### Component Responsive Behavior

**Task Card:**
```
Mobile (< 768px):
  - Full width
  - Padding: 16px
  - Font sizes: As specified
  - Swipe gestures enabled
  - Action buttons: Icon only

Tablet (768px - 1024px):
  - Max-width: 640px, centered
  - Padding: 16px
  - Font sizes: As specified
  - Swipe gestures enabled
  - Action buttons: Icon + text

Desktop (> 1024px):
  - Max-width: 800px, centered
  - Padding: 20px
  - Font sizes: Slightly larger
  - Hover states enabled
  - Action buttons: Icon + text
  - Drag and drop enabled
```

**Mood Selector:**
```
Mobile (< 768px):
  - Horizontal scroll
  - Pills: Min-width 100px
  - Snap scroll enabled
  - Hide scrollbar

Tablet (768px - 1024px):
  - All pills visible
  - Centered layout
  - No scroll

Desktop (> 1024px):
  - All pills visible
  - Centered layout
  - Hover effects enabled
```

**Flow Mode:**
```
Mobile (< 768px):
  - Full screen
  - Padding: 24px 16px
  - Task title: 32px
  - Buttons: Full width, stacked
  - Exit button: 16px offset

Tablet (768px - 1024px):
  - Full screen
  - Padding: 48px 32px
  - Task title: 40px
  - Buttons: Max-width 400px
  - Exit button: 24px offset

Desktop (> 1024px):
  - Full screen
  - Padding: 64px 48px
  - Task title: 48px
  - Buttons: Max-width 400px
  - Exit button: 32px offset
  - Keyboard shortcuts visible on hover
```

**Navigation:**
```
Mobile (< 768px):
  - Bottom navigation bar (fixed)
  - FAB for quick add
  - Hamburger menu for settings

Tablet (768px - 1024px):
  - Bottom navigation bar (fixed)
  - FAB for quick add
  - Settings in header

Desktop (> 1024px):
  - Top navigation bar (static)
  - No FAB (use quick add bar)
  - Settings in header
```

### Touch vs Mouse Interactions

**Touch (Mobile/Tablet):**
- Minimum touch target: 44x44px
- Swipe gestures enabled
- Long press for context menu
- Pull to refresh
- Haptic feedback where supported
- No hover states

**Mouse (Desktop):**
- Minimum click target: 32x32px
- Hover states enabled
- Right-click context menu
- Drag and drop
- Keyboard shortcuts
- Cursor changes (pointer, grab, etc.)

### Orientation Handling

**Portrait (Default):**
- Single column layout
- Vertical scrolling
- Bottom navigation

**Landscape (Mobile/Tablet):**
- Adjust padding for shorter height
- Reduce vertical spacing
- Flow Mode: Reduce task card height
- Consider side navigation on tablet landscape

---

## Accessibility Specifications

### Keyboard Navigation

**Tab Order:**
1. Skip to main content link
2. Header navigation
3. Mood selector (left to right)
4. Quick add input
5. Task cards (top to bottom)
6. Bottom action bar
7. FAB (if visible)

**Keyboard Shortcuts:**
```
Global:
  - Tab: Next focusable element
  - Shift + Tab: Previous focusable element
  - Enter: Activate focused element
  - Space: Toggle checkbox/button
  - Escape: Close modal/exit Flow Mode

Task List:
  - N: New task (focus quick add)
  - F: Enter Flow Mode
  - /: Focus search (future feature)
  - 1-6: Select mood (Energized to Stressed)

Flow Mode:
  - Enter or C: Complete task
  - Space or N: Skip to next
  - T: Time-slip task
  - Escape: Exit Flow Mode

Task Card (when focused):
  - Space: Toggle complete
  - Enter: Edit task
  - Delete: Delete task (with confirmation)
  - T: Time-slip task
```

### Screen Reader Support

**ARIA Labels:**
```html
<!-- Mood Selector -->
<div role="radiogroup" aria-label="Select your current mood">
  <button role="radio" aria-checked="true" aria-label="Energized mood">
    ⚡ Energized
  </button>
</div>

<!-- Task Card -->
<article aria-label="Task: Buy groceries">
  <input type="checkbox" aria-label="Mark task as complete" />
  <h3>Buy groceries</h3>
  <p>Get milk, eggs, and bread</p>
  <button aria-label="Time-slip task to tomorrow">⏰</button>
  <button aria-label="Delete task">🗑️</button>
</article>

<!-- Flow Mode -->
<main role="main" aria-label="Flow Mode - Focus on one task">
  <h1>Buy groceries</h1>
  <button aria-label="Complete task and move to next">Complete</button>
  <button aria-label="Skip to next task">Skip</button>
</main>

<!-- Smart Cluster -->
<section aria-label="Email tasks cluster">
  <button aria-expanded="true" aria-controls="email-tasks">
    📧 Email (3 tasks)
  </button>
  <div id="email-tasks" role="list">
    <!-- Task cards -->
  </div>
</section>
```

**Live Regions:**
```html
<!-- Toast notifications -->
<div role="status" aria-live="polite" aria-atomic="true">
  Task completed
</div>

<!-- Task count updates -->
<div role="status" aria-live="polite">
  12 tasks remaining
</div>

<!-- Loading states -->
<div role="status" aria-live="polite" aria-busy="true">
  Loading tasks...
</div>
```

### Focus Management

**Focus Indicators:**
- Visible outline: 2px solid #546FFF
- Offset: 4px from element
- Border radius: Matches element
- Never remove focus indicators

**Focus Trapping:**
- Modals: Trap focus within modal
- Flow Mode: Trap focus within Flow Mode
- Dropdowns: Trap focus within dropdown

**Focus Restoration:**
- After closing modal: Return to trigger element
- After completing task: Focus next task
- After deleting task: Focus previous task

### Color Contrast

**Text Contrast Ratios:**
```
Primary Text (#23262F) on White (#FFFFFF):
  - Ratio: 15.8:1 (AAA)

Secondary Text (#757575) on White (#FFFFFF):
  - Ratio: 4.6:1 (AA)

Primary Purple (#546FFF) on White (#FFFFFF):
  - Ratio: 4.8:1 (AA)

White (#FFFFFF) on Primary Purple (#546FFF):
  - Ratio: 4.8:1 (AA)
```

**Interactive Element Contrast:**
- All buttons: Minimum 3:1 contrast
- Focus indicators: Minimum 3:1 contrast
- Disabled states: Clearly distinguishable

### Motion and Animation

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Respect User Preferences:**
- Disable all non-essential animations
- Keep essential feedback (e.g., button press)
- Instant transitions instead of animated

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #546FFF;
  --color-primary-dark: #4158D9;
  --color-primary-darker: #3647B8;
  --color-primary-light: #F5F6FF;
  
  --color-background: #FCFCFC;
  --color-surface: #FFFFFF;
  --color-border: #E0E0E0;
  
  --color-text-primary: #23262F;
  --color-text-secondary: #757575;
  --color-text-disabled: #9E9E9E;
  
  --color-success: #4CAF50;
  --color-warning: #FF9800;
  --color-error: #F44336;
  --color-info: #2196F3;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(35, 38, 47, 0.05);
  --shadow-sm: 0 2px 4px rgba(35, 38, 47, 0.08);
  --shadow-md: 0 4px 8px rgba(35, 38, 47, 0.12);
  --shadow-lg: 0 8px 16px rgba(35, 38, 47, 0.16);
  --shadow-xl: 0 16px 32px rgba(35, 38, 47, 0.20);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  --transition-bounce: 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Z-index */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-toast: 1500;
  --z-tooltip: 1600;
}

/* Dark Mode (Future) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1A1A1A;
    --color-surface: #2A2A2A;
    --color-border: #3A3A3A;
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #B0B0B0;
  }
}
```

---

## Implementation Guidelines

### Component Development Order

**Phase 1: Foundation (Week 1)**
1. Set up design tokens (CSS variables)
2. Create base typography styles
3. Implement spacing system
4. Build button components (all variants)
5. Build input components

**Phase 2: Core Components (Week 2)**
6. Task card component
7. Checkbox component
8. Modal/dialog component
9. Toast notification component
10. Loading skeleton component

**Phase 3: Feature Components (Week 3)**
11. Mood selector component
12. Smart cluster component
13. Empty state component
14. FAB component

**Phase 4: Screens (Week 4)**
15. Main task list view
16. Flow Mode screen
17. Task creation modal
18. Completed tasks view

**Phase 5: Interactions (Week 5)**
19. Animations and transitions
20. Gesture handlers (swipe, drag)
21. Keyboard navigation
22. Accessibility enhancements

### Design-to-Code Handoff

**Assets to Export:**
1. All icons as SVG (24x24px, 20x20px variants)
2. App logo (multiple sizes for PWA)
3. Mood emojis (if custom)
4. Empty state illustrations

**Documentation to Provide:**
1. This design system document
2. Component specifications
3. Interaction flow diagrams
4. Accessibility requirements
5. Responsive behavior notes

**Design Tool Setup:**
1. Create component library in design tool
2. Use design tokens/variables
3. Create responsive frames for each breakpoint
4. Document component states
5. Create prototype for key interactions

### Quality Checklist

**Visual Quality:**
- [ ] All spacing follows 8px grid
- [ ] All colors from defined palette
- [ ] All typography from type scale
- [ ] Consistent border radius usage
- [ ] Proper shadow elevation
- [ ] High-quality icons (crisp at all sizes)

**Interaction Quality:**
- [ ] All animations under 300ms
- [ ] Smooth 60fps animations
- [ ] Proper loading states
- [ ] Clear error states
- [ ] Intuitive gestures
- [ ] Responsive feedback

**Accessibility Quality:**
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigable
- [ ] Screen reader tested
- [ ] Proper ARIA labels
- [ ] Focus indicators visible
- [ ] Color contrast verified

**Responsive Quality:**
- [ ] Works on 320px width
- [ ] Smooth breakpoint transitions
- [ ] Touch targets 44x44px minimum
- [ ] Readable on all screen sizes
- [ ] Proper orientation handling

---

## Conclusion

This design system provides a complete, tool-agnostic specification for implementing FlowList's UI/UX. The minimal, modern, card-based interface follows the provided color palette ([`plan/color palette.png`](../plan/color%20palette.png)) and maintains the visual style from the reference screens ([`plan/screen.png`](../plan/screen.png), [`plan/sample-screens.png`](../plan/sample-screens.png)) while ensuring consistency, accessibility, and usability across all devices.

**Design Reference Alignment:**
- **Visual Style:** Matches the clean, card-based layouts shown in [`screen.png`](../plan/screen.png)
- **Color Palette:** Uses exact colors from [`color palette.png`](../plan/color%20palette.png) (#546FFF, #FCFCFC, #23262F, #292D32)
- **Component Patterns:** Adapts the button styles, card designs, and spacing patterns from reference screens
- **Typography:** Maintains the modern, readable typography hierarchy shown in samples
- **Interactions:** Implements the smooth, minimal animations suggested by the reference designs

**Key Principles:**
- **Simplicity:** Every element serves a purpose
- **Consistency:** Reusable components and patterns
- **Accessibility:** WCAG 2.1 AA compliant throughout
- **Performance:** Optimized animations and interactions
- **Responsiveness:** Mobile-first, works everywhere
- **Reference Fidelity:** Maintains visual consistency with [`screen.png`](../plan/screen.png) and [`sample-screens.png`](../plan/sample-screens.png)

**Next Steps:**
1. Review and approve design system against reference screens
2. Set up design tool with component library matching [`screen.png`](../plan/screen.png) style
3. Create high-fidelity mockups for all screens using reference as guide
4. Build interactive prototype maintaining reference screen aesthetics
5. Conduct usability testing
6. Begin implementation with development team

**Reference Files:**
- Visual Reference: [`plan/screen.png`](../plan/screen.png)
- Additional Samples: [`plan/sample-screens.png`](../plan/sample-screens.png)
- Color Palette: [`plan/color palette.png`](../plan/color%20palette.png)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-20
**Status:** Ready for Review