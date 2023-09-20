/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgWhole:'#111111',
        bgPrimary:'',
        bgSecondary:'#9BFF00',
        bgTertiary:'#696969',
        bgTertiary2:'#1D1D1D',
        textPrimary:'#FFFFFF',
        textSecondary:'#050505',
        greentick:'#2DE100',
      }
    }
  },
  plugins: [],
}
