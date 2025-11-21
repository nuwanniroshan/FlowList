import {
  describe, it, expect, beforeEach, afterEach,
} from 'vitest';

import {
  FlowListDB,
  initializeDatabase,
  clearAllData,
  getDatabaseStats,
} from './database';

describe('FlowListDB', () => {
  let db: FlowListDB;

  beforeEach(async () => {
    db = new FlowListDB();
    await initializeDatabase();
  });

  afterEach(async () => {
    await clearAllData();
    await db.close();
  });

  describe('Database Initialization', () => {
    it('should initialize database successfully', async () => {
      await expect(initializeDatabase()).resolves.not.toThrow();
    });

    it('should create required tables', async () => {
      const stats = await getDatabaseStats();
      expect(stats).toHaveProperty('tasks');
      expect(stats).toHaveProperty('completedTasks');
      expect(stats).toHaveProperty('preferences');
    });
  });

  describe('Task Operations', () => {
    it('should add and retrieve tasks', async () => {
      const task = {
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const id = await db.tasks.add(task);
      const retrieved = await db.tasks.get(id);

      expect(retrieved).toMatchObject(task);
      expect(retrieved?.id).toBe(id);
    });

    it('should handle completed tasks table', async () => {
      const task = {
        title: 'Completed Task',
        description: 'Completed Description',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date(),
      };

      const id = await db.completedTasks.add(task);
      const retrieved = await db.completedTasks.get(id);

      expect(retrieved).toMatchObject(task);
    });
  });

  describe('Preferences Operations', () => {
    it('should store and retrieve preferences', async () => {
      const preference = {
        key: 'theme',
        value: 'dark',
        updatedAt: new Date(),
      };

      const id = await db.preferences.add(preference);
      const retrieved = await db.preferences.get(id);

      expect(retrieved).toMatchObject(preference);
    });
  });

  describe('Database Stats', () => {
    it('should return correct statistics', async () => {
      // Add some test data
      await db.tasks.add({
        title: 'Task 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.completedTasks.add({
        title: 'Completed Task',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date(),
      });

      await db.preferences.add({
        key: 'test',
        value: 'value',
        updatedAt: new Date(),
      });

      const stats = await getDatabaseStats();

      expect(stats.tasks).toBe(1);
      expect(stats.completedTasks).toBe(1);
      expect(stats.preferences).toBe(1);
      expect(stats.total).toBe(3);
    });
  });

  describe('Clear All Data', () => {
    it('should clear all tables', async () => {
      // Add test data
      await db.tasks.add({
        title: 'Task',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.preferences.add({
        key: 'test',
        value: 'value',
        updatedAt: new Date(),
      });

      // Verify data exists
      let stats = await getDatabaseStats();
      expect(stats.total).toBeGreaterThan(0);

      // Clear data
      await clearAllData();

      // Verify data is cleared
      stats = await getDatabaseStats();
      expect(stats.total).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle database operations gracefully', async () => {
      // Test invalid operations
      await expect(db.tasks.get(999999)).resolves.toBeUndefined();
    });
  });
});
