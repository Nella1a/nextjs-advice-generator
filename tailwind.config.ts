import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'light-cyan': '#cee3e9',
      'neon-green': '#52ffa8',
      'dark-blue': '#1f2632',
      'grayish-blue': '#4e5d73',
      'dark-grayish-blue': '	#323a49',
      white: '#fff',
    },
    boxShadow: {
      '3xl': '0 0px 30px 5px rgba(82, 225, 168, 0.5)',
    },
    fontFamily: {
      manrope: ['manrope', 'system-ui'],
    },
  },
  plugins: [],
};
export default config;
