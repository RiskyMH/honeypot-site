import { Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const resourceLinks = [
  {
    label: "Invite Bot",
    href: "https://discord.com/oauth2/authorize?client_id=1450060292716494940",
  },
  { label: "Honeypot Lite", href: "https://github.com/RiskyMH/honeypot-lite" },
  { label: "Documentation", href: "/docs" },
  {
    label: "Support Server",
    href: "https://discord.gg/BanFeVWyFP",
  },
  { label: "GitHub", href: "https://github.com/RiskyMH/honeypot" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/docs/legal/terms" },
  { label: "Privacy Policy", href: "/docs/legal/privacy" },
];

const otherLinks = [
  { label: "Top.gg", href: "https://top.gg/bot/1450060292716494940" },
  { label: "Discord Bots", href: "https://discord.bots.gg/bots/1450060292716494940" },
  { label: "Discords.com", href: "https://discords.com/bots/bot/1450060292716494940" },
  { label: "Discord Bot List", href: "https://discordbotlist.com/bots/honeypot" },
  { label: "Discord App Directory", href: "https://discord.com/discovery/applications/1450060292716494940" },
  { label: "Discord Watch", href: "https://discord.watch/applications/1450060292716494940" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/honeypot.svg"
                alt="Honeypot Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-lg font-semibold text-foreground">
                Honeypot
              </span>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              {"The bot that shouldn't need to exist."}
            </p>
            <p className="mt-4 flex items-center gap-1 text-sm text-foreground/75">
              Made with <Heart className="size-4 fill-orange-500 text-orange-500">
                <text><tspan fontSize="0" fill="transparent" opacity="0">🧡</tspan></text>
              </Heart> by{" "}
              <a
                href="https://riskymh.dev"
                className="hover:underline font-bold"
                target="_blank"
              >
                RiskyMH
              </a>
            </p>
            <p className='hidden'>Official Instance Id: <code>1450060292716494940</code></p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* other links to include, but not displayed */}
          <div className="hidden">
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Find Us On
            </h4>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Join our support server for updates, announcements, and help.
            </p>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-border bg-[#12151a] text-foreground hover:bg-muted hover:text-foreground"
            >
              <a
                href="https://discord.gg/BanFeVWyFP"
                target="_blank"
              >
                <DiscordIcon className="mr-2 size-4" />
                Join Discord
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RiskyMH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
