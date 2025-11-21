# Story 2.2: redux-toolkit-store-configuration

Status: drafted

## Story

As a developer,
I want Redux Toolkit configured with TypeScript,
so that I can manage application state predictably.

## Acceptance Criteria

1. Redux store configured with TypeScript types
2. RootState and AppDispatch types exported
3. Redux DevTools integration working
4. Store provider wraps application
5. Middleware configured (thunk, serializable check)
6. Initial slice structure created (tasks, preferences)
7. Custom hooks (useAppDispatch, useAppSelector) created

## Tasks / Subtasks

- [ ] Task 1: Configure Redux store with TypeScript (AC: 1)
  - [ ] Set up configureStore with proper TypeScript configuration
  - [ ] Define RootState type from store
  - [ ] Define AppDispatch type from store
  - [ ] Export types for use throughout app
- [ ] Task 2: Export RootState and AppDispatch types (AC: 2)
  - [ ] Export RootState from store.ts
  - [ ] Export AppDispatch from store.ts
  - [ ] Ensure types are properly inferred
  - [ ] Test type inference works correctly
- [ ] Task 3: Integrate Redux DevTools (AC: 3)
  - [ ] Configure devTools option in store
  - [ ] Ensure DevTools work in development
  - [ ] Test state inspection capabilities
  - [ ] Verify actions are logged properly
- [ ] Task 4: Set up store provider (AC: 4)
  - [ ] Wrap app with Provider component
  - [ ] Pass store to Provider
  - [ ] Ensure provider is at correct level in component tree
  - [ ] Test store is accessible throughout app
- [ ] Task 5: Configure middleware (AC: 5)
  - [ ] Set up thunk middleware
  - [ ] Configure serializable check middleware
  - [ ] Handle non-serializable values appropriately
  - [ ] Test middleware functionality
- [ ] Task 6: Create initial slice structure (AC: 6)
  - [ ] Create tasksSlice with basic structure
  - [ ] Create preferencesSlice with basic structure
  - [ ] Set up slice exports
  - [ ] Configure slice integration with store
- [ ] Task 7: Implement custom hooks (AC: 7)
  - [ ] Create useAppDispatch hook
  - [ ] Create useAppSelector hook
  - [ ] Export hooks from store module
  - [ ] Test hooks work correctly in components
- [ ] Testing Tasks
  - [ ] Write unit tests for store configuration
  - [ ] Test type safety throughout app
  - [ ] Test DevTools integration
  - [ ] Test custom hooks functionality

## Dev Notes

- Build upon existing store.ts from Epic 1
- Ensure compatibility with database integration
- Follow Redux Toolkit best practices
- Maintain type safety throughout
- Prepare for async operations with database

### Project Structure Notes

- Use existing src/app/store.ts as base
- Create slices in src/features/ directory
- Follow established patterns from Epic 1
- Ensure proper separation of concerns

### References

- [Source: docs/architecture.md#State Management]
- [Source: docs/prd.md#Technical Requirements]
- [Source: docs/epics.md#E2-S2]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

BMad SM Agent v6.0.0-alpha.12

### Debug Log References

### Completion Notes List

### File List