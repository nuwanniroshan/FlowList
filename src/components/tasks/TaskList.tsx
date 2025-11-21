import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Box,
  Skeleton,
  Paper,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import {
  selectIncompleteTasks,
  selectTasksLoading,
  Task,
} from '../../features/tasks/tasksSlice';
import TaskCard from './TaskCard';
import TaskInput from './TaskInput';

interface TaskListProps {
  onTaskClick?: (task: Task) => void;
  onTaskComplete?: (taskId: number) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
  onAddTask?: (title: string) => void;
}

function TaskList({
  onTaskClick,
  onTaskComplete,
  onTaskEdit,
  onTaskDelete,
  onAddTask,
}: TaskListProps) {
  const tasks = useAppSelector(selectIncompleteTasks);
  const loading = useAppSelector(selectTasksLoading);

  // Sort tasks by creation date (newest first)
  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [tasks],
  );

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Paper key={`skeleton-${index}`} sx={{ mb: 2, p: 2 }}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
          </Paper>
        ))}
      </Box>
    );
  }

  // Empty state
  if (sortedTasks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first task to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: 500,
          md: 600,
          lg: 700,
        },
        mx: 'auto',
        px: {
          xs: 2,
          sm: 0,
        },
      }}
    >
      {onAddTask && <TaskInput onAddTask={onAddTask} />}
      <AnimatePresence>
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onTaskComplete}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default TaskList;
