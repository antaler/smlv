/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C95021',
        primary: '#41405F',
        second: '#CFC8BE'
      },
      fontFamily: {
        geist: ['Geist', 'system-ui']
      }
    }
  },
  plugins: []
}
