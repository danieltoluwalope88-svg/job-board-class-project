/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        parchment: '#F3EDE2',
        espresso: '#1C1008',
        brown: '#3D2B1F',
        'brown-mid': '#6B4C3B',
        'brown-light': '#A07860',
        terra: '#C4622D',
        'terra-light': '#E8855A',
        'terra-pale': '#FAEADE',
        amber: '#D4922A',
        'amber-light': '#F2BC6A',
        'amber-pale': '#FDF3DF',
        sage: '#5C7A62',
        'sage-pale': '#EBF2EC',
        sand: '#C8B49A',
        'sand-light': '#E0D4C4',
      },
    },
  },
  plugins: [],
}