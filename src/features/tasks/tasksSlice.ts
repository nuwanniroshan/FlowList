import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { db } from '../../db/database';
import type { Task } from '../../types';

// State interface
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks for database operations
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await db.tasks.toArray();
      return tasks;
    } catch (error) {
      return rejectWithValue('Failed to fetch tasks');
    }
  },
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
    { rejectWithValue },
  ) => {
    try {
      const now = new Date();
      const task: Omit<Task, 'id'> = {
        ...taskData,
        createdAt: now,
        updatedAt: now,
      };

      const id = await db.tasks.add(task);
      return { ...task, id } as Task;
    } catch (error) {
      return rejectWithValue('Failed to add task');
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { id, updates }: { id: number; updates: Partial<Task> },
    { rejectWithValue },
  ) => {
    try {
      const existingTask = await db.tasks.get(id);
      if (!existingTask) {
        return rejectWithValue('Task not found');
      }

      const updatedTask = {
        ...existingTask,
        ...updates,
        updatedAt: new Date(),
        completedAt:
          updates.completed && !existingTask.completed
            ? new Date()
            : existingTask.completedAt,
      };

      await db.tasks.update(id, updatedTask);
      return updatedTask;
    } catch (error) {
      return rejectWithValue('Failed to update task');
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number, { rejectWithValue }) => {
    try {
      await db.tasks.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete task');
    }
  },
);

export const toggleTaskCompletion = createAsyncThunk(
  'tasks/toggleTaskCompletion',
  async (id: number, { rejectWithValue }) => {
    try {
      const task = await db.tasks.get(id);
      if (!task) {
        return rejectWithValue('Task not found');
      }

      const updates = {
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : undefined,
        updatedAt: new Date(),
      };

      await db.tasks.update(id, updates);
      return { id, ...updates };
    } catch (error) {
      return rejectWithValue('Failed to toggle task completion');
    }
  },
);

// Tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic updates
    addTaskOptimistic: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskOptimistic: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Task> }>,
    ) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date(),
        };
      }
    },
    deleteTaskOptimistic: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Rollback optimistic updates
    rollbackAddTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    rollbackUpdateTask: (
      state,
      action: PayloadAction<{ id: number; previousTask: Task }>,
    ) => {
      const { id, previousTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = previousTask;
      }
    },
    rollbackDeleteTask: (
      state,
      action: PayloadAction<{ id: number; task: Task }>,
    ) => {
      const { task } = action.payload;
      state.tasks.push(task);
    },
    toggleTaskCompletionOptimistic: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        state.tasks[taskIndex] = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined,
          updatedAt: new Date(),
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add task
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Rollback optimistic update if it was added
        // Note: rollbackAddTask is called from components on error
      });

    // Update task
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Rollback optimistic update handled in components
      });

    // Delete task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Rollback optimistic update
      });

    // Toggle completion
    builder
      .addCase(toggleTaskCompletion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        state.loading = false;
        const { id, ...updates } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        }
      })
      .addCase(toggleTaskCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllTasks = (state: { tasks: TasksState }) =>
  state.tasks.tasks;
export const selectIncompleteTasks = (state: { tasks: TasksState }) =>
  state.tasks.tasks.filter((task) => !task.completed);
export const selectCompletedTasks = (state: { tasks: TasksState }) =>
  state.tasks.tasks.filter((task) => task.completed);
export const selectTaskById = (id: number) => (state: { tasks: TasksState }) =>
  state.tasks.tasks.find((task) => task.id === id);
export const selectTasksLoading = (state: { tasks: TasksState }) =>
  state.tasks.loading;
export const selectTasksError = (state: { tasks: TasksState }) =>
  state.tasks.error;

// Actions
export const {
  clearError,
  addTaskOptimistic,
  updateTaskOptimistic,
  deleteTaskOptimistic,
  rollbackAddTask,
  rollbackUpdateTask,
  rollbackDeleteTask,
  toggleTaskCompletionOptimistic,
} = tasksSlice.actions;

// Reducer
export default tasksSlice.reducer;
