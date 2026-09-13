/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: '#050608',
        foreground: '#F5F5F5',
        void: '#050608',
        surface: 'rgba(15, 20, 28, 0.55)',
        gold: {
          DEFAULT: '#D89C42',
          hover: '#F3BB54',
          light: '#F3D88A',
          dark: '#9A6B22',
        },
        success: '#45D483',
        danger: '#FF5E6C',
        titanium: '#8D939A',
        playstation: '#0070D1',
        xbox: '#107C10',
        steam: '#6633A6',
        nintendo: '#E60012',
        pc: '#D89C42',
      },
      borderRadius: {
        lg: '28px',
        md: '18px',
        sm: '12px',
        xl: '32px',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        num: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'boot-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scan': 'scan 4s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'boot-in': 'boot-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
