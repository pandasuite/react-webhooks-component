const kitPreset = require('pandasuite-bridge-react/tailwind.config');

module.exports = {
  presets: [kitPreset],
  // Tailwind 2 purges from `purge`; the kit's preset lists its paths under `content`
  purge: kitPreset.content,
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('pandasuite-bridge/studio-theme'),
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
