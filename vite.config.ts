import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "tech-quiz-editor",
      fileName: "tech-quiz-editor",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          vue: "React",
        },
      },
    },
  },
  plugins: [react(), dts()],
});
