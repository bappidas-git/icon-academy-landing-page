/* ============================================
   MUI Theme — Icon Commerce College
   Royal Indigo + Warm Saffron + Coral Crimson
   ============================================ */

import { createTheme, alpha } from '@mui/material/styles';

// Color palette mirroring src/styles/variables.css --ic-* tokens
const colors = {
  primary: {
    main: '#1E3A8A',
    light: '#3B5BDB',
    dark: '#152659',
    50: '#EEF2FF',
    100: '#E0E7FF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#D97706',
    light: '#F59E0B',
    dark: '#B45309',
    50: '#FFFBEB',
    contrastText: '#FFFFFF',
  },
  cta: {
    main: '#E11D48',
    light: '#F43F5E',
    dark: '#BE123C',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#059669',
    light: '#34D399',
    dark: '#047857',
    bg: '#D1FAE5',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',
    contrastText: '#0F172A',
  },
  error: {
    main: '#DC2626',
    bg: '#FEE2E2',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#0284C7',
    contrastText: '#FFFFFF',
  },
  region: {
    assam: '#1E7F5A',
    northeast: '#7C3AED',
    gauhatiUni: '#6B1E1E',
  },
  grey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    cream: '#FFFBEB',
    dark: '#1E3A8A',
    soft: '#F8FAFC',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    disabled: '#94A3B8',
    dark: '#0F172A',
    light: '#FFFFFF',
  },
};

// Breakpoints matching CSS variables
const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1440,
  },
};

// Typography configuration
const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  fontFamilyHeading: "'Plus Jakarta Sans', 'Inter', sans-serif",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  h1: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(2.5rem, 2rem + 2.5vw, 4.5rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: colors.primary.main,
  },
  h2: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: colors.primary.main,
  },
  h3: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem)',
    lineHeight: 1.2,
    color: colors.primary.main,
  },
  h4: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
    lineHeight: 1.25,
    color: colors.primary.main,
  },
  h5: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
    lineHeight: 1.3,
    color: colors.primary.main,
  },
  h6: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 'clamp(1.1rem, 1rem + 0.5vw, 1.25rem)',
    lineHeight: 1.4,
    color: colors.primary.main,
  },
  subtitle1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  subtitle2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  body1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.625,
    color: colors.text.primary,
  },
  body2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  button: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.9375rem',
    lineHeight: 1,
    textTransform: 'none',
    letterSpacing: '0.025em',
  },
  caption: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  overline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: colors.secondary.main,
  },
};

// Shadows configuration
const shadows = [
  'none',
  '0 1px 2px rgba(15, 23, 42, 0.06)',
  '0 1px 3px rgba(15, 23, 42, 0.08)',
  '0 4px 6px rgba(15, 23, 42, 0.06)',
  '0 4px 8px rgba(15, 23, 42, 0.08)',
  '0 4px 12px rgba(15, 23, 42, 0.08)',
  '0 4px 20px rgba(15, 23, 42, 0.08)',
  '0 8px 16px rgba(15, 23, 42, 0.10)',
  '0 8px 24px rgba(15, 23, 42, 0.10)',
  '0 12px 28px rgba(15, 23, 42, 0.12)',
  '0 12px 40px rgba(15, 23, 42, 0.12)',
  '0 12px 48px rgba(15, 23, 42, 0.15)',
  '0 16px 56px rgba(15, 23, 42, 0.15)',
  '0 16px 64px rgba(15, 23, 42, 0.18)',
  '0 20px 72px rgba(15, 23, 42, 0.18)',
  '0 20px 80px rgba(15, 23, 42, 0.20)',
  '0 24px 88px rgba(15, 23, 42, 0.20)',
  '0 24px 96px rgba(15, 23, 42, 0.22)',
  '0 28px 104px rgba(15, 23, 42, 0.22)',
  '0 28px 112px rgba(15, 23, 42, 0.24)',
  '0 32px 120px rgba(15, 23, 42, 0.24)',
  '0 32px 128px rgba(15, 23, 42, 0.26)',
  '0 36px 136px rgba(15, 23, 42, 0.26)',
  '0 36px 144px rgba(15, 23, 42, 0.28)',
  '0 40px 152px rgba(15, 23, 42, 0.28)',
];

// Coral CTA shadow tints (Apply / Submit only)
const ctaShadow = '0 6px 20px rgba(225, 29, 72, 0.35)';
const ctaShadowHover = '0 10px 28px rgba(225, 29, 72, 0.45)';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E3A8A', light: '#3B5BDB', dark: '#152659', contrastText: '#FFFFFF' },
    secondary: { main: '#D97706', light: '#F59E0B', dark: '#B45309', contrastText: '#FFFFFF' },
    cta: { main: '#E11D48', light: '#F43F5E', dark: '#BE123C', contrastText: '#FFFFFF' },
    success: { main: '#059669', light: '#34D399', dark: '#047857', contrastText: '#FFFFFF', bg: '#D1FAE5' },
    warning: { main: '#F59E0B', contrastText: '#0F172A' },
    error: { main: '#DC2626', contrastText: '#FFFFFF', bg: '#FEE2E2' },
    info: { main: '#0284C7', contrastText: '#FFFFFF' },
    background: { default: '#FFFFFF', paper: '#FFFFFF', cream: '#FFFBEB', dark: '#1E3A8A', soft: '#F8FAFC' },
    text: { primary: '#0F172A', secondary: '#475569', disabled: '#94A3B8', dark: '#0F172A', light: '#FFFFFF' },
    region: { assam: '#1E7F5A', northeast: '#7C3AED', gauhatiUni: '#6B1E1E' },
    divider: '#E2E8F0',
    grey: colors.grey,
    action: {
      active: colors.primary.main,
      hover: alpha(colors.primary.main, 0.06),
      selected: alpha(colors.primary.main, 0.12),
      disabled: colors.grey[400],
      disabledBackground: colors.grey[200],
      focus: alpha(colors.primary.main, 0.12),
    },
  },
  breakpoints,
  typography,
  shadows,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  zIndex: {
    mobileStepper: 100,
    fab: 105,
    speedDial: 105,
    appBar: 200,
    drawer: 400,
    modal: 600,
    snackbar: 800,
    tooltip: 900,
  },
  components: {
    // Global CSS Baseline
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          scrollBehavior: 'smooth',
          WebkitTextSizeAdjust: '100%',
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          overflowX: 'hidden',
        },
        '::selection': {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
        },
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-track': {
          background: colors.grey[100],
          borderRadius: 4,
        },
        '::-webkit-scrollbar-thumb': {
          background: colors.primary.main,
          borderRadius: 4,
          '&:hover': {
            background: colors.primary.dark,
          },
        },
      },
    },
    // Button Component
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          transition: 'all 0.25s ease',
          '&:focus-visible': {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: 2,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: shadows[4],
            transform: 'translateY(-2px)',
          },
        },
        // Page-chrome / nav primary buttons — Royal Indigo
        containedPrimary: {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.primary.light,
            boxShadow: shadows[5],
            transform: 'translateY(-2px)',
          },
          '&:active': {
            backgroundColor: colors.primary.dark,
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.secondary.light,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary.main,
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.06),
            borderColor: colors.primary.main,
          },
        },
        outlinedSecondary: {
          borderColor: colors.secondary.main,
          color: colors.secondary.main,
          '&:hover': {
            backgroundColor: alpha(colors.secondary.main, 0.08),
            borderColor: colors.secondary.main,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.06),
          },
        },
        sizeLarge: {
          padding: '16px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.8125rem',
        },
      },
      variants: [
        // Apply / Submit / final-stage CTAs — Coral Crimson.
        // Use as: <Button variant="contained" color="cta" /> or className="MuiButton-containedCta"
        {
          props: { color: 'cta', variant: 'contained' },
          style: {
            backgroundColor: colors.cta.main,
            color: '#FFFFFF',
            boxShadow: ctaShadow,
            '&:hover': {
              backgroundColor: colors.cta.light,
              boxShadow: ctaShadowHover,
              transform: 'translateY(-2px)',
            },
            '&:active': {
              backgroundColor: colors.cta.dark,
              transform: 'translateY(0)',
            },
          },
        },
        {
          props: { color: 'cta', variant: 'outlined' },
          style: {
            borderColor: colors.cta.main,
            color: colors.cta.main,
            '&:hover': {
              backgroundColor: alpha(colors.cta.main, 0.08),
              borderColor: colors.cta.dark,
            },
          },
        },
      ],
    },
    // Icon Button
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.08),
          },
        },
      },
    },
    // Card Component
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: shadows[6],
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: shadows[9],
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    // Paper Component
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: shadows[2],
        },
        elevation2: {
          boxShadow: shadows[4],
        },
        elevation3: {
          boxShadow: shadows[6],
        },
      },
    },
    // AppBar Component
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
        },
        colorPrimary: {
          backgroundColor: 'transparent',
        },
      },
    },
    // Toolbar Component
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 80,
          '@media (min-width: 600px)': {
            minHeight: 80,
          },
        },
      },
    },
    // TextField/Input Components
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.25s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
          },
        },
        notchedOutline: {
          borderColor: colors.grey[200],
          transition: 'border-color 0.25s ease',
        },
        input: {
          padding: '14px 16px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.text.secondary,
          '&.Mui-focused': {
            color: colors.primary.main,
          },
        },
      },
    },
    // Select Component
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    // Menu Component
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: shadows[8],
          marginTop: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.06),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.primary.main, 0.12),
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, 0.16),
            },
          },
        },
      },
    },
    // Chip Component
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          transition: 'all 0.2s ease',
        },
        filled: {
          '&:hover': {
            boxShadow: shadows[2],
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
        colorPrimary: {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.primary.light,
          },
        },
        colorSecondary: {
          backgroundColor: colors.secondary.main,
          color: '#FFFFFF',
        },
      },
    },
    // Avatar Component
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorDefault: {
          backgroundColor: colors.grey[200],
          color: colors.text.primary,
        },
      },
    },
    // Badge Component
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
        },
      },
    },
    // Tabs Component
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: colors.primary.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            color: colors.primary.main,
          },
          '&:hover': {
            color: colors.primary.main,
            opacity: 1,
          },
        },
      },
    },
    // Slider Component
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 6,
          color: colors.primary.main,
          '&.Mui-disabled': {
            color: colors.grey[400],
          },
        },
        track: {
          border: 'none',
          background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.primary.light})`,
        },
        rail: {
          opacity: 0.3,
          backgroundColor: colors.grey[400],
        },
        thumb: {
          width: 20,
          height: 20,
          backgroundColor: colors.primary.main,
          boxShadow: shadows[4],
          '&:hover, &.Mui-focusVisible': {
            boxShadow: shadows[6],
          },
          '&:before': {
            display: 'none',
          },
        },
        valueLabel: {
          borderRadius: 8,
          backgroundColor: colors.primary.main,
          '&:before': {
            display: 'none',
          },
        },
        mark: {
          backgroundColor: colors.grey[400],
          width: 4,
          height: 4,
          borderRadius: 2,
        },
        markActive: {
          backgroundColor: colors.primary.light,
        },
      },
    },
    // Switch Component
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 48,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(22px)',
            color: '#FFFFFF',
            '& + .MuiSwitch-track': {
              backgroundColor: colors.primary.main,
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 22,
          height: 22,
          boxShadow: shadows[2],
        },
        track: {
          borderRadius: 13,
          backgroundColor: colors.grey[400],
          opacity: 1,
          transition: 'background-color 0.3s ease',
        },
      },
    },
    // Checkbox Component
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.grey[400],
          '&.Mui-checked': {
            color: colors.primary.main,
          },
        },
      },
    },
    // Radio Component
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.grey[400],
          '&.Mui-checked': {
            color: colors.primary.main,
          },
        },
      },
    },
    // Tooltip Component
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.text.primary,
          color: '#FFFFFF',
          fontSize: '0.8125rem',
          fontWeight: 500,
          padding: '8px 12px',
          borderRadius: 8,
          boxShadow: shadows[4],
        },
        arrow: {
          color: colors.text.primary,
        },
      },
    },
    // Dialog/Modal Component
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: shadows[12],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 700,
          fontFamily: typography.fontFamilyHeading,
          padding: '24px 24px 16px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
          gap: 12,
        },
      },
    },
    // Drawer Component
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '24px 24px 0 0',
          boxShadow: shadows[10],
        },
      },
    },
    // Snackbar Component
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: alpha(colors.success.main, 0.12),
          color: colors.success.dark,
        },
        standardError: {
          backgroundColor: alpha(colors.error.main, 0.12),
          color: '#991B1B',
        },
        standardWarning: {
          backgroundColor: alpha(colors.warning.main, 0.12),
          color: '#92400E',
        },
        standardInfo: {
          backgroundColor: alpha(colors.info.main, 0.12),
          color: '#075985',
        },
      },
    },
    // Accordion Component
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px 0',
          minHeight: 'auto',
          '&.Mui-expanded': {
            minHeight: 'auto',
          },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 0 16px',
        },
      },
    },
    // Divider Component
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.grey[200],
        },
      },
    },
    // Skeleton Component
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey[100],
        },
        rectangular: {
          borderRadius: 8,
        },
      },
    },
    // Backdrop Component
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.text.primary, 0.7),
          backdropFilter: 'blur(4px)',
        },
      },
    },
    // Link Component
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: colors.primary.main,
          fontWeight: 500,
          transition: 'color 0.2s ease',
          '&:hover': {
            color: colors.primary.light,
          },
        },
      },
    },
    // Breadcrumbs Component
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: colors.grey[400],
        },
      },
    },
    // Pagination Component
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            fontWeight: 500,
            '&.Mui-selected': {
              backgroundColor: colors.primary.main,
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: colors.primary.light,
              },
            },
          },
        },
      },
    },
    // Table Component
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colors.grey[200],
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: colors.grey[100],
          color: colors.text.primary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
      },
    },
    // List Component
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.Mui-selected': {
            backgroundColor: alpha(colors.primary.main, 0.10),
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, 0.14),
            },
          },
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.06),
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: colors.primary.main,
        },
      },
    },
    // Bottom Navigation Component (Mobile)
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
          backgroundColor: '#FFFFFF',
          borderTop: `1px solid ${colors.grey[200]}`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          padding: '8px 12px',
          color: colors.text.secondary,
          '&.Mui-selected': {
            color: colors.primary.main,
          },
        },
        label: {
          fontSize: '0.6875rem',
          fontWeight: 500,
          '&.Mui-selected': {
            fontSize: '0.6875rem',
          },
        },
      },
    },
    // Fab Component — defaults to coral CTA (Apply / Submit)
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: ctaShadow,
          '&:hover': {
            boxShadow: ctaShadowHover,
          },
        },
        primary: {
          backgroundColor: colors.cta.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.cta.light,
          },
        },
        secondary: {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.primary.light,
          },
        },
      },
    },
    // Speed Dial Component — coral CTA
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: colors.cta.main,
          color: '#FFFFFF',
          boxShadow: ctaShadow,
          '&:hover': {
            backgroundColor: colors.cta.light,
            boxShadow: ctaShadowHover,
          },
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          backgroundColor: '#FFFFFF',
          color: colors.primary.main,
          boxShadow: shadows[4],
          '&:hover': {
            backgroundColor: colors.grey[100],
          },
        },
      },
    },
  },
});

// Export theme and colors for use in styled components
export { colors, ctaShadow, ctaShadowHover };
export default theme;
