'use client'

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { DocsBadge } from '@/components/docs/markdown'
import { GITHUB_REPO_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  Flow,
  Step,
  Branch,
  Parallel,
  Split,
  Tracks,
  TrackColumn,
} from './flow-primitives'

const flowGroups = [
  {
    label: 'Events',
    id: 'events',
    flows: [
      { id: 'flow-message-create', title: 'On Message' },
      { id: 'flow-server-join', title: 'On Server Join' },
      { id: 'flow-delete', title: 'On Delete' },
    ],
  },
  {
    label: 'Cron',
    id: 'cron',
    flows: [
      { id: 'flow-experiment-runner', title: 'On Schedule' },
      { id: 'flow-followup-cleanup', title: 'On Followup' },
    ],
  },
  {
    label: 'Interactions',
    id: 'interactions',
    flows: [
      { id: 'flow-honeypot', title: '/honeypot' },
      { id: 'flow-honeypot-messages', title: '/honeypot-messages' },
      { id: 'flow-stats', title: '/stats' },
      { id: 'flow-unban', title: 'Unban button' },
      { id: 'flow-troubleshoot', title: 'Troubleshoot button' },
    ],
  },
]

const flows = flowGroups.flatMap((group) => group.flows)

const keyItems = [
  { label: 'Trigger', className: 'border-primary/30 bg-primary/[0.06]' },
  { label: 'Decision', className: 'border-blue-500/30 bg-blue-500/[0.06]' },
  { label: 'Action', className: 'border-green-500/30 bg-green-500/[0.06]' },
  { label: 'Sub-step', className: 'border-dashed border-green-500/30 bg-green-500/[0.03]' },
  { label: 'End with warning', className: 'border-dashed border-primary/30 bg-primary/[0.03]' },
  { label: 'End', className: 'border-muted-foreground/40 bg-muted/25' },
]

function endNote(hint: string) {
  return (
    <>
      End
      <br />
      <span className="opacity-70">({hint})</span>
    </>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-border pb-3 text-xl font-semibold font-heading text-foreground sm:text-2xl">
      {children}
    </h2>
  )
}

function ScrollRow({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}

function FlowNotes({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-5 max-w-3xl rounded-lg border border-border bg-secondary/20 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      <p className="mb-1.5 font-semibold uppercase tracking-[0.12em] text-foreground/70">
        Good to know
      </p>
      <ul className="list-disc space-y-1.5 pl-4 marker:text-muted-foreground/60">
        {children}
      </ul>
    </div>
  )
}

function useActiveFlow() {
  const [activeId, setActiveId] = useState(flows[0].id)

  useEffect(() => {
    const update = () => {
      // The last chart whose top passed this line is the one being read.
      let current: string = flows[0].id
      for (const flow of flows) {
        const el = document.getElementById(flow.id)
        if (el && el.getBoundingClientRect().top <= 180) current = flow.id
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return activeId
}

function FlowLegend({ activeId }: { activeId: string }) {
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-border bg-[#12151a] px-4 pb-4 pt-2">
        <nav aria-label="Event flow diagrams" className="mt-1 flex flex-col gap-3">
          {flowGroups.map((group) => (
            <div key={group.id}>
              <a
                href={`#${group.id}`}
                onClick={(event) => jumpTo(event, group.id)}
                className="block py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {group.label}
              </a>
              <div className="mt-0.5 flex flex-col gap-0.5">
                {group.flows.map((flow) => {
                  const active = activeId === flow.id

                  return (
                    <a
                      key={flow.id}
                      href={`#${flow.id}`}
                      onClick={(event) => jumpTo(event, flow.id)}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex items-center rounded-md px-2.5 py-2 text-sm transition-colors',
                        active
                          ? 'bg-primary/[0.07] text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                      )}
                    >
                      <span className="truncate">{flow.title}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Key
          </p>
          <ul className="space-y-2">
            {keyItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className={cn('size-3 shrink-0 rounded-sm border', item.className)}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default function EventDiagramsPage() {
  const activeId = useActiveFlow()

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <header>
        <DocsBadge tone="amber">Reference</DocsBadge>
        <h1 className="mt-4 text-3xl font-bold font-heading text-foreground sm:text-4xl">
          How Honeypot Operates
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Follow what the bot does from the moment something happens in Discord to the final action.
          A simplified, high-level view — not every check and edge case is shown.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)]">
        <FlowLegend activeId={activeId} />

        <div className="flex min-w-0 flex-col gap-12">
          {/* EVENTS */}
          <section id="events">
            <SectionLabel>Events</SectionLabel>
            <div className="mt-6 flex flex-col gap-8">
              {/* ON MESSAGE */}
              <Flow id={flows[0].id} title="On Message">
                <Step variant="amber">Message Received</Step>

                <Branch
                  question="In a honeypot channel?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitNode={endNote('ignored')}
                />

                <Branch
                  question="Is this a bot-authored message?"
                  downLabel="No"
                  exitLabel="Yes"
                  exitNode={endNote('ignored')}
                />

                <Parallel title="Optional processing (runs for up to 2 seconds)">
                  <Step variant="green-dashed" className="w-44">
                    DM the user
                    <br />
                    <span className="opacity-70">(if not disabled)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Forward message to log channel
                    <br />
                    <span className="opacity-70">(if enabled)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Timeout for 1hr
                    <br />
                    <span className="opacity-70">(if enabled)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    React to the message
                    <br />
                    <span className="opacity-70">(if ensure msg delete off)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Delete the message
                    <br />
                    <span className="opacity-70">(if ensure msg delete on)</span>
                  </Step>
                </Parallel>

                <Branch
                  question="Owner or admin?"
                  downLabel="No"
                  exitLabel="Yes"
                  exitVariant="amber-dashed"
                  exitNode={endNote('warning logged')}
                />

                <Split question="What to do?">
                  <Step edge="Softban" variant="green">
                    Softbanned
                    <br />
                    <span className="opacity-70">(ban → unban)</span>
                  </Step>
                  <Step edge="Ban" variant="green">
                    Banned
                  </Step>
                </Split>

                <Branch
                  question="Action succeeded?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={
                    <>
                      Log what happened with a troubleshoot button
                      <br />
                      <span className="opacity-70">
                        (even without a log channel)
                      </span>
                    </>
                  }
                />

                <Parallel title="Report the outcome">
                  <Step variant="green-dashed" className="w-44">
                    Update the warning message
                    <br />
                    <span className="opacity-70">(for new count)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Send log message
                    <br />
                    <span className="opacity-70">(if log channel set)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Queue followup cleanup
                    <br />
                    <span className="opacity-70">(for ensure msg delete)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Record the moderation
                    <br />
                    <span className="opacity-70">(for stats)</span>
                  </Step>
                </Parallel>

                <Step variant="gray">End</Step>
              </Flow>

              <FlowNotes>
                <li>
                  Messages from slash commands are attributed to the person who ran them, so they
                  are checked the same way as normal messages.
                </li>
                <li>
                  The DM, forwarded message and timeout run together in a short window before the
                  action — they can be{" "}
                  <Link to="/docs/configuration" hash="experiments" className="text-primary underline-offset-4 hover:underline">
                    enabled individually
                  </Link>
                  .
                </li>
                <li>
                  The bot needs Ban Members and a role above the target&apos;s highest role. The
                  server owner and admins are skipped and logged instead.
                </li>
                <li>
                  If the ban fails, the log message gets a button that can try to investigate
                  possible reasons.
                </li>
              </FlowNotes>

              {/* ON SERVER JOIN */}
              <Flow id={flows[1].id} title="On Server Join">
                <Step variant="amber">Bot added</Step>

                <Step variant="green">Find or create the #honeypot channel</Step>
                <Step variant="green">Post the warning message</Step>

                <Branch
                  question="Send a welcome message"
                  questionVariant="green"
                  exitLabel="after 2.5min"
                  exitDashed
                  exitVariant="green-dashed"
                  exitNode="Delete the welcome message"
                />

                <Step variant="green">
                  Run setup health checks
                  <br />
                  <span className="opacity-70">(a few checks for perms)</span>
                </Step>

                <Branch
                  question="Problems found?"
                  downLabel="No"
                  exitLabel="Yes"
                  exitVariant="amber-dashed"
                  exitNode={
                    <>
                      Warn admin in the honeypot channel
                      <br />
                      <span className="opacity-70">(with the details)</span>
                    </>
                  }
                />

                <Split question="Success?" merge={false}>
                  <Step edge="Yes" variant="gray">End</Step>
                  <Step edge="No" variant="amber-dashed">
                    Asked to run /honeypot to setup
                  </Step>
                </Split>
              </Flow>

              {/* ON DELETE — three independent cleanup flows */}
              <ScrollRow
                id={flows[2].id}
                className="scroll-mt-24 overflow-x-auto pb-2 md:overflow-visible"
              >
                <div className="mx-auto flex w-max max-w-3xl gap-4 md:w-full md:grid md:grid-cols-3">
                  <Flow title="Server removal" compact className="w-56 shrink-0 md:w-full">
                    <Step variant="amber">Bot removed from server</Step>
                    <Step variant="green">Delete all saved settings</Step>
                    <Step variant="green">Clear cached server data</Step>
                    <Step variant="green">Stop counting the server</Step>
                    <Step variant="gray">End</Step>
                  </Flow>

                  <Flow title="Channel delete" compact className="w-56 shrink-0 md:w-full">
                    <Step variant="amber">Channel deleted</Step>
                    <Step variant="green">Remove honeypot channel entry</Step>
                    <Step variant="green">Remove log channel entry</Step>
                    <Step variant="green">
                      Drop channel-specific stats
                      <br />
                      <span className="opacity-70">(server total stays)</span>
                    </Step>
                    <Step variant="gray">End</Step>
                  </Flow>

                  <Flow title="Message delete" compact className="w-56 shrink-0 md:w-full">
                    <Step variant="amber">Message deleted</Step>
                    <Step variant="green">Remove the saved message entry</Step>
                    <Step variant="green">Stop trying to update it</Step>
                    <Step variant="gray">End</Step>
                  </Flow>
                </div>
              </ScrollRow>

              <FlowNotes>
                <li>
                  The bot tries to clear out anything it no longer needs whenever the thing it
                  belongs to is removed — see the{" "}
                  <Link
                    to="/docs/legal/privacy"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    privacy policy
                  </Link>{" "}
                  for the full details on how data is handled.
                </li>
              </FlowNotes>
            </div>
          </section>

          {/* CRON */}
          <section id="cron">
            <SectionLabel>Cron</SectionLabel>
            <div className="mt-6 flex flex-col gap-8">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Jobs that run on their own — every day, or shortly after a moderation.
              </p>

              {/* ON SCHEDULE */}
              <Flow id={flows[3].id} title="On Schedule">
                <Step variant="amber">
                  Scheduled run
                  <br />
                  <span className="opacity-70">(each day for servers)</span>
                </Step>

                <Tracks>
                  <TrackColumn title="Recreate channel">
                    <Step variant="green-dashed" className="w-44">Get current channel</Step>
                    <Step variant="green-dashed" className="w-44">
                      Make new channel
                      <br />
                      <span className="opacity-70">(with same config)</span>
                    </Step>
                    <Step variant="green-dashed" className="w-44">
                      Transfer config
                      <br />
                      <span className="opacity-70">(if creation was successful)</span>
                    </Step>
                    <Step variant="green-dashed" className="w-44">
                      Send warning message
                      <br />
                      <span className="opacity-70">(if enabled)</span>
                    </Step>
                    <Step variant="green-dashed" className="w-44">
                      Delete old channel
                      <br />
                      <span className="opacity-70">(if creation was successful)</span>
                    </Step>
                  </TrackColumn>

                  <TrackColumn title="Channel warmer">
                    <Step variant="green-dashed" className="w-44">Send keep alive message</Step>
                    <Step variant="green-dashed" className="w-44">Delete the message</Step>
                  </TrackColumn>

                  <TrackColumn title="Random channel name">
                    <Step variant="green-dashed" className="w-44">
                      Rename channel
                      <br />
                      <span className="opacity-70">(curated list or random chars for chaos mode)</span>
                    </Step>
                  </TrackColumn>
                </Tracks>

                <Split question="Success?" merge={false}>
                  <Step edge="Yes" variant="gray">End</Step>
                  <Step edge="No" variant="amber-dashed">
                    Warning posted in log channel
                    <br />
                    <span className="opacity-70">(if configured)</span>
                  </Step>
                </Split>
              </Flow>

              <FlowNotes>
                <li>
                  Only servers with an experiment enabled run it, and the daily work is spread out
                  so each server is handled once — see{" "}
                  <Link to="/docs/configuration" hash="experiments" className="text-primary underline-offset-4 hover:underline">
                    experiments
                  </Link>
                  .
                </li>
              </FlowNotes>

              {/* ON FOLLOWUP */}
              <Flow id={flows[4].id} title="On Followup">
                <Step variant="amber">2 minutes after a moderation</Step>

                <Branch
                  question="Ensure Message Deletion on?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitNode={endNote('ignored')}
                />

                <Step variant="green">Search for leftover messages from the user</Step>
                <Step variant="green">Delete them</Step>
                <Step variant="gray">End</Step>
              </Flow>
            </div>
          </section>

          {/* INTERACTIONS */}
          <section id="interactions">
            <SectionLabel>Interactions</SectionLabel>
            <div className="mt-6 flex flex-col gap-8">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                What happens when someone runs a command or clicks a button. The setup guide covers
                the user-facing side of these in more detail.
              </p>

              <Flow id={flows[5].id} title="/honeypot">
                <Step variant="amber">/honeypot invoked</Step>

                <Branch
                  question="Manage Server permission?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('reply with error')}
                />

                <Step
                  variant="green"
                  downLabel="Await modal submit"
                >
                  Open configuration modal
                  <br />
                  <span className="opacity-70">(prefilled with current config)</span>
                </Step>

                <Branch
                  question="Permissions check out?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={
                    <>
                      Reply with the issues
                      <br />
                      <span className="opacity-70">(no settings changed)</span>
                    </>
                  }
                />

                <Parallel title="Quality checks">
                  <Step variant="green-dashed" className="w-44">
                    Ensure the warning message exists
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Create an invite
                    <br />
                    <span className="opacity-70">(if reinvite on)</span>
                  </Step>
                  <Step variant="green-dashed" className="w-44">
                    Set up webhooks
                    <br />
                    <span className="opacity-70">(if warmer on)</span>
                  </Step>
                </Parallel>

                <Parallel title="Try out newly enabled experiments">
                  <Step variant="green-dashed" className="w-44">Channel warmer</Step>
                  <Step variant="green-dashed" className="w-44">Random channel name</Step>
                </Parallel>

                <Step variant="green">Save config &amp; reply with changes</Step>
                <Step variant="gray">End</Step>
              </Flow>

              <Flow id={flows[6].id} title="/honeypot-messages">
                <Step variant="amber">/honeypot-messages invoked</Step>

                <Branch
                  question="Manage Server permission?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('reply with error')}
                />

                <Branch
                  question="Honeypot set up?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('tell them to run /honeypot')}
                />

                <Step variant="green" downLabel="Await modal submit">
                  Open messages modal
                  <br />
                  <span className="opacity-70">(prefilled with existing messages)</span>
                </Step>
                <Step variant="green">
                  Check the messages
                  <br />
                  <span className="opacity-70">(bad words, user mention)</span>
                </Step>

                <Branch
                  question="Validation passed?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={
                    <>
                      Reply with validation error
                      <br />
                      <span className="opacity-70">(no changes saved)</span>
                    </>
                  }
                />

                <Step variant="green">Save changes</Step>
                <Step variant="green">Update the warning message</Step>
                <Step variant="gray">{endNote('with reply & preview buttons')}</Step>
              </Flow>

              <ScrollRow
                id={flows[7].id}
                className="scroll-mt-24 overflow-x-auto pb-2 md:overflow-visible"
              >
                <div className="mx-auto flex w-max max-w-3xl gap-4 md:w-full md:grid md:grid-cols-2">
                  <Flow title="/stats" compact className="w-60 shrink-0 md:w-full">
                    <Step variant="amber">Command in bot DMs</Step>
                    <Step variant="green">Fetch global stats</Step>
                    <Step variant="green">Fetch your moderation count</Step>
                    <Step variant="green">Reply with explainer + stats</Step>
                    <Step variant="gray">End</Step>
                  </Flow>

                  <Flow title="Warning message button" compact className="w-60 shrink-0 md:w-full">
                    <Step variant="amber">Counter button pressed</Step>
                    <Step variant="green">Fetch global stats</Step>
                    <Step variant="green">Fetch this server&apos;s counts</Step>
                    <Step variant="green">Reply with explainer + stats</Step>
                    <Step variant="gray">End</Step>
                  </Flow>
                </div>
              </ScrollRow>

              <Flow id={flows[8].id} title="Unban button">
                <Step variant="amber">Unban button clicked</Step>

                <Branch
                  question={
                    <>
                      Ban Members permission?
                      <br />
                      <span className="opacity-70">(you and the bot)</span>
                    </>
                  }
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('reply with error')}
                />

                <Branch
                  question="Under 24 hours old?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('button expired')}
                />

                <Step variant="green">Unban the user</Step>
                <Step variant="green">Reply in the log channel</Step>
                <Step variant="gray">End</Step>
              </Flow>

              <Flow id={flows[9].id} title="Troubleshoot button">
                <Step variant="amber">Troubleshoot button clicked</Step>

                <Branch
                  question="Ban Members permission?"
                  downLabel="Yes"
                  exitLabel="No"
                  exitVariant="amber-dashed"
                  exitNode={endNote('reply with error')}
                />

                <Parallel title="Check why the ban failed">
                  <Step variant="green-dashed" className="w-44">Bot has Ban Members?</Step>
                  <Step variant="green-dashed" className="w-44">User has Admin?</Step>
                  <Step variant="green-dashed" className="w-44">Compare role hierarchy</Step>
                </Parallel>

                <Step variant="green">Reply with diagnostics</Step>
                <Step variant="gray">{endNote('ephemeral reply')}</Step>
              </Flow>

            </div>
          </section>

          <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
            These charts simplify the real logic and leave out many checks and edge cases. For the
            complete behavior, read the source on{" "}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
