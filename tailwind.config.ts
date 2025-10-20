module.exports = {
  theme: {
    extend: {
      animation: {
        'vertical-wipe': 'verticalWipe 1.2s ease-in-out forwards',
        'text-in': 'text-in 0.8s ease-in-out',
      },
      keyframes: {
        'text-in': {
          '0%': { transform: 'translateY(1.25rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'distortion': {
          '0%': { 
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            filter: 'url(#turbulence)'
          },
          '100%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            filter: 'none'
          }
        }
      }
    }
  }
}
