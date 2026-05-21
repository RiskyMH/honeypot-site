import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { cloudflare } from "@cloudflare/vite-plugin";


// const isPreviewCommand = process.argv.includes('preview')

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    // Enables Vite to resolve imports using path aliases.
    // For Bun+TypeScript, tsconfig.json paths should be respected by default for src/*
    tsconfigPaths: true,
  },
  preview: {
    allowedHosts: [".trycloudflare.com"],
    host: true,
  },
  plugins: [
    tailwindcss(),
    process.env.NODE_ENV === 'production' && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      srcDirectory: 'src', // This is the default
      prerender: {
        enabled: true,
        // routes: [
        //   // '/',
        //   '/docs',
        //   '/docs/*',
        // ],
        crawlLinks: true,
        // filter: ({ path }) => path !== "/",
        autoSubfolderIndex: false,
      },
      router: {
        // Use the same directory structure as Next.js app router
        routesDirectory: 'app', // Defaults to "routes", relative to srcDirectory
      },
    }),
    viteReact(),
    // i set this env var in cf pages builder
    !process.env.BUN_VERSION && nitro({ preset: "node" }),
  ],
})
