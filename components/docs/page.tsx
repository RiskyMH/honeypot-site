"use client"

import {
  ChevronRight,
  Info,
  Check,
  X,
  Users,
  Ban,
  Activity,
  UserPlus2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DocsSection,
  DocsP,
  DocsOl,
  DocsInlineCode,
  DocsLink,
} from "./markdown"

const stats = [
  {
    icon: Users,
    value: "25k+",
    label: "Servers",
    live: false,
  },
  {
    icon: Ban,
    value: "150k+",
    label: "Bans",
    live: false,
  },
  {
    icon: UserPlus2Icon,
    value: "50m+",
    label: "Members",
    live: false,
  },
  {
    icon: Activity,
    value: "99.8%",
    label: "Success Rate",
    live: false,
  },
]

const commands = [
  {
    command: "/honeypot",
    description: "Configure/setup the honeypot channel and its settings",
  },
  {
    command: "/honeypot-messages",
    description: "Configure the honeypot messages that the bot sends",
  },
  {
    command: "/stats",
    description: "See statistics for all servers using honeypot [dms only]",
  },
]

const whatWeCollect = [
  "Server ID",
  "Channel ID's (honeypot & log channel)",
  "User ID's of users who trigger the honeypot",
  "Action logs (for statistics & moderation)",
]

const whatWeDontCollect = [
  "Messages outside the honeypot channel",
  "Personal user data (emails, DMs, etc.)",
  "Any content from users",
  "Anything not necessary for the bot to function",
]

export default function DocsPage() {
  return (
    <>
      {/* Overview Section */}
      <section className="mb-12">
        <div className="flex items-start justify-between">
          <div className="max-w-xl">
            <h1 className="mb-2 text-4xl font-bold text-white">
              Overview
            </h1>
            <p className="mb-6 text-lg text-amber-500">
              {"The bot that shouldn't need to exist."}
            </p>
            <p className="mb-4 text-gray-400">
              Honeypot is a Discord bot that automatically catches and
              removes spam bots by monitoring a dedicated{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-amber-500 text-sm">
                #honeypot
              </code>{" "}
              channel.
            </p>
            <p className="text-gray-400">
              When someone posts in the honeypot channel, Honeypot acts
              immediately — removing the user and deleting their messages
              before they can cause harm.
            </p>
          </div>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent blur-2xl" />
            <img
              src="/honeypot.svg"
              alt="Honeypot"
              width={120}
              height={120}
              className="relative"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{stat.label}</span>
                {stat.live && (
                  <span className="text-xs text-amber-500">Live</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <DocsSection title="How It Works">
        <DocsOl>
          <span>
            Honeypot creates (or you set up) a hidden{" "}
            <DocsInlineCode>#honeypot</DocsInlineCode> channel.
          </span>
          <span>Spammers or bots post in the channel.</span>
          <span>
            Honeypot instantly removes the user (kick/ban) and deletes
            their messages.
          </span>
          <span>The action is logged to your selected log channel.</span>
        </DocsOl>

        <p className="text-sm text-gray-400 mb-6 -mt-2">
          For more info on the logic behind honeypot, check out the{" "}
          <DocsLink href="/docs/how-it-works">
            How It Works
            <ChevronRight className="ml-1 inline h-3 w-3" />
          </DocsLink>
        </p>

        {/* Info callout */}
        <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
          <p className="text-sm text-gray-400">
            Kick is default and is a softban (bans & unbans) so Discord
            deletes their immediate messages.
          </p>
        </div>
      </DocsSection>

      {/* Getting Started */}
      < DocsSection title="Getting Started" >
        <DocsOl>
          <span>
            <DocsLink href="https://discord.com/api/oauth2/authorize?client_id=1450060292716494940">
              Invite Honeypot
            </DocsLink>{" "}
            to your server.
          </span>
          <span>Ensure the bot has the required permissions.</span>
          <span>
            The bot creates a <DocsInlineCode>#honeypot</DocsInlineCode>{" "}
            channel for you.
          </span>
          <span>Use /honeypot to configure the bot's behavior.</span>
          <span>Honeypot will handle the rest!</span>
        </DocsOl>
        <p className="text-sm text-gray-400">
          For a detailed walkthrough, check out the{" "}
          <DocsLink href="/docs/setup-guide">
            Setup Guide.
            <ChevronRight className="ml-1 inline h-3 w-3" />
          </DocsLink>
        </p>
      </DocsSection >

      {/* Bot Commands */}
      <DocsSection title="Bot Commands">
        <DocsP>Use slash commands to configure Honeypot in your server.</DocsP>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <table className="w-full">
            <tbody>
              {commands.map((cmd, idx) => (
                <tr
                  key={idx}
                  className={idx !== 0 ? "border-t border-white/10" : ""}
                >
                  <td className="px-4 py-3">
                    <code className="text-amber-500">{cmd.command}</code>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm" colSpan={10}>
                    {cmd.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          See all commands in the{" "}
          <DocsLink href="/docs/commands">
            Commands Reference.
            <ChevronRight className="ml-1 inline h-3 w-3" />
          </DocsLink>
        </p>
      </DocsSection >

      {/* Privacy Policy */}
      < DocsSection title="Privacy Policy" >
        <DocsP>
          Your privacy matters. Honeypot is designed to be minimal and
          transparent.
        </DocsP>
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-amber-500">
              What We Collect
            </h3>
            <ul className="space-y-2">
              {whatWeCollect.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-red-400">
              {"What We Don't Collect"}
            </h3>
            <ul className="space-y-2">
              {whatWeDontCollect.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Read the full{" "}
          <DocsLink href="/docs/legal/privacy">
            Privacy Policy
          </DocsLink>{" "}
          for more details.
          <ChevronRight className="ml-1 inline h-3 w-3 text-amber-500" />
        </p>
      </DocsSection >

      {/* Still have questions */}
      < section className="mb-12" >
        <div className="flex max-sm:flex-col gap-y-5 items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6 overflow-ellipsis">
          <div className="flex items-center gap-4">
            <img
              src="/honeypot.svg"
              alt="Honeypot"
              width={48}
              height={48}
            />
            <div>
              <h3 className="font-semibold text-white">
                Still have questions?
              </h3>
              <p className="text-sm text-gray-400">
                If you need help, join our support server or open an issue
                on GitHub.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap max-sm:justify-center">
            <Button className="bg-[#5865F2] text-white hover:bg-[#4752C4] ms-auto" asChild>
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
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white ms-auto"
              asChild
            >
              <a href="https://github.com/RiskyMH/honeypot" target="_blank">
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
