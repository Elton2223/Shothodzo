/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shothodzo-purple': {
          DEFAULT: '#6B46C1',
          dark: '#553C9A',
          light: '#8B5CF6',
        },
        'shothodzo-green': {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
      },
    },
  },
  plugins: [],
}

