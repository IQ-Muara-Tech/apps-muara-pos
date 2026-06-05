import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './components/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf9f9',
          100: '#d0f0f0',
          200: '#a3e1e1',
          300: '#6bcaca',
          400: '#3aafad',
          500: '#1e9594',
          600: '#109594',
          700: '#0e7473',
          800: '#0d5c5b',
          900: '#0b4b4a',
          950: '#062c2c'
        }
      },
      maxWidth: {
        'mobile': '28rem'
      }
    }
  },
  plugins: []
}
