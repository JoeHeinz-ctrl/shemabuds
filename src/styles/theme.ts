/**
 * Shemabuds Premium Brand Theme
 * Luxury handcrafted aesthetic with warm, elegant tones
 */

export const theme = {
  colors: {
    // Primary Gold Palette
    gold: {
      primary: '#A67C52',
      hover: '#8B6B3E',
      light: '#C4956F',
      dark: '#7A5A3C',
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
      cream: '#FAF7F2',
      white: '#FFFFFF',
      lightCream: '#FFF9F5',
      warmWhite: '#FEFDFB',
    },
    
    // Accent Colors
    accent: {
      rose: '#D8B4A0',
      softPink: '#E8C4B4',
      lightRose: '#F3D7CA',
      paleRose: '#F8E8E0',
    },
    
    // Semantic Colors
    text: {
      primary: '#2A1B14',
      secondary: '#4A3A32',
      tertiary: '#6B5D52',
      muted: '#8B7D72',
    },
    
    // Interactive States
    interactive: {
      hover: '#8B6B3E',
      active: '#7A5A3C',
      focus: '#A67C52',
    },
    
    // Shadows (warm tones)
    shadow: {
      sm: 'rgba(166, 124, 82, 0.08)',
      md: 'rgba(166, 124, 82, 0.12)',
      lg: 'rgba(166, 124, 82, 0.16)',
      xl: 'rgba(42, 27, 20, 0.15)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(166, 124, 82, 0.08)',
    md: '0 4px 6px -1px rgba(166, 124, 82, 0.12), 0 2px 4px -1px rgba(166, 124, 82, 0.06)',
    lg: '0 10px 15px -3px rgba(166, 124, 82, 0.16), 0 4px 6px -2px rgba(166, 124, 82, 0.08)',
    xl: '0 20px 25px -5px rgba(42, 27, 20, 0.15), 0 10px 10px -5px rgba(42, 27, 20, 0.08)',
    '2xl': '0 25px 50px -12px rgba(42, 27, 20, 0.25)',
    card: '0 2px 8px rgba(166, 124, 82, 0.1)',
    cardHover: '0 8px 24px rgba(166, 124, 82, 0.18)',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  gradients: {
    goldShimmer: 'linear-gradient(135deg, #A67C52 0%, #C4956F 50%, #A67C52 100%)',
    warmBackground: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)',
    roseGold: 'linear-gradient(135deg, #D8B4A0 0%, #A67C52 100%)',
    subtleGlow: 'linear-gradient(180deg, rgba(166, 124, 82, 0.05) 0%, rgba(166, 124, 82, 0) 100%)',
  },
} as const;

export type Theme = typeof theme;
