import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "tech-quiz-editor",
      fileName: "tech-quiz-editor",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") return "index.css";
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [react(), dts()],
});
