import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to create consistent meta/link entries for route "head" in TanStack Router
// Usage: buildHead({ title, description, url, image })
export function buildHead({ title, description, url, image }: { title: string, description?: string, url?: string, image?: string }) {
  return {
    meta: [
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
    ],
    links: [
      ...(url ? [{ rel: 'canonical', href: url }] : []),
    ],
  }
}
