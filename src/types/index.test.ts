import { describe, it, expect } from 'vitest';

import {
  isMoodType,
  isTask,
  isAsyncState,
  type MoodType,
  type Task,
  type AsyncState,
} from './index';

describe('Type Guards', () => {
  describe('isMoodType', () => {
    it('should return true for valid mood types', () => {
      const validMoods: MoodType[] = [
        'energized',
        'focused',
        'calm',
        'creative',
        'tired',
        'stressed',
      ];

      validMoods.forEach((mood) => {
        expect(isMoodType(mood)).toBe(true);
      });
    });

    it('should return false for invalid values', () => {
      expect(isMoodType('invalid')).toBe(false);
      expect(isMoodType(123)).toBe(false);
      expect(isMoodType(null)).toBe(false);
      expect(isMoodType(undefined)).toBe(false);
      expect(isMoodType({})).toBe(false);
    });
  });

  describe('isTask', () => {
    it('should return true for valid Task objects', () => {
      const validTask: Task = {
        id: 'test-id',
        title: 'Test Task',
        description: 'Test description',
        completed: false,
        createdAt: Date.now(),
        metadata: {
          keywords: ['test'],
        },
      };

      expect(isTask(validTask)).toBe(true);
    });

    it('should return false for invalid objects', () => {
      expect(isTask(null)).toBe(false);
      expect(isTask(undefined)).toBe(false);
      expect(isTask('string')).toBe(false);
      expect(isTask({})).toBe(false);
      expect(isTask({ id: 'test', title: 123 })).toBe(false);
    });
  });

  describe('isAsyncState', () => {
    it('should return true for valid AsyncState objects', () => {
      const validState: AsyncState = {
        loading: false,
        error: null,
      };

      const validStateWithError: AsyncState = {
        loading: true,
        error: 'Test error',
      };

      expect(isAsyncState(validState)).toBe(true);
      expect(isAsyncState(validStateWithError)).toBe(true);
    });

    it('should return false for invalid objects', () => {
      expect(isAsyncState(null)).toBe(false);
      expect(isAsyncState(undefined)).toBe(false);
      expect(isAsyncState('string')).toBe(false);
      expect(isAsyncState({ loading: 'true' })).toBe(false);
    });
  });
});

describe('Type Definitions', () => {
  it('should have correct MoodType union', () => {
    const mood: MoodType = 'focused';
    expect(mood).toBe('focused');
  });

  it('should have correct Task interface', () => {
    const task: Task = {
      id: '1',
      title: 'Test',
      completed: false,
      createdAt: 1234567890,
      metadata: {
        keywords: [],
      },
    };
    expect(task.title).toBe('Test');
  });

  it('should have correct AsyncState interface', () => {
    const state: AsyncState = {
      loading: false,
      error: null,
    };
    expect(state.loading).toBe(false);
  });
});
