import daisyUi from "daisyui";
import { defineConfig } from "vite";

export default defineConfig({
  content: ["./frontend/src/**/*.{js,ts,jsx,tsx}"],

  // Configure DaisyUI themes here
  daisyui: {
    themes: ["light", "dark", "dracula"],
  },

  plugins: [daisyUi],
});
