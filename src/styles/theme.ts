/**
 * Clave de Sales - Design System
 * Sistema de design centralizado com tokens, cores, tipografia e espaçamentos
 */

export const theme = {
  // Cores principais da plataforma
  colors: {
    // Cores de marca
    brand: {
      purple: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
      },
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
      },
    },

    // Cores de gamificação
    gamification: {
      fans: {
        light: '#f472b6',
        main: '#ec4899',
        dark: '#db2777',
        gradient: 'from-purple-500 to-pink-500',
      },
      streak: {
        light: '#fb923c',
        main: '#f97316',
        dark: '#ea580c',
        gradient: 'from-orange-500 to-red-500',
      },
      level: {
        shower: { color: 'from-gray-400 to-gray-500', icon: '🚿' },
        garage: { color: 'from-indigo-500 to-indigo-600', icon: '🏠' },
        underground: { color: 'from-purple-500 to-purple-600', icon: '🎸' },
        indie: { color: 'from-pink-500 to-pink-600', icon: '🎤' },
        risingStar: { color: 'from-orange-500 to-yellow-500', icon: '⭐' },
        headliner: { color: 'from-yellow-500 to-yellow-600', icon: '🌟' },
        mainStage: { color: 'from-yellow-400 to-yellow-500', icon: '👑' },
      },
      achievement: {
        bronze: 'from-orange-700 to-orange-800',
        silver: 'from-gray-400 to-gray-500',
        gold: 'from-yellow-400 to-yellow-500',
        platinum: 'from-purple-400 to-purple-600',
      },
    },

    // Cores de status
    status: {
      success: {
        light: '#86efac',
        main: '#22c55e',
        dark: '#16a34a',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
        text: 'text-green-400',
      },
      warning: {
        light: '#fde047',
        main: '#eab308',
        dark: '#ca8a04',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
      },
      error: {
        light: '#fca5a5',
        main: '#ef4444',
        dark: '#dc2626',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        text: 'text-red-400',
      },
      info: {
        light: '#93c5fd',
        main: '#3b82f6',
        dark: '#2563eb',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
      },
    },

    // Cores de background
    background: {
      primary: 'from-purple-900/95 via-indigo-900/95 to-purple-900/95',
      secondary: 'from-indigo-900 via-purple-900 to-pink-900',
      dark: 'from-gray-900 via-purple-900 to-gray-900',
      glass: 'bg-white/5 backdrop-blur-lg',
      glassHover: 'bg-white/10 backdrop-blur-lg',
    },
  },

  // Tipografia
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Espaçamentos
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Bordas
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Sombras
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: {
      purple: 'shadow-lg shadow-purple-500/20',
      pink: 'shadow-lg shadow-pink-500/20',
      blue: 'shadow-lg shadow-blue-500/20',
      green: 'shadow-lg shadow-green-500/20',
    },
  },

  // Transições
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    dropdown: 10,
    modal: 20,
    popover: 30,
    toast: 40,
    tooltip: 50,
  },
} as const;

// Utilitários de classe Tailwind reutilizáveis
export const classNames = {
  // Cards
  card: {
    base: 'bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10',
    hover: 'hover:bg-white/10 hover:border-white/20 transition-all',
    interactive: 'cursor-pointer hover:scale-105 transition-transform',
  },

  // Botões
  button: {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30',
    secondary: 'bg-white/10 backdrop-blur-lg text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20',
    outline: 'border-2 border-purple-500 text-purple-300 py-3 px-6 rounded-lg font-semibold hover:bg-purple-500/20 transition-all',
    ghost: 'text-purple-300 py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-all',
    icon: 'p-2 hover:bg-white/10 rounded-lg transition-colors',
  },

  // Badges
  badge: {
    default: 'px-3 py-1 rounded-full text-xs font-semibold',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-300 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  },

  // Inputs
  input: {
    base: 'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all',
    error: 'border-red-500/50 focus:ring-red-500',
  },

  // Textos
  text: {
    title: 'text-3xl font-bold text-white',
    subtitle: 'text-xl font-semibold text-white',
    body: 'text-base text-purple-200',
    caption: 'text-sm text-purple-300',
    label: 'text-xs text-purple-400 uppercase tracking-wider',
  },

  // Gradientes
  gradient: {
    purple: 'bg-gradient-to-r from-purple-600 to-pink-600',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    green: 'bg-gradient-to-r from-green-600 to-emerald-600',
    orange: 'bg-gradient-to-r from-orange-600 to-red-600',
  },
};

export type Theme = typeof theme;
export type ClassNames = typeof classNames;
