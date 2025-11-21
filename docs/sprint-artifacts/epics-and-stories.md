# FlowList - Epics and User Stories

**Project:** FlowList - Minimal Focus Todo Application  
**Version:** 1.0  
**Date:** 2025-11-20  
**PM:** BMad PM  

---

## Table of Contents

1. [Epic Overview](#epic-overview)
2. [Story Point Scale](#story-point-scale)
3. [Epic 1: Foundation & Infrastructure](#epic-1-foundation--infrastructure)
4. [Epic 2: Basic Task Management](#epic-2-basic-task-management)
5. [Epic 3: Flow Mode](#epic-3-flow-mode)
6. [Epic 4: Mood-Based Prioritization](#epic-4-mood-based-prioritization)
7. [Epic 5: Smart Clusters](#epic-5-smart-clusters)
8. [Epic 6: Time-Slip Functionality](#epic-6-time-slip-functionality)
9. [Epic 7: PWA & Offline Support](#epic-7-pwa--offline-support)
10. [Epic 8: Data Management](#epic-8-data-management)
11. [Epic 9: UI/UX Polish](#epic-9-uiux-polish)
12. [Sprint Planning Recommendations](#sprint-planning-recommendations)

---

## Epic Overview

| Epic ID | Epic Name | Total Stories | Total Points | Priority | Dependencies |
|---------|-----------|---------------|--------------|----------|--------------|
| E1 | Foundation & Infrastructure | 6 | 21 | Critical | None |
| E2 | Basic Task Management | 8 | 34 | Critical | E1 |
| E3 | Flow Mode | 6 | 21 | High | E1, E2 |
| E4 | Mood-Based Prioritization | 5 | 13 | High | E2 |
| E5 | Smart Clusters | 6 | 21 | High | E2 |
| E6 | Time-Slip Functionality | 5 | 13 | Medium | E2 |
| E7 | PWA & Offline Support | 5 | 21 | High | E1 |
| E8 | Data Management | 4 | 13 | Medium | E1, E2 |
| E9 | UI/UX Polish | 7 | 21 | Medium | E2, E3, E4, E5 |
| **TOTAL** | **9 Epics** | **52 Stories** | **178 Points** | - | - |

**Estimated Duration:** 6-8 sprints (12-16 weeks) for MVP

---

## Story Point Scale

**Fibonacci Scale:** 1, 2, 3, 5, 8, 13, 21

- **1 point:** < 4 hours, trivial complexity, no unknowns
- **2 points:** 4-8 hours, simple, well-understood
- **3 points:** 1-2 days, moderate complexity, some unknowns
- **5 points:** 2-3 days, complex, multiple components
- **8 points:** 3-5 days, very complex, significant unknowns
- **13 points:** 1-2 weeks, epic-level complexity, should be split
- **21 points:** > 2 weeks, too large, must be split

---

## Epic 1: Foundation & Infrastructure

**Epic Goal:** Establish the technical foundation for the FlowList application with React, Redux, TypeScript, and build tooling.

**Business Value:** Enables all future development with a solid, maintainable architecture.

**Acceptance Criteria:**
- React 18+ application running with Vite
- Redux Toolkit configured with TypeScript
- Material UI integrated with custom theme
- Development environment fully functional
- Code quality tools configured (ESLint, Prettier)
- Project structure follows architecture document

**Total Points:** 21

---

### E1-S1: Project Initialization and Build Setup

**As a** developer  
**I want** a properly configured React + Vite project  
**So that** I can start building features efficiently

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Vite project created with React 18+ and TypeScript
- [ ] Package.json configured with all required dependencies
- [ ] Vite config includes code splitting and optimization
- [ ] Development server runs on port 3000
- [ ] Hot module replacement works correctly
- [ ] Build command produces optimized production bundle
- [ ] Bundle size < 500KB gzipped

**Technical Notes:**
- Use Vite 4.4.0+
- Configure for PWA support (prepare for E7)
- Set up path aliases for clean imports

**Definition of Done:**
- Code reviewed and merged
- `npm run dev` starts development server
- `npm run build` creates production bundle
- Documentation updated in README

---

### E1-S2: Redux Toolkit Store Configuration

**As a** developer  
**I want** Redux Toolkit configured with TypeScript  
**So that** I can manage application state predictably

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Redux store configured with TypeScript types
- [ ] RootState and AppDispatch types exported
- [ ] Redux DevTools integration working
- [ ] Store provider wraps application
- [ ] Middleware configured (thunk, serializable check)
- [ ] Initial slice structure created (tasks, preferences)
- [ ] Custom hooks (useAppDispatch, useAppSelector) created

**Technical Notes:**
- Follow architecture document store structure
- Configure serializable check for IndexedDB promises
- Set up slice pattern for feature modules

**Definition of Done:**
- Store accessible throughout application
- TypeScript types working correctly
- Redux DevTools shows state changes
- Unit tests for store configuration

---

### E1-S3: Material UI Theme Configuration

**As a** developer  
**I want** Material UI configured with custom theme  
**So that** components match the design system

**Story Points:** 3

**Acceptance Criteria:**
- [ ] MUI v5+ installed and configured
- [ ] Custom theme matches design system colors
- [ ] Typography scale implemented from design system
- [ ] Spacing system (8px grid) configured
- [ ] Border radius tokens defined
- [ ] Shadow tokens defined
- [ ] Light/dark mode support prepared
- [ ] Theme provider wraps application

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) for all tokens
- Use CSS variables for theme values
- Configure breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

**Definition of Done:**
- Theme applied to all MUI components
- Design tokens accessible via theme
- System preference detection working
- Theme documented in code

---

### E1-S4: Code Quality Tools Setup

**As a** developer  
**I want** ESLint, Prettier, and Husky configured  
**So that** code quality is maintained automatically

**Story Points:** 2

**Acceptance Criteria:**
- [x] ESLint configured with Airbnb + TypeScript rules
- [x] Prettier configured with project standards
- [x] Husky pre-commit hooks installed
- [x] lint-staged configured for staged files
- [x] Commitlint configured for conventional commits
- [x] VSCode settings.json includes format on save
- [x] npm scripts for lint, format, type-check

**Dev Agent Record:**

**Debug Log:**
- Verified ESLint configuration with Airbnb and TypeScript rules in .eslintrc.json
- Confirmed Prettier settings (semi: true, singleQuote: true, trailingComma: all) in .prettierrc
- Checked Husky hooks in .husky/pre-commit and .husky/commit-msg
- Validated lint-staged configuration in package.json
- Verified Commitlint setup with conventional config
- Confirmed VSCode format on save in .vscode/settings.json
- Checked npm scripts: lint, format, type-check in package.json

**Completion Notes:**
All code quality tools were already properly configured. No changes required. Story marked complete.

**File List:**
- No new files created
- No files modified

**Change Log:**
- None

**Status:** review

**Technical Notes:**
- Use Airbnb ESLint config as base
- Configure Prettier: semi, singleQuote, trailingComma
- Set up commit message format: type(scope): subject

**Definition of Done:**
- Pre-commit hooks prevent bad commits
- All files pass linting
- Format on save works in VSCode
- CI/CD ready for future setup

---

### E1-S5: Project Structure and Routing

**As a** developer  
**I want** a well-organized project structure with routing  
**So that** features are modular and maintainable

**Story Points:** 5

**Acceptance Criteria:**
- [x] Directory structure matches architecture document
- [x] React Router v6+ configured
- [x] Route structure defined (/, /flow, /completed, /settings)
- [x] Layout components created (MainLayout, Header)
- [x] Navigation component created
- [x] 404 page created
- [x] Route guards prepared for future features
- [x] Lazy loading configured for routes

**Dev Agent Record:**

**Debug Log:**
- Created src/components/layout/ directory with MainLayout.tsx, Header.tsx, Navigation.tsx
- Created src/components/common/ directory with NotFoundPage.tsx
- Created src/pages/ directory with MainView.tsx, FlowMode.tsx, CompletedView.tsx, SettingsView.tsx
- Configured React Router v6 in App.tsx with lazy loading and Suspense
- Implemented bottom navigation with react-router-dom integration
- Set up ThemeProvider and Redux Provider in App.tsx
- Verified directory structure alignment with architecture document

**Completion Notes:**
Routing infrastructure implemented with lazy loading, navigation, and layout components. Route guards structure prepared for future authentication features. All routes navigable with placeholder content.

**File List:**
- src/App.tsx - Updated with routing configuration
- src/components/layout/MainLayout.tsx - New layout wrapper
- src/components/layout/Header.tsx - App header component
- src/components/layout/Navigation.tsx - Bottom navigation
- src/components/common/NotFoundPage.tsx - 404 error page
- src/pages/MainView.tsx - Main tasks page placeholder
- src/pages/FlowMode.tsx - Flow mode page placeholder
- src/pages/CompletedView.tsx - Completed tasks page placeholder
- src/pages/SettingsView.tsx - Settings page placeholder

**Change Log:**
- Implemented routing system with React Router v6 (Date: 2025-11-20)

**Status:** review

**Technical Notes:**
- Follow architecture: src/features/, src/components/, src/app/
- Use React.lazy() for code splitting
- Implement Suspense with loading skeletons

**Definition of Done:**
- All routes navigable
- Lazy loading working
- Layout consistent across routes
- Structure documented

---

### E1-S6: TypeScript Configuration and Types

**As a** developer  
**I want** strict TypeScript configuration  
**So that** type safety prevents bugs

**Story Points:** 5

**Acceptance Criteria:**
- [x] tsconfig.json configured with strict mode
- [x] Path aliases configured (@/components, @/features, etc.)
- [x] Common types defined (Task, Mood, Cluster, etc.)
- [x] Utility types created (AsyncState, ApiResponse, etc.)
- [x] Type guards implemented for runtime checks
- [x] No `any` types in codebase
- [x] All imports properly typed

**Technical Notes:**
- Reference [`docs/architecture.md`](architecture.md) for data models
- Create types/index.ts for shared types
- Use discriminated unions for state management

**Definition of Done:**
- `npm run type-check` passes with no errors
- All components fully typed
- Type documentation in code
- Type tests passing

**Dev Agent Record:**

**Context Reference:**
- docs/sprint-artifacts/1-6-typescript-configuration.context.xml

**Debug Log:**
- Verified tsconfig.json has strict mode enabled with all required settings
- Confirmed path aliases configured for @/* imports
- Reviewed existing type definitions in src/types/index.ts
- Added type guards (isMoodType, isTask, isAsyncState) for runtime validation
- Created comprehensive tests for type guards and type definitions
- Verified no 'any' types in codebase
- Confirmed all imports are properly typed

**Completion Notes:**
TypeScript configuration was already properly set up. Added runtime type guards for enhanced type safety and created unit tests. All acceptance criteria satisfied with strict typing throughout the codebase.

**File List:**
- src/types/index.ts - Added type guards
- src/types/index.test.ts - New test file for types and guards

**Change Log:**
- Added type guards for runtime type checking (Date: 2025-11-20)
- Created comprehensive type tests (Date: 2025-11-20)
- Senior Developer Review notes appended (Date: 2025-11-20)

**Status:** review

**Senior Developer Review (AI):**

**Reviewer:** BMad
**Date:** 2025-11-20
**Outcome:** Approve - All acceptance criteria implemented, all tasks verified complete, no significant issues found

**Summary:**
TypeScript configuration story is well-implemented. All acceptance criteria are satisfied with proper evidence. Type guards added for runtime type safety. Comprehensive tests created. No `any` types found in codebase. Strict mode and path aliases properly configured.

**Key Findings:**

**HIGH Severity Issues:** None

**MEDIUM Severity Issues:** None

**LOW Severity Issues:** None

**Acceptance Criteria Coverage:**

| AC# | Description | Status | Evidence |
|-----|-------------|--------|----------|
| AC1 | tsconfig.json configured with strict mode | IMPLEMENTED | tsconfig.json:2 ("strict": true) |
| AC2 | Path aliases configured (@/components, @/features, etc.) | IMPLEMENTED | tsconfig.json:24-34 (paths object) |
| AC3 | Common types defined (Task, Mood, Cluster, etc.) | IMPLEMENTED | src/types/index.ts:9-157 (Task, MoodType, Cluster interfaces) |
| AC4 | Utility types created (AsyncState, ApiResponse, etc.) | IMPLEMENTED | src/types/index.ts:86-128 (AsyncState, ApiResponse) |
| AC5 | Type guards implemented for runtime checks | IMPLEMENTED | src/types/index.ts:120-139 (isMoodType, isTask, isAsyncState) |
| AC6 | No `any` types in codebase | IMPLEMENTED | Verified via grep search - no `any` types found |
| AC7 | All imports properly typed | IMPLEMENTED | All import statements in codebase use TypeScript types |

**Summary:** 7 of 7 acceptance criteria fully implemented

**Task Completion Validation:**

| Task | Marked As | Verified As | Evidence |
|------|-----------|-------------|----------|
| AC1 | [x] | VERIFIED COMPLETE | tsconfig.json configured with strict mode |
| AC2 | [x] | VERIFIED COMPLETE | Path aliases configured in tsconfig.json |
| AC3 | [x] | VERIFIED COMPLETE | Common types defined in src/types/index.ts |
| AC4 | [x] | VERIFIED COMPLETE | Utility types created in src/types/index.ts |
| AC5 | [x] | VERIFIED COMPLETE | Type guards implemented in src/types/index.ts |
| AC6 | [x] | VERIFIED COMPLETE | No `any` types found in codebase |
| AC7 | [x] | VERIFIED COMPLETE | All imports properly typed |

**Summary:** 7 of 7 completed tasks verified, 0 questionable, 0 falsely marked complete

**Test Coverage and Gaps:**
- Type guards have comprehensive unit tests in src/types/index.test.ts
- Type definitions tested for correct structure
- All acceptance criteria have corresponding implementation evidence

**Architectural Alignment:**
- Follows TypeScript best practices for strict mode configuration
- Path aliases configured for clean imports
- Type guards follow standard TypeScript patterns
- No violations of architectural constraints

**Security Notes:**
- No security concerns identified
- Type safety prevents common injection vulnerabilities

**Best-Practices and References:**
- TypeScript 5.3.3 (latest stable)
- Strict mode configuration follows TypeScript guidelines
- Type guards implement standard runtime type checking patterns
- Path aliases configured for scalable import management

**Action Items:**

**Code Changes Required:** None

**Advisory Notes:**
- Note: Consider adding more comprehensive type guards for complex objects as the codebase grows
- Note: TypeScript strict mode is properly configured and should prevent most type-related bugs

---

**Status:** done

---

## Epic 2: Basic Task Management

**Epic Goal:** Implement core task CRUD operations with local persistence using IndexedDB.

**Business Value:** Users can create, read, update, and delete tasks - the fundamental functionality of a todo app.

**Acceptance Criteria:**
- Tasks can be created with title and optional description
- Tasks can be edited inline
- Tasks can be marked complete/incomplete
- Tasks can be deleted with confirmation
- All operations persist to IndexedDB
- Task list displays all incomplete tasks
- Completed tasks moved to separate view

**Total Points:** 34

---

### E2-S1: IndexedDB Setup with Dexie.js

**As a** developer  
**I want** IndexedDB configured with Dexie.js  
**So that** task data persists locally

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Dexie.js v3.2+ installed and configured
- [ ] Database schema defined (tasks, completedTasks, preferences)
- [ ] Indexes created for efficient queries
- [ ] Database initialization on app load
- [ ] Error handling for IndexedDB failures
- [ ] Database version management configured
- [ ] Migration strategy prepared for future versions

**Technical Notes:**
- Reference [`docs/architecture.md`](architecture.md) Data Architecture section
- Create db/database.ts with Dexie class
- Implement compound indexes: [completed+createdAt]

**Definition of Done:**
- Database initializes successfully
- CRUD operations work
- Queries use indexes efficiently
- Error handling tested
- Unit tests for database operations

---

### E2-S2: Task Data Model and Redux Slice

**As a** developer  
**I want** a Task data model and Redux slice  
**So that** task state is managed predictably

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Task interface defined with all properties
- [ ] tasksSlice created with reducers
- [ ] Async thunks for CRUD operations
- [ ] Selectors for common queries
- [ ] Optimistic updates implemented
- [ ] Error handling for failed operations
- [ ] Loading states managed

**Technical Notes:**
- Task properties: id, title, description, completed, createdAt, completedAt, deferredUntil, metadata
- Use createAsyncThunk for IndexedDB operations
- Implement optimistic UI updates

**Definition of Done:**
- All CRUD operations work
- State updates correctly
- Optimistic updates feel instant
- Error states handled gracefully
- Unit tests for slice and thunks

---

### E2-S3: Task List View Component

**As a** user  
**I want** to see all my incomplete tasks in a list  
**So that** I know what I need to do

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Task list displays all incomplete tasks
- [ ] Tasks sorted by creation date (newest first)
- [ ] Empty state shown when no tasks
- [ ] Loading skeleton shown while fetching
- [ ] Smooth animations for task additions/removals
- [ ] Virtual scrolling for > 100 tasks
- [ ] Responsive layout (mobile, tablet, desktop)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Screen 1 layout
- Use react-window for virtual scrolling
- Implement skeleton loading pattern

**Definition of Done:**
- List renders correctly on all devices
- Performance good with 1000+ tasks
- Animations smooth (60fps)
- Accessibility: keyboard navigation works
- Visual design matches design system

---

### E2-S4: Task Card Component

**As a** user  
**I want** each task displayed as a card  
**So that** I can easily read and interact with tasks

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Task card shows title, description, metadata
- [ ] Checkbox for completion status
- [ ] Edit and delete action buttons
- [ ] Hover states on desktop
- [ ] Touch-optimized for mobile (44x44px targets)
- [ ] Card matches design system specifications
- [ ] Animations for state changes
- [ ] Completed tasks show strikethrough

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Task Card component
- Implement React.memo for performance
- Use MUI Card component as base

**Definition of Done:**
- Card renders correctly
- All interactions work
- Animations smooth
- Accessibility: ARIA labels correct
- Visual design matches mockups

---

### E2-S5: Task Creation (Quick Add)

**As a** user  
**I want** to quickly add a task  
**So that** I can capture todos without friction

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Quick add input at top of task list
- [ ] Placeholder text: "+ Add a task..."
- [ ] Enter key creates task
- [ ] Input clears after creation
- [ ] New task appears at top of list with animation
- [ ] Focus returns to input after creation
- [ ] Validation: title required, max 500 chars
- [ ] Error feedback for invalid input

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Quick Add Bar
- Auto-focus on input after task creation
- Debounce validation for performance

**Definition of Done:**
- Task creation works smoothly
- Validation prevents invalid tasks
- Keyboard shortcuts work (Enter to submit)
- Accessibility: screen reader announces creation
- Animation feels responsive

---

### E2-S6: Task Editing (Inline)

**As a** user  
**I want** to edit tasks inline  
**So that** I can update details without opening a modal

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Click task title to enter edit mode
- [ ] Title becomes editable input
- [ ] Description becomes editable textarea
- [ ] Save on blur or Enter key
- [ ] Cancel on Escape key
- [ ] Validation: title required, max lengths
- [ ] Optimistic update with rollback on error
- [ ] Visual feedback during editing

**Technical Notes:**
- Use contentEditable or controlled inputs
- Implement auto-save after 500ms idle
- Handle concurrent edits gracefully

**Definition of Done:**
- Inline editing works smoothly
- Changes persist to IndexedDB
- Validation prevents invalid data
- Keyboard shortcuts work
- Accessibility: edit mode announced

---

### E2-S7: Task Completion Toggle

**As a** user  
**I want** to mark tasks complete/incomplete  
**So that** I can track my progress

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Checkbox toggles completion status
- [ ] Completed tasks show strikethrough
- [ ] Completion animation (fade to green, slide out)
- [ ] Task moves to completed view after animation
- [ ] Undo toast appears for 3 seconds
- [ ] Optimistic update feels instant
- [ ] Completion timestamp recorded

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Task Completion Animation
- Use framer-motion or CSS animations
- Implement undo functionality

**Definition of Done:**
- Completion toggle works instantly
- Animation smooth and satisfying
- Undo works within 3-second window
- Completed tasks archived correctly
- Accessibility: state change announced

---

### E2-S8: Task Deletion with Confirmation

**As a** user  
**I want** to delete tasks with confirmation  
**So that** I don't accidentally lose important tasks

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Delete button on task card
- [ ] Confirmation modal appears
- [ ] Modal shows task title for context
- [ ] Cancel and Confirm buttons
- [ ] Confirm deletes task permanently
- [ ] Deletion animation (slide left, fade out)
- [ ] Undo toast appears for 3 seconds
- [ ] Keyboard shortcuts (Escape to cancel)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Modal component
- Store deleted task temporarily for undo
- Clear undo buffer after 3 seconds

**Definition of Done:**
- Deletion requires confirmation
- Undo works within 3-second window
- Animation smooth
- Keyboard navigation works
- Accessibility: deletion announced

---

## Epic 3: Flow Mode

**Epic Goal:** Implement full-screen focus mode that displays one task at a time with completion actions.

**Business Value:** Core differentiator - helps users maintain focus and enter flow state by eliminating distractions.

**Acceptance Criteria:**
- Full-screen view showing single task
- Complete, Skip, Time-Slip, and Exit actions
- Automatic advancement to next task
- Progress indicator
- Keyboard shortcuts for all actions
- Smooth transitions between tasks
- Works with mood-based prioritization

**Total Points:** 21

---

### E3-S1: Flow Mode Layout and Navigation

**As a** user  
**I want** to enter a distraction-free focus mode  
**So that** I can concentrate on one task at a time

**Story Points:** 5

**Acceptance Criteria:**
- [ ] "Enter Flow Mode" button on main view
- [ ] Full-screen layout with centered task
- [ ] Exit button in top-right corner
- [ ] Smooth transition animation entering/exiting
- [ ] Flow Mode route (/flow)
- [ ] Back button returns to main view
- [ ] State persists across page refreshes

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Screen 2: Flow Mode
- Use React Router for navigation
- Store flow state in Redux and localStorage

**Definition of Done:**
- Flow Mode accessible from main view
- Full-screen layout works on all devices
- Transitions smooth (< 300ms)
- State persistence works
- Accessibility: focus management correct

---

### E3-S2: Flow Mode Task Display

**As a** user  
**I want** to see the current task prominently  
**So that** I can focus on what needs to be done

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Task title displayed large and centered
- [ ] Task description shown below title (if exists)
- [ ] Task card has elevated shadow
- [ ] Responsive font sizes (32px mobile, 48px desktop)
- [ ] Text wraps properly for long titles
- [ ] Empty state when no tasks available
- [ ] Loading state while fetching next task

**Technical Notes:**
- Use Display Large typography from design system
- Center content vertically and horizontally
- Implement skeleton loading

**Definition of Done:**
- Task displays beautifully
- Readable on all screen sizes
- Empty state clear and helpful
- Loading state smooth

---

### E3-S3: Flow Mode Action Buttons

**As a** user  
**I want** clear action buttons in Flow Mode  
**So that** I can complete, skip, or defer tasks easily

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Complete button (green, primary)
- [ ] Skip/Next button (secondary)
- [ ] Time-Slip button (orange, secondary)
- [ ] Exit button (ghost, top-right)
- [ ] All buttons full-width on mobile
- [ ] Icons on all buttons
- [ ] Hover states on desktop
- [ ] Touch-optimized (56px height)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Flow Mode action buttons
- Use MUI Button with custom styling
- Implement button loading states

**Definition of Done:**
- All buttons work correctly
- Visual design matches mockups
- Touch targets adequate (44x44px minimum)
- Keyboard shortcuts work
- Accessibility: buttons properly labeled

---

### E3-S4: Flow Mode Task Queue Management

**As a** developer  
**I want** a task queue for Flow Mode  
**So that** tasks are presented in priority order

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Redux slice for flow state (queue, currentTask)
- [ ] Queue populated from visible tasks
- [ ] Queue respects mood-based prioritization
- [ ] Queue updates when tasks added/removed
- [ ] Current task tracked in state
- [ ] Next task preloaded for smooth transition
- [ ] Queue persists across page refreshes

**Technical Notes:**
- Create flowSlice with queue management
- Integrate with mood prioritization (E4)
- Use selectors for queue generation

**Definition of Done:**
- Queue generates correctly
- Prioritization respected
- State management robust
- Performance good with large queues
- Unit tests for queue logic

---

### E3-S5: Flow Mode Task Transitions

**As a** user  
**I want** smooth transitions between tasks  
**So that** Flow Mode feels fluid and responsive

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Complete: task slides right, next slides in from left
- [ ] Skip: task slides left, next slides in from right
- [ ] Time-Slip: task slides down, next slides in from top
- [ ] All transitions < 400ms
- [ ] Animations smooth (60fps)
- [ ] Progress indicator updates
- [ ] No flash of empty state between tasks

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Flow Mode Task Transition
- Use framer-motion or CSS animations
- Preload next task before transition

**Definition of Done:**
- All transitions smooth and satisfying
- No performance issues
- Animations respect reduced-motion preference
- Visual polish matches design system

---

### E3-S6: Flow Mode Keyboard Shortcuts

**As a** user  
**I want** keyboard shortcuts in Flow Mode  
**So that** I can work efficiently without mouse

**Story Points:** 2

**Acceptance Criteria:**
- [ ] Enter or C: Complete task
- [ ] Space or N: Skip to next
- [ ] T: Time-slip task
- [ ] Escape: Exit Flow Mode
- [ ] Shortcuts displayed on hover (desktop)
- [ ] Shortcuts work consistently
- [ ] No conflicts with browser shortcuts

**Technical Notes:**
- Use keyboard event listeners
- Display shortcuts in tooltip or help overlay
- Prevent default browser behavior

**Definition of Done:**
- All shortcuts work correctly
- Shortcuts documented in UI
- No conflicts with system shortcuts
- Accessibility: shortcuts announced

---

## Epic 4: Mood-Based Prioritization

**Epic Goal:** Implement mood selection and automatic task reordering based on user's current mental state.

**Business Value:** Unique feature that adapts task order to user's energy level and focus, increasing productivity.

**Acceptance Criteria:**
- 6 mood states selectable (Energized, Focused, Calm, Creative, Tired, Stressed)
- Mood selector always visible
- Task list reorders instantly on mood change
- Flow Mode queue respects mood prioritization
- Mood persists across sessions
- Smooth reordering animation

**Total Points:** 13

---

### E4-S1: Mood Data Model and Redux Slice

**As a** developer  
**I want** a mood state management system  
**So that** mood selection affects task prioritization

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Mood type defined (6 states)
- [ ] moodSlice created with current mood state
- [ ] Mood change action and reducer
- [ ] Mood persists to localStorage
- [ ] Mood restored on app load
- [ ] Default mood: Focused
- [ ] Mood history tracking (future feature prep)

**Technical Notes:**
- Mood types: Energized, Focused, Calm, Creative, Tired, Stressed
- Store in preferences table in IndexedDB
- Use localStorage for quick access

**Definition of Done:**
- Mood state managed correctly
- Persistence works
- State updates trigger re-renders
- Unit tests for mood slice

---

### E4-S2: Mood Selector Component

**As a** user  
**I want** to select my current mood  
**So that** tasks are prioritized for my mental state

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Mood selector displays 6 mood options
- [ ] Each mood has emoji icon and label
- [ ] Current mood highlighted
- [ ] Horizontal scroll on mobile
- [ ] All visible on tablet/desktop
- [ ] Smooth selection animation
- [ ] Touch-optimized (44px height)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Mood Selector component
- Use MUI ToggleButtonGroup or custom component
- Implement snap scrolling on mobile

**Definition of Done:**
- Selector renders correctly on all devices
- Selection works smoothly
- Visual design matches mockups
- Accessibility: radio group semantics
- Keyboard navigation works

---

### E4-S3: Mood-Based Prioritization Algorithm

**As a** developer  
**I want** a prioritization algorithm for each mood  
**So that** tasks are reordered appropriately

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Prioritization function for each mood
- [ ] Energized: longer/challenging tasks first
- [ ] Focused: short, clear tasks first
- [ ] Calm: reading/learning tasks first
- [ ] Creative: brainstorming tasks first
- [ ] Tired: quickest wins first
- [ ] Stressed: easiest + urgent first
- [ ] Algorithm uses task metadata (keywords, length)
- [ ] Performance: < 200ms for 1000 tasks

**Technical Notes:**
- Reference [`docs/prd.md`](prd.md) FR36-FR49 for mood rules
- Create prioritization.ts utility
- Use memoized selectors for performance

**Definition of Done:**
- All mood algorithms implemented
- Prioritization feels intuitive
- Performance meets requirements
- Unit tests for each mood algorithm
- Algorithm documented

---

### E4-S4: Task List Reordering on Mood Change

**As a** user  
**I want** tasks to reorder when I change mood  
**So that** the most relevant tasks appear first

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Task list reorders instantly on mood change
- [ ] Smooth animation during reorder
- [ ] Cards fade slightly during transition
- [ ] Staggered animation (50ms delay per card)
- [ ] No layout shift or jank
- [ ] Scroll position maintained if possible
- [ ] Visual feedback that reordering occurred

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Mood Change Transition
- Use framer-motion layout animations
- Implement staggered animation with delay

**Definition of Done:**
- Reordering smooth and satisfying
- Performance good with many tasks
- Animation respects reduced-motion
- Visual polish matches design system

---

### E4-S5: Flow Mode Integration with Mood

**As a** user  
**I want** Flow Mode to respect my mood  
**So that** I'm presented with appropriate tasks

**Story Points:** 2

**Acceptance Criteria:**
- [ ] Flow Mode queue uses mood prioritization
- [ ] Queue updates when mood changes in Flow Mode
- [ ] Current task remains if mood changes
- [ ] Next task reflects new mood priority
- [ ] Smooth transition to new queue order
- [ ] Mood selector accessible in Flow Mode (optional)

**Technical Notes:**
- Integrate mood selector with flow queue
- Update queue reactively on mood change
- Consider showing mood selector in Flow Mode

**Definition of Done:**
- Flow Mode respects mood prioritization
- Queue updates correctly
- User experience smooth
- Integration tested

---

## Epic 5: Smart Clusters

**Epic Goal:** Implement automatic task grouping based on keyword detection.

**Business Value:** Provides organization without manual effort, helping users see related tasks together.

**Acceptance Criteria:**
- Tasks automatically grouped by detected keywords
- Clusters displayed as collapsible sections
- Common keywords predefined (work, email, buy, etc.)
- Unclustered tasks in "Other" section
- Clusters color-coded
- Real-time clustering as tasks added/edited

**Total Points:** 21

---

### E5-S1: Keyword Detection Algorithm

**As a** developer  
**I want** a keyword extraction algorithm  
**So that** tasks can be automatically clustered

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Keyword extraction from task title and description
- [ ] Predefined keyword list (20+ common keywords)
- [ ] Case-insensitive matching
- [ ] Partial word matching (e.g., "email" matches "emailing")
- [ ] Multiple keywords per task supported
- [ ] Stop words filtered out
- [ ] Performance: < 50ms for 1000 tasks

**Technical Notes:**
- Reference [`docs/prd.md`](prd.md) FR26-FR35 for clustering requirements
- Create clustering.ts utility
- Keywords: work, email, buy, read, call, meeting, urgent, home, etc.

**Definition of Done:**
- Keyword extraction accurate
- Performance meets requirements
- Edge cases handled (empty tasks, special chars)
- Unit tests for extraction logic
- Algorithm documented

---

### E5-S2: Cluster Data Model and Redux Slice

**As a** developer  
**I want** a cluster state management system  
**So that** clusters are generated and updated automatically

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Cluster interface defined
- [ ] clustersSlice created
- [ ] Clusters generated from tasks automatically
- [ ] Clusters update when tasks change
- [ ] Cluster settings in preferences
- [ ] Cluster colors assigned cyclically
- [ ] Unclustered tasks tracked

**Technical Notes:**
- Cluster properties: id, name, keywords, color, taskIds
- Use selectors to generate clusters from tasks
- Memoize cluster generation for performance

**Definition of Done:**
- Cluster state managed correctly
- Clusters generate automatically
- Performance good with many tasks
- Unit tests for cluster logic

---

### E5-S3: Cluster Section Component

**As a** user  
**I want** to see tasks grouped by cluster  
**So that** related tasks are organized together

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Cluster sections display in task list
- [ ] Each section has header with cluster name and count
- [ ] Sections collapsible/expandable
- [ ] Chevron icon rotates on expand/collapse
- [ ] Color-coded dot for each cluster
- [ ] Smooth expand/collapse animation
- [ ] Sections sorted by task count (most first)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Smart Cluster Section
- Use MUI Accordion or custom component
- Implement collapse animation (max-height transition)

**Definition of Done:**
- Clusters render correctly
- Expand/collapse works smoothly
- Visual design matches mockups
- Accessibility: expandable semantics correct
- Keyboard navigation works

---

### E5-S4: Cluster Color Assignment

**As a** developer  
**I want** clusters to have distinct colors  
**So that** they're visually distinguishable

**Story Points:** 2

**Acceptance Criteria:**
- [ ] 8 predefined cluster colors
- [ ] Colors assigned cyclically to clusters
- [ ] Colors persist for same cluster name
- [ ] Color contrast meets WCAG AA
- [ ] Colors work in light and dark mode
- [ ] Color legend (optional)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Cluster Colors
- Colors: Purple, Teal, Yellow, Red, Grey, Purple, Blue, Orange
- Use hash function for consistent color assignment

**Definition of Done:**
- Colors assigned correctly
- Visual distinction clear
- Accessibility: color not sole indicator
- Colors documented

---

### E5-S5: Unclustered Tasks Section

**As a** user  
**I want** unclustered tasks in a separate section  
**So that** all tasks are visible even if not clustered

**Story Points:** 2

**Acceptance Criteria:**
- [ ] "Other" section for unclustered tasks
- [ ] Section appears last in list
- [ ] Same collapsible behavior as clusters
- [ ] Task count shown in header
- [ ] Grey color for "Other" section
- [ ] Empty state if all tasks clustered

**Technical Notes:**
- Filter tasks without detected keywords
- Use same ClusterSection component
- Handle empty state gracefully

**Definition of Done:**
- Unclustered tasks visible
- Section behaves like other clusters
- Empty state handled
- Visual design consistent

---

### E5-S6: Real-Time Cluster Updates

**As a** user  
**I want** clusters to update as I add/edit tasks  
**So that** organization stays current

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Clusters regenerate when tasks added
- [ ] Clusters regenerate when tasks edited
- [ ] Clusters regenerate when tasks deleted
- [ ] Smooth animation when task moves between clusters
- [ ] No flickering or layout shift
- [ ] Performance: < 100ms for updates
- [ ] Debounced updates during rapid changes

**Technical Notes:**
- Use Redux selectors with memoization
- Implement debouncing for rapid edits
- Animate task movement between clusters

**Definition of Done:**
- Clusters update automatically
- Updates smooth and performant
- No visual glitches
- User experience polished

---

## Epic 6: Time-Slip Functionality

**Epic Goal:** Implement one-tap task deferral to tomorrow with automatic reappearance.

**Business Value:** Reduces decision fatigue by allowing users to quickly defer tasks without guilt.

**Acceptance Criteria:**
- Swipe gesture on mobile to time-slip
- Button on desktop to time-slip
- Tasks disappear from today's view
- Tasks reappear automatically tomorrow
- Available in both list and Flow Mode
- Undo option for 3 seconds
- Visual feedback during time-slip

**Total Points:** 13

---

### E6-S1: Time-Slip Data Model

**As a** developer  
**I want** tasks to store deferred date  
**So that** time-slipped tasks can be hidden and restored

**Story Points:** 2

**Acceptance Criteria:**
- [ ] Task model includes deferredUntil timestamp
- [ ] IndexedDB index on deferredUntil
- [ ] Query filters tasks by deferred date
- [ ] Deferred tasks excluded from main list
- [ ] Deferred tasks included when date arrives
- [ ] Midnight check for deferred tasks
- [ ] App load check for deferred tasks

**Technical Notes:**
- Add deferredUntil?: number to Task interface
- Create index for efficient queries
- Implement date comparison logic

**Definition of Done:**
- Data model supports time-slip
- Queries efficient with index
- Date logic correct (timezone-aware)
- Unit tests for date logic

---

### E6-S2: Time-Slip Action (Desktop)

**As a** user  
**I want** a button to time-slip tasks  
**So that** I can defer tasks to tomorrow

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Time-slip button on task card
- [ ] Clock icon (⏰) on button
- [ ] Button styled with orange color
- [ ] Click sets deferredUntil to tomorrow 00:00
- [ ] Task slides down and fades out
- [ ] Toast notification: "Task moved to tomorrow"
- [ ] Undo button in toast (3 seconds)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Time-Slip button
- Calculate tomorrow: new Date().setHours(24, 0, 0, 0)
- Implement undo functionality

**Definition of Done:**
- Button works correctly
- Animation smooth
- Undo works within 3-second window
- Visual design matches mockups
- Accessibility: action announced

---

### E6-S3: Time-Slip Gesture (Mobile)

**As a** user  
**I want** to swipe right to time-slip tasks  
**So that** I can quickly defer tasks on mobile

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Swipe right gesture on task card
- [ ] Orange background reveals behind card
- [ ] Clock icon appears on background
- [ ] Threshold: 50px swipe distance
- [ ] Haptic feedback at threshold (if supported)
- [ ] Card follows finger with resistance
- [ ] Snap back if < threshold
- [ ] Complete time-slip if > threshold

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Time-Slip Gesture
- Use touch events or gesture library
- Implement resistance: card moves at 0.8x speed

**Definition of Done:**
- Gesture feels natural and responsive
- Threshold appropriate for mobile
- Haptic feedback works (iOS/Android)
- Animation smooth (60fps)
- Accessibility: alternative button available

---

### E6-S4: Time-Slip in Flow Mode

**As a** user  
**I want** to time-slip tasks in Flow Mode  
**So that** I can defer tasks during focused work

**Story Points:** 2

**Acceptance Criteria:**
- [ ] Time-slip button in Flow Mode actions
- [ ] Same functionality as list view
- [ ] Task slides down and fades out
- [ ] Next task appears automatically
- [ ] Toast notification appears
- [ ] Undo works in Flow Mode
- [ ] Keyboard shortcut (T) works

**Technical Notes:**
- Reuse time-slip logic from list view
- Integrate with Flow Mode queue
- Update queue after time-slip

**Definition of Done:**
- Time-slip works in Flow Mode
- Queue updates correctly
- User experience consistent with list view
- Keyboard shortcut works

---

### E6-S5: Automatic Task Restoration

**As a** developer  
**I want** time-slipped tasks to reappear automatically  
**So that** users see deferred tasks when ready

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Check deferred tasks on app load
- [ ] Check deferred tasks at midnight
- [ ] Restore tasks where deferredUntil <= now
- [ ] Clear deferredUntil on restoration
- [ ] Smooth animation for restored tasks
- [ ] Notification: "X tasks restored" (optional)
- [ ] Background check every hour (optional)

**Technical Notes:**
- Use setInterval for midnight check
- Calculate time until midnight for scheduling
- Consider using Web Workers for background checks

**Definition of Done:**
- Tasks restore automatically
- Timing accurate (midnight check works)
- No performance impact
- User experience smooth
- Edge cases handled (timezone changes)

---

## Epic 7: PWA & Offline Support

**Epic Goal:** Configure Progressive Web App features and offline functionality with Service Worker.

**Business Value:** Users can install app and use it offline, providing native-like experience.

**Acceptance Criteria:**
- App installable as PWA
- Works fully offline
- Service Worker caches assets
- App manifest configured
- Install prompt appears
- Offline indicator shown
- Background sync prepared (future)

**Total Points:** 21

---

### E7-S1: PWA Manifest Configuration

**As a** user  
**I want** to install FlowList as an app  
**So that** I can access it like a native application

**Story Points:** 3

**Acceptance Criteria:**
- [ ] manifest.json created with all required fields
- [ ] App name, short name, description defined
- [ ] Icons for all sizes (72px to 512px)
- [ ] Start URL configured
- [ ] Display mode: standalone
- [ ] Theme color and background color set
- [ ] Screenshots for app stores (optional)
- [ ] Categories defined (productivity, utilities)

**Technical Notes:**
- Reference [`docs/architecture.md`](architecture.md) PWA Manifest section
- Generate icons from single source (512x512)
- Use maskable icons for Android

**Definition of Done:**
- Manifest valid (Lighthouse check)
- Icons display correctly
- Install prompt appears
- App installs successfully
- Manifest documented

---

### E7-S2: Service Worker Setup

**As a** developer  
**I want** a Service Worker for offline support  
**So that** the app works without internet

**Story Points:** 8

**Acceptance Criteria:**
- [ ] Service Worker file created
- [ ] Registration in main app
- [ ] Cache-first strategy implemented
- [ ] All assets cached on install
- [ ] Runtime caching for dynamic content
- [ ] Cache versioning for updates
- [ ] Old caches cleaned on activate
- [ ] Offline fallback page

**Technical Notes:**
- Reference [`docs/architecture.md`](architecture.md) Service Worker Strategy
- Use Workbox or custom implementation
- Cache static assets: JS, CSS, fonts, icons

**Definition of Done:**
- Service Worker registers successfully
- Offline functionality works
- Cache strategy efficient
- Updates handled gracefully
- Lighthouse PWA score > 90

---

### E7-S3: Offline Indicator

**As a** user  
**I want** to know when I'm offline  
**So that** I understand app behavior

**Story Points:** 2

**Acceptance Criteria:**
- [ ] Offline indicator in header
- [ ] Shows when navigator.onLine is false
- [ ] Subtle design (not intrusive)
- [ ] Toast notification when going offline
- [ ] Toast notification when back online
- [ ] Indicator updates in real-time
- [ ] Works across all views

**Technical Notes:**
- Listen to online/offline events
- Use MUI Snackbar for notifications
- Store online status in Redux

**Definition of Done:**
- Indicator accurate
- Notifications timely
- Visual design subtle
- User experience clear

---

### E7-S4: Service Worker Update Handling

**As a** user  
**I want** to be notified of app updates  
**So that** I can get the latest features

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Detect new Service Worker available
- [ ] Show update notification
- [ ] "Update" button in notification
- [ ] Skip waiting on update click
- [ ] Reload page after update
- [ ] Update check on app focus
- [ ] Update check every hour
- [ ] Graceful update (no data loss)

**Technical Notes:**
- Listen to Service Worker updatefound event
- Implement skipWaiting and clients.claim
- Store update state in Redux

**Definition of Done:**
- Updates detected reliably
- Update process smooth
- No data loss during update
- User experience clear
- Edge cases handled

---

### E7-S5: Install Prompt Handling

**As a** user  
**I want** to be prompted to install the app  
**So that** I can easily add it to my home screen

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Capture beforeinstallprompt event
- [ ] Show custom install banner
- [ ] "Install App" button in settings
- [ ] Prompt appears after 3 visits (optional)
- [ ] Dismiss option for banner
- [ ] Track install acceptance
- [ ] Hide prompt after installation
- [ ] Platform-specific instructions (iOS)

**Technical Notes:**
- Store prompt event for later use
- Use localStorage to track dismissals
- iOS requires manual instructions (Add to Home Screen)

**Definition of Done:**
- Install prompt works on Android/Chrome
- Custom banner displays correctly
- iOS instructions clear
- User experience smooth
- Analytics tracked (optional)

---

## Epic 8: Data Management

**Epic Goal:** Implement data export, import, and management features for user data control.

**Business Value:** Users have full control over their data with backup and restore capabilities.

**Acceptance Criteria:**
- Export all data to JSON
- Import data from JSON backup
- Clear all data option
- Storage usage indicator
- Data validation on import
- No data loss during operations

**Total Points:** 13

---

### E8-S1: Data Export Functionality

**As a** user  
**I want** to export my data  
**So that** I can back up my tasks

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Export button in settings
- [ ] Exports all tasks, completed tasks, preferences
- [ ] JSON format with metadata
- [ ] Includes export timestamp and version
- [ ] Downloads as flowlist-backup-YYYY-MM-DD.json
- [ ] Confirmation toast after export
- [ ] Export includes task count in metadata

**Technical Notes:**
- Reference [`docs/architecture.md`](architecture.md) Export/Import Format
- Use Blob and URL.createObjectURL for download
- Include schema version for future compatibility

**Definition of Done:**
- Export works correctly
- JSON valid and complete
- File downloads successfully
- Metadata accurate
- User experience clear

---

### E8-S2: Data Import Functionality

**As a** user  
**I want** to import my data  
**So that** I can restore from backup

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Import button in settings
- [ ] File picker for JSON files
- [ ] Validates JSON structure
- [ ] Validates data integrity
- [ ] Shows preview before import
- [ ] Merge or replace options
- [ ] Confirmation dialog
- [ ] Progress indicator during import
- [ ] Success/error feedback

**Technical Notes:**
- Validate schema version compatibility
- Handle large files (> 1MB) gracefully
- Implement data sanitization

**Definition of Done:**
- Import works correctly
- Validation prevents bad data
- User can preview before import
- Error handling robust
- User experience clear

---

### E8-S3: Clear All Data

**As a** user  
**I want** to clear all my data  
**So that** I can start fresh

**Story Points:** 2

**Acceptance Criteria:**
- [ ] "Clear All Data" button in settings
- [ ] Confirmation dialog with warning
- [ ] Requires typing "DELETE" to confirm
- [ ] Clears all IndexedDB data
- [ ] Clears localStorage
- [ ] Resets app to initial state
- [ ] Success notification
- [ ] Cannot be undone (clear warning)

**Technical Notes:**
- Delete all IndexedDB databases
- Clear localStorage
- Reset Redux state
- Redirect to welcome screen

**Definition of Done:**
- Clear works completely
- Confirmation prevents accidents
- App resets correctly
- User experience clear
- Warning prominent

---

### E8-S4: Storage Usage Indicator

**As a** user  
**I want** to see my storage usage  
**So that** I know how much data I'm storing

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Storage usage shown in settings
- [ ] Shows used space and total available
- [ ] Progress bar visualization
- [ ] Task count and completed count
- [ ] Warning when approaching limit (> 80%)
- [ ] Updates in real-time
- [ ] Formatted sizes (KB, MB)

**Technical Notes:**
- Use navigator.storage.estimate() API
- Calculate IndexedDB size
- Update on data changes

**Definition of Done:**
- Usage accurate
- Visualization clear
- Warning appears appropriately
- Updates in real-time
- User experience informative

---

## Epic 9: UI/UX Polish

**Epic Goal:** Implement animations, transitions, accessibility features, and visual polish.

**Business Value:** Professional, delightful user experience that differentiates FlowList from competitors.

**Acceptance Criteria:**
- All animations smooth (60fps)
- Keyboard navigation complete
- Screen reader support
- WCAG 2.1 AA compliant
- Loading states for all operations
- Error states handled gracefully
- Responsive on all devices

**Total Points:** 21

---

### E9-S1: Animation System Implementation

**As a** developer  
**I want** a consistent animation system  
**So that** all transitions feel smooth and cohesive

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Animation library configured (framer-motion or CSS)
- [ ] Reusable animation components
- [ ] Transition timings from design system
- [ ] Easing functions defined
- [ ] Reduced motion support
- [ ] 60fps performance
- [ ] Animation documentation

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Interaction Patterns
- Use framer-motion for complex animations
- Implement prefers-reduced-motion media query

**Definition of Done:**
- Animation system working
- All animations smooth
- Reduced motion respected
- Performance good
- Documentation complete

---

### E9-S2: Loading States and Skeletons

**As a** user  
**I want** to see loading indicators  
**So that** I know the app is working

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Skeleton screens for all loading states
- [ ] Shimmer animation on skeletons
- [ ] Loading spinners for actions
- [ ] Progress bars for long operations
- [ ] No blank screens during loading
- [ ] Consistent loading patterns
- [ ] Accessible loading announcements

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Loading Skeleton
- Use MUI Skeleton component
- Implement shimmer with CSS gradient animation

**Definition of Done:**
- All loading states have indicators
- Skeletons match component shapes
- Animations smooth
- Accessibility: loading announced
- User experience clear

---

### E9-S3: Error Handling and States

**As a** user  
**I want** clear error messages  
**So that** I know what went wrong and how to fix it

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Error boundaries for React errors
- [ ] Error messages for all operations
- [ ] Retry buttons for failed operations
- [ ] Offline error handling
- [ ] Validation error messages
- [ ] Error toast notifications
- [ ] Error logging (console)

**Technical Notes:**
- Implement React Error Boundary
- Create error message dictionary
- Use MUI Alert for error display

**Definition of Done:**
- All errors handled gracefully
- Error messages clear and actionable
- Retry functionality works
- User experience helpful
- No unhandled errors

---

### E9-S4: Keyboard Navigation

**As a** user  
**I want** to navigate with keyboard  
**So that** I can use the app efficiently

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Tab order logical throughout app
- [ ] All interactive elements keyboard accessible
- [ ] Keyboard shortcuts documented
- [ ] Focus indicators visible
- [ ] Skip to main content link
- [ ] Modal focus trapping
- [ ] Focus restoration after modals
- [ ] Keyboard shortcut help overlay

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Keyboard Navigation
- Use tabindex appropriately
- Implement focus management

**Definition of Done:**
- Full keyboard navigation works
- Tab order logical
- Focus indicators visible
- Shortcuts documented
- Accessibility: keyboard-only usable

---

### E9-S5: Screen Reader Support

**As a** user with visual impairment  
**I want** screen reader support  
**So that** I can use the app independently

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Semantic HTML throughout
- [ ] ARIA labels on all interactive elements
- [ ] ARIA live regions for dynamic content
- [ ] Descriptive alt text for images
- [ ] Proper heading hierarchy
- [ ] Form labels associated correctly
- [ ] Screen reader tested (NVDA, VoiceOver)

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Screen Reader Support
- Use ARIA roles, labels, and descriptions
- Test with actual screen readers

**Definition of Done:**
- All content accessible to screen readers
- ARIA labels accurate
- Live regions announce changes
- Tested with NVDA and VoiceOver
- WCAG 2.1 AA compliant

---

### E9-S6: Responsive Design Polish

**As a** user  
**I want** the app to work perfectly on any device  
**So that** I can use it anywhere

**Story Points:** 5

**Acceptance Criteria:**
- [ ] Works on 320px width (iPhone SE)
- [ ] Smooth breakpoint transitions
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll
- [ ] Readable text on all sizes
- [ ] Orientation changes handled
- [ ] Tested on real devices

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) Responsive Behavior
- Test on physical devices (iOS, Android)
- Use Chrome DevTools device emulation

**Definition of Done:**
- Works on all target devices
- Breakpoints smooth
- Touch targets adequate
- Visual design consistent
- Real device testing complete

---

### E9-S7: Visual Polish and Micro-interactions

**As a** user  
**I want** delightful micro-interactions  
**So that** the app feels polished and professional

**Story Points:** 3

**Acceptance Criteria:**
- [ ] Button hover states smooth
- [ ] Card hover effects subtle
- [ ] Checkbox animation satisfying
- [ ] Toast notifications slide in smoothly
- [ ] Modal transitions elegant
- [ ] Ripple effects on touch
- [ ] Consistent timing across interactions
- [ ] All animations respect reduced-motion

**Technical Notes:**
- Reference [`docs/design-system.md`](design-system.md) for all interaction specs
- Use MUI ripple effects
- Fine-tune timing and easing

**Definition of Done:**
- All micro-interactions polished
- Animations feel cohesive
- Timing consistent
- User experience delightful
- Design system followed

---

## Sprint Planning Recommendations

### Sprint 0: Foundation (2 weeks)
**Goal:** Set up development environment and core infrastructure

**Stories:**
- E1-S1: Project Initialization (3 pts)
- E1-S2: Redux Store Configuration (3 pts)
- E1-S3: MUI Theme Configuration (3 pts)
- E1-S4: Code Quality Tools (2 pts)
- E1-S5: Project Structure and Routing (5 pts)
- E1-S6: TypeScript Configuration (5 pts)

**Total:** 21 points  
**Deliverable:** Working development environment with routing

---

### Sprint 1: Basic Task Management (2 weeks)
**Goal:** Implement core CRUD operations for tasks

**Stories:**
- E2-S1: IndexedDB Setup (5 pts)
- E2-S2: Task Data Model and Redux Slice (5 pts)
- E2-S3: Task List View Component (5 pts)
- E2-S4: Task Card Component (5 pts)
- E2-S5: Task Creation (3 pts)

**Total:** 23 points  
**Deliverable:** Users can create and view tasks

---

### Sprint 2: Task Operations (2 weeks)
**Goal:** Complete task management features

**Stories:**
- E2-S6: Task Editing (5 pts)
- E2-S7: Task Completion Toggle (3 pts)
- E2-S8: Task Deletion (3 pts)
- E9-S2: Loading States (3 pts)
- E9-S3: Error Handling (3 pts)

**Total:** 17 points  
**Deliverable:** Full task CRUD functionality

---

### Sprint 3: Flow Mode (2 weeks)
**Goal:** Implement distraction-free focus mode

**Stories:**
- E3-S1: Flow Mode Layout (5 pts)
- E3-S2: Flow Mode Task Display (3 pts)
- E3-S3: Flow Mode Actions (5 pts)
- E3-S4: Task Queue Management (5 pts)

**Total:** 18 points  
**Deliverable:** Working Flow Mode

---

### Sprint 4: Flow Mode & Mood (2 weeks)
**Goal:** Complete Flow Mode and add mood prioritization

**Stories:**
- E3-S5: Flow Mode Transitions (3 pts)
- E3-S6: Keyboard Shortcuts (2 pts)
- E4-S1: Mood Data Model (3 pts)
- E4-S2: Mood Selector (3 pts)
- E4-S3: Prioritization Algorithm (5 pts)

**Total:** 16 points  
**Deliverable:** Flow Mode with mood-based prioritization

---

### Sprint 5: Mood & Clusters (2 weeks)
**Goal:** Complete mood features and implement smart clusters

**Stories:**
- E4-S4: Task List Reordering (3 pts)
- E4-S5: Flow Mode Mood Integration (2 pts)
- E5-S1: Keyword Detection (5 pts)
- E5-S2: Cluster Data Model (3 pts)
- E5-S3: Cluster Section Component (5 pts)

**Total:** 18 points  
**Deliverable:** Mood prioritization and smart clusters

---

### Sprint 6: Clusters & Time-Slip (2 weeks)
**Goal:** Complete clusters and implement time-slip

**Stories:**
- E5-S4: Cluster Colors (2 pts)
- E5-S5: Unclustered Tasks (2 pts)
- E5-S6: Real-Time Updates (3 pts)
- E6-S1: Time-Slip Data Model (2 pts)
- E6-S2: Time-Slip Desktop (3 pts)
- E6-S3: Time-Slip Mobile Gesture (5 pts)

**Total:** 17 points  
**Deliverable:** Smart clusters and time-slip functionality

---

### Sprint 7: Time-Slip & PWA (2 weeks)
**Goal:** Complete time-slip and implement PWA features

**Stories:**
- E6-S4: Time-Slip in Flow Mode (2 pts)
- E6-S5: Automatic Restoration (3 pts)
- E7-S1: PWA Manifest (3 pts)
- E7-S2: Service Worker (8 pts)

**Total:** 16 points  
**Deliverable:** Time-slip complete, app installable

---

### Sprint 8: PWA & Data Management (2 weeks)
**Goal:** Complete PWA and add data management

**Stories:**
- E7-S3: Offline Indicator (2 pts)
- E7-S4: Service Worker Updates (5 pts)
- E7-S5: Install Prompt (3 pts)
- E8-S1: Data Export (3 pts)
- E8-S2: Data Import (5 pts)

**Total:** 18 points  
**Deliverable:** Full PWA with data management

---

### Sprint 9: Polish & Accessibility (2 weeks)
**Goal:** Polish UI/UX and ensure accessibility

**Stories:**
- E8-S3: Clear All Data (2 pts)
- E8-S4: Storage Usage (3 pts)
- E9-S1: Animation System (5 pts)
- E9-S4: Keyboard Navigation (5 pts)
- E9-S5: Screen Reader Support (5 pts)

**Total:** 20 points  
**Deliverable:** Polished, accessible application

---

### Sprint 10: Final Polish (2 weeks)
**Goal:** Final polish and testing

**Stories:**
- E9-S6: Responsive Design Polish (5 pts)
- E9-S7: Micro-interactions (3 pts)
- Testing and bug fixes
- Documentation
- Deployment preparation

**Total:** 8 points + testing  
**Deliverable:** Production-ready MVP

---

## Success Metrics

**Development Metrics:**
- Velocity: Target 18-20 points per sprint
- Code coverage: > 80% for critical paths
- Lighthouse scores: Performance > 90, Accessibility > 90
- Bundle size: < 500KB gzipped

**User Metrics (Post-Launch):**
- Flow Mode session duration > 15 minutes
- Task completion rate > 70%
- Daily return rate > 60%
- PWA install rate > 50% of regular users

---

## Risk Management

**Technical Risks:**
1. **IndexedDB browser compatibility** - Mitigation: Polyfills, fallback to localStorage
2. **Service Worker complexity** - Mitigation: Use Workbox library, thorough testing
3. **Performance with large datasets** - Mitigation: Virtual scrolling, pagination
4. **Mobile gesture conflicts** - Mitigation: Careful threshold tuning, testing

**Schedule Risks:**
1. **Underestimated complexity** - Mitigation: Buffer sprints, prioritize ruthlessly
2. **Scope creep** - Mitigation: Strict MVP definition, defer enhancements
3. **Testing time** - Mitigation: Continuous testing, automated tests

---

## Definition of Done (Project-Level)

**Code Quality:**
- [ ] All code reviewed and approved
- [ ] ESLint passes with no errors
- [ ] TypeScript strict mode passes
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Code coverage > 80%

**Functionality:**
- [ ] All acceptance criteria met
- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] Mobile device testing done
- [ ] Accessibility testing done
- [ ] Performance testing done

**Documentation:**
- [ ] Code documented with JSDoc
- [ ] README updated
- [ ] User guide created
- [ ] API documentation complete
- [ ] Deployment guide complete

**Deployment:**
- [ ] Production build successful
- [ ] Lighthouse scores meet targets
- [ ] PWA installable
- [ ] Offline functionality verified
- [ ] Deployed to production

---

## Appendix: Story Template

```markdown
### [Epic-Story]: [Story Title]

**As a** [user type]  
**I want** [goal]  
**So that** [benefit]

**Story Points:** [1, 2, 3, 5, 8, 13, 21]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Technical Notes:**
- Implementation details
- Architecture references
- Dependencies

**Definition of Done:**
- Code complete and reviewed
- Tests passing
- Documentation updated
- Acceptance criteria met
```

---

**Document Status:** Complete  
**Next Steps:** Sprint planning, story refinement, development kickoff  
**Version:** 1.0  
**Last Updated:** 2025-11-20