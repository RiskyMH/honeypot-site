import { Await, createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components/header'
import { Hero } from '../../components/hero'
import { StatsBar } from '../../components/stats-bar'
import { Features } from '../../components/features'
import { HowItWorks } from '../../components/how-it-works'
import { FAQ, faqs } from '../../components/faq'
import { LiveStats } from '../../components/live-stats'
import { Footer } from '../../components/footer'
import { StatsProvider } from '../../components/stats-context'
import { buildHead } from '@/lib/utils'
import { DISCORD_BOT_INVITE_URL, DISCORD_APP_DIRECTORY_URL, DISCORD_BOT_CLIENT_ID, GITHUB_REPO_URL, GITHUB_PROFILE_URL, OWNER_URL, APP_URL, DISCORD_SERVER_URL, STATS_URL } from '@/lib/constants'



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
const url = APP_URL

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
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
    ],
    links: [
      ...head.links,
      { rel: 'preconnect', href: STATS_URL, crossOrigin: "" },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${APP_URL}/#website`,
              url: `${APP_URL}/`,
              name: "Honeypot",
              alternateName: ["Honeypot Bot", "Honeypot Discord Bot"],
              description: description,
              inLanguage: "en-US",
              publisher: {
                "@id": `${APP_URL}/#organization`
              },
              mainEntity: {
                "@id": `${APP_URL}/#app`
              }
            },
            {
              "@type": "Organization",
              "@id": `${APP_URL}/#organization`,
              name: "RiskyMH",
              url: OWNER_URL,
              logo: {
                "@type": "ImageObject",
                url: `${OWNER_URL}/fire_anim.png`
              },
              sameAs: [
                GITHUB_PROFILE_URL,
              ],
              contactPoint: {
                "@type": "ContactPoint",
                url: DISCORD_SERVER_URL,
                contactType: "technical support",
                availableLanguage: "en"
              }
            },
            {
              "@type": "SoftwareApplication",
              "@id": `${APP_URL}/#app`,
              name: "Honeypot",
              url: `${APP_URL}/`,
              description: description,
              applicationCategory: "SecurityApplication",
              operatingSystem: "Discord",
              inLanguage: "en-US",
              mainEntityOfPage: `${APP_URL}/`,
              image: `${APP_URL}/honeypot.png`,
              offers: {
                "@type": "Offer",
                price: "0.00",
                priceCurrency: "USD"
              },
              publisher: {
                "@id": `${APP_URL}/#organization`
              },
              potentialAction: {
                "@type": "ViewAction",
                target: DISCORD_BOT_INVITE_URL
              },
              sameAs: [
                GITHUB_REPO_URL,
                DISCORD_APP_DIRECTORY_URL,
                `https://top.gg/bot/${DISCORD_BOT_CLIENT_ID}`
              ]
            },
            {
              "@type": "FAQPage",
              "@id": `${APP_URL}/#faq`,
              isPartOf: {
                "@id": `${APP_URL}/#website`
              },
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
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
