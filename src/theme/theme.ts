import { createTheme, ThemeOptions } from '@mui/material/styles';

// Design tokens from design-system.md
const designTokens = {
  colors: {
    primary: '#546FFF',
    primaryDark: '#4158D9',
    primaryDarker: '#3647B8',
    primaryLight: '#F5F6FF',
    background: '#FCFCFC',
    surface: '#FFFFFF',
    border: '#E0E0E0',
    textPrimary: '#23262F',
    textSecondary: '#757575',
    textDisabled: '#9E9E9E',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    grey: '#292D32',
    lightGrey: '#F5F5F5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    xs: '0 1px 2px rgba(35, 38, 47, 0.05)',
    sm: '0 2px 4px rgba(35, 38, 47, 0.08)',
    md: '0 4px 8px rgba(35, 38, 47, 0.12)',
    lg: '0 8px 16px rgba(35, 38, 47, 0.16)',
    xl: '0 16px 32px rgba(35, 38, 47, 0.20)',
  },
};

// Breakpoints matching design system
const breakpoints = {
  values: {
    xs: 0,
    sm: 320,
    md: 768,
    lg: 1025,
    xl: 1440,
  },
};

// Typography configuration
const typography = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  h1: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.25,
    color: designTokens.colors.textPrimary,
  },
  h2: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.333,
    color: designTokens.colors.textPrimary,
  },
  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.4,
    color: designTokens.colors.textPrimary,
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: designTokens.colors.textPrimary,
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.429,
    color: designTokens.colors.textSecondary,
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.333,
    color: designTokens.colors.textSecondary,
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.429,
    letterSpacing: '0.5px',
    textTransform: 'none' as const,
  },
};

// Light theme configuration
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.colors.primary,
      dark: designTokens.colors.primaryDark,
      light: designTokens.colors.primaryLight,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: designTokens.colors.grey,
      light: designTokens.colors.lightGrey,
      contrastText: '#FFFFFF',
    },
    error: {
      main: designTokens.colors.error,
    },
    warning: {
      main: designTokens.colors.warning,
    },
    info: {
      main: designTokens.colors.info,
    },
    success: {
      main: designTokens.colors.success,
    },
    background: {
      default: designTokens.colors.background,
      paper: designTokens.colors.surface,
    },
    text: {
      primary: designTokens.colors.textPrimary,
      secondary: designTokens.colors.textSecondary,
      disabled: designTokens.colors.textDisabled,
    },
    divider: designTokens.colors.border,
  },
  typography,
  breakpoints,
  spacing: designTokens.spacing.sm, // 8px base unit
  shape: {
    borderRadius: designTokens.borderRadius.sm, // 8px default
  },
  shadows: [
    'none',
    designTokens.shadows.xs,
    designTokens.shadows.sm,
    designTokens.shadows.sm,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.sm,
          padding: '12px 24px',
          minHeight: '44px',
          minWidth: '120px',
          transition: 'all 200ms ease-in-out',
          '&:focus-visible': {
            outline: `2px solid ${designTokens.colors.primary}`,
            outlineOffset: '4px',
          },
        },
        contained: {
          boxShadow: designTokens.shadows.sm,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
          '&:active': {
            boxShadow: designTokens.shadows.xs,
          },
        },
        outlined: {
          borderWidth: '2px',
          padding: '10px 22px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: designTokens.colors.primaryLight,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: designTokens.colors.lightGrey,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: '44px',
          height: '44px',
          borderRadius: designTokens.borderRadius.sm,
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            backgroundColor: designTokens.colors.lightGrey,
          },
          '&:focus-visible': {
            outline: `2px solid ${designTokens.colors.primary}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          boxShadow: designTokens.shadows.sm,
          border: '1px solid transparent',
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            boxShadow: designTokens.shadows.md,
            borderColor: designTokens.colors.border,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.sm,
            minHeight: '48px',
            transition: 'all 200ms ease-in-out',
            '& fieldset': {
              borderWidth: '2px',
              borderColor: designTokens.colors.border,
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary,
              boxShadow: `0 0 0 3px ${designTokens.colors.primaryLight}`,
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${designTokens.colors.primary}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: designTokens.borderRadius.lg,
          padding: designTokens.spacing.lg,
          boxShadow: designTokens.shadows.xl,
          maxWidth: '480px',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            borderRadius: designTokens.borderRadius.sm,
            boxShadow: designTokens.shadows.lg,
            minWidth: '280px',
            maxWidth: '400px',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: '56px',
          height: '56px',
          boxShadow: designTokens.shadows.lg,
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: designTokens.shadows.xl,
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: designTokens.colors.background,
          color: designTokens.colors.textPrimary,
          fontFamily: typography.fontFamily,
        },
        '*': {
          boxSizing: 'border-box',
        },
        '*:focus-visible': {
          outline: `2px solid ${designTokens.colors.primary}`,
          outlineOffset: '2px',
        },
        // Reduced motion support
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
  },
};

// Dark theme configuration (prepared for future)
const darkThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: designTokens.colors.primary,
      dark: designTokens.colors.primaryDark,
      light: designTokens.colors.primaryLight,
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1A1A1A',
      paper: '#2A2A2A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#666666',
    },
    divider: '#3A3A3A',
  },
};

// Create theme instances
export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Export design tokens for use in components
export { designTokens };

// Default export
export default lightTheme;
