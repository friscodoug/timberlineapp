// Hibernation Hollow Guest Portal - Theme Constants

export const COLORS = {
  primary: '#2F4F3E', // Forest green
  secondary: '#8B6A4E', // Warm wood brown
  background: '#F5F3EF',
  text: '#2B2B2B',
  white: '#FFFFFF',
  lightGray: '#E8E6E2',
  success: '#4CAF50',
  error: '#E74C3C',
};

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const CARD_STYLE = {
  backgroundColor: COLORS.white,
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
};
