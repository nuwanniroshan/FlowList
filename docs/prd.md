# FlowList - Product Requirements Document

**Author:** BMad
**Date:** 2025-11-20
**Version:** 1.0

---

## Executive Summary

FlowList is a minimal focus todo application designed to help users stay focused and productive by combining distraction-free execution with intelligent, automatic organization and mood-aware prioritization. Built as a fully offline-first PWA, it runs entirely in the browser with zero authentication required, making it the simplest yet most effective personal productivity tool for power users who want structure without manual effort.

### What Makes This Special

**Flow Mode** - A revolutionary full-screen focus mode that shows only one task at a time, eliminating choice paralysis and keeping users in a state of productive flow. Combined with **mood-aware prioritization** that automatically reorders tasks based on your current mental state (Energized, Focused, Calm, Creative, Tired, or Stressed), FlowList adapts to how you feel, not just what you need to do.

The app's **Smart Clusters** feature automatically groups tasks by detecting common keywords, providing organization without the overhead of manual project management. Add **Time-Slip** functionality that lets you defer tasks to tomorrow with a single gesture, and you have a todo app that truly gets out of your way while gently pushing you forward.

---

## Project Classification

**Technical Type:** web_app
**Domain:** general (productivity)
**Complexity:** low

FlowList is classified as a **Progressive Web Application (PWA)** in the general productivity domain. As a browser-based SPA with offline-first architecture, it leverages modern web standards (Service Workers, IndexedDB, Web App Manifest) to deliver a native-like experience without platform-specific development. The low complexity classification reflects its focused scope and absence of backend infrastructure, regulatory requirements, or complex domain knowledge.

---

## Success Criteria

**Primary Success Metric:** Users enter and maintain Flow Mode for focused work sessions, completing tasks without distraction.

**User Love Indicators:**
- Users report feeling "in the zone" during Flow Mode sessions
- Daily active usage with consistent task completion rates
- Users describe the app as "getting out of their way"
- Mood-based prioritization feels intuitive and helpful

**Engagement Metrics:**
- Average Flow Mode session duration > 15 minutes
- Task completion rate > 70% for tasks entered into Flow Mode
- Daily return rate > 60% for active users
- Smart Clusters automatically organize > 80% of tasks without manual intervention

**Technical Success:**
- App loads in < 1 second on 3G connection
- Works flawlessly offline with zero data loss
- Installs as PWA with > 50% of regular users

---

## Product Scope

### MVP - Minimum Viable Product

**Core Capabilities (Must Have):**

1. **Basic Task Management**
   - Add, edit, complete, and delete tasks
   - Tasks persist locally via IndexedDB
   - Inline editing for quick updates

2. **Flow Mode (Focus Mode)**
   - Full-screen single-task view
   - Complete, Skip, Time-Slip, and Exit actions
   - Automatic advancement to next task
   - Zero distractions - no task list visible

3. **Smart Clusters**
   - Automatic keyword-based task grouping
   - On-the-fly cluster generation
   - Collapsible sections in list view
   - Simple keyword extraction (no ML required)

4. **Mood-Based Prioritization**
   - 6 mood states: Energized ⚡, Focused ⚙️, Calm 🌿, Creative 🎨, Tired 😴, Stressed 🔥
   - Instant task reordering based on selected mood
   - Mood persistence across sessions
   - Simple rule-based prioritization logic

5. **Time-Slip Tasks**
   - One-tap defer to tomorrow
   - Tasks disappear from today's view
   - Automatic reappearance next day
   - Available in both list and Flow Mode

6. **Data Persistence**
   - All data stored in browser IndexedDB
   - No backend, no sync, no accounts
   - Dexie.js for simplified IndexedDB access

### Growth Features (Post-MVP)

**Enhanced Organization:**
- Custom cluster keywords and rules
- Manual cluster creation and management
- Task filtering by cluster
- Cluster-based statistics and insights

**Advanced Flow Mode:**
- Pomodoro timer integration
- Break reminders
- Session statistics and streaks
- Focus music/ambient sound integration

**Data Portability:**
- Export all data to JSON
- Import from JSON backup
- Export to common formats (CSV, Markdown)

**Customization:**
- Custom mood definitions and rules
- Personalized prioritization algorithms
- Theme customization beyond system preference
- Keyboard shortcuts configuration

### Vision (Future)

**Intelligence Layer:**
- ML-based cluster suggestions
- Smart task duration estimation
- Optimal task sequencing recommendations
- Pattern recognition for productivity insights

**Collaboration (Optional):**
- Shared task lists (with sync)
- Team Flow Mode sessions
- Collaborative clusters

**Platform Expansion:**
- Native mobile apps (iOS/Android)
- Desktop apps (Electron)
- Browser extensions for quick task capture

**Integration Ecosystem:**
- Calendar integration
- Email-to-task conversion
- Third-party app connections (Slack, Notion, etc.)

---

## web_app Specific Requirements

**Browser Compatibility:**
- Modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Progressive Web App (PWA) capabilities required
- Service Worker support for offline functionality
- IndexedDB support for local data storage

**Responsive Design:**
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Touch-optimized interactions for mobile devices
- Keyboard navigation support for desktop

**Performance Targets:**
- Initial load time: < 1 second on 3G connection
- Time to Interactive (TTI): < 2 seconds
- First Contentful Paint (FCP): < 0.5 seconds
- Lighthouse Performance score: > 90

**PWA Requirements:**
- Installable via browser prompt
- Works offline with full functionality
- App manifest with icons and metadata
- Service Worker for caching and offline support
- Background sync for future sync features (post-MVP)

**SEO Strategy:**
- Not applicable - this is a productivity tool, not content-driven
- Focus on app store presence and direct marketing
- Landing page optimized for conversion, not search

**Accessibility Level:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation throughout
- Screen reader support for core features
- High contrast mode support
- Focus indicators on all interactive elements

---

## User Experience Principles

**Design Philosophy: Minimal Friction, Maximum Focus**

The UI should feel like it's barely there - a gentle guide rather than a demanding interface. Every interaction should be obvious, every transition smooth, and every feature discoverable without explanation.

**Visual Personality:**
- **Clean & Minimal:** Generous whitespace, clear typography, subtle colors
- **Calm & Focused:** No aggressive colors, no unnecessary animations
- **Professional yet Approachable:** Serious about productivity, but not corporate or sterile
- **Adaptive:** Respects system theme preferences (light/dark mode)

**Core UX Principles:**

1. **Zero Cognitive Load:** Users shouldn't think about how to use the app, only about their tasks
2. **Immediate Feedback:** Every action has instant, clear feedback
3. **Forgiving:** Easy undo, no destructive actions without confirmation
4. **Adaptive:** The app adapts to the user's mood and context, not vice versa
5. **Invisible Technology:** IndexedDB, Service Workers, PWA features work silently in the background

**Interaction Patterns:**

- **Gestures:** Swipe to time-slip tasks (mobile)
- **Keyboard Shortcuts:** Power users can navigate entirely via keyboard
- **Touch Targets:** Minimum 44x44px for mobile interactions
- **Animations:** Subtle, purposeful, < 300ms duration
- **Loading States:** Skeleton screens, not spinners

### Key Interactions

**Task Creation:**
- Quick add via floating action button or keyboard shortcut
- Inline editing immediately after creation
- Auto-focus on task title field
- Optional description field (collapsed by default)

**Flow Mode Entry:**
- Prominent "Enter Flow Mode" button in main view
- Smooth full-screen transition
- Task appears centered with large, readable text
- Action buttons clearly labeled and spaced

**Mood Selection:**
- Always visible mood selector at top of app
- Single tap to change mood
- Instant visual feedback (task list reorders)
- Current mood highlighted with subtle glow

**Smart Clusters:**
- Automatically appear as tasks are added
- Collapsible sections with task count
- Color-coded for quick visual scanning
- Tap cluster name to filter view (post-MVP)

**Time-Slip Gesture:**
- Swipe right on task (mobile) or button click (desktop)
- Smooth slide-out animation
- Toast confirmation: "Task moved to tomorrow"
- Undo option in toast (3-second window)

---

## Functional Requirements

**Purpose:** These functional requirements define WHAT capabilities FlowList must have. They represent the complete inventory of user-facing and system capabilities that deliver the product vision. Every capability discussed in the vision, scope, and project-specific sections is represented here.

**Organization:** Requirements are grouped by capability area and numbered sequentially for traceability.

---

### User Account & Data Management

**FR1:** All user data is stored locally in the browser's IndexedDB with no backend or authentication required

**FR2:** Users can access their tasks immediately without any login or account creation

**FR3:** All data persists across browser sessions and survives browser restarts

**FR4:** Users can export their complete task database to JSON format

**FR5:** Users can import previously exported JSON data to restore tasks

**FR6:** System monitors IndexedDB storage usage and warns users before approaching browser limits

---

### Task Management

**FR7:** Users can create new tasks with a title (required) and optional description

**FR8:** Users can edit task titles and descriptions inline without entering a separate edit mode

**FR9:** Users can mark tasks as complete or incomplete with a single action

**FR10:** Users can delete tasks with confirmation to prevent accidental deletion

**FR11:** Deleted tasks trigger an undo toast notification with 3-second window to restore

**FR12:** Tasks maintain metadata including creation date, completion status, and deferred date

**FR13:** Users can view all incomplete tasks in the main list view

**FR14:** Users can view completed tasks in a separate completed tasks view

---

### Flow Mode (Focus Mode)

**FR15:** Users can enter Flow Mode from the main task list view

**FR16:** Flow Mode displays a single incomplete task in full-screen view with large, centered text

**FR17:** Flow Mode shows task title prominently with optional description below

**FR18:** Flow Mode provides "Complete" action to mark current task done and advance to next

**FR19:** Flow Mode provides "Skip / Next" action to move to next task without completing current

**FR20:** Flow Mode provides "Time-Slip to Tomorrow" action to defer current task

**FR21:** Flow Mode provides "Exit Flow Mode" action to return to main list view

**FR22:** Flow Mode automatically advances to the next relevant task after completing current task

**FR23:** Flow Mode respects mood-based prioritization when selecting next task

**FR24:** Flow Mode shows "No more tasks" message when task queue is empty

**FR25:** Flow Mode maintains focus state across browser refreshes (returns to Flow Mode if active)

---

### Smart Clusters

**FR26:** System automatically analyzes task titles and descriptions to detect common keywords

**FR27:** System groups tasks with shared keywords into clusters without user intervention

**FR28:** Clusters are generated on-the-fly as tasks are added or modified

**FR29:** System uses predefined common keyword list (work, email, buy, read, call, meeting, etc.)

**FR30:** Clusters appear as collapsible sections in the main list view

**FR31:** Each cluster displays the number of tasks it contains

**FR32:** Users can expand or collapse cluster sections to show/hide tasks

**FR33:** Clusters are color-coded for quick visual identification

**FR34:** Tasks can belong to multiple clusters if they contain multiple keywords

**FR35:** Unclustered tasks appear in a default "Other" section

---

### Mood-Based Prioritization

**FR36:** Users can select their current mood from 6 predefined states via mood selector

**FR37:** Mood states include: Energized ⚡, Focused ⚙️, Calm 🌿, Creative 🎨, Tired 😴, Stressed 🔥

**FR38:** Mood selector is always visible at the top of the main view

**FR39:** Selected mood is highlighted with visual indicator

**FR40:** Changing mood instantly reorders tasks in main list view based on mood-specific rules

**FR41:** Changing mood instantly reorders task queue in Flow Mode

**FR42:** Energized mood prioritizes longer or more challenging tasks first

**FR43:** Focused mood prioritizes short, clear, actionable tasks first

**FR44:** Calm mood prioritizes reading, learning, or reflection tasks

**FR45:** Creative mood prioritizes brainstorming or idea-generation tasks

**FR46:** Tired mood prioritizes quickest wins and easiest tasks first

**FR47:** Stressed mood prioritizes easiest and most urgent tasks first

**FR48:** Selected mood persists across sessions in local storage

**FR49:** System provides default mood (Focused) if no mood previously selected

---

### Time-Slip Functionality

**FR50:** Users can defer any task to tomorrow with a single action

**FR51:** Time-slip action is available via swipe gesture on mobile devices

**FR52:** Time-slip action is available via button click on desktop

**FR53:** Time-slip action is available in both main list view and Flow Mode

**FR54:** Time-slipped tasks are marked with hidden "deferredUntil" date set to tomorrow 00:00

**FR55:** Time-slipped tasks immediately disappear from today's task views

**FR56:** Time-slipped tasks automatically reappear in task list when deferred date arrives

**FR57:** System checks deferred dates on app load and at midnight to reveal time-slipped tasks

**FR58:** Time-slip action shows toast confirmation: "Task moved to tomorrow"

**FR59:** Time-slip toast includes undo option with 3-second window

---

### User Interface & Navigation

**FR60:** App provides responsive layout that adapts to mobile, tablet, and desktop screen sizes

**FR61:** App supports both light and dark themes based on system preference

**FR62:** App provides smooth transitions between views (< 300ms)

**FR63:** App provides keyboard shortcuts for power users (task creation, Flow Mode entry, navigation)

**FR64:** App provides touch-optimized interactions with minimum 44x44px touch targets

**FR65:** App shows loading skeleton screens during data operations (not spinners)

**FR66:** App provides clear visual feedback for all user actions

**FR67:** App maintains scroll position when navigating between views

---

### Progressive Web App (PWA)

**FR68:** App is installable as PWA via browser install prompt

**FR69:** App works fully offline with all features functional

**FR70:** App caches all assets via Service Worker for offline access

**FR71:** App provides app manifest with icons and metadata for installation

**FR72:** App shows appropriate install prompts on supported platforms

**FR73:** App updates Service Worker in background without disrupting user

---

### Data Integrity & Performance

**FR74:** All data operations complete in < 100ms for responsive feel

**FR75:** App loads initial view in < 1 second on 3G connection

**FR76:** App prevents data loss during browser crashes or unexpected closures

**FR77:** App validates all user input before storing to IndexedDB

**FR78:** App handles IndexedDB errors gracefully with user-friendly messages

**FR79:** App provides data consistency checks on startup

---

**Total Functional Requirements: 79**

These requirements comprehensively cover all capabilities needed to deliver the FlowList vision. Each requirement is testable, implementation-agnostic, and specifies WHO can do WHAT without prescribing HOW it's implemented.

---

## Non-Functional Requirements

### Performance

**Load Time:**
- Initial page load: < 1 second on 3G connection
- Time to Interactive (TTI): < 2 seconds
- First Contentful Paint (FCP): < 0.5 seconds
- Largest Contentful Paint (LCP): < 1.5 seconds

**Runtime Performance:**
- All UI interactions respond in < 100ms
- Task list rendering: < 50ms for up to 1000 tasks
- Flow Mode transitions: < 300ms
- IndexedDB operations: < 100ms for read/write
- Mood-based reordering: < 200ms for up to 1000 tasks

**Resource Usage:**
- Bundle size: < 500KB (gzipped)
- Memory usage: < 50MB for typical usage (100-500 tasks)
- IndexedDB storage: Efficient schema, < 1MB per 1000 tasks
- Service Worker cache: < 5MB total

**Lighthouse Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: Not applicable (productivity app)

### Security

**Data Privacy:**
- Zero data transmission to external servers
- All data remains on user's device
- No analytics or tracking without explicit user consent
- No third-party scripts or dependencies that phone home

**Local Storage Security:**
- IndexedDB data isolated per browser origin
- No sensitive data encryption required (user's device, user's responsibility)
- Clear documentation about local-only storage model
- Export/import uses standard JSON (user controls file security)

**Code Security:**
- No eval() or unsafe JavaScript patterns
- Content Security Policy (CSP) headers configured
- Subresource Integrity (SRI) for CDN resources
- Regular dependency updates for security patches

**PWA Security:**
- HTTPS required for Service Worker registration
- Service Worker scope limited to app origin
- No sensitive data in Service Worker cache
- Secure manifest.json configuration

### Accessibility

**WCAG 2.1 Level AA Compliance:**
- All interactive elements keyboard accessible
- Logical tab order throughout application
- Focus indicators visible on all focusable elements
- Skip navigation links for screen readers

**Screen Reader Support:**
- Semantic HTML throughout
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content updates
- Descriptive alt text for any images/icons

**Visual Accessibility:**
- Minimum contrast ratio 4.5:1 for normal text
- Minimum contrast ratio 3:1 for large text
- Text resizable up to 200% without loss of functionality
- No information conveyed by color alone

**Motor Accessibility:**
- Touch targets minimum 44x44px
- No time-based interactions required
- Gestures have button alternatives
- No precision-dependent interactions

**Cognitive Accessibility:**
- Clear, simple language throughout
- Consistent navigation patterns
- Obvious visual hierarchy
- Error messages are clear and actionable

### Scalability

**Data Scalability:**
- Support up to 10,000 tasks without performance degradation
- Efficient IndexedDB queries with proper indexing
- Pagination or virtualization for large task lists
- Graceful handling of storage quota limits

**Feature Scalability:**
- Modular architecture for easy feature additions
- Component-based design for reusability
- Clear separation of concerns (UI, state, storage)
- Extensible mood and cluster systems

### Compatibility

**Browser Support:**
- Chrome 90+ (desktop and mobile)
- Firefox 88+ (desktop and mobile)
- Safari 14+ (desktop and mobile)
- Edge 90+ (desktop)

**Device Support:**
- iOS 14+ (Safari, Chrome)
- Android 8+ (Chrome, Firefox)
- Windows 10+ (all supported browsers)
- macOS 10.15+ (all supported browsers)

**Screen Sizes:**
- Mobile: 320px - 767px width
- Tablet: 768px - 1024px width
- Desktop: 1025px+ width
- Support for portrait and landscape orientations

### Maintainability

**Code Quality:**
- TypeScript strict mode throughout
- ESLint with Airbnb config + TypeScript rules
- Prettier for consistent formatting
- Minimum 80% code coverage for critical paths

**Development Workflow:**
- Husky pre-commit hooks for linting and formatting
- Commitlint for conventional commit messages
- Automated testing in CI/CD pipeline
- Clear component documentation

**Deployment:**
- Automated deployment via GitHub Actions
- Zero-downtime deployments
- Automatic CloudFront cache invalidation
- Rollback capability for failed deployments

---

## Technology Stack

**Frontend Framework:** React 18+ with Hooks
**State Management:** Redux Toolkit (RTK)
**UI Library:** Material UI (MUI v5+)
**Styling:** MUI theming + Emotion
**Type Safety:** TypeScript (strict mode)
**Local Database:** IndexedDB via Dexie.js
**Build Tool:** Vite
**Code Quality:** ESLint (Airbnb) + Prettier
**Version Control:** Git with Conventional Commits
**CI/CD:** GitHub Actions
**Hosting:** AWS S3 + CloudFront
**Domain & SSL:** AWS Certificate Manager

---

## Out of Scope for MVP

The following features are explicitly excluded from the initial release to maintain focus on core value proposition:

- User accounts and authentication
- Cloud sync across devices
- Recurring tasks
- Due dates (except Time-Slip to tomorrow)
- Subtasks or task hierarchies
- File attachments
- Push notifications
- Collaboration features
- Third-party integrations
- Native mobile apps
- Desktop applications
- Browser extensions
- Calendar integration
- Email-to-task conversion
- Advanced analytics or reporting
- Custom themes beyond system preference
- Task templates
- Task dependencies
- Time tracking
- Task comments or notes beyond description

---

_This PRD captures the essence of FlowList - a minimal focus todo application that eliminates choice paralysis through Flow Mode, adapts to your mental state with mood-based prioritization, and organizes automatically with Smart Clusters. Built as an offline-first PWA, it's the simplest yet most effective personal productivity tool for power users who want structure without manual effort._

_Created through collaborative discovery between BMad and AI Product Manager._

---

**Document Status:** Complete
**Next Steps:** UX Design → Architecture → Epic Breakdown
**Version:** 1.0
**Last Updated:** 2025-11-20