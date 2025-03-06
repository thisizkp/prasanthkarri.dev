import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite"

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://prasanthkarri.dev",
  vite: {
    plugins: [tailwindcss()]
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
