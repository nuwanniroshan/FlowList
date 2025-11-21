import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="Tasks" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Flow"
          value="/flow"
          icon={<PlayArrowIcon />}
        />
        <BottomNavigationAction
          label="Completed"
          value="/completed"
          icon={<CheckCircleIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
