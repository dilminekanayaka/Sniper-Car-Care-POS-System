/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        }
      },
      backgroundImage: {
        'hero-grid': "radial-gradient(circle at top left, rgba(79, 70, 229, 0.15), transparent 55%), radial-gradient(circle at top right, rgba(129, 140, 248, 0.15), transparent 60%), radial-gradient(circle at bottom, rgba(56, 189, 248, 0.18), transparent 65%)",
        'section-glow': 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(59, 130, 246, 0.05) 38%, rgba(129, 140, 248, 0.08) 100%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        fadeUp: 'fadeUp 0.9s ease-out forwards',
        pulseGlow: 'pulseGlow 3.6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

