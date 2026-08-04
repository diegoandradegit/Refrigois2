/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      // Mesma paleta do site principal, para a landing nao parecer de outra empresa.
      colors: {
        brand: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // A faixa anda metade da propria largura. Como a lista e duplicada,
        // ao chegar em -50% o ponto de partida e identico ao atual, e o
        // recomeco nao aparece: o movimento parece continuo.
        correr: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Luz atravessando o botao, como reflexo passando na porta de vidro de
        // um expositor. Fica parada a maior parte do ciclo e cruza rapido: e o
        // movimento breve que puxa o olho, nao o movimento continuo.
        brilho: {
          '0%, 65%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '85%, 100%': { transform: 'translateX(240%) skewX(-18deg)' },
        },
        // Respiro frio ao redor do botao principal: um halo que abre e some,
        // no azul-gelo da marca.
        halo: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(56, 189, 248, 0.5)' },
          '70%': { boxShadow: '0 0 0 14px rgba(56, 189, 248, 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        correr: 'correr 32s linear infinite',
        brilho: 'brilho 4.5s ease-in-out infinite',
        halo: 'halo 3s ease-out infinite',
      },
    },
  },
  plugins: [],
};
