import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to create consistent meta/link entries for route "head" in TanStack Router
// Usage: buildHead({ title, description, url, image, type, publishedTime, author })
export function buildHead({ title, description, url, image, type, publishedTime, author }: {
  title: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}) {
  return {
    meta: [
      ...(type ? [{ property: 'og:type', content: type }] : []),
      ...(title ? [
        { title },
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
      ] : []),
      ...(description ? [
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:description', content: description },
      ] : []),
      ...(url ? [
        { name: 'twitter:url', content: url },
        { property: 'og:url', content: url },
      ] : []),
      ...(image ? [
        { name: 'twitter:image', content: image },
        { property: 'og:image', content: image },
      ] : []),
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(author ? [{ property: 'article:author', content: author }] : []),
    ],
    links: [
      ...(url ? [{ rel: 'canonical', href: url }] : []),
    ],
  }
}
