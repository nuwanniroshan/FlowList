import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../features/tasks/tasksSlice';
import preferencesReducer, {
  persistPreferencesMiddleware,
} from '../features/preferences/preferencesSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore IndexedDB promises in actions
        ignoredActions: [
          'tasks/fetchTasks/pending',
          'tasks/addTask/pending',
          'tasks/updateTask/pending',
          'tasks/deleteTask/pending',
          'tasks/toggleTaskCompletion/pending',
        ],
      },
    }).concat(persistPreferencesMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
