/**
 * Design System Configuration
 * Centralized theme configuration for reusable components across the ecosystem
 */

// Color Palette - Medical & Cozy theme
export const colors = {
  // Primary - Lavender (Medical touch)
  lavender: {
    50: '#f5f0ff',
    100: '#ede5ff',
    200: '#ddd0ff',
    300: '#c6a9ff',
    400: '#a978ff',
    500: '#8b42ff',
    600: '#7e1fff',
    700: '#6f0fe6',
    800: '#5c0cc0',
    900: '#4d0d9c',
  },

  // Secondary - Rose (Warm & cozy)
  rose: {
    50: '#fff0f5',
    100: '#ffe3ed',
    200: '#ffcbdd',
    300: '#ffb3c8',
    400: '#ff87ac',
    500: '#ff5a8a',
    600: '#ff2869',
    700: '#e11d48',
    800: '#bf123f',
    900: '#9f1239',
  },

  // Neutral - Warm Gray
  warmgray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
};

// Typography
export const typography = {
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// Spacing
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '360px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index layers
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  dropdown: '1000',
  modal: '2000',
  popover: '3000',
  tooltip: '4000',
};

// Animation
export const animation = {
  durations: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easings: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Component Variants
export const variants = {
  button: {
    primary: 'lavender',
    secondary: 'rose',
    outline: 'outline',
    ghost: 'ghost',
  },
  badge: {
    primary: 'lavender',
    secondary: 'rose',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    default: 'warmgray',
  },
  card: {
    default: 'white',
    hover: 'hover',
    selected: 'selected',
  },
};

// Utility function to get Tailwind classes for a color
export function getColorClasses(colorName: string, shade: number = 500) {
  return {
    bg: `bg-${colorName}-${shade}`,
    text: `text-${colorName}-${shade}`,
    border: `border-${colorName}-${shade}`,
    hover: {
      bg: `hover:bg-${colorName}-${shade}`,
      text: `hover:text-${colorName}-${shade}`,
      border: `hover:border-${colorName}-${shade}`,
    },
    focus: {
      ring: `focus:ring-${colorName}-${shade}`,
      border: `focus:border-${colorName}-${shade}`,
    },
  };
}

// Export default theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  animation,
  variants,
};

export default theme;