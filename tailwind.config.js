/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
      animation: {
        'product-float': 'productFloat 8s ease-in-out infinite',
        'product-float-alt': 'productFloatAlt 6.5s ease-in-out infinite',
      },
      keyframes: {
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
        'product': '0 44px 100px -34px rgba(0, 0, 0, 0.9)',
        'accent': '0 14px 44px -14px rgba(77, 125, 255, 0.75)',
      },
    },
  },
  plugins: [],
}
