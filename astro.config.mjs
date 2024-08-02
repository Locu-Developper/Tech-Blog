import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import partytown from '@astrojs/partytown';
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

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

  output: "server",
  adapter: node({
    mode: "standalone"
  })
});