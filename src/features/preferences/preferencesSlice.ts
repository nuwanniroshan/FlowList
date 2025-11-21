import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { PreferencesState, MoodType } from '../../types';

// ============================================================================
// Initial State
// ============================================================================

const initialState: PreferencesState = {
  id: 'user-preferences',
  currentMood: 'focused',
  theme: 'system',
  flowModeActive: false,
  lastActiveTask: undefined,
  clusterSettings: {
    enabled: true,
    customKeywords: [],
  },
  notifications: true,
  soundEffects: false,
  updatedAt: Date.now(),
};

// ============================================================================
// Load from localStorage
// ============================================================================

const loadPreferencesFromStorage = (): Partial<PreferencesState> => {
  // Check if localStorage is available (not available in test environment)
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {};
  }

  try {
    const stored = localStorage.getItem('flowlist-preferences');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load preferences from localStorage:', error);
  }
  return {};
};

// Merge stored preferences with initial state
const storedPreferences = loadPreferencesFromStorage();
const hydratedInitialState: PreferencesState = {
  ...initialState,
  ...storedPreferences,
  updatedAt: Date.now(),
};

// ============================================================================
// Slice Definition
// ============================================================================

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: hydratedInitialState,
  reducers: {
    // Set current mood
    setCurrentMood: (state, action: PayloadAction<MoodType>) => {
      state.currentMood = action.payload;
      state.updatedAt = Date.now();
    },

    // Set theme
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      state.updatedAt = Date.now();
    },

    // Set Flow Mode active state
    setFlowModeActive: (state, action: PayloadAction<boolean>) => {
      state.flowModeActive = action.payload;
      state.updatedAt = Date.now();
    },

    // Set last active task
    setLastActiveTask: (state, action: PayloadAction<string | undefined>) => {
      state.lastActiveTask = action.payload;
      state.updatedAt = Date.now();
    },

    // Toggle cluster settings
    toggleClusters: (state) => {
      state.clusterSettings.enabled = !state.clusterSettings.enabled;
      state.updatedAt = Date.now();
    },

    // Add custom keyword
    addCustomKeyword: (state, action: PayloadAction<string>) => {
      if (!state.clusterSettings.customKeywords.includes(action.payload)) {
        state.clusterSettings.customKeywords.push(action.payload);
        state.updatedAt = Date.now();
      }
    },

    // Remove custom keyword
    removeCustomKeyword: (state, action: PayloadAction<string>) => {
      state.clusterSettings.customKeywords = state.clusterSettings.customKeywords.filter(
        (kw) => kw !== action.payload,
      );
      state.updatedAt = Date.now();
    },

    // Toggle notifications
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
      state.updatedAt = Date.now();
    },

    // Toggle sound effects
    toggleSoundEffects: (state) => {
      state.soundEffects = !state.soundEffects;
      state.updatedAt = Date.now();
    },

    // Update multiple preferences at once
    updatePreferences: (
      state,
      action: PayloadAction<Partial<PreferencesState>>,
    ) => {
      Object.assign(state, action.payload);
      state.updatedAt = Date.now();
    },

    // Reset to defaults
    resetPreferences: () => ({ ...initialState, updatedAt: Date.now() }),
  },
});

// ============================================================================
// Actions & Selectors
// ============================================================================

export const {
  setCurrentMood,
  setTheme,
  setFlowModeActive,
  setLastActiveTask,
  toggleClusters,
  addCustomKeyword,
  removeCustomKeyword,
  toggleNotifications,
  toggleSoundEffects,
  updatePreferences,
  resetPreferences,
} = preferencesSlice.actions;

// Selectors
export const selectCurrentMood = (state: { preferences: PreferencesState }) =>
  state.preferences.currentMood;
export const selectTheme = (state: { preferences: PreferencesState }) =>
  state.preferences.theme;
export const selectFlowModeActive = (state: {
  preferences: PreferencesState;
}) => state.preferences.flowModeActive;
export const selectLastActiveTask = (state: {
  preferences: PreferencesState;
}) => state.preferences.lastActiveTask;
export const selectClusterSettings = (state: {
  preferences: PreferencesState;
}) => state.preferences.clusterSettings;
export const selectNotifications = (state: { preferences: PreferencesState }) =>
  state.preferences.notifications;
export const selectSoundEffects = (state: { preferences: PreferencesState }) =>
  state.preferences.soundEffects;
export const selectAllPreferences = (state: {
  preferences: PreferencesState;
}) => state.preferences;

export default preferencesSlice.reducer;

// ============================================================================
// Middleware to persist to localStorage
// ============================================================================

export const persistPreferencesMiddleware = (store: { getState: () => { preferences: PreferencesState } }) =>
  (next: (action: unknown) => unknown) =>
    (action: unknown) => {
      const result = next(action);

      // Persist preferences to localStorage after any preferences action
      if ((action as { type: string }).type.startsWith('preferences/')) {
        // Check if localStorage is available
        if (
          typeof window !== 'undefined'
        && typeof localStorage !== 'undefined'
        ) {
          const state = store.getState();
          try {
            localStorage.setItem(
              'flowlist-preferences',
              JSON.stringify(state.preferences),
            );
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
              'Failed to persist preferences to localStorage:',
              error,
            );
          }
        }
      }

      return result;
    };
