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
    btn: "border-none text-white px-4 py-2 rounded-md bg-indigo-700 cursor-pointer outline-none",
    input:
      "bg-zinc-900 text-white p-2 outline-inset border-none w-full outline-none rd-sm focus-within:(bg-zinc-800)",
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
