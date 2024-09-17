/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,ts,html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
