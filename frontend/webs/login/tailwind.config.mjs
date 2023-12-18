/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#C95021',
        primary: '#41405F',
        second: '#CFC8BE'
      },
      fontFamily: {
        sans: ['Geist', 'system-ui']
      }
    }
  },
  plugins: []
}
