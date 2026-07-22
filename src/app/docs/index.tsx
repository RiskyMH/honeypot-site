import DocsPage from '@/components/docs/page'
import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'

const title = 'Documentation - Honeypot'
const description = 'Official documentation for the Honeypot Discord bot, including setup guides, configuration options, and best practices.'
const url = `${APP_URL}/docs`

export const Route = createFileRoute('/docs/')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsPage />
  </DocsLayout>
}
