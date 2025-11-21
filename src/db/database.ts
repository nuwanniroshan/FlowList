import Dexie, { Table } from 'dexie';

import type { Task } from '../types';

export interface Preference {
  id?: number;
  key: string;
  value: unknown;
  updatedAt: Date;
}

// Database class extending Dexie
export class FlowListDB extends Dexie {
  tasks!: Table<Task>;

  completedTasks!: Table<Task>;

  preferences!: Table<Preference>;

  constructor() {
    super('FlowListDB');

    this.version(1).stores({
      tasks:
        '++id, title, description, completed, createdAt, updatedAt, completedAt, deferredUntil, [completed+createdAt]',
      completedTasks:
        '++id, title, description, completed, createdAt, updatedAt, completedAt, deferredUntil, [completed+createdAt]',
      preferences: '++id, key, value, updatedAt, [key+updatedAt]',
    });

    // Handle version upgrades
    this.version(2).stores({
      tasks:
        '++id, title, description, completed, createdAt, updatedAt, completedAt, deferredUntil, metadata, [completed+createdAt]',
      completedTasks:
        '++id, title, description, completed, createdAt, updatedAt, completedAt, deferredUntil, metadata, [completed+createdAt]',
      preferences: '++id, key, value, updatedAt, [key+updatedAt]',
    });
  }
}

// Create and export database instance
export const db = new FlowListDB();

// Database initialization function
export const initializeDatabase = async (): Promise<void> => {
  try {
    await db.open();
  } catch (error) {
    throw new Error('Database initialization failed');
  }
};

// Error handling for IndexedDB operations
db.on('blocked', () => {
  // Database blocked - silently handle
});

// Migration strategy for future versions
export const migrateDatabase = async (
  fromVersion: number,
  toVersion: number,
): Promise<void> => {
  // Example migration logic - can be expanded for specific version changes
  if (fromVersion < 2 && toVersion >= 2) {
    // Migration for version 2: Add metadata field to tasks
    await db.tasks.toCollection().modify((task) => {
      if (!task.metadata) {
        // eslint-disable-next-line no-param-reassign
        task.metadata = {};
      }
    });
  }
};

// Handle database upgrades
db.on('versionchange', () => {
  // Note: In a real app, you might want to prompt user or handle automatically
});

// Utility functions for database operations
export const clearAllData = async (): Promise<void> => {
  await db.tasks.clear();
  await db.completedTasks.clear();
  await db.preferences.clear();
};

export const getDatabaseStats = async () => {
  const taskCount = await db.tasks.count();
  const completedTaskCount = await db.completedTasks.count();
  const preferenceCount = await db.preferences.count();

  return {
    tasks: taskCount,
    completedTasks: completedTaskCount,
    preferences: preferenceCount,
    total: taskCount + completedTaskCount + preferenceCount,
  };
};

// Export database instance as default

export default db;
