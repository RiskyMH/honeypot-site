import { createFileRoute } from '@tanstack/react-router'
import { buildHead } from '@/lib/utils'

const title = '404 – Not Found'
const description = 'This page could not be found. It may have been moved or never existed.'
const url = 'https://honeypot.riskymh.dev/404'

export const Route = createFileRoute('/404')({
  head: () => buildHead({ title, description, url }),
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto py-12 m-auto h-dvh flex flex-col items-center justify-center">
      <img src="/honeypot.svg" alt="Honeypot Logo" className="w-20 h-20 mb-6 opacity-80" />
      <h1 className="text-3xl font-bold mb-2 text-center">404 – Not Found</h1>
      <p className="text-gray-500 mb-6 text-center">Sorry, there’s nothing here!<br/>The page you requested doesn’t exist, was renamed, or never existed.</p>
      <a href="/" className="inline-block px-6 py-2 text-base font-semibold rounded-lg bg-primary text-black hover:bg-primary/80 transition">Go back home</a>
    </div>
  )
}
