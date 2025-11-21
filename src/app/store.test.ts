import {
  describe, it, expect, beforeEach,
} from 'vitest';

import {
  setCurrentMood,
  setTheme,
} from '../features/preferences/preferencesSlice';
import { addTask } from '../features/tasks/tasksSlice';
import type { Task } from '../types';

import { store } from './store';

describe('Redux Store Configuration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should have the correct initial state structure', () => {
    const state = store.getState();

    expect(state).toHaveProperty('tasks');
    expect(state).toHaveProperty('preferences');
  });

  it('should have tasks slice with correct initial state', () => {
    const state = store.getState();

    expect(state.tasks).toEqual({
      items: [],
      loading: false,
      error: null,
      lastSync: 0,
    });
  });

  it('should have preferences slice with correct initial state', () => {
    const state = store.getState();

    expect(state.preferences).toMatchObject({
      id: 'user-preferences',
      currentMood: 'focused',
      theme: 'system',
      flowModeActive: false,
      clusterSettings: {
        enabled: true,
        customKeywords: [],
      },
      notifications: true,
      soundEffects: false,
    });
  });

  it('should handle preference updates', () => {
    store.dispatch(setCurrentMood('energized'));
    let state = store.getState();
    expect(state.preferences.currentMood).toBe('energized');

    store.dispatch(setTheme('dark'));
    state = store.getState();
    expect(state.preferences.theme).toBe('dark');
  });

  it('should handle task additions', async () => {
    const result = await store.dispatch(
      addTask({ title: 'Test Task', description: 'Test Description' }),
    );

    expect(result.type).toBe('tasks/addTask/fulfilled');

    const state = store.getState();
    expect(state.tasks.items).toHaveLength(1);
    expect(state.tasks.items[0].title).toBe('Test Task');
    expect(state.tasks.items[0].description).toBe('Test Description');
  });

  it('should persist preferences to localStorage', () => {
    store.dispatch(setCurrentMood('creative'));

    const stored = localStorage.getItem('flowlist-preferences');
    expect(stored).toBeTruthy();

    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.currentMood).toBe('creative');
    }
  });

  it('should have correct TypeScript types', () => {
    const state = store.getState();

    // Type assertions to verify TypeScript types are correct
    const mood: string = state.preferences.currentMood;
    const { theme } = state.preferences;
    const tasks: Task[] = state.tasks.items;

    expect(mood).toBeDefined();
    expect(theme).toBeDefined();
    expect(tasks).toBeDefined();
  });
});
