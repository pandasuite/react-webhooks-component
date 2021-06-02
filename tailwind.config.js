module.exports = {
  presets: [
    require('pandasuite-bridge-react/tailwind.config'),
  ],
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        'ping-single': 'ping 300ms cubic-bezier(0, 0, 0.2, 1) 1',
      },
    },
  },
};
