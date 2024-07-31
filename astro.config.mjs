import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import partytown from '@astrojs/partytown';
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://locu-blog.com',
  integrations: [tailwind(), partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      forward: ["dataLayer.push"]
    }
  }), sitemap()]
  // vite: {
  //   plugins: [vanillaExtractPlugin()]
  // }
  ,

  output: "hybrid",
  adapter: vercel()
});