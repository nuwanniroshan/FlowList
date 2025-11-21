import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';

import type { Task } from '../../types';
import tasksReducer, {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  fetchTasks,
  selectAllTasks,
  selectIncompleteTasks,
  selectCompletedTasks,
  selectTaskById,
  selectTasksLoading,
  selectTasksError,
  addTaskOptimistic,
  updateTaskOptimistic,
  deleteTaskOptimistic,
  clearError,
} from './tasksSlice';

// Mock the database
const mockDb = {
  tasks: {
    toArray: vi.fn(),
    add: vi.fn(),
    get: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

vi.mock('../../db/database', () => ({
  db: mockDb,
}));

describe('Tasks Slice', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return the initial state', () => {
      const state = tasksReducer(undefined, { type: undefined });
      expect(state).toEqual({
        tasks: [],
        loading: false,
        error: null,
      });
    });
  });

  describe('Selectors', () => {
    const mockState = {
      tasks: {
        tasks: [mockTask],
        loading: false,
        error: null,
      },
    };

    it('should select all tasks', () => {
      expect(selectAllTasks(mockState)).toEqual([mockTask]);
    });

    it('should select incomplete tasks', () => {
      expect(selectIncompleteTasks(mockState)).toEqual([mockTask]);
    });

    it('should select completed tasks', () => {
      const completedTask = { ...mockTask, completed: true };
      const stateWithCompleted = {
        tasks: {
          tasks: [completedTask],
          loading: false,
          error: null,
        },
      };
      expect(selectCompletedTasks(stateWithCompleted)).toEqual([completedTask]);
    });

    it('should select task by id', () => {
      const selector = selectTaskById(1);
      expect(selector(mockState)).toEqual(mockTask);
    });

    it('should select loading state', () => {
      expect(selectTasksLoading(mockState)).toBe(false);
    });

    it('should select error state', () => {
      expect(selectTasksError(mockState)).toBe(null);
    });
  });

  describe('Reducers', () => {
    it('should clear error', () => {
      const state = { tasks: [], loading: false, error: 'Test error' };
      const newState = tasksReducer(state, clearError());
      expect(newState.error).toBe(null);
    });

    it('should add task optimistically', () => {
      const state = { tasks: [], loading: false, error: null };
      const newState = tasksReducer(state, addTaskOptimistic(mockTask));
      expect(newState.tasks).toEqual([mockTask]);
    });

    it('should update task optimistically', () => {
      const initialState = { tasks: [mockTask], loading: false, error: null };
      const updates = { title: 'Updated Title' };
      const newState = tasksReducer(
        initialState,
        updateTaskOptimistic({ id: 1, updates }),
      );
      expect(newState.tasks[0].title).toBe('Updated Title');
    });

    it('should delete task optimistically', () => {
      const initialState = { tasks: [mockTask], loading: false, error: null };
      const newState = tasksReducer(initialState, deleteTaskOptimistic(1));
      expect(newState.tasks).toEqual([]);
    });
  });

  describe('Async Thunks', () => {
    describe('fetchTasks', () => {
      it('should handle successful fetch', async () => {
        mockDb.tasks.toArray.mockResolvedValue([mockTask]);

        const dispatch = vi.fn();
        const thunk = fetchTasks();

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, fulfilledAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/fetchTasks/pending');
        expect(fulfilledAction.type).toBe('tasks/fetchTasks/fulfilled');
        expect(fulfilledAction.payload).toEqual([mockTask]);
      });

      it('should handle fetch error', async () => {
        mockDb.tasks.toArray.mockRejectedValue(new Error('Fetch failed'));

        const dispatch = vi.fn();
        const thunk = fetchTasks();

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, rejectedAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/fetchTasks/pending');
        expect(rejectedAction.type).toBe('tasks/fetchTasks/rejected');
        expect(rejectedAction.payload).toBe('Failed to fetch tasks');
      });
    });

    describe('addTask', () => {
      it('should handle successful add', async () => {
        const newTaskData = {
          title: 'New Task',
          description: 'New Description',
          completed: false,
        };

        mockDb.tasks.add.mockResolvedValue(2);

        const dispatch = vi.fn();
        const thunk = addTask(newTaskData);

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, fulfilledAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/addTask/pending');
        expect(fulfilledAction.type).toBe('tasks/addTask/fulfilled');
        expect(fulfilledAction.payload).toMatchObject({
          id: 2,
          ...newTaskData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });

      it('should handle add error', async () => {
        mockDb.tasks.add.mockRejectedValue(new Error('Add failed'));

        const dispatch = vi.fn();
        const thunk = addTask({ title: 'Test', completed: false });

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, rejectedAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/addTask/pending');
        expect(rejectedAction.type).toBe('tasks/addTask/rejected');
        expect(rejectedAction.payload).toBe('Failed to add task');
      });
    });

    describe('updateTask', () => {
      it('should handle successful update', async () => {
        mockDb.tasks.get.mockResolvedValue(mockTask);
        mockDb.tasks.update.mockResolvedValue(undefined);

        const dispatch = vi.fn();
        const thunk = updateTask({ id: 1, updates: { title: 'Updated' } });

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, fulfilledAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/updateTask/pending');
        expect(fulfilledAction.type).toBe('tasks/updateTask/fulfilled');
        expect(fulfilledAction.payload.title).toBe('Updated');
      });

      it('should handle update error', async () => {
        mockDb.tasks.get.mockRejectedValue(new Error('Update failed'));

        const dispatch = vi.fn();
        const thunk = updateTask({ id: 1, updates: { title: 'Updated' } });

        await thunk(dispatch, () => ({}), undefined);

        const [, rejectedAction] = dispatch.mock.calls.map((call) => call[0]);

        expect(rejectedAction.payload).toBe('Failed to update task');
      });
    });

    describe('deleteTask', () => {
      it('should handle successful delete', async () => {
        mockDb.tasks.delete.mockResolvedValue(undefined);

        const dispatch = vi.fn();
        const thunk = deleteTask(1);

        await thunk(dispatch, () => ({}), undefined);

        const [pendingAction, fulfilledAction] = dispatch.mock.calls.map(
          (call) => call[0],
        );

        expect(pendingAction.type).toBe('tasks/deleteTask/pending');
        expect(fulfilledAction.type).toBe('tasks/deleteTask/fulfilled');
        expect(fulfilledAction.payload).toBe(1);
      });
    });

    describe('toggleTaskCompletion', () => {
      it('should handle successful toggle', async () => {
        mockDb.tasks.get.mockResolvedValue(mockTask);
        mockDb.tasks.update.mockResolvedValue(undefined);

        const dispatch = vi.fn();
        const thunk = toggleTaskCompletion(1);

        await thunk(dispatch, () => ({}), undefined);

        const [, fulfilledAction] = dispatch.mock.calls.map((call) => call[0]);

        expect(fulfilledAction.payload.completed).toBe(true);
        expect(fulfilledAction.payload.completedAt).toBeInstanceOf(Date);
      });
    });
  });
});
