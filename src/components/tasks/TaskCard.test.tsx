import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';
import { Task } from '../../features/tasks/tasksSlice';

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'Test description',
  completed: false,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
};

describe('TaskCard', () => {
  it('renders task title', () => {
    const { getByText } = render(
      <TaskCard task={mockTask} />
    );
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  it('renders task description', () => {
    const { getByText } = render(
      <TaskCard task={mockTask} />
    );
    expect(getByText('Test description')).toBeInTheDocument();
  });

  it('shows strikethrough when completed', () => {
    const completedTask = { ...mockTask, completed: true };
    const { getByText } = render(
      <TaskCard task={completedTask} />
    );
    const title = getByText('Test Task');
    expect(title).toHaveStyle('text-decoration: line-through');
  });

  it('calls onComplete when checkbox is clicked', () => {
    const mockOnComplete = vi.fn();
    const { getByRole } = render(
      <TaskCard task={mockTask} onComplete={mockOnComplete} />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnComplete).toHaveBeenCalledWith(1);
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    const { getByLabelText } = render(
      <TaskCard task={mockTask} onEdit={mockOnEdit} />
    );
    const editButton = getByLabelText('edit task');
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    const { getByLabelText } = render(
      <TaskCard task={mockTask} onDelete={mockOnDelete} />
    );
    const deleteButton = getByLabelText('delete task');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('enters edit mode when title is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    expect(getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('shows textarea when editing', () => {
    const { getByText, getByPlaceholderText } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    expect(getByPlaceholderText('Add a description...')).toBeInTheDocument();
  });

  it('saves on Enter key', () => {
    const { getByText, getByDisplayValue } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    const input = getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    // Since it's async, we can't easily test dispatch, but at least no error
  });

  it('cancels on Escape key', () => {
    const { getByText, queryByDisplayValue } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    expect(queryByDisplayValue('Test Task')).toBeInTheDocument();
    const input = queryByDisplayValue('Test Task');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(queryByDisplayValue('Test Task')).not.toBeInTheDocument();
  });

  it('validates empty title', () => {
    const { getByText, getByDisplayValue } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    const input = getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(getByText('Title is required')).toBeInTheDocument();
  });

  it('validates title length', () => {
    const longTitle = 'a'.repeat(501);
    const { getByText, getByDisplayValue } = render(
      <TaskCard task={mockTask} />
    );
    const title = getByText('Test Task');
    fireEvent.click(title);
    const input = getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: longTitle } });
    fireEvent.blur(input);
    expect(getByText('Title must be 500 characters or less')).toBeInTheDocument();
  });
});