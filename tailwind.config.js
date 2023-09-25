/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                star_pattern: "url('/public/background.svg)",
            },
        },
    },
    plugins: [],
};


