import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { memo, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  DocsBadge,
  DocsLink,
} from '@/components/docs/markdown'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { blogPosts, getBlogPostMeta, type BlogPostMeta } from '../../src/app/blog/-posts'

export { getBlogPostMeta }

export function BlogIndexPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0]

  return (
    <BlogShell>
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)] lg:items-start">
        <div>
          <DocsBadge tone="amber">Blog</DocsBadge>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold font-heading text-foreground sm:text-5xl lg:text-6xl">
            Notes on building and running Honeypot.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Technical writeups about the bot, rollout decisions, and the tradeoffs behind the product.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={featuredPost.path}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Read featured post
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Browse docs
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-[#12151a] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Featured post
          </p>
          <Link
            to={featuredPost.path}
            className="mt-3 block text-2xl font-semibold text-foreground transition-colors hover:text-primary"
          >
            {featuredPost.title}
          </Link>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {featuredPost.description}
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{featuredPost.date}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{featuredPost.readTime}</span>
          </div>
        </aside>
      </section>
      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Latest posts</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Articles on honeypot theory, Discord spam detection, and building moderation infrastructure at scale.
            </p>
          </div>
          <DocsBadge>{blogPosts.length} posts</DocsBadge>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col rounded-2xl border border-border bg-[#12151a] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <DocsBadge tone={post.featured ? 'amber' : 'default'}>{post.category}</DocsBadge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <Link
                to={post.path}
                className="mt-4 block text-xl font-semibold text-foreground transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>{post.readTime}</span>
                <span>{post.sections.length} sections</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </BlogShell>
  )
}

export function BlogPostLayout({ meta, children }: { meta: BlogPostMeta; children: ReactNode }) {
  const relatedPosts = blogPosts.filter((relatedPost) => relatedPost.slug !== meta.slug).slice(0, 2)
  const articleBodyRef = useRef<HTMLDivElement | null>(null)

  return (
    <BlogShell>
      <article>
        <header className="border-b border-border pb-8">
          <Link to="/blog" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
            ← Back to blog
          </Link>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold font-heading text-foreground sm:text-5xl lg:text-6xl">
            {meta.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Written by{' '}
            <a
              href="https://riskymh.dev"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              RiskyMH
            </a>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <DocsBadge tone="amber">{meta.category}</DocsBadge>
            <span className="text-sm text-muted-foreground">{meta.date}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-sm text-muted-foreground">{meta.readTime}</span>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {meta.description}
          </p>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div ref={articleBodyRef} className="min-w-0">
            {children}
          </div>

          <TableOfContents sections={meta.sections} articleBodyRef={articleBodyRef} />
        </div>

        <section className="border-t border-border pt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Further reading</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Adjacent notes and related topics.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((relatedPost, index) => (
              <Link
                key={relatedPost.slug}
                to={relatedPost.path}
                className="rounded-2xl border border-border bg-[#12151a] p-5 transition-colors hover:border-primary/20 hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <DocsBadge tone="blue">{relatedPost.category}</DocsBadge>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? relatedPost.date : relatedPost.readTime}
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {relatedPost.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {relatedPost.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="border-t border-border pt-6 mt-6 text-sm text-muted-foreground">
          Looking for the core product docs? Try <DocsLink href="/docs">the documentation</DocsLink> or the <DocsLink href="/docs/setup-guide">setup guide</DocsLink>.
        </div>
      </article>
    </BlogShell>
  )
}

function BlogShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function flattenSections(sections: BlogPostMeta['sections']): BlogPostMeta['sections'] {
  return sections.flatMap((section) => [section, ...(section.children ? flattenSections(section.children) : [])])
}

function renderSectionLinks(sections: BlogPostMeta['sections'], activeSectionId: string, depth = 0): ReactNode {
  return sections.flatMap((section) => {
    const isActive = activeSectionId === section.id
    const baseClasses = isActive
      ? 'bg-primary/10 text-foreground ring-1 ring-primary/20'
      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'

    const children = section.children && section.children.length > 0
      ? renderSectionLinks(section.children, activeSectionId, depth + 1)
      : null

    return [
      <a
        key={section.id}
        href={`#${section.id}`}
        aria-current={isActive ? 'page' : undefined}
        className={`block rounded-lg px-3 py-2 text-sm transition-all ${baseClasses} ${depth > 0 ? 'ml-3 border-l border-border pl-4' : ''}`}
      >
        {section.title}
      </a>,
      children,
    ]
  })
}

const TableOfContents = memo(function TableOfContents({ sections, articleBodyRef }: { sections: BlogPostMeta['sections']; articleBodyRef: React.RefObject<HTMLDivElement | null> }) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? '')
  const sectionIds = useMemo(() => flattenSections(sections).map((s) => s.id), [sections])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSectionId(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.15, 0.3, 0.6] },
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e))
    elements.forEach((e) => observer.observe(e))

    return () => observer.disconnect()
  }, [sectionIds])

  return (
    <aside className="hidden space-y-4 lg:block lg:self-start lg:sticky lg:top-24">
      <div className="rounded-2xl border border-border bg-[#12151a] p-4 shadow-[0_1px_0_rgba(255,255,255,0.02)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          On this page
        </p>
        <ScrollProgress articleBodyRef={articleBodyRef} />
        <nav className="mt-3 space-y-0.5">
          {renderSectionLinks(sections, activeSectionId)}
        </nav>
        <div className="pt-2">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    </aside>
  )
})

const ScrollProgress = memo(function ScrollProgress({ articleBodyRef }: { articleBodyRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = articleBodyRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const bottom = top + rect.height
      const scrollEnd = Math.max(bottom - window.innerHeight, top + 1)
      const p = (window.scrollY - top) / (scrollEnd - top)
      setProgress(Math.min(1, Math.max(0, p)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [articleBodyRef])

  return (
    <div className="mt-3 h-1 overflow-hidden rounded-full bg-border/80">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-15"
        style={{ width: `${Math.max(4, progress * 100)}%` }}
      />
    </div>
  )
})
