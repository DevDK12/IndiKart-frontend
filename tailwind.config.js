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
          100: 'rgb(var(--color-primary-light) / <alpha-value>)',
          200: 'rgb(var(--color-primary-main) / <alpha-value>)',
          300: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          txt: 'rgb(var(--color-primary-text) / <alpha-value>)',
        },
        secondary: {
          100: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-main) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
          txt: 'rgb(var(--color-secondary-text) / <alpha-value>)',
        },
        accent: {
          100: 'rgb(var(--color-accent-light) / <alpha-value>)',
          200: 'rgb(var(--color-accent-main) / <alpha-value>)',
          300: 'rgb(var(--color-accent-dark) / <alpha-value>)',
          txt: 'rgb(var(--color-accent-text) / <alpha-value>)',
        },
        error: {
          100: '#e57373',
          200: '#f44336',
          300: '#d32f2f',
          txt: '#fff',
        },
        warning: {
          100: '##ffb74d',
          200: '#ffa726',
          300: '#f57c00',
          txt: '#fff',
        },
        info: {
          100: '#4fc3f7',
          200: '#29b6f6',
          300: '#0288d1',
          txt: '#fff',
        },
        success: {
          100: '#81c784',
          200: '#66bb6a',
          300: '#388e3c',
          txt: '#fff',
        },
      },
      fontFamily: {
        'sans': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Times', 'Times New Roman', 'serif'],
      },
      screens: {
        'xs': '400px',
      },

      container: {
        center: true,
        // padding: {
        //   DEFAULT: '1rem',
        //   xs: '4rem',
        //   sm: '2rem',
        //   lg: '4rem',
        //   xl: '5rem',
        //   '2xl': '6rem',
        // },
      },
    },
  },
  plugins: [],
}