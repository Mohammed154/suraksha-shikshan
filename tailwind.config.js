/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:   '#1A3C6E',
        turmeric: '#D97706',
        danger: '#DC2626',
        safe:   '#16A34A',
        cream:  '#FAFAF7',
        slate: {
          DEFAULT: '#1E293B',
          50: '#f8fafc',
          100: '#f1f5f9',
          150: '#e8edf2',
          200: '#e2e8f0',
          250: '#d7dfeb',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#151e2e',
          880: '#111827',
          900: '#0f172a',
        },
        'brand-navy': '#131b2e',
        'brand-orange': '#fd761a',
        'brand-orange-dark': '#9d4300',
        'brand-bg': '#f7f9fb',
      },
      fontFamily: {
        gujarati: ['"Noto Sans Gujarati"', 'sans-serif'],
        body:     ['Roboto', 'sans-serif'],
      },
      fontSize: {
        // Accessibility: minimum 20px body
        'base-acc': ['20px', '1.6'],
        'lg-acc':   ['22px', '1.6'],
        'xl-acc':   ['26px', '1.4'],
        'hero':     ['34px', '1.2'],
      },
      minHeight: { tap: '48px' },
      minWidth:  { tap: '48px' },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
      }
    },
  },
  plugins: [],
};
