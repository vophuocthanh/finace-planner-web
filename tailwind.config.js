const defaultTheme = require('tailwindcss/defaultTheme')

const colors = require('tailwindcss/colors')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        primary: '#635BFF',
        secondary: '#CDEAE1',
        grayDarkest: '#131316',
        grayDarker: '#212126',
        grayDark: '#9394A1',
        redCustom: '#FF8682'
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1'
          },
          '20%,50%': {
            opacity: '0'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-4rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-4rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-down': 'fade-down 1s ease-out',
        'fade-up': 'fade-up 2s ease-out',
        'fade-right': 'fade-right 1s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors]
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars
  })
}
