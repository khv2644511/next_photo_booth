import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    // make sure it's pointing to the ROOT node_module
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'panda-img': 'url(./assets/panda.png)',
        'ship-img': 'url(./assets/ship.png)',
        'elephant-img': 'url(./assets/elephant.png)',
        'pig-img': 'url(./assets/pig.png)',
        'flower-frame': 'url(./assets/flowerFrame.png)',
        'profile-frame': 'url(./assets/profile.png)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'), nextui()],
};
export default config;
