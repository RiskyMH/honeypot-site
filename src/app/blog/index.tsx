import { createFileRoute } from '@tanstack/react-router'
import { BlogIndexPage } from '@/components/blog/page'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'

const title = 'Blog - Honeypot'
const description = 'Deep dives into honeypot concepts, detection engineering, and the infrastructure behind the Honeypot Discord bot.'
const url = `${APP_URL}/blog`

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'website' }),
})

function RouteComponent() {
  return <BlogIndexPage />
}