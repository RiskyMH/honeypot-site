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

const title = 'Honeypot - The Discord Bot That Catches Bots'
const description = 'A Discord bot that automatically catches and removes spam bots by monitoring a dedicated #honeypot channel.'
const url = 'https://honeypot.riskymh.dev/'


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
    ...buildHead({ title, description, url }),
    links: [
      ...buildHead({ title, description, url }).links,
      { rel: 'preconnect', href: 'https://honeypot-stats.riskymh.dev', crossOrigin: "" },
      // { rel: 'preconnect', href: 'https://honeypot-stats.riskymh.dev/ws', crossOrigin: "" },
      // { rel: 'preconnect', href: 'wss://honeypot-stats.riskymh.dev/ws', crossOrigin: "" }
    ],
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
