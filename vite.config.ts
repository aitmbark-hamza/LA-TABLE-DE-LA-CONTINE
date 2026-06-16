import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/start/plugin";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tanstackStart({
      tsr: {
        autoCodeSplitting: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
