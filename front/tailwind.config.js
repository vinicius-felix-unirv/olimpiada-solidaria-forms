/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Cores exatas do Figma InfoMed
        'primary-blue': '#004F9E',      // Azul principal header
        'button-blue': '#0254EB',       // Azul botão
        'element-blue': '#3576EF',      // Azul elementos (dropdown, checkbox)
        'light-blue': '#A9C2F0',       // Azul claro (círculo ícone)
        'very-light-blue': '#EFF4FC',  // Azul muito claro
        'light-gray': '#F4F4F4',       // Cinza claro
        'medium-gray': '#D9D9D9',      // Cinza médio footer
        'success-green': '#329A24',     // Verde footer

        // Backgrounds com transparência
        'input-bg': 'rgba(217, 217, 217, 0.3)',
        'terms-bg': 'rgba(217, 217, 217, 0.35)',
        'icon-circle-bg': 'rgba(169, 194, 240, 0.5)',
        'text-gray': 'rgba(0, 0, 0, 0.5)',
      },
      height: {
        '15': '60px',   // Header logos
        '18': '72px',   // Header logos aumentado
        '35': '140px',  // Header InfoMed
        '14': '56px',   // Inputs e botão
        '12.5': '50px', // Footer
        '6': '24px',    // Logo Fasoft
        '7': '28px',    // Logo Medicina
        '8': '32px',    // Logo Fasoft aumentado
        '9': '36px',    // Logo Medicina aumentado
        '10': '40px',   // Logo UniRV
        '12': '48px',   // Logo UniRV aumentado
      },
      width: {
        '15': '60px',   // Header logos
        '18': '72px',   // Header logos aumentado
        '20': '80px',   // Logo UniRV
        '24': '96px',   // Logo UniRV aumentado
      },
      fontSize: {
        '2xl': '24px',  // InfoMed title
        '3xl': '28px',  // Cadastro Médico
      },
    },
  },
  plugins: [],
}