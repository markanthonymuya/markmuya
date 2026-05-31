import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: { DEFAULT: '#060610', card: '#0d0d1a', border: 'rgba(255,255,255,0.08)' },
        brand: { DEFAULT: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
        cyan: { DEFAULT: '#06b6d4' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 4s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'ping-slow': 'ping 2s cubic-bezier(0,0,.2,1) infinite',
      },
      keyframes: {
        fadeUp:       { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        blink:        { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float:        { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        gradientShift:{ '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      backgroundSize: { '200%': '200% 200%' },
    },
  },
  plugins: [],
};
export default config;
