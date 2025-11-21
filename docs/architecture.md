# FlowList - System Architecture Document

**Author:** BMad Architect  
**Date:** 2025-11-20  
**Version:** 1.0  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Architecture Principles](#architecture-principles)
4. [System Architecture](#system-architecture)
5. [Data Architecture](#data-architecture)
6. [Component Architecture](#component-architecture)
7. [State Management Architecture](#state-management-architecture)
8. [PWA & Offline Architecture](#pwa--offline-architecture)
9. [Performance Architecture](#performance-architecture)
10. [Security Architecture](#security-architecture)
11. [Deployment Architecture](#deployment-architecture)
12. [Technology Stack Details](#technology-stack-details)
13. [Development Workflow](#development-workflow)
14. [Scalability Considerations](#scalability-considerations)
15. [Future Architecture Evolution](#future-architecture-evolution)

---

## Executive Summary

FlowList is architected as a **fully offline-first Progressive Web Application (PWA)** that runs entirely in the browser with zero backend dependencies. The architecture prioritizes **simplicity, performance, and user privacy** through a client-only design that stores all data locally in IndexedDB.

### Key Architectural Decisions

- **No Backend:** 100% client-side application eliminates server costs, latency, and privacy concerns
- **Offline-First:** Service Worker + IndexedDB ensures full functionality without internet
- **React + Redux Toolkit:** Modern, maintainable state management with TypeScript safety
- **Material UI:** Consistent, accessible component library with built-in theming
- **Vite Build System:** Lightning-fast development and optimized production builds
- **AWS Static Hosting:** S3 + CloudFront for global CDN distribution

### Architecture Goals

1. **Zero Latency:** All operations complete in < 100ms
2. **Zero Data Loss:** Robust local persistence with export/import safety net
3. **Zero Friction:** Instant load, no authentication, works offline
4. **Zero Maintenance:** Static hosting with no server infrastructure to manage

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User's Browser                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application Layer                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │   UI Layer  │  │ State Layer │  │ Data Layer  │   │  │
│  │  │   (MUI)     │◄─┤   (Redux)   │◄─┤  (Dexie)    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
│                            ▲                                  │
│                            │                                  │
│  ┌────────────────────────┴──────────────────────────────┐  │
│  │              Service Worker Layer                      │  │
│  │  • Asset Caching  • Offline Support  • Updates        │  │
│  └────────────────────────────────────────────────────────┘  │
│                            ▲                                  │
│                            │                                  │
│  ┌────────────────────────┴──────────────────────────────┐  │
│  │              Browser Storage Layer                     │  │
│  │  • IndexedDB (Tasks)  • LocalStorage (Preferences)    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                    ┌───────┴────────┐
                    │  AWS CloudFront │
                    │   (Static CDN)  │
                    └────────────────┘
```

### System Boundaries

**Inside System Boundary:**
- React application code
- Redux state management
- IndexedDB data storage
- Service Worker caching
- PWA manifest and configuration

**Outside System Boundary:**
- No backend servers
- No authentication services
- No cloud sync services
- No third-party APIs (except CDN for initial load)

---

## Architecture Principles

### 1. Offline-First Design

**Principle:** The application must function perfectly without internet connectivity.

**Implementation:**
- Service Worker caches all application assets
- IndexedDB stores all user data locally
- No network requests required for core functionality
- Background sync prepared for future features

### 2. Zero-Backend Philosophy

**Principle:** Eliminate all server-side complexity and costs.

**Benefits:**
- No server maintenance or scaling concerns
- No database administration
- No API versioning or breaking changes
- Instant deployment via static file updates
- Zero hosting costs (S3 + CloudFront minimal)

### 3. Privacy by Architecture

**Principle:** User data never leaves their device.

**Implementation:**
- All data stored in browser's IndexedDB
- No analytics or tracking by default
- No user accounts or authentication
- Export/import gives users full data control

### 4. Performance by Default

**Principle:** Every interaction feels instant.

**Implementation:**
- Optimistic UI updates
- Virtual scrolling for large lists
- Code splitting for faster initial load
- Memoization for expensive computations
- IndexedDB indexes for fast queries

### 5. Progressive Enhancement

**Principle:** Core functionality works everywhere, enhanced features where supported.

**Implementation:**
- Base functionality works in all modern browsers
- PWA features enhance experience where available
- Graceful degradation for older browsers
- Feature detection over browser detection

---

## System Architecture

### Layer Architecture

FlowList follows a **strict layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  • React Components (UI)                                 │
│  • Material UI Components                                │
│  • Emotion Styling                                       │
│  • Responsive Layouts                                    │
└────────────────────┬────────────────────────────────────┘
                     │ Props & Events
┌────────────────────┴────────────────────────────────────┐
│                   Application Layer                      │
│  • Redux Store (State)                                   │
│  • Redux Slices (Logic)                                  │
│  • Custom Hooks                                          │
│  • Business Logic                                        │
└────────────────────┬────────────────────────────────────┘
                     │ Actions & Selectors
┌────────────────────┴────────────────────────────────────┐
│                      Data Layer                          │
│  • Dexie.js (IndexedDB Wrapper)                         │
│  • Data Models                                           │
│  • CRUD Operations                                       │
│  • Data Validation                                       │
└────────────────────┬────────────────────────────────────┘
                     │ Storage API
┌────────────────────┴────────────────────────────────────┐
│                   Persistence Layer                      │
│  • IndexedDB (Browser Storage)                          │
│  • LocalStorage (Preferences)                           │
│  • Service Worker Cache (Assets)                        │
└─────────────────────────────────────────────────────────┘
```

### Module Structure

```
flowlist/
├── src/
│   ├── app/                    # Application setup
│   │   ├── store.ts           # Redux store configuration
│   │   ├── App.tsx            # Root component
│   │   └── theme.ts           # MUI theme configuration
│   │
│   ├── features/              # Feature modules
│   │   ├── tasks/             # Task management
│   │   │   ├── tasksSlice.ts # Redux slice
│   │   │   ├── TaskList.tsx  # List view component
│   │   │   ├── TaskItem.tsx  # Individual task component
│   │   │   └── hooks/        # Custom hooks
│   │   │
│   │   ├── flow/              # Flow Mode
│   │   │   ├── flowSlice.ts  # Flow state management
│   │   │   ├── FlowMode.tsx  # Flow Mode component
│   │   │   └── FlowActions.tsx
│   │   │
│   │   ├── mood/              # Mood-based prioritization
│   │   │   ├── moodSlice.ts  # Mood state
│   │   │   ├── MoodSelector.tsx
│   │   │   └── prioritization.ts # Prioritization logic
│   │   │
│   │   └── clusters/          # Smart Clusters
│   │       ├── clustersSlice.ts
│   │       ├── ClusterView.tsx
│   │       └── clustering.ts  # Clustering algorithm
│   │
│   ├── db/                    # Database layer
│   │   ├── database.ts        # Dexie configuration
│   │   ├── models.ts          # TypeScript interfaces
│   │   └── migrations.ts      # Schema migrations
│   │
│   ├── components/            # Shared components
│   │   ├── common/            # Generic UI components
│   │   └── layout/            # Layout components
│   │
│   ├── hooks/                 # Shared custom hooks
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript types
│   └── service-worker/        # PWA service worker
│
├── public/                    # Static assets
│   ├── manifest.json         # PWA manifest
│   ├── icons/                # App icons
│   └── service-worker.js     # Service worker
│
└── tests/                    # Test files
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## Data Architecture

### IndexedDB Schema

FlowList uses **Dexie.js** to interact with IndexedDB, providing a clean, promise-based API.

#### Database: `FlowListDB`

**Version:** 1

**Object Stores:**

##### 1. Tasks Store

```typescript
interface Task {
  id: string;                    // UUID v4
  title: string;                 // Required, max 500 chars
  description?: string;          // Optional, max 5000 chars
  completed: boolean;            // Default: false
  createdAt: number;            // Unix timestamp
  completedAt?: number;         // Unix timestamp
  deferredUntil?: number;       // Unix timestamp (Time-Slip)
  metadata: {
    keywords: string[];         // Extracted for clustering
    estimatedDuration?: number; // Minutes (future)
    priority?: number;          // 1-5 (future)
  };
}

// Indexes
tasks.id (primary key)
tasks.completed
tasks.deferredUntil
tasks.createdAt
tasks.[completed+createdAt] (compound for sorting)
```

##### 2. Preferences Store

```typescript
interface Preferences {
  id: 'user-preferences';       // Single record
  currentMood: MoodType;        // Last selected mood
  theme: 'light' | 'dark' | 'system';
  flowModeActive: boolean;      // Restore Flow Mode on reload
  lastActiveTask?: string;      // Task ID for Flow Mode restoration
  clusterSettings: {
    enabled: boolean;
    customKeywords: string[];   // User-defined keywords (future)
  };
  updatedAt: number;            // Unix timestamp
}

// Indexes
preferences.id (primary key)
```

##### 3. CompletedTasks Store (Separate for Performance)

```typescript
interface CompletedTask extends Task {
  completed: true;
  completedAt: number;
  archivedAt: number;           // When moved to archive
}

// Indexes
completedTasks.id (primary key)
completedTasks.completedAt
completedTasks.archivedAt
```

### Data Flow

```
┌──────────────┐
│ User Action  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ React Component  │
└──────┬───────────┘
       │ Dispatch Action
       ▼
┌──────────────────┐
│  Redux Slice     │◄─── Optimistic Update
└──────┬───────────┘
       │ Async Thunk
       ▼
┌──────────────────┐
│   Dexie.js       │
└──────┬───────────┘
       │ Promise
       ▼
┌──────────────────┐
│   IndexedDB      │
└──────┬───────────┘
       │ Success/Error
       ▼
┌──────────────────┐
│  Redux Update    │
└──────┬───────────┘
       │ Re-render
       ▼
┌──────────────────┐
│   UI Update      │
└──────────────────┘
```

### Data Validation

**Input Validation:**
```typescript
// Task title validation
const validateTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.length <= 500;
};

// Task description validation
const validateDescription = (desc: string): boolean => {
  return desc.length <= 5000;
};

// Date validation
const validateDate = (timestamp: number): boolean => {
  return timestamp > 0 && timestamp <= Date.now() + (365 * 24 * 60 * 60 * 1000);
};
```

**Data Sanitization:**
- HTML escaping for user input
- Trim whitespace from titles
- Normalize line endings in descriptions
- Remove null bytes and control characters

### Data Migration Strategy

```typescript
// Dexie version management
const db = new Dexie('FlowListDB');

db.version(1).stores({
  tasks: 'id, completed, deferredUntil, createdAt, [completed+createdAt]',
  preferences: 'id',
  completedTasks: 'id, completedAt, archivedAt'
});

// Future migration example
db.version(2).stores({
  tasks: 'id, completed, deferredUntil, createdAt, [completed+createdAt], priority'
}).upgrade(tx => {
  return tx.table('tasks').toCollection().modify(task => {
    task.metadata.priority = 3; // Default priority
  });
});
```

### Export/Import Format

**Export Format (JSON):**
```json
{
  "version": "1.0",
  "exportedAt": 1700000000000,
  "data": {
    "tasks": [...],
    "completedTasks": [...],
    "preferences": {...}
  },
  "metadata": {
    "totalTasks": 150,
    "completedTasks": 75,
    "appVersion": "1.0.0"
  }
}
```

---

## Component Architecture

### Component Hierarchy

```
App
├── ThemeProvider (MUI)
│   └── CssBaseline
│       └── Router
│           ├── MainLayout
│           │   ├── Header
│           │   │   ├── Logo
│           │   │   ├── MoodSelector
│           │   │   └── SettingsButton
│           │   │
│           │   ├── MainView (Route: /)
│           │   │   ├── TaskInput
│           │   │   ├── ClusterView
│           │   │   │   ├── ClusterSection
│           │   │   │   │   └── TaskList
│           │   │   │   │       └── TaskItem
│           │   │   │   │           ├── TaskCheckbox
│           │   │   │   │           ├── TaskTitle
│           │   │   │   │           ├── TaskDescription
│           │   │   │   │           └── TaskActions
│           │   │   │   │               ├── TimeSlipButton
│           │   │   │   │               ├── EditButton
│           │   │   │   │               └── DeleteButton
│           │   │   │   └── UncluseredTasks
│           │   │   │
│           │   │   └── FloatingActionButton (Enter Flow Mode)
│           │   │
│           │   ├── FlowMode (Route: /flow)
│           │   │   ├── FlowTask
│           │   │   │   ├── TaskTitle
│           │   │   │   └── TaskDescription
│           │   │   │
│           │   │   └── FlowActions
│           │   │       ├── CompleteButton
│           │   │       ├── SkipButton
│           │   │       ├── TimeSlipButton
│           │   │       └── ExitButton
│           │   │
│           │   ├── CompletedView (Route: /completed)
│           │   │   └── CompletedTaskList
│           │   │       └── CompletedTaskItem
│           │   │
│           │   └── SettingsView (Route: /settings)
│           │       ├── ThemeToggle
│           │       ├── ExportButton
│           │       ├── ImportButton
│           │       └── AboutSection
│           │
│           └── Toast (Global)
│               └── ToastMessage
│
└── ServiceWorkerUpdater (Invisible)
```

### Component Design Patterns

#### 1. Container/Presentational Pattern

**Container Components** (Smart):
- Connect to Redux store
- Handle business logic
- Manage side effects
- Pass data to presentational components

```typescript
// TaskListContainer.tsx
const TaskListContainer: React.FC = () => {
  const tasks = useAppSelector(selectVisibleTasks);
  const dispatch = useAppDispatch();
  
  const handleComplete = (id: string) => {
    dispatch(completeTask(id));
  };
  
  return <TaskList tasks={tasks} onComplete={handleComplete} />;
};
```

**Presentational Components** (Dumb):
- Receive data via props
- Render UI only
- Emit events via callbacks
- No Redux connection

```typescript
// TaskList.tsx
interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete }) => {
  return (
    <List>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} />
      ))}
    </List>
  );
};
```

#### 2. Custom Hooks Pattern

Encapsulate reusable logic in custom hooks:

```typescript
// useTaskOperations.ts
const useTaskOperations = () => {
  const dispatch = useAppDispatch();
  
  const createTask = useCallback((title: string, description?: string) => {
    dispatch(addTask({ title, description }));
  }, [dispatch]);
  
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    dispatch(editTask({ id, updates }));
  }, [dispatch]);
  
  const deleteTask = useCallback((id: string) => {
    dispatch(removeTask(id));
  }, [dispatch]);
  
  return { createTask, updateTask, deleteTask };
};
```

#### 3. Compound Component Pattern

For complex components with multiple sub-components:

```typescript
// ClusterSection.tsx
const ClusterSection: React.FC<ClusterSectionProps> = ({ cluster }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <ClusterSection.Container>
      <ClusterSection.Header 
        cluster={cluster} 
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />
      <ClusterSection.Body expanded={expanded}>
        <TaskList tasks={cluster.tasks} />
      </ClusterSection.Body>
    </ClusterSection.Container>
  );
};
```

### Component Optimization

**Memoization Strategy:**
```typescript
// Memoize expensive components
const TaskItem = React.memo<TaskItemProps>(({ task, onComplete }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.task.id === nextProps.task.id &&
         prevProps.task.completed === nextProps.task.completed;
});

// Memoize expensive computations
const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => a.createdAt - b.createdAt);
}, [tasks]);

// Memoize callbacks
const handleComplete = useCallback((id: string) => {
  dispatch(completeTask(id));
}, [dispatch]);
```

**Virtual Scrolling:**
```typescript
// For large task lists (> 100 items)
import { FixedSizeList } from 'react-window';

const VirtualTaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={tasks.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <TaskItem task={tasks[index]} />
        </div>
      )}
    </FixedSizeList>
  );
};
```

---

## State Management Architecture

### Redux Toolkit Structure

FlowList uses **Redux Toolkit (RTK)** for predictable state management with minimal boilerplate.

#### Store Configuration

```typescript
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import flowReducer from '../features/flow/flowSlice';
import moodReducer from '../features/mood/moodSlice';
import clustersReducer from '../features/clusters/clustersSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    flow: flowReducer,
    mood: moodReducer,
    clusters: clustersReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore IndexedDB promises in actions
        ignoredActions: ['tasks/addTask/pending'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### State Shape

```typescript
interface RootState {
  tasks: {
    items: Task[];              // All active tasks
    loading: boolean;
    error: string | null;
    lastSync: number;
  };
  
  flow: {
    active: boolean;            // Is Flow Mode active?
    currentTaskId: string | null;
    queue: string[];            // Task IDs in priority order
    sessionStarted: number | null;
  };
  
  mood: {
    current: MoodType;          // Current mood selection
    history: MoodHistory[];     // Mood changes over time (future)
  };
  
  clusters: {
    items: Cluster[];           // Generated clusters
    keywords: string[];         // Detected keywords
    settings: ClusterSettings;
  };
  
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    soundEffects: boolean;
    // ... other preferences
  };
}
```

#### Slice Example: Tasks

```typescript
// features/tasks/tasksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../db/database';

// Async thunks for IndexedDB operations
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await db.tasks
      .where('completed').equals(0)
      .and(task => !task.deferredUntil || task.deferredUntil <= Date.now())
      .toArray();
    return tasks;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData: { title: string; description?: string }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: Date.now(),
      metadata: {
        keywords: extractKeywords(taskData.title),
      },
    };
    await db.tasks.add(newTask);
    return newTask;
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (taskId: string) => {
    const task = await db.tasks.get(taskId);
    if (!task) throw new Error('Task not found');
    
    const completedTask = {
      ...task,
      completed: true,
      completedAt: Date.now(),
    };
    
    await db.tasks.update(taskId, completedTask);
    await db.completedTasks.add({
      ...completedTask,
      archivedAt: Date.now(),
    });
    
    return taskId;
  }
);

// Slice definition
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [] as Task[],
    loading: false,
    error: null as string | null,
    lastSync: 0,
  },
  reducers: {
    // Optimistic updates
    taskCompletedOptimistic: (state, action: PayloadAction<string>) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = true;
        task.completedAt = Date.now();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSync = Date.now();
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  },
});

export const { taskCompletedOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer;
```

#### Selectors

```typescript
// features/tasks/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Basic selectors
export const selectAllTasks = (state: RootState) => state.tasks.items;
export const selectCurrentMood = (state: RootState) => state.mood.current;
export const selectClusters = (state: RootState) => state.clusters.items;

// Memoized selectors
export const selectVisibleTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => 
    !task.deferredUntil || task.deferredUntil <= Date.now()
  )
);

export const selectPrioritizedTasks = createSelector(
  [selectVisibleTasks, selectCurrentMood],
  (tasks, mood) => {
    return prioritizeByMood(tasks, mood);
  }
);

export const selectTasksByCluster = createSelector(
  [selectVisibleTasks, selectClusters],
  (tasks, clusters) => {
    return clusters.map(cluster => ({
      ...cluster,
      tasks: tasks.filter(task => 
        task.metadata.keywords.some(kw => cluster.keywords.includes(kw))
      ),
    }));
  }
);
```

### State Persistence

**LocalStorage Sync:**
```typescript
// Persist preferences to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('flowlist-preferences', JSON.stringify({
    theme: state.preferences.theme,
    currentMood: state.mood.current,
    flowModeActive: state.flow.active,
  }));
});

// Restore on app load
const persistedPreferences = localStorage.getItem('flowlist-preferences');
if (persistedPreferences) {
  const prefs = JSON.parse(persistedPreferences);
  store.dispatch(setPreferences(prefs));
}
```

---

## PWA & Offline Architecture

### Service Worker Strategy

FlowList implements a **Cache-First** strategy for maximum offline reliability.

#### Service Worker Lifecycle

```
┌─────────────────┐
│   App Loads     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Register SW     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SW Install     │◄─── Cache all assets
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SW Activate    │◄─── Clean old caches
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SW Intercepts   │◄─── Serve from cache
│    Requests     │      Fall back to network
└─────────────────┘
```

#### Service Worker Implementation

```javascript
// public/service-worker.js
const CACHE_NAME = 'flowlist-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/main.js',
  '/static/css/main.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          });
      })
      .catch(() => {
        // Return offline page if both cache and network fail
        return caches.match('/offline.html');
      })
  );
});
```

#### Service Worker Registration

```typescript
// src/service-worker/register.ts
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered:', registration);
          
          // Check for updates every hour
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                showUpdateNotification();
              }
            });
          });
        })
        .catch(error => {
          console.error('SW registration failed:', error);
        });
    });
  }
};
```

### PWA Manifest

```json
{
  "name": "FlowList - Focus Todo App",
  "short_name": "FlowList",
  "description": "Minimal focus todo app with Flow Mode and mood-based prioritization",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1976d2",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["productivity", "utilities"],
  "screenshots": [
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### Offline Data Sync Strategy

**Current (MVP):** No sync - fully offline

**Future (Post-MVP):**
```typescript
// Background sync for future cloud sync feature
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncTasks());
  }
});

const syncTasks = async () => {
  const pendingChanges = await db.syncQueue.toArray();
  
  for (const change of pendingChanges) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(change),
      });
      await db.syncQueue.delete(change.id);
    } catch (error) {
      // Retry later
      console.error('Sync failed:', error);
    }
  }
};
```

---

## Performance Architecture

### Performance Budget

**Load Performance:**
- Initial bundle size: < 500KB (gzipped)
- Time to Interactive: < 2 seconds
- First Contentful Paint: < 0.5 seconds
- Largest Contentful Paint: < 1.5 seconds

**Runtime Performance:**
- UI interactions: < 100ms response
- Task list rendering: < 50ms for 1000 tasks
- IndexedDB operations: < 100ms
- Mood-based reordering: < 200ms

### Optimization Strategies

#### 1. Code Splitting

```typescript
// Lazy load routes
const FlowMode = lazy(() => import('./features/flow/FlowMode'));
const CompletedView = lazy(() => import('./features/completed/CompletedView'));
const SettingsView = lazy(() => import('./features/settings/SettingsView'));

// Route configuration
<Suspense fallback={<LoadingSkeleton />}>
  <Routes>
    <Route path="/" element={<MainView />} />
    <Route path="/flow" element={<FlowMode />} />
    <Route path="/completed" element={<CompletedView />} />
    <Route path="/settings" element={<SettingsView />} />
  </Routes>
</Suspense>
```

#### 2. Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-db': ['dexie', 'dexie-react-hooks'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
```

#### 3. Virtual Scrolling

```typescript
// For large task lists
import { FixedSizeList } from 'react-window';

const TaskListVirtualized: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={tasks.length}
      itemSize={80}
      width="100%"
      overscanCount={5}
    >
      {({ index, style }) => (
        <div style={style}>
          <TaskItem task={tasks[index]} />
        </div>
      )}
    </FixedSizeList>
  );
};
```

#### 4. Memoization

```typescript
// Memoize expensive selectors
export const selectPrioritizedTasks = createSelector(
  [selectVisibleTasks, selectCurrentMood],
  (tasks, mood) => prioritizeByMood(tasks, mood)
);

// Memoize components
const TaskItem = React.memo<TaskItemProps>(
  ({ task, onComplete }) => {
    // Component implementation
  },
  (prev, next) => prev.task.id === next.task.id && 
                  prev.task.completed === next.task.completed
);
```

#### 5. IndexedDB Optimization

```typescript
// Use compound indexes for common queries
db.version(1).stores({
  tasks: 'id, completed, [completed+createdAt], deferredUntil'
});

// Batch operations
const batchAddTasks = async (tasks: Task[]) => {
  await db.tasks.bulkAdd(tasks);
};

// Use transactions for multiple operations
const completeAndArchive = async (taskId: string) => {
  await db.transaction('rw', db.tasks, db.completedTasks, async () => {
    const task = await db.tasks.get(taskId);
    if (task) {
      await db.tasks.delete(taskId);
      await db.completedTasks.add({
        ...task,
        completed: true,
        completedAt: Date.now(),
        archivedAt: Date.now(),
      });
    }
  });
};
```

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (metric: any) => {
  console.log(metric);
  // Send to analytics (future)
};

getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

---

## Security Architecture

### Security Principles

1. **No Backend = No Backend Vulnerabilities**
2. **Local-Only Data = No Data Breach Risk**
3. **No Authentication = No Credential Theft**
4. **Static Hosting = Minimal Attack Surface**

### Security Measures

#### 1. Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data:;
        connect-src 'self';
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
      ">
```

#### 2. Input Sanitization

```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

// Use in task creation
const createTask = (title: string, description?: string) => {
  const sanitizedTitle = sanitizeInput(title);
  const sanitizedDescription = description ? sanitizeInput(description) : undefined;
  
  // Create task with sanitized data
};
```

#### 3. XSS Prevention

```typescript
// Always use React's built-in XSS protection
const TaskTitle: React.FC<{ title: string }> = ({ title }) => {
  // React automatically escapes this
  return <Typography>{title}</Typography>;
};

// Never use dangerouslySetInnerHTML unless absolutely necessary
// If needed, sanitize first:
const TaskDescription: React.FC<{ description: string }> = ({ description }) => {
  const sanitized = DOMPurify.sanitize(description);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

#### 4. Dependency Security

```json
// package.json scripts
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "update:deps": "npm update"
  }
}
```

```yaml
# .github/workflows/security.yml
name: Security Audit
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm audit
```

#### 5. HTTPS Enforcement

```javascript
// Redirect HTTP to HTTPS (CloudFront handles this)
// But also enforce in app:
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### Data Privacy

**Privacy by Design:**
- No user accounts or authentication
- No data transmission to servers
- No analytics without consent
- No third-party tracking scripts
- Clear privacy policy

**Data Export/Import:**
- Users have full control over their data
- Export to JSON for backup
- Import from JSON to restore
- No vendor lock-in

---

## Deployment Architecture

### Infrastructure Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Internet Users                        │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│              AWS CloudFront (CDN)                        │
│  • Global edge locations                                 │
│  • SSL/TLS termination                                   │
│  • Gzip compression                                      │
│  • Cache control                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              AWS S3 Bucket                               │
│  • Static file hosting                                   │
│  • Versioning enabled                                    │
│  • Public read access                                    │
│  • Lifecycle policies                                    │
└─────────────────────────────────────────────────────────┘
```

### AWS Configuration

#### S3 Bucket Setup

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::flowlist-app/*"
    }
  ]
}
```

**Bucket Configuration:**
- Static website hosting enabled
- Index document: `index.html`
- Error document: `index.html` (for SPA routing)
- Versioning enabled for rollback capability
- Lifecycle policy: Delete old versions after 30 days

#### CloudFront Distribution

**Settings:**
- Origin: S3 bucket
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD, OPTIONS
- Compress Objects Automatically: Yes
- Price Class: Use All Edge Locations
- Alternate Domain Names (CNAMEs): flowlist.app, www.flowlist.app
- SSL Certificate: AWS Certificate Manager

**Cache Behavior:**
```json
{
  "PathPattern": "/static/*",
  "TargetOriginId": "S3-flowlist-app",
  "ViewerProtocolPolicy": "redirect-to-https",
  "AllowedMethods": ["GET", "HEAD"],
  "CachedMethods": ["GET", "HEAD"],
  "Compress": true,
  "DefaultTTL": 31536000,
  "MaxTTL": 31536000,
  "MinTTL": 31536000
}
```

### CI/CD Pipeline

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://flowlist-app \
            --delete \
            --cache-control "public, max-age=31536000, immutable" \
            --exclude "index.html" \
            --exclude "service-worker.js"
          
          aws s3 cp dist/index.html s3://flowlist-app/index.html \
            --cache-control "public, max-age=0, must-revalidate"
          
          aws s3 cp dist/service-worker.js s3://flowlist-app/service-worker.js \
            --cache-control "public, max-age=0, must-revalidate"
      
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
      
      - name: Notify deployment
        run: echo "Deployment completed successfully!"
```

### Deployment Strategy

**Blue-Green Deployment:**
1. Build new version
2. Deploy to S3 with versioning
3. Test new version
4. Invalidate CloudFront cache
5. Monitor for errors
6. Rollback if needed (restore previous S3 version)

**Rollback Procedure:**
```bash
# List S3 versions
aws s3api list-object-versions --bucket flowlist-app

# Restore previous version
aws s3api copy-object \
  --copy-source flowlist-app/index.html?versionId=PREVIOUS_VERSION_ID \
  --bucket flowlist-app \
  --key index.html

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"
```

### Monitoring & Logging

**CloudWatch Metrics:**
- CloudFront requests
- S3 bucket size
- Error rates
- Cache hit ratio

**Alerts:**
- Error rate > 5%
- Unusual traffic patterns
- S3 bucket size approaching limits

---

## Technology Stack Details

### Core Technologies

#### React 18+
**Why:** Industry-standard UI library with excellent performance and ecosystem

**Key Features Used:**
- Hooks for state management
- Concurrent rendering for smooth UX
- Suspense for code splitting
- Error boundaries for fault tolerance

**Version:** 18.2.0+

#### Redux Toolkit
**Why:** Simplified Redux with less boilerplate and better TypeScript support

**Key Features Used:**
- `createSlice` for reducers
- `createAsyncThunk` for async operations
- `createSelector` for memoized selectors
- RTK Query (future) for API calls

**Version:** 1.9.0+

#### Material UI (MUI)
**Why:** Comprehensive component library with excellent accessibility and theming

**Key Features Used:**
- Pre-built accessible components
- Theming system for light/dark mode
- Responsive grid system
- Icon library

**Version:** 5.14.0+

#### TypeScript
**Why:** Type safety prevents bugs and improves developer experience

**Configuration:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**Version:** 5.0.0+

#### Dexie.js
**Why:** Simplified IndexedDB API with TypeScript support and excellent performance

**Key Features Used:**
- Promise-based API
- Automatic schema versioning
- Compound indexes
- Transactions
- TypeScript definitions

**Version:** 3.2.0+

#### Vite
**Why:** Lightning-fast build tool with excellent DX and optimized production builds

**Configuration:**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-mui': ['@mui/material'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

**Version:** 4.4.0+

### Development Tools

#### ESLint
**Configuration:**
```json
{
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

#### Prettier
**Configuration:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

#### Husky + lint-staged
**Pre-commit hooks:**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Development Workflow

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/flowlist.git
cd flowlist

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

### Git Workflow

**Branch Strategy:**
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

**Commit Convention:**
```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Example:**
```
feat(tasks): add time-slip functionality

Implement swipe gesture and button to defer tasks to tomorrow.
Tasks are hidden from today's view and reappear automatically.

Closes #42
```

### Testing Strategy

**Unit Tests:**
```typescript
// src/features/tasks/tasksSlice.test.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { addTask, completeTask } from './tasksSlice';

describe('tasksSlice', () => {
  let store: ReturnType<typeof configureStore>;
  
  beforeEach(() => {
    store = configureStore({
      reducer: { tasks: tasksReducer },
    });
  });
  
  it('should add a task', async () => {
    await store.dispatch(addTask({ title: 'Test task' }));
    const state = store.getState();
    expect(state.tasks.items).toHaveLength(1);
    expect(state.tasks.items[0].title).toBe('Test task');
  });
  
  it('should complete a task', async () => {
    await store.dispatch(addTask({ title: 'Test task' }));
    const taskId = store.getState().tasks.items[0].id;
    await store.dispatch(completeTask(taskId));
    expect(store.getState().tasks.items).toHaveLength(0);
  });
});
```

**Integration Tests:**
```typescript
// src/features/tasks/TaskList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TaskList from './TaskList';

describe('TaskList', () => {
  it('should render tasks', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    
    expect(screen.getByText('My Tasks')).toBeInTheDocument();
  });
  
  it('should complete task on checkbox click', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Assert task is completed
  });
});
```

**E2E Tests (Future):**
```typescript
// tests/e2e/flow-mode.spec.ts
import { test, expect } from '@playwright/test';

test('Flow Mode workflow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Add a task
  await page.fill('[data-testid="task-input"]', 'Test task');
  await page.click('[data-testid="add-task-button"]');
  
  // Enter Flow Mode
  await page.click('[data-testid="enter-flow-mode"]');
  
  // Verify task is displayed
  await expect(page.locator('[data-testid="flow-task-title"]')).toHaveText('Test task');
  
  // Complete task
  await page.click('[data-testid="complete-button"]');
  
  // Verify no more tasks
  await expect(page.locator('[data-testid="no-tasks-message"]')).toBeVisible();
});
```

---

## Scalability Considerations

### Data Scalability

**Current Capacity:**
- Up to 10,000 tasks without performance degradation
- IndexedDB storage limit: ~50MB (browser-dependent)
- Efficient queries with compound indexes

**Optimization for Large Datasets:**

1. **Pagination:**
```typescript
const loadTasksPage = async (page: number, pageSize: number = 50) => {
  const offset = page * pageSize;
  return await db.tasks
    .orderBy('createdAt')
    .reverse()
    .offset(offset)
    .limit(pageSize)
    .toArray();
};
```

2. **Virtual Scrolling:**
```typescript
// Already implemented for lists > 100 items
<FixedSizeList
  height={600}
  itemCount={tasks.length}
  itemSize={80}
  overscanCount={5}
>
  {renderTask}
</FixedSizeList>
```

3. **Archiving:**
```typescript
// Move old completed tasks to archive
const archiveOldTasks = async () => {
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  
  const oldTasks = await db.completedTasks
    .where('completedAt')
    .below(thirtyDaysAgo)
    .toArray();
  
  // Export to JSON and delete from IndexedDB
  const archive = JSON.stringify(oldTasks);
  // Offer download to user
  
  await db.completedTasks
    .where('completedAt')
    .below(thirtyDaysAgo)
    .delete();
};
```

### Feature Scalability

**Modular Architecture:**
- Each feature is self-contained in its own directory
- Redux slices are independent
- Components are reusable
- Easy to add new features without affecting existing code

**Extension Points:**
- Custom mood definitions
- Custom cluster keywords
- Plugin system (future)
- Theme customization

### Infrastructure Scalability

**Current Setup:**
- CloudFront CDN handles global traffic
- S3 scales automatically
- No backend to scale

**Future Considerations:**
- If sync is added: Use serverless (Lambda + DynamoDB)
- If analytics needed: Use serverless (Lambda + S3)
- If collaboration needed: Use WebSockets (API Gateway + Lambda)

---

## Future Architecture Evolution

### Phase 2: Enhanced Features (Post-MVP)

**Cloud Sync (Optional):**
```
┌─────────────────┐
│  Browser App    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Gateway    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lambda         │◄─── Cognito (Auth)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DynamoDB       │
└─────────────────┘
```

**Architecture Changes:**
- Add authentication (AWS Cognito)
- Add sync API (API Gateway + Lambda)
- Add conflict resolution logic
- Maintain offline-first approach

### Phase 3: Collaboration Features

**Real-time Sync:**
```
┌─────────────────┐
│  Browser App    │
└────────┬────────┘
         │ WebSocket
         ▼
┌─────────────────┐
│  API Gateway    │
│  (WebSocket)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lambda         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DynamoDB       │
│  Streams        │
└─────────────────┘
```

**Architecture Changes:**
- Add WebSocket support
- Add presence detection
- Add collaborative editing
- Add permissions system

### Phase 4: Intelligence Layer

**ML-Based Features:**
```
┌─────────────────┐
│  Browser App    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lambda         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SageMaker      │◄─── ML Models
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  S3 (Models)    │
└─────────────────┘
```

**Architecture Changes:**
- Add ML model training pipeline
- Add inference endpoints
- Add A/B testing framework
- Maintain privacy (on-device ML preferred)

---

## Appendix

### Glossary

**Flow Mode:** Full-screen focus mode showing one task at a time  
**Time-Slip:** Defer a task to tomorrow with one action  
**Smart Clusters:** Automatic task grouping by keywords  
**Mood-Based Prioritization:** Task reordering based on mental state  
**PWA:** Progressive Web Application  
**IndexedDB:** Browser-based NoSQL database  
**Service Worker:** Background script for offline functionality  

### References

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Material UI Documentation](https://mui.com)
- [Dexie.js Documentation](https://dexie.org)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-20 | Initial architecture document |

---

**Document Status:** Complete  
**Next Steps:** Begin implementation following this architecture  
**Review Cycle:** Quarterly or when major changes needed  
**Owner:** BMad Architect  

---

_This architecture document provides a comprehensive blueprint for building FlowList as a robust, performant, and maintainable Progressive Web Application. The offline-first, privacy-focused design ensures users have full control over their data while enjoying a seamless, distraction-free productivity experience._