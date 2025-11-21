import {
  describe, it, expect, vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import tasksReducer, { Task } from '../../features/tasks/tasksSlice';

import TaskList from './TaskList';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const createMockStore = (initialState: any) => configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: initialState,
  },
});

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'Test description',
  completed: false,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
};

describe('TaskList', () => {
  it('renders empty state when no tasks', () => {
    const store = createMockStore({
      tasks: [],
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(getByText('No tasks yet')).toBeInTheDocument();
    expect(getByText('Add your first task to get started')).toBeInTheDocument();
  });

  it('renders tasks sorted by creation date (newest first)', () => {
    const oldTask: Task = {
      ...mockTask,
      id: 2,
      title: 'Old Task',
      createdAt: new Date('2023-01-01'),
    };

    const newTask: Task = {
      ...mockTask,
      id: 3,
      title: 'New Task',
      createdAt: new Date('2023-01-02'),
    };

    const store = createMockStore({
      tasks: [oldTask, newTask],
      loading: false,
      error: null,
    });

    const { getAllByRole } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    const taskTitles = getAllByRole('heading', { level: 6 });
    expect(taskTitles[0]).toHaveTextContent('New Task');
    expect(taskTitles[1]).toHaveTextContent('Old Task');
  });

  it('renders task title and description', () => {
    const store = createMockStore({
      tasks: [mockTask],
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(getByText('Test Task')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });
});
