/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['var(--font-heebo)', 'Heebo', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', '"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        canvas: '#0a0b0e',
        section: '#08090b',
        surface: {
          DEFAULT: '#101319',
          raised: '#0d0f13',
          deep: '#0b0d11',
        },
        text: {
          DEFAULT: '#f4f5f8',
          secondary: '#9aa0aa',
          muted: '#8a909a',
          quiet: '#6a6f78',
        },
        accent: {
          DEFAULT: '#4d7dff',
          hover: '#5b88ff',
          light: '#7f9dff',
        },
        success: '#46d19e',
        danger: '#ff8f6b',
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        dark: {
          DEFAULT: '#060b14',
          secondary: '#0d1526',
          card: '#0f1a2e',
          'card-hover': '#132035',
          border: '#1e3a5f',
        },
      },
      maxWidth: {
        site: '1200px',
      },
      screens: {
        desktop: '821px',
      },
      borderRadius: {
        control: '12px',
        panel: '20px',
        feature: '26px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse at top, #1a3a6e 0%, #060b14 60%)',
        'blue-glow': 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'portfolio-marquee': 'portfolioMarquee 34s linear infinite',
        'product-float': 'productFloat 8s ease-in-out infinite',
        'product-float-alt': 'productFloatAlt 6.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        portfolioMarquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        productFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        productFloatAlt: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(9px)' },
        },
      },
      boxShadow: {
        'blue': '0 0 30px rgba(59, 130, 246, 0.3)',
        'blue-lg': '0 0 60px rgba(59, 130, 246, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(59, 130, 246, 0.2)',
        'product': '0 44px 100px -34px rgba(0, 0, 0, 0.9)',
        'accent': '0 14px 44px -14px rgba(77, 125, 255, 0.75)',
      },
    },
  },
  plugins: [],
}
