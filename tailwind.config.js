/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark-first palette — navy background, emerald accent.
        ink: '#0B1220', // deep navy (page background)
        navy: '#111827', // navy (cards / surfaces)
        'navy-light': '#1A2434', // raised surfaces
        paper: '#F8FAFC', // near-white text
        muted: '#94A3B8', // muted body text
        accent: {
          DEFAULT: '#34D399',
          light: '#6EE7B7',
          dark: '#10B981',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 20px 44px -18px rgba(0, 0, 0, 0.62)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(74, 222, 128, 0.5)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 5px rgba(74, 222, 128, 0)' },
        },
      },
    },
  },
  plugins: [],
}
