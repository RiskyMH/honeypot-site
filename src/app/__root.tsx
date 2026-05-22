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
      { title: 'Honeypot - The Discord Bot That Catches Bots' },
      {
        name: 'description',
        content:
          'A Discord bot that automatically catches and removes spam bots by monitoring a dedicated #honeypot channel.',
      },
      {
        name: 'og:site_name',
        content:
          'Honeypot',
      },
      {
        name: 'twitter:creator',
        content: 'RiskyMH5',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:image',
        content:
          'https://honeypot.riskymh.dev/honeypot.png',
      },
    ],
    links: [
      // {
      //   rel: 'stylesheet',
      //   href: appCss,
      // },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href:
          '/honeypot.svg',
      },
      {
        rel: 'apple-touch-icon',
        href: '/honeypot.svg',
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
