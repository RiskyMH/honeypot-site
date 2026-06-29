import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
// import appCss from '../../app/globals.css?url'
import '../globals.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Honeypot: The Discord Bot That Catches Bots' },
      {
        name: 'description',
        content:
          'A Discord bot that automatically catches and removes spam bots by monitoring a dedicated #honeypot channel.',
      },
      { property: 'og:site_name', content: 'Honeypot' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:creator', content: 'RiskyMH5' },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:image',
        content:
          'https://honeypot.riskymh.dev/honeypot.png',
      },
      { property: 'og:image', content: 'https://honeypot.riskymh.dev/honeypot.png' },
      { name: 'application-name', content: 'Honeypot' },
    ],
    links: [
      // {
      //   rel: 'stylesheet',
      //   href: appCss,
      // },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
        sizes: "265x265"
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/honeypot.png',
        sizes: "265x265"
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/honeypot.svg',
        sizes: "any"
      },
      {
        rel: 'apple-touch-icon',
        href: '/honeypot.png',
        sizes: "265x265"
      },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  // TODO: Set up Tailwind/Fontsource for custom fonts; next/font is not supported in TanStack Start.
  return (
    <html lang="en" className="bg-background">
      <head>
        <HeadContent />
      </head>
      <body className={"font-sans antialiased bg-background"}>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
