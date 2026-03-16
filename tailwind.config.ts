import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // StaffCo Design System - Exact Figma colors
        primary: {
          blue: '#0C62F9',
        },
        text: {
          primary: '#23262F',
          secondary: '#7A7A7E',
          white: '#FFFFFF',
        },
        icon: {
          tertiary: '#C5C5C5',
        },
        bg: {
          primary: '#FEFEFE',
          secondary: '#FFFFFF',
          tertiary: '#F4F5F6',
          ice: '#F2F9FF',
          mint: '#F3FFF2',
          blush: '#FFF6F5',
          linen: '#FFF9F2',
        },
        border: {
          default: '#E0E0E0',
          divider: '#F4F5F6',
          card: '#EFF2F4',
        },
        success: {
          green: '#22C55E',
          text: '#65C366',
        },
        danger: {
          red: '#F86060',
        },
        warning: {
          amber: '#FFC53D',
          text: '#F29937',
        },
        brand: {
          violet: '#7C3AED',
        },
        // Sidebar menu icon backgrounds
        menu: {
          dashboard: '#4074E7',
          time: '#6E56CF',
          projects: '#0091FF',
          reporting: '#11A594',
          people: '#FFC53D',
          settings: '#F76809',
          logs: '#E93D81',
        },
        // KPI icon backgrounds
        kpi: {
          'clock-bg': 'rgba(31, 113, 247, 0.1)',
          'purple-bg': 'rgba(139, 92, 246, 0.16)',
          'orange-bg': 'rgba(250, 162, 90, 0.1)',
          'red-bg': 'rgba(239, 68, 68, 0.16)',
          'teal-bg': 'rgba(6, 182, 212, 0.1)',
          'pink-bg': 'rgba(236, 72, 153, 0.1)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 4px 6px -4px rgba(24, 39, 75, 0.12)',
        'icon-square': '0px 2px 4px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        card: '8px',
        element: '6px',
        'icon-square': '6px',
        'icon-container': '10px',
      },
      backgroundImage: {
        'ai-gradient': 'linear-gradient(135deg, #0C62F9, #7C3AED)',
      },
      animation: {
        'accordion': 'accordion 200ms ease',
      },
      keyframes: {
        accordion: {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: 'auto', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
