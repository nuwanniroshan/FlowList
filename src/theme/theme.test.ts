import { describe, it, expect } from 'vitest';

import { lightTheme, darkTheme, designTokens } from './theme';

describe('Theme Configuration', () => {
  describe('Design Tokens', () => {
    it('should have correct primary color', () => {
      expect(designTokens.colors.primary).toBe('#546FFF');
    });

    it('should have correct background color', () => {
      expect(designTokens.colors.background).toBe('#FCFCFC');
    });

    it('should have correct text colors', () => {
      expect(designTokens.colors.textPrimary).toBe('#23262F');
      expect(designTokens.colors.textSecondary).toBe('#757575');
      expect(designTokens.colors.textDisabled).toBe('#9E9E9E');
    });

    it('should have correct semantic colors', () => {
      expect(designTokens.colors.success).toBe('#4CAF50');
      expect(designTokens.colors.warning).toBe('#FF9800');
      expect(designTokens.colors.error).toBe('#F44336');
      expect(designTokens.colors.info).toBe('#2196F3');
    });

    it('should have 8px base spacing unit', () => {
      expect(designTokens.spacing.sm).toBe(8);
      expect(designTokens.spacing.md).toBe(16);
      expect(designTokens.spacing.lg).toBe(24);
    });

    it('should have correct border radius values', () => {
      expect(designTokens.borderRadius.xs).toBe(4);
      expect(designTokens.borderRadius.sm).toBe(8);
      expect(designTokens.borderRadius.md).toBe(12);
      expect(designTokens.borderRadius.lg).toBe(16);
    });
  });

  describe('Light Theme', () => {
    it('should be in light mode', () => {
      expect(lightTheme.palette.mode).toBe('light');
    });

    it('should have correct primary color', () => {
      expect(lightTheme.palette.primary.main).toBe('#546FFF');
    });

    it('should have correct background colors', () => {
      expect(lightTheme.palette.background.default).toBe('#FCFCFC');
      expect(lightTheme.palette.background.paper).toBe('#FFFFFF');
    });

    it('should have correct text colors', () => {
      expect(lightTheme.palette.text.primary).toBe('#23262F');
      expect(lightTheme.palette.text.secondary).toBe('#757575');
    });

    it('should have Inter font family', () => {
      expect(lightTheme.typography.fontFamily).toContain('Inter');
    });

    it('should have correct typography scale', () => {
      expect(lightTheme.typography.h1).toMatchObject({
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: 1.25,
      });
      expect(lightTheme.typography.h2).toMatchObject({
        fontSize: '24px',
        fontWeight: 600,
      });
      expect(lightTheme.typography.body1).toMatchObject({
        fontSize: '16px',
        fontWeight: 400,
      });
    });

    it('should have correct breakpoints', () => {
      expect(lightTheme.breakpoints.values).toMatchObject({
        xs: 0,
        sm: 320,
        md: 768,
        lg: 1025,
        xl: 1440,
      });
    });

    it('should have 8px spacing unit', () => {
      expect(lightTheme.spacing(1)).toBe('8px');
      expect(lightTheme.spacing(2)).toBe('16px');
      expect(lightTheme.spacing(3)).toBe('24px');
    });

    it('should have correct border radius', () => {
      expect(lightTheme.shape.borderRadius).toBe(8);
    });

    it('should have custom shadows', () => {
      expect(lightTheme.shadows[1]).toContain('rgba(35, 38, 47, 0.05)');
      expect(lightTheme.shadows[2]).toContain('rgba(35, 38, 47, 0.08)');
    });
  });

  describe('Dark Theme', () => {
    it('should be in dark mode', () => {
      expect(darkTheme.palette.mode).toBe('dark');
    });

    it('should have dark background colors', () => {
      expect(darkTheme.palette.background.default).toBe('#1A1A1A');
      expect(darkTheme.palette.background.paper).toBe('#2A2A2A');
    });

    it('should have light text colors', () => {
      expect(darkTheme.palette.text.primary).toBe('#FFFFFF');
      expect(darkTheme.palette.text.secondary).toBe('#B0B0B0');
    });

    it('should maintain same primary color', () => {
      expect(darkTheme.palette.primary.main).toBe('#546FFF');
    });
  });

  describe('Component Overrides', () => {
    it('should have button overrides', () => {
      expect(
        lightTheme.components?.MuiButton?.styleOverrides?.root,
      ).toBeDefined();
    });

    it('should have card overrides', () => {
      expect(
        lightTheme.components?.MuiCard?.styleOverrides?.root,
      ).toBeDefined();
    });

    it('should have text field overrides', () => {
      expect(
        lightTheme.components?.MuiTextField?.styleOverrides?.root,
      ).toBeDefined();
    });

    it('should have checkbox overrides', () => {
      expect(
        lightTheme.components?.MuiCheckbox?.styleOverrides?.root,
      ).toBeDefined();
    });

    it('should have dialog overrides', () => {
      expect(
        lightTheme.components?.MuiDialog?.styleOverrides?.paper,
      ).toBeDefined();
    });

    it('should have FAB overrides', () => {
      expect(lightTheme.components?.MuiFab?.styleOverrides?.root).toBeDefined();
    });

    it('should have CssBaseline overrides', () => {
      const cssBaseline = lightTheme.components?.MuiCssBaseline?.styleOverrides;
      expect(cssBaseline).toBeDefined();
      expect(typeof cssBaseline).toBe('object');
    });

    it('should have reduced motion support in CssBaseline', () => {
      const cssBaseline = lightTheme.components?.MuiCssBaseline?.styleOverrides;
      const cssString = JSON.stringify(cssBaseline);
      expect(cssString).toContain('prefers-reduced-motion');
    });
  });

  describe('Accessibility', () => {
    it('should have focus-visible styles', () => {
      const buttonStyles = lightTheme.components?.MuiButton?.styleOverrides
        ?.root as Record<string, unknown>;
      expect(buttonStyles?.['&:focus-visible']).toBeDefined();
    });

    it('should have proper outline for focus states', () => {
      const buttonStyles = lightTheme.components?.MuiButton?.styleOverrides
        ?.root as Record<string, unknown>;
      const focusVisible = buttonStyles?.['&:focus-visible'] as Record<
      string,
      unknown
      >;
      expect(focusVisible?.outline).toContain('#546FFF');
    });

    it('should support reduced motion', () => {
      const cssBaseline = lightTheme.components?.MuiCssBaseline?.styleOverrides;
      expect(cssBaseline).toContain('prefers-reduced-motion');
    });
  });

  describe('Typography', () => {
    it('should have button text with no text transform', () => {
      expect(lightTheme.typography.button?.textTransform).toBe('none');
    });

    it('should have proper line heights', () => {
      expect(lightTheme.typography.h1?.lineHeight).toBe(1.25);
      expect(lightTheme.typography.body1?.lineHeight).toBe(1.5);
    });

    it('should have letter spacing for buttons', () => {
      expect(lightTheme.typography.button?.letterSpacing).toBe('0.5px');
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile breakpoint at 320px', () => {
      expect(lightTheme.breakpoints.values.sm).toBe(320);
    });

    it('should have tablet breakpoint at 768px', () => {
      expect(lightTheme.breakpoints.values.md).toBe(768);
    });

    it('should have desktop breakpoint at 1025px', () => {
      expect(lightTheme.breakpoints.values.lg).toBe(1025);
    });

    it('should have large desktop breakpoint at 1440px', () => {
      expect(lightTheme.breakpoints.values.xl).toBe(1440);
    });
  });
});
