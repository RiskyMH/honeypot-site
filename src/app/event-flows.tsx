import { createFileRoute } from '@tanstack/react-router'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'
import EventDiagramsPage from '@/components/flow/event-diagram'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const title = 'Event Flows - Honeypot'
const description = 'Visualize the event flows of the Honeypot Discord bot, including how it detects and handles spam bots in Discord servers.'
const url = `${APP_URL}/event-flows`

export const Route = createFileRoute('/event-flows')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'website' }),
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <EventDiagramsPage />
      </main>
      <Footer />
    </div>
  )
}