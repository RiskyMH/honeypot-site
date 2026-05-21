import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsCallout,
  DocsChecklist,
  DocsChecklistItem,
  DocsImg,
  DocsImgPlaceholder,
  DocsInlineCode,
  DocsLearnMore,
  DocsLink,
  DocsP,
  DocsSection,
  DocsStep,
  DocsStepList,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Setup Guide - Honeypot'
const description = 'A simple walkthrough for server owners and new moderators to set up the Honeypot Discord bot.'
const url = 'https://honeypot.riskymh.dev/docs/setup-guide'

export const Route = createFileRoute('/docs/setup-guide')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Setup Guide" description="A simple walkthrough for server owners and new moderators." />

    <DocsSection title="Quick Start">
      <DocsStepList>
        <DocsStep step="1" title="Invite the bot">
          Use the official invite link and select your server. <DocsLink href="https://discord.com/oauth2/authorize?client_id=1450060292716494940">Open invite page</DocsLink>
        </DocsStep>
        <DocsStep step="2" title="Grant permissions">
          Honeypot needs Ban Members to work properly. Manage Channels is so it can create the honeypot channel on join.
        </DocsStep>
        <DocsStep step="3" title="Confirm #honeypot channel">
          The bot will create a <DocsInlineCode>#honeypot</DocsInlineCode> channel if it can. If it cannot, run <DocsInlineCode>/honeypot</DocsInlineCode> and select the channel manually.
        </DocsStep>
        <DocsStep step="4" title="Pick your action (optional)">
          Decide whether to softban (kick) or ban users who post in the honeypot channel.
        </DocsStep>
        <DocsStep step="5" title="Set your log channel (optional)">
          Select a channel to log actions and errors.
        </DocsStep>
      </DocsStepList>
      <DocsImg src="/docs/honeypot-channel.png" alt="#honeypot channel" />
    </DocsSection>

    <DocsSection title="Configure the Bot">
      <DocsP>Open the configuration modal with <DocsInlineCode>/honeypot</DocsInlineCode>.</DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Pick the honeypot channel (the trap).</DocsChecklistItem>
        <DocsChecklistItem>Pick a log channel for actions and errors.</DocsChecklistItem>
        <DocsChecklistItem>Select Softban, Ban, or Disabled.</DocsChecklistItem>
        <DocsChecklistItem>Enable experiments if you want extra protection.</DocsChecklistItem>
      </DocsChecklist>

      <br />

      <DocsP>You can also use <DocsInlineCode>/honeypot-messages</DocsInlineCode> to customize the warning, DM, and log text.</DocsP>
      <DocsChecklist>
        <DocsChecklistItem> Consider adding your server invite to the DM message so legitimate members can rejoin.</DocsChecklistItem>
        <DocsChecklistItem> Use message variables to insert dynamic content like user mentions.</DocsChecklistItem>
      </DocsChecklist>

      <DocsImg src="/docs/honeypot-modals.png" alt="/honeypot modal" />
      <DocsLearnMore href="/docs/configuration" text="for the full configuration reference" />
    </DocsSection>


    <DocsSection title="Permissions checklist">
      <DocsCallout tone="warn" title="Role order">
        Move the Honeypot role above member roles, or it cannot enforce bans.
      </DocsCallout>
      <DocsChecklist>
        <DocsChecklistItem>Ban Members enabled at the server level.</DocsChecklistItem>
        <DocsChecklistItem>Can view and post in the log channel.</DocsChecklistItem>
      </DocsChecklist>
      <DocsP>Try out the honeypot with an alt account to see it in action.</DocsP>
    </DocsSection>

    <DocsSection title="What members see when caught">
      <DocsP>When someone posts in the honeypot channel, they receive a DM explaining what happened. The bot can also log the action for your moderators.</DocsP>
      <DocsImg src="/docs/dm-message.png" alt="Example DM to a member" />
    </DocsSection>

    <DocsSection title="Next steps">
      <DocsP>If setup went well, keep exploring:</DocsP>
      <DocsChecklist>
        <DocsChecklistItem><DocsLink href="/docs/how-it-works">Understand the logic and edge cases</DocsLink></DocsChecklistItem>
        <DocsChecklistItem><DocsLink href="/docs/configuration">See all configuration options</DocsLink></DocsChecklistItem>
        <DocsChecklistItem><DocsLink href="/docs/commands">Review all commands</DocsLink></DocsChecklistItem>
        <DocsChecklistItem><DocsLink href="/docs/tips">See best-practice recommendations</DocsLink></DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

  </DocsLayout >
}
