import { defineConfig, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Inter",
      },
    }),
  ],
  shortcuts: {
    section: "h-[calc(100vh-4rem)]",
  },
  preflights: [
    {
      getCSS: () => `
            * {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 0;
            }
          `,
    },
  ],
});
