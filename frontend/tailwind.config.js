/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-white': '#f6f6f6',
                'custom-pink': '#FF54BA',
                'custom-blue': '#2F7CE1'
            }
        }
    },
    plugins: []
};
