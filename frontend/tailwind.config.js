/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-white': '#f6f6f6',
                'custom-pink': '#FF54BA',
                'custom-blue': '#2F7CE1',
                'custom-green': '#33D69F',
                'custom-green-opacity': '#33D69F30',
                'custom-yellow': '#FF8F00',
                'custom-yellow-opacity': '#FF8F0030'
            }
        }
    },
    plugins: []
};
