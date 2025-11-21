import React from 'react';

import { useAppDispatch } from '../app/hooks';
import { addTask, toggleTaskCompletion } from '../features/tasks/tasksSlice';
import TaskList from '../components/tasks/TaskList';

function MainView() {
  const dispatch = useAppDispatch();

  const handleAddTask = (title: string) => {
    dispatch(addTask({ title, completed: false }));
  };

  const handleTaskComplete = (taskId: number) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  return <TaskList onAddTask={handleAddTask} onTaskComplete={handleTaskComplete} />;
}

export default MainView;
