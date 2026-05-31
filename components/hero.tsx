import { Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Shield, X, Check, BadgeCheck, ShieldCheck, HashIcon, BotIcon, ChevronDown } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 sm:grid-cols-5 lg:grid-cols-2">
          {/* Left content */}
          <div className="max-w-xl col-span-3 lg:col-span-1">

            <div className="relative sm:hidden max-sm:w-[35%] mx-auto mb-10 -mt-10">
              <div className="absolute -inset-8 rounded-full bg-linear-to-br from-amber-500/30 via-orange-500/20 to-transparent blur-2xl" />
              <img
                src="/honeypot.svg"
                alt="Honeypot"
                width={120}
                height={120}
                className="relative self-center mx-auto"
              />
            </div>

            <h1 className="text-5xl font-heading font-bold text-foreground md:text-6xl max-sm:text-center max-sm:mx-auto">
              <span className="">The bot that</span>
              <br />
              <span className=" text-primary">catches bots.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-sm:w-[80%] text-balance max-sm:text-center max-sm:mx-auto">
              Honeypot is a Discord bot that automatically catches and removes
              spam bots by monitoring a dedicated{" "}
              <span className="text-primary">#honeypot</span> channel.
            </p>

            <div className="mt-8 flex items-center gap-4 max-sm:justify-center">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink"
              >
                <a
                  href="https://discord.com/oauth2/authorize?client_id=1450060292716494940"
                  target="_blank"
                >
                  <DiscordIcon className="mr-2 size-5" />
                  Invite Honeypot
                </a>
              </Button>
              <ButtonGroup>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-border bg-secondary text-foreground hover:bg-muted hover:text-foreground max-sm:px-3 max-sm:hidden px-5 shrink"
                >
                  <Link
                    to="/docs/setup-guide"
                  >
                    Read the Guide
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon-lg"
                      variant="outline"
                      asChild
                      className="border-border bg-secondary text-foreground hover:bg-muted hover:text-foreground max-sm:rounded-l-md! max-sm:border-l!"
                    >
                      <ChevronDown className="size-2 p-2.5 text-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-50">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-muted-foreground">Key Links:</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/docs">
                          Documentation
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href="https://discord.gg/BanFeVWyFP"
                          target="_blank"
                        >
                          Support Server
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/docs/setup-guide"
                        >
                          Setup Guide
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href="https://github.com/riskymh/honeypot"
                          target="_blank"
                        >
                          GitHub
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground max-sm:text-center max-sm:mx-auto max-sm:justify-center">
              <ShieldCheck className="size-4 shrink-0" />
              <span><a href="https://github.com/riskymh/honeypot" className="hover:font-semibold hover:underline //hover:tracking-[-0.0232519em] hover:tracking-[-0.0089em]">Open Source</a> • Actively Maintained</span>
            </div>
          </div>

          {/* Right content - Honeypot visual with glow */}
          <div className="relative flex items-center justify-center max-xl:md:me-auto col-span-2 lg:col-span-1 max-sm:hidden xl:me-20 ">
            {/* Gradient glow background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="size-100 rounded-full opacity-60 animate-pulse duration-10000 blur-[80px] bg-linear-to-br via-amber-500/30 from-orange-500/20 to-transparent"
                style={{
                  // background:
                  //   "radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(245,158,11,0.3) 30%, rgba(217,119,6,0.2) 50%, transparent 70%)",
                }}
              />
            </div>

            {/* Additional inner glow */}
            <div className="absolute inset-0 flex items-center justify-center ">
              <div
                className="size-70 rounded-full  blur-2xl bg-linear-to-br from-yellow-400/20 via-orange-500/35 to-transparent"
                style={{
                  // background:
                  //   "radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(245,158,11,0.3) 40%, transparent 70%)",
                }}
              />
            </div>

            {/* Honeypot image */}
            <div className="relative z-10">
              <img
                src="/honeypot.svg"
                alt="Honeypot"
                width={280}
                height={280}
                className="drop-shadow-2xl"
              // priority
              />

              {/* Floating notification cards */}
              {/* Spammer card - top right */}
              <div className="absolute -right-8 -top-4 rounded-lg border border-border bg-[#1a1d21] p-3 shadow-xl md:-right-50 max-lg:hidden">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gray-500/20 text-lg font-bold text-white">
                    🤖
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">
                        Spammer
                      </span>
                      <span className="text-xs text-muted-foreground">
                        #1337
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Buy Nitro for free! $$
                    </p>
                  </div>
                  <div className="ml-2 flex size-5 items-center justify-center rounded-full bg-red-500">
                    <X className="size-3 text-white" />
                  </div>
                </div>
              </div>

              {/* Honeypot response - middle right */}
              <div className="absolute -right-4 top-24 rounded-lg border border-border bg-[#1a1d21] p-3 ps-4 shadow-xl md:-right-46 max-lg:hidden">
                <div className="flex items-start gap-2">
                  {/* <Image
                    src="/honeypot.svg"
                    alt="Honeypot"
                    width={32}
                    height={32}
                    className="rounded"
                  /> */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        Honeypot
                      </span>
                      <span className="rounded bg-[#5865f2] px-1 py-px text-[10px] font-medium text-white flex">
                        <Check className="size-3 self-center mr-1" /> APP
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      User banned and
                      <br />
                      messages deleted.
                    </p>
                  </div>
                  <div className="ml-2 flex size-5 items-center justify-center rounded-full bg-green-500 mt-auto">
                    <Check className="size-3 text-white" />
                  </div>
                </div>
              </div>

              {/* Channel notification - bottom right */}
              <div className="absolute -right-4 -bottom-4 rounded-lg border border-border bg-[#1a1d21] p-2 px-2.5 shadow-xl md:-right-30 max-lg:hidden">
                <div className="flex items-center gap-2">
                  {/* <Image
                    src="/honeypot.svg"
                    alt="Honeypot"
                    width={24}
                    height={24}
                    className="rounded"
                  /> */}
                  <div>
                    <span className="text-sm font-medium text-foreground flex">
                      <HashIcon className="size-4 self-center text-primary stroke-3 mr-2" />
                      honeypot
                    </span>
                    <p className="text-xs text-muted-foreground flex">
                      <span className="size-3 mr-3" />
                      {"Don't send messages"}
                      <br />
                      in this channel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
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
