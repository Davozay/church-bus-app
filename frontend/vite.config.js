import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    historyApiFallback: true
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsx: "automatic",
  },
});
