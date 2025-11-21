/**
 * Core data types for FlowList application
 */

// ============================================================================
// Task Types
// ============================================================================

export interface Task {
  id?: number; // Auto-increment from IndexedDB
  title: string; // Required, max 500 chars
  description?: string; // Optional, max 5000 chars
  completed: boolean; // Default: false
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
  completedAt?: Date; // Completion timestamp
  deferredUntil?: Date; // Time-Slip deferral timestamp
  metadata?: Record<string, unknown>; // Flexible metadata for future features
}

export interface TaskMetadata {
  keywords: string[]; // Extracted for clustering
  estimatedDuration?: number; // Minutes (future)
  priority?: number; // 1-5 (future)
}

export interface CompletedTask extends Task {
  completed: true;
  completedAt: Date;
  archivedAt: Date; // When moved to archive
}

// ============================================================================
// Mood Types
// ============================================================================

export type MoodType =
  | 'energized'
  | 'focused'
  | 'calm'
  | 'creative'
  | 'tired'
  | 'stressed';

export interface MoodHistory {
  mood: MoodType;
  timestamp: number;
}

// ============================================================================
// Cluster Types
// ============================================================================

export interface Cluster {
  id: string;
  name: string;
  keywords: string[];
  color: string;
  taskIds: string[];
}

export interface ClusterSettings {
  enabled: boolean;
  customKeywords: string[]; // User-defined keywords (future)
}

// ============================================================================
// Preferences Types
// ============================================================================

export interface Preferences {
  id: 'user-preferences'; // Single record
  currentMood: MoodType; // Last selected mood
  theme: 'light' | 'dark' | 'system';
  flowModeActive: boolean; // Restore Flow Mode on reload
  lastActiveTask?: string; // Task ID for Flow Mode restoration
  clusterSettings: ClusterSettings;
  notifications: boolean;
  soundEffects: boolean;
  updatedAt: number; // Unix timestamp
}

// ============================================================================
// State Types
// ============================================================================

export interface AsyncState {
  loading: boolean;
  error: string | null;
}

export interface FlowState {
  active: boolean; // Is Flow Mode active?
  currentTaskId: string | null;
  queue: string[]; // Task IDs in priority order
  sessionStarted: number | null;
}

export interface MoodState {
  current: MoodType; // Current mood selection
  history: MoodHistory[]; // Mood changes over time (future)
}

export interface ClustersState {
  items: Cluster[]; // Generated clusters
  keywords: string[]; // Detected keywords
  settings: ClusterSettings;
}

export interface PreferencesState extends Preferences {}

// ============================================================================
// Type Guards
// ============================================================================

export function isMoodType(value: unknown): value is MoodType {
  return (
    typeof value === 'string'
    && ['energized', 'focused', 'calm', 'creative', 'tired', 'stressed'].includes(
      value,
    )
  );
}

export function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object'
    && obj !== null
    && (typeof (obj as Task).id === 'number' || (obj as Task).id === undefined)
    && typeof (obj as Task).title === 'string'
    && typeof (obj as Task).completed === 'boolean'
    && (obj as Task).createdAt instanceof Date
    && (obj as Task).updatedAt instanceof Date
  );
}

export function isAsyncState(obj: unknown): obj is AsyncState {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof (obj as AsyncState).loading === 'boolean'
    && (typeof (obj as AsyncState).error === 'string'
      || (obj as AsyncState).error === null)
  );
}

// ============================================================================
// Utility Types
// ============================================================================

export type ApiResponse<T> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    error: string;
  };

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: keyof Task;
  direction: 'asc' | 'desc';
}

// ============================================================================
// Export/Import Types
// ============================================================================

export interface ExportData {
  version: string;
  exportedAt: number;
  data: {
    tasks: Task[];
    completedTasks: CompletedTask[];
    preferences: Preferences;
  };
  metadata: {
    totalTasks: number;
    completedTasks: number;
    appVersion: string;
  };
}
