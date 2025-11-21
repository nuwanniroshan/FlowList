# Requirement Brief: FlowList – Minimal Focus Todo Application

**Project Name:** FlowList  
**Version:** 1.0 (Minimum Viable Product)  
**Date:** November 20, 2025  
**Objective:** Build the simplest yet most effective personal todo application that helps users stay focused and productive by combining distraction-free execution with intelligent, automatic organization and mood-aware prioritization.

### Core Principles
- Zero authentication – fully offline-first, runs entirely in the browser.
- All user data stored locally using IndexedDB (no backend, no sync).
- Extremely lightweight, fast, and responsive.
- Designed for power users who want structure without manual effort.

### Functional Requirements

1. **Basic Task Management**  
   - Add new tasks (title + optional short description)  
   - Edit existing tasks inline  
   - Mark tasks as complete / uncomplete  
   - Delete tasks (with confirmation or undo toast)  
   - Tasks persist across sessions via IndexedDB  

2. **Flow Mode (Focus Mode)**  
   - Dedicated full-screen view showing only one active (incomplete) task at a time  
   - Large, centered task title with checkbox  
   - Buttons: “Complete”, “Skip / Next”, “Time-Slip to Tomorrow”, “Exit Flow Mode”  
   - Automatically advances to the next relevant task when completed  
   - Minimal UI – no task list visible to eliminate choice paralysis  

3. **Smart Clusters**  
   - Automatic grouping of tasks by common keywords in the title/description  
   - Clusters generated on-the-fly (no manual folders or projects)  
   - Examples: “work”, “email”, “buy”, “read”, “call”, “meeting”  
   - Displayed as collapsible sections or colored tags in the main list view  
   - Uses simple keyword extraction + predefined common word list (no ML required for MVP)  

4. **Mood-Based Prioritization**  
   - Quick mood selector (5–6 emoji icons) at the top of the app:  
     Energized ⚡ · Focused ⚙️ · Calm 🌿 · Creative 🎨 · Tired 😴 · Stressed 🔥  
   - When a mood is selected, task order in the main list and Flow Mode queue is instantly reordered using simple rules:  
     - Energized → favors longer/harder tasks first  
     - Focused → short, clear tasks first  
     - Calm → reading/learning/reflection tasks  
     - Creative → brainstorming/idea tasks  
     - Tired → quickest wins first  
     - Stressed → easiest + most urgent first  
   - Mood is saved in local storage and persists until changed  

5. **Time-Slip Tasks**  
   - One-tap “Slide to Tomorrow” action available on any task  
   - Adds a hidden “deferredUntil” date set to tomorrow 00:00  
   - Task disappears from today’s view and reappears tomorrow  
   - Accessible via swipe gesture or button in both list and Flow Mode  

6. **Data Persistence**  
   - All tasks, settings, mood history, and deferred dates stored in browser IndexedDB  
   - Use idb library or Dexie.js for simpler IndexedDB wrapper  

### Non-Functional Requirements
- Fully responsive (mobile-first design)  
- PWA-ready (installable, works offline)  
- Load time < 1 second  
- No external authentication or accounts  

### Technology Stack
| Layer              | Technology                    |
|--------------------|-------------------------------|
| Framework          | React 18+ (with Hooks)        |
| State Management   | Redux Toolkit (RTK)           |
| UI Library         | Material UI (MUI v5+)         |
| Styling            | MUI theming + emotion         |
| Type Safety        | TypeScript (strict mode)      |
| Local Database     | IndexedDB via Dexie.js        |
| Code Style         | Airbnb ESLint config + Prettier |
| Environment        | .env for config (e.g., app version) |
| Build Tool         | Vite (recommended) or Create React App |

### Project Best Practices
- TypeScript everywhere  
- ESLint with airbnb + @typescript-eslint  
- Prettier with default settings  
- Husky + lint-staged for pre-commit checks  
- Commitlint with conventional commits  
- Component-level testing encouraged (React Testing Library)  
- Storybook optional for UI components  

### Hosting & Deployment
- Static hosting on AWS S3 + CloudFront  
- Domain & HTTPS via AWS Certificate Manager  
- Invalidation on each deploy  

### CI/CD Pipeline (GitHub Actions)
Automated workflow on push to main/develop:
1. Install dependencies  
2. Run lint (eslint)  
3. Run prettier check  
4. Run type check (tsc --noEmit)  
5. Run tests (if added)  
6. Build production bundle  
7. Deploy to S3 (using aws-actions/configure-aws-credentials + s3-sync)  
8. Invalidate CloudFront cache  

### Out of Scope for MVP
- User accounts / sync across devices  
- Recurring tasks  
- Due dates (except Time-Slip)  
- Subtasks  
- Attachments  
- Notifications  
- Dark mode toggle (can use MUI default system preference)  


FlowList: The todo app that gets out of your way and gently pushes you forward.