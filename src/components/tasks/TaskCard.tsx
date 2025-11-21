import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  TextField,
  TextareaAutosize,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';

import { useAppDispatch } from '../../app/hooks';
import type { Task } from '../../types';
import {
  updateTask,
  updateTaskOptimistic,
  rollbackUpdateTask,
  toggleTaskCompletion,
  toggleTaskCompletionOptimistic,
} from '../../features/tasks/tasksSlice';

interface TaskCardProps {
  task: Task;
  onComplete?: (taskId: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
}

function TaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [error, setError] = useState('');
  const [showUndoSnackbar, setShowUndoSnackbar] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const undoTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

  const validateTitle = (title: string): string => {
    const trimmed = title.trim();
    if (!trimmed) return 'Title is required';
    if (trimmed.length > 500) return 'Title must be 500 characters or less';
    return '';
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setError('');
  };

  const handleSave = async () => {
    const trimmedTitle = editTitle.trim();
    const validationError = validateTitle(trimmedTitle);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (task.id === undefined) return;

    const updates: Partial<Task> = {};
    if (trimmedTitle !== task.title) updates.title = trimmedTitle;
    if (editDescription !== (task.description || '')) updates.description = editDescription;

    if (Object.keys(updates).length === 0) {
      setIsEditing(false);
      return;
    }

    // Optimistic update
    dispatch(updateTaskOptimistic({ id: task.id, updates }));

    try {
      await dispatch(updateTask({ id: task.id, updates })).unwrap();
      setIsEditing(false);
    } catch (err) {
      // Rollback on error
      dispatch(rollbackUpdateTask({ id: task.id, previousTask: task }));
      setError('Failed to update task. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setError('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  const handleComplete = async () => {
    if (task.id === undefined) return;

    // Optimistic update
    dispatch(toggleTaskCompletionOptimistic(task.id));
    setIsCompleting(true);

    try {
      await dispatch(toggleTaskCompletion(task.id)).unwrap();

      // If completing (not uncompleting), show undo snackbar
      if (!task.completed) {
        setShowUndoSnackbar(true);
        undoTimeoutRef.current = setTimeout(() => {
          setShowUndoSnackbar(false);
        }, 3000);
      }
    } catch (error) {
      // Rollback optimistic update
      dispatch(toggleTaskCompletionOptimistic(task.id));
      setError('Failed to update task completion. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleUndo = () => {
    if (task.id !== undefined) {
      // Undo the completion by toggling back to incomplete
      dispatch(toggleTaskCompletion(task.id));
      setShowUndoSnackbar(false);
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    }
  };

  const handleEdit = () => {
    onEdit?.(task);
  };

  const handleDelete = () => {
    if (task.id !== undefined) {
      onDelete?.(task.id);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          backgroundColor: isCompleting && !task.completed ? '#e8f5e8' : 'transparent',
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          x: task.completed ? -300 : 0,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          sx={{
            mb: 2,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 3,
            },
            minHeight: 80,
            backgroundColor: isCompleting && !task.completed ? '#e8f5e8' : 'inherit',
          }}
        >
          <CardContent sx={{ pb: '16px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Checkbox
                checked={task.completed}
                onChange={handleComplete}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                  mt: -0.5,
                  minWidth: 44,
                  minHeight: 44,
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                }}
              />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    inputRef={titleInputRef}
                    error={!!error}
                    helperText={error}
                    variant="standard"
                    sx={{
                      mb: 1,
                      '& .MuiInput-root': {
                        fontSize: '1.25rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                  <TextareaAutosize
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a description..."
                    style={{
                      width: '100%',
                      minHeight: '60px',
                      padding: '8px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontFamily: 'inherit',
                      fontSize: '0.875rem',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    onClick={handleTitleClick}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'text.secondary' : 'text.primary',
                      wordBreak: 'break-word',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      mx: -1,
                      my: -0.5,
                    }}
                  >
                    {task.title}
                  </Typography>

                  {task.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        wordBreak: 'break-word',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {task.description}
                    </Typography>
                  )}
                </>
              )}

              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Chip
                  label={new Date(task.createdAt).toLocaleDateString()}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                onClick={handleEdit}
                size="small"
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                }}
                aria-label="edit task"
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={handleDelete}
                size="small"
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                }}
                aria-label="delete task"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>

    <Snackbar
      open={showUndoSnackbar}
      autoHideDuration={3000}
      onClose={() => setShowUndoSnackbar(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" onClick={handleUndo} startIcon={<UndoIcon />}>
            Undo
          </Button>
        }
      >
        Task completed
      </Alert>
    </Snackbar>
    </>
  );
}

export default TaskCard;
