/**
 * Shemabuds Premium Brand Theme
 * Luxury handcrafted aesthetic with warm, elegant tones
 */

export const theme = {
  colors: {
    // Primary Brand Palette (Mapped to Gold for compatibility)
    gold: {
      primary: '#d4744a',  // Brand Terracotta
      hover: '#b8572d',    // Brand Terracotta Dark
      light: '#94b38a',    // Brand Sage
      dark: '#9e431f',     // Dark Terracotta
    },
    
    // Brown Palette
    brown: {
      dark: '#2A1B14',
      medium: '#4A3A32',
      light: '#6B5D52',
      warm: '#8B6F47',
    },
    
    // Background & Neutral
    background: {
      cream: '#faf7f0',     // Brand Sand Light
      white: '#FFFFFF',
      lightCream: '#FFF9F5',
      warmWhite: '#FEFDFB',
    },
    
    // Accent Colors
    accent: {
      rose: '#d4744a',      // Brand Terracotta
      softPink: '#94b38a',  // Brand Sage
      lightRose: '#f2e7cb',  // Brand Sand
      paleRose: '#faf7f0',   // Brand Sand Light
    },
    
    // Semantic Colors
    text: {
      primary: '#2A1B14',
      secondary: '#4A3A32',
      textTertiary: '#6B5D52',
      muted: '#8B7D72',
    },
    
    // Interactive States
    interactive: {
      hover: '#b8572d',
      active: '#9e431f',
      focus: '#d4744a',
    },
    
    // Shadows (warm tones)
    shadow: {
      sm: 'rgba(212, 116, 74, 0.08)',
      md: 'rgba(212, 116, 74, 0.12)',
      lg: 'rgba(212, 116, 74, 0.16)',
      xl: 'rgba(42, 27, 20, 0.15)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(212, 116, 74, 0.08)',
    md: '0 4px 6px -1px rgba(212, 116, 74, 0.12), 0 2px 4px -1px rgba(212, 116, 74, 0.06)',
    lg: '0 10px 15px -3px rgba(212, 116, 74, 0.16), 0 4px 6px -2px rgba(212, 116, 74, 0.08)',
    xl: '0 20px 25px -5px rgba(42, 27, 20, 0.15), 0 10px 10px -5px rgba(42, 27, 20, 0.08)',
    '2xl': '0 25px 50px -12px rgba(42, 27, 20, 0.25)',
    card: '0 2px 8px rgba(212, 116, 74, 0.1)',
    cardHover: '0 8px 24px rgba(212, 116, 74, 0.18)',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  gradients: {
    goldShimmer: 'linear-gradient(135deg, #d4744a 0%, #94b38a 50%, #d4744a 100%)',
    warmBackground: 'linear-gradient(180deg, #FFFFFF 0%, #faf7f0 100%)',
    roseGold: 'linear-gradient(135deg, #f2e7cb 0%, #d4744a 100%)',
    subtleGlow: 'linear-gradient(180deg, rgba(212, 116, 74, 0.05) 0%, rgba(212, 116, 74, 0) 100%)',
  },
} as const;

export type Theme = typeof theme;
