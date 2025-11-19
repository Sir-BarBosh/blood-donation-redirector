import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gluten)', 'var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'countdown-pulse': 'countdown-pulse 1s infinite',
      },
      keyframes: {
        'countdown-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.25)', opacity: '0.2' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      colors: {
        'blood-red': '#D32F2F',
      },
    },
  },
  plugins: [],
}
export default config
