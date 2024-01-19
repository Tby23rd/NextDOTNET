import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          DEFAULT: '#27388e',
          '75': '#5769b2',
          '50': '#889aab',
          '25': '#bacbcc'
        },
        'primary-pink': {
          DEFAULT: '#c03d96',
          '100': '#C13E96',
          '75': '#d168b1',
          '50': '#e394cd',
          '25': '#f5bfec'
        },
        'primary-cyan': {
          DEFAULT: '#38c6f4',
          '75': '#6ed1f7',
          '50': '#a4dcfa',
          '25': '#d9e8fd'
        }
      },
      fontFamily: {
        'avenir-black': ['Avenir Black', 'sans-serif'],
        'avenir-heavy': ['Avenir Heavy', 'sans-serif'],
        'visby': ['Visby CF Regular', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
