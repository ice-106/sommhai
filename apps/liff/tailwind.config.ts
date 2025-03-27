import sharedConfig from '@sommhai/tailwind-config';
import type { Config } from 'tailwindcss';

<<<<<<< HEAD
const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        // Base: Orange variations
        orange: {
          1: '#F48200',
          2: '#FF9D00',
          3: '#F6BB0A',
          4: '#F9D342',
          5: '#FBE551',
          6: '#FDE88D',
          '2-hover': '#FFB94C',
          '3-hover': '#F8CF52',
        },
        // General: Neutral colors
        white: {
          pure: '#ffffff',
          bg: '#FCFAF8',
        },
        grey: {
          light: '#d9d9d9',
          medium: '#AEAEAE',
          dark: '#575757',
        },
        black: {
          pure: '#000000',
        },
        // Status: Semantic colors
        status: {
          green: '#2ECC71',
          red: '#E74C3C',
          gold: '#D4A017',
          silver: '#A6A9AA',
          bronze: '#AD6E2A',
        },
        // Chart: Visualization colors
        chart: {
          blue: '#4DA6FF',
          green: '#00A38D',
          purple: '#A066FF',
          red: '#D93240',
        },
        // Other
        placeholder: '#FF00FF',
      },

      // Box Shadow configurations
      boxShadow: {
        sm: '0px 1px 2px 0px rgba(30,41,59,0.05)',
        shadow: '0px 1px 2px 0px rgba(30,41,59,0.06), 0px 1px 3px 0px rgba(30,41,59,0.10)',
        md: '0px 4px 6px -1px rgba(30,41,59,0.10), 0px 2px 4px -1px rgba(30,41,59,0.06)',
        lg: '0px 10px 15px -3px rgba(30,41,59,0.10), 0px 4px 6px -2px rgba(30,41,59,0.05)',
        xl: '0px 20px 25px -5px rgba(30,41,59,0.10), 0px 10px 10px -5px rgba(30,41,59,0.04)',
        '2xl': '0px 25px 50px -12px rgba(30,41,59,0.25)',
        inner: 'inset 0px 2px 4px 0px rgba(30,41,59,0.06)',
        'focused-primary': '0px 0px 0px 4px rgba(140,4,14,0.20)',
        'focused-secondary': '0px 0px 0px 4px rgba(148,163,184,0.20)',
      },

      // Spacing
      spacing: {
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '14': '14px', // 0.875rem
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px', // 1.75rem
        '32': '32px',
        '36': '36px', // 2.25rem
        '40': '40px',
        '44': '44px', // 2.75rem
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '80': '80px',
      },

      // Typography configurations
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        // Custom typography system
        'bold-40': ['40px', { lineHeight: '56px', fontWeight: '700' }],
        'bold-26': ['26px', { lineHeight: '38px', fontWeight: '700' }],
        'bold-24': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'semi-24': ['32px', { lineHeight: '44px', fontWeight: '600' }],
        'medium-24': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'semi-20': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'medium-20': ['20px', { lineHeight: '30px', fontWeight: '500' }],
        'semi-18': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'medium-18': ['18px', { lineHeight: '26px', fontWeight: '500' }],
        'medium-16': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'regular-16': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'regular-14': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'regular-12': ['12px', { lineHeight: '18px', fontWeight: '400' }],

        // Keep the standard sizes for compatibility
        xs: ['12px', { lineHeight: '18px' }],
        sm: ['14px', { lineHeight: '22px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '26px' }],
        xl: ['20px', { lineHeight: '30px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '44px' }],
        '4xl': ['40px', { lineHeight: '56px' }],
      },

      borderRadius: {
        '12': '12px',
        '24': '24px',
=======
const config: Pick<Config, 'content' | 'presets'> = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [require('tailwindcss-animate')],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
>>>>>>> 1b8d0e7 (fix: update)
      },
    },
  },
};

export default config;
