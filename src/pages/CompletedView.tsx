import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Skeleton,
  Paper,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCompletedTasks,
  selectTasksLoading,
  toggleTaskCompletion,
} from '../features/tasks/tasksSlice';
import TaskCard from '../components/tasks/TaskCard';

function CompletedView() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectCompletedTasks);
  const loading = useAppSelector(selectTasksLoading);

  const handleTaskComplete = (taskId: number) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  // Sort tasks by completion date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.completedAt || !b.completedAt) return 0;
    return b.completedAt.getTime() - a.completedAt.getTime();
  });

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Paper key="completed-skeleton-1" sx={{ mb: 2, p: 2 }}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        </Paper>
        <Paper key="completed-skeleton-2" sx={{ mb: 2, p: 2 }}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        </Paper>
        <Paper key="completed-skeleton-3" sx={{ mb: 2, p: 2 }}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        </Paper>
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
          No completed tasks yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Complete some tasks to see them here
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Completed Tasks
        </Typography>
      </Box>

      <AnimatePresence>
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleTaskComplete}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default CompletedView;
