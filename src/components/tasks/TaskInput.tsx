import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  Box,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateTitle = useCallback((value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Task title is required';
    }
    if (trimmed.length > 500) {
      return 'Task title must be 500 characters or less';
    }
    return '';
  }, []);

  const handleSubmit = useCallback(() => {
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedTitle = title.trim();
    onAddTask(trimmedTitle);
    setTitle('');
    setError('');
    inputRef.current?.focus();
  }, [title, validateTitle, onAddTask]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
    if (error) {
      setError(validateTitle(value));
    }
  }, [error, validateTitle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ mb: 3 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder="+ Add a task..."
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
              },
            },
          }}
        />
      </Box>
    </motion.div>
  );
}

export default TaskInput;