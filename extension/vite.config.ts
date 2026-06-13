import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup/popup.html",
        content: "src/content/content.ts",
        background: "src/background/background.ts"
      },

      output: {
        entryFileNames: "[name].js"
      }
    }
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: "."
        }
      ]
    })
  ]
});