import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from './TaskInput';

describe('TaskInput', () => {
  const mockOnAddTask = vi.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('renders input field with placeholder', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    expect(input).toBeTruthy();
  });

  it('updates input value when typing', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    fireEvent.change(input, { target: { value: 'New task' } });
    expect((input as HTMLInputElement).value).toBe('New task');
  });

  it('calls onAddTask and clears input on Enter key', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('trims whitespace from task title', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    fireEvent.change(input, { target: { value: '  New task  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
  });

  it('shows error for empty title', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Task title is required')).toBeTruthy();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('shows error for title over 500 characters', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    const longTitle = 'a'.repeat(501);
    fireEvent.change(input, { target: { value: longTitle } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Task title must be 500 characters or less')).toBeTruthy();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('does not call onAddTask for other keys', () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('+ Add a task...');
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.keyDown(input, { key: 'a' });
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});