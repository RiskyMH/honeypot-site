"use client"

import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  Search,
  Home,
  Rocket,
  Settings,
  Zap,
  Server,
  Command,
  Scale,
  FileCheck,
  ExternalLink,
  InfoIcon,
  Menu,
  X,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useState } from "react"

const sidebarNav = [
  {
    title: null,
    items: [{ name: "Overview", icon: Home, href: "/docs", active: true }],
  },
  {
    title: "GETTING STARTED",
    items: [
      { name: "Setup Guide", icon: Rocket, href: "/docs/setup-guide" },/*
      Subheadings in setup
        - Inviting the Bot
        - Setting Permissions
        - Honeypot Channel Creation (ie a channel will be created with the message)
        - Configuration Options (basic) - look at /docs/configuration for more details

      */
      { name: "How It Works", icon: Zap, href: "/docs/how-it-works" }, /*
      Subheadings in how it works
        - Whats the logic behind it?
      */
      { name: "Configuration", icon: Settings, href: "/docs/configuration" }, /*
      Subheadings in configuration
        - /honeypot modal
           - Honeypot Channel
           - Log Channel
           - Action (kick/ban/disabled)
           - experimental features (eg no-warning-msg, no-dm, channel-warmer, random-channel-name, reinvite, etc)
        - /honeypot-messages modal 
          (the custom messages you can set for the bot to use)
           - Honeypot Warning 
           - DM Message
           - Log Message

      */
    ],
  },
  {
    title: "REFERENCE",
    items: [
      { name: "Commands", icon: Command, href: "/docs/commands" },
      { name: "Self-hosting", icon: Server, href: "/docs/self-hosting" },
      { name: "Recommendations", icon: InfoIcon, href: "/docs/tips" },
      { name: "FAQ", icon: Lightbulb, href: "/docs/faq" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { name: "Privacy Policy", icon: Scale, href: "/docs/legal/privacy" },
      { name: "Terms of Service", icon: FileCheck, href: "/docs/legal/terms" },
    ],
  },
]





export default function DocsLayout({ children }: { children: React.ReactNode }) {

  const matchRoute = useMatchRoute()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur ">
        <div className="flex h-16 items-center justify-between px-6 container-bigger mx-auto ">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden"
            aria-label="Open docs navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/honeypot.svg"
              alt="Honeypot"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-lg font-semibold text-white">Honeypot</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/riskymh/honeypot"
              target="_blank"
              className="text-sm text-gray-400 transition-colors hover:text-white max-lg:hidden flex items-center"
            >
              GitHub
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a
              href="https://discord.com/discovery/applications/1450060292716494940"
              target="_blank"
              className="text-sm text-gray-400 transition-colors hover:text-white max-lg:hidden flex items-center"
            >
              View on Discord
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <Button
              size="sm"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href="https://discord.com/oauth2/authorize?client_id=1450060292716494940"
                target="_blank"
              >
                Invite Bot
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex w-screen container-bigger mx-auto">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col w-64 shrink-0 overflow-y-auto border-r border-white/10 bg-background p-4 max-lg:hidden">
          {/* Search */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-12 text-sm text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-gray-500">
                  ⌘K
                </kbd>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              {/* show a todo message */}
              {/* <div className="max-w-xs rounded-lg border border-white/10 bg-white/5 p-4"> */}
              <p className="text-sm text-gray-400">Search functionality coming soon!</p>
              {/* </div> */}
            </HoverCardContent>
          </HoverCard>

          {/* Navigation */}
          <nav className="space-y-6">
            {sidebarNav.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${matchRoute({ to: item.href })
                          ? "bg-amber-500/10 text-amber-500"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                      // onClick={(e) => {
                      //   if (item.expandable) {
                      //     e.preventDefault()
                      //     toggleExpand(item.name)
                      //   }
                      // }}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </span>
                        {/* {item.expandable &&
                          (expandedItems.includes(item.name) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          ))} */}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Need Help Card */}
          <div className="mt-auto"></div>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex justify-center">
              <div className="rounded-xl bg-amber-500/20 p-3">
                <img
                  src="/honeypot.svg"
                  alt="Honeypot"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <p className="mb-1 text-center text-sm font-medium text-white">
              Need help?
            </p>
            <p className="mb-4 text-center text-xs text-gray-400">
              Join our support server
              <br />
              on Discord.
            </p>
            <Button className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4]" asChild>
              <a href="https://discord.gg/BanFeVWyFP" target="_blank">
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 sm:px-12 sm:py-8 overflow-clip">
          <div className="mx-auto max-w-4xl min-w-0">
            {children}
            <footer className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="max-sm:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <img
                      src="/honeypot.svg"
                      alt="Honeypot"
                      width={24}
                      height={24}
                    />
                    <span className="font-semibold text-white">Honeypot</span>
                  </div>
                  <p className="mb-2 text-xs text-gray-500">
                    {"The bot that shouldn't need to exist."}
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">
                    Resources
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <a href="https://discord.com/discovery/applications/1450060292716494940" target="_blank" className="hover:text-white">
                        Discord App
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/riskymh/honeypot" target="_blank" className="hover:text-white">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.com/api/oauth2/authorize?client_id=1450060292716494940" target="_blank" className="hover:text-white">
                        Invite Bot
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.gg/BanFeVWyFP" target="_blank" className="hover:text-white">
                        Support Server
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">
                    Documentation
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link to="/docs" className="hover:text-white">
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/setup-guide" className="hover:text-white">
                        Setup Guide
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/commands" className="hover:text-white">
                        Commands
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/self-hosting" className="hover:text-white">
                        Self-Hosting
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link to="/docs/legal/privacy" className="hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/legal/terms" className="hover:text-white">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="max-sm:hidden text-right text-xs text-gray-500">
                  <p>&copy; {new Date().getFullYear()} RiskyMH.</p>
                  <p>All rights reserved.</p>
                </div>
                <div className="sm:hidden col-span-2 block text-xs text-gray-500">
                  <p>&copy; {new Date().getFullYear()} RiskyMH. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/60"
            aria-label="Close docs navigation"
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-background border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/honeypot.svg"
                  alt="Honeypot"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="text-lg font-semibold text-white">Honeypot Docs</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Close docs navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-6">
              {sidebarNav.map((section, idx) => (
                <div key={idx}>
                  {section.title && (
                    <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500">
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${matchRoute({ to: item.href })
                            ? "bg-amber-500/10 text-amber-500"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex justify-center">
                <div className="rounded-xl bg-amber-500/20 p-3">
                  <img
                    src="/honeypot.svg"
                    alt="Honeypot"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <p className="mb-1 text-center text-sm font-medium text-white">
                Need help?
              </p>
              <p className="mb-4 text-center text-xs text-gray-400">
                Join our support server
                <br />
                on Discord.
              </p>
              <Button className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4]" asChild>
                <a href="https://discord.gg/BanFeVWyFP" target="_blank">
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join Discord
                </a>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
