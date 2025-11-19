/**
 * Design System - Theme Constants
 * Based on "Contemplative Minimalism" aesthetic
 * Serving Awareness through simplicity, peace, and spaciousness
 */

export const Colors = {
  light: {
    // Primary Colors
    background: '#FAF9F7', // Warm off-white, like aged paper
    surface: '#FFFFFF', // Pure white for cards
    primaryText: '#2C2A27', // Deep warm gray, almost black
    secondaryText: '#6B6662', // Warm medium gray
    tertiaryText: '#9C9893', // Light warm gray

    // Accent Colors
    primaryAccent: '#8B7355', // Warm earth - ochre/clay
    secondaryAccent: '#A8956D', // Sage/olive - natural
    gentleAlert: '#C17D5D', // Terracotta - warm, not alarming
    success: '#7D9C8B', // Soft sage green

    // Interactive States
    focusRing: '#8B7355',
    hoverBackground: '#F5F3F0',
    pressed: '#EBE8E3',
    disabled: '#C5C0BA',

    // Dividers & Borders
    divider: '#E8E4DF',
    border: '#D8D3CD',
  },

  dark: {
    // Primary Colors
    background: '#1C1A18', // Deep warm dark, not pure black
    surface: '#28251F', // Slightly lighter for cards
    primaryText: '#F0EDEA', // Soft off-white
    secondaryText: '#A8A39D', // Warm medium gray
    tertiaryText: '#6B6662', // Darker gray

    // Accent Colors
    primaryAccent: '#B89968', // Lighter warm earth for contrast
    secondaryAccent: '#9FA887', // Muted sage
    gentleAlert: '#C9876B', // Soft terracotta
    success: '#8EAD9A', // Gentle sage

    // Interactive States
    focusRing: '#B89968',
    hoverBackground: '#2F2C26',
    pressed: '#35312A',
    disabled: '#4A4540',

    // Dividers & Borders
    divider: '#353229',
    border: '#403C35',
  },
};

export const Typography = {
  // Font Families
  fonts: {
    display: 'CrimsonText-Semibold', // For timer, headings, daily pointers
    displayRegular: 'CrimsonText-Regular',
    body: 'SourceSerifPro-Regular', // For body text, teachings, journal
    bodySemibold: 'SourceSerifPro-Semibold',
    ui: 'Inter-Medium', // For UI labels, buttons, navigation
    uiRegular: 'Inter-Regular',
  },

  // Type Scale
  sizes: {
    displayLarge: 40,
    display: 32,
    titleLarge: 28,
    title: 24,
    bodyLarge: 20,
    body: 18,
    bodySmall: 16,
    label: 14,
    caption: 12,
  },

  // Line Heights
  lineHeights: {
    displayLarge: 48,
    display: 40,
    titleLarge: 36,
    title: 32,
    bodyLarge: 34,
    body: 30,
    bodySmall: 26,
    label: 20,
    caption: 16,
  },

  // Font Weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.01,
    normal: 0,
    loose: 0.01,
    allCaps: 0.05,
  },
};

export const Spacing = {
  // Base unit: 4px
  // All spacing uses multiples of 4px for consistency and rhythm
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,

  // Semantic spacing
  screenPaddingMobile: 20,
  screenPaddingTablet: 32,
  screenPaddingVertical: 24,
  cardPadding: 24,
  cardGap: 16,
  buttonPaddingHorizontal: 16,
  buttonPaddingVertical: 12,
  sectionGap: 32,
};

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  round: 9999, // Fully rounded
};

export const Shadows = {
  light: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.40,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const Animation = {
  // Duration (milliseconds)
  duration: {
    micro: 100, // Hover, press
    fast: 150,
    normal: 300, // Transitions
    slow: 500, // Page transitions
  },

  // Easing
  easing: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out',
  },
};

// Touch target minimum size for accessibility
export const Accessibility = {
  minTouchTarget: 44,
  minTouchSpacing: 8,
};

// Export a theme object that combines everything
export const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  animation: Animation,
  accessibility: Accessibility,
};

export type Theme = typeof theme;
export type ColorScheme = 'light' | 'dark';
