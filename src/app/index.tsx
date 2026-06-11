import { Await, createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components/header'
import { Hero } from '../../components/hero'
import { StatsBar } from '../../components/stats-bar'
import { Features } from '../../components/features'
import { HowItWorks } from '../../components/how-it-works'
import { FAQ } from '../../components/faq'
import { LiveStats } from '../../components/live-stats'
import { Footer } from '../../components/footer'
import { StatsProvider } from '../../components/stats-context'
import { buildHead } from '@/lib/utils'



function cache(key: string, fetcher: () => Promise<any>, ttl = 600) {
  const now = Date.now()
  const cached = globalThis.__CACHE__?.[key]
  if (cached && now - cached.timestamp < ttl * 1000) {
    // return cached.value
  }
  const value = fetcher()
  globalThis.__CACHE__ = {
    ...globalThis.__CACHE__,
    [key]: { value, timestamp: now },
  }
  return value
}

const title = 'Honeypot: The Discord Bot That Catches Bots'
const description = 'A Discord bot that automatically catches and removes spam bots by monitoring a dedicated #honeypot channel.'
const url = 'https://honeypot.riskymh.dev/'

const head = buildHead({ title, description, url })

export const Route = createFileRoute('/')({
  // loader: async () => {
  //   const stats = async () => {
  //     const fetcher = () => fetch('https://honeypot-stats.riskymh.dev', { cf: { cacheTtl: 60, cacheEverything: true } }).then((res) => res.json())
  //     const stats = process.env.NODE_ENV === 'production'
  //       ? await fetcher()
  //       : await cache('stats', fetcher, 60)
  //     return stats
  //   }
  //   // return { stats: await stats() }
  //   return { stats: stats() }
  // },
  // headers: () => ({
  //   // Cache at CDN for 1m, allow stale content for up to 24hr
  //   'Cache-Control':
  //     'public, max-age=60, s-maxage=60, stale-while-revalidate=86400',
  //   'CDN-Cache-Control': 'max-age=60, stale-while-revalidate=86400',
  // }),
  head: () => ({
    meta: [
      ...head.meta,
      { name: 'og:type', content: 'website' },
      { name: 'keywords', content: 'discord bot, spam protection, anti-spam, moderation bot, honeypot' },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      ...head.links,
      { rel: 'preconnect', href: 'https://honeypot-stats.riskymh.dev', crossOrigin: "" },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://honeypot.riskymh.dev/#website",
              url: "https://honeypot.riskymh.dev/",
              name: "Honeypot",
              alternateName: ["Honeypot Bot"],
              description: description,
              inLanguage: "en-US",
              publisher: {
                "@id": "https://honeypot.riskymh.dev/#organization"
              },
            },
            {
              "@type": "Organization",
              "@id": "https://honeypot.riskymh.dev/#organization",
              name: "RiskyMH",
              url: "https://riskymh.dev",
              logo: {
                "@type": "ImageObject",
                url: "https://riskymh.dev/fire_anim.png"
              },
              sameAs: [
                "https://github.com/RiskyMH",
              ]
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://honeypot.riskymh.dev/#app",
              name: "Honeypot",
              url: "https://honeypot.riskymh.dev/",
              description: description,
              applicationCategory: "SecurityApplication",
              operatingSystem: "Discord",
              inLanguage: "en-US",
              mainEntityOfPage: "https://honeypot.riskymh.dev/",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              publisher: {
                "@id": "https://honeypot.riskymh.dev/#organization"
              },
              potentialAction: {
                "@type": "ViewAction",
                target:
                  "https://discord.com/oauth2/authorize?client_id=1450060292716494940"
              },
              sameAs: [
                "https://github.com/RiskyMH/honeypot",
                "https://discord.com/discovery/applications/1450060292716494940"
              ]
            }
          ]
        }),
      }
    ]
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StatsProvider>
          <Hero />
          <StatsBar />
          <Features />
          <HowItWorks />
          <FAQ />
          <LiveStats />
        </StatsProvider>
      </main>
      <Footer />
    </div>
  )

  // const { stats } = Route.useLoaderData()
  // const body = (
  //   <div className="min-h-screen bg-background">
  //     <Header />
  //     <main>
  //       <Hero />
  //       <StatsBar />
  //       <Features />
  //       <HowItWorks />
  //       <FAQ />
  //       <LiveStats />
  //     </main>
  //     <Footer />
  //   </div>
  // )
  // return (
  //   <Await promise={stats} fallback={
  //     <StatsProvider>
  //       {body}
  //     </StatsProvider>
  //   }>
  //     {(stats) => <StatsProvider initialStats={stats}>
  //       {body}
  //     </StatsProvider>}
  //   </Await>
  // )
}
