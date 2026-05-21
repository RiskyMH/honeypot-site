import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import { DocsCallout, DocsInlineCode, DocsLink, DocsP, DocsSection, DocsTitle, DocsChecklist, DocsChecklistItem } from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Terms of Service - Honeypot'
const description = 'Official Honeypot bot terms of service.'
const url = 'https://honeypot.riskymh.dev/docs/legal/terms'

export const Route = createFileRoute('/docs/legal/terms')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Terms of Service" description="Official Honeypot bot terms of service." />

    <DocsCallout tone="note" title="Disclaimer">
      <DocsP>This page is a presentation-friendly edition of the canonical legal text. The authoritative source is available at <DocsLink href="https://github.com/RiskyMH/Honeypot/blob/main/legal.md">github.com/RiskyMH/Honeypot</DocsLink>.</DocsP>
    </DocsCallout>


    <DocsSection title="Terms of Service">
      <DocsP><strong>Last Updated: February 23, 2026</strong></DocsP>
      <DocsP><DocsLink href="https://riskymh.dev">RiskyMH</DocsLink> operates the Honeypot Discord bot. These Terms of Service govern the use of the bot and your relationship with the bot operator.</DocsP>
    </DocsSection>

    <DocsSection title="Acceptance of Terms">
      <DocsP>Adding Honeypot to your Discord server means you agree to these Terms of Service.</DocsP>
    </DocsSection>

    <DocsSection title="Description of Service">
      <DocsP>Honeypot monitors a designated channel and automatically moderates users who post there according to your settings.</DocsP>
    </DocsSection>

    <DocsSection title="Required Permissions">
      <DocsP>The bot needs:</DocsP>
      <DocsChecklist>
        <DocsChecklistItem>View Channels (to monitor honeypot)</DocsChecklistItem>
        <DocsChecklistItem>Send Messages (for logs and warning message)</DocsChecklistItem>
        <DocsChecklistItem>Manage Channels (to create honeypot channel)</DocsChecklistItem>
        <DocsChecklistItem>Ban Members (to execute moderation)</DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="Prohibited Uses">
      <DocsP>Do <strong>not</strong> use Honeypot to:</DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Violate Discord's Terms of Service, or make the bot do so</DocsChecklistItem>
        <DocsChecklistItem>Target or harass specific users</DocsChecklistItem>
        <DocsChecklistItem>Evade moderation in other servers</DocsChecklistItem>
        <DocsChecklistItem>Set bot warning, DM, or log messages to content that is offensive, harassing, abusive, illegal, or otherwise violates Discord’s Terms of Service or local laws.</DocsChecklistItem>
      </DocsChecklist>
      <DocsP>Server administrators are solely responsible for the content of any custom messages configured through Honeypot. Do <strong>not</strong> use the bot to send or automate messages that may be considered harmful, threatening, discriminatory, or inappropriate.</DocsP>
      <DocsP>Do not use the bot to transmit any private or sensitive data. Users are encouraged to report abuse to Discord and contact the bot owner at <DocsLink href="https://riskymh.dev">https://riskymh.dev</DocsLink>.</DocsP>
    </DocsSection>

    <DocsSection title="Bot Operator Commitment">
      <DocsP>Only Discord server administrators can change the channels and messages that the bot manages. The bot operator will never intentionally reconfigure your server’s channels or messages in a harmful way or circumvent your intentions as an administrator. All configuration changes performed by the official Honeypot bot are a direct result of administrator actions or explicit server settings.</DocsP>
    </DocsSection>

    <DocsSection title="User Responsibilities">
      <DocsP>For the purposes of this policy, “moderator” means any Discord server owner, administrator, or person with permission to configure the bot. “Member” means any user who is a member of a Discord server where Honeypot is installed.</DocsP>
      <DocsP>Moderators are responsible for:</DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Ensuring the bot’s role is positioned above members’ highest roles and has Ban Members permission;</DocsChecklistItem>
        <DocsChecklistItem>Reviewing moderation logs for accuracy;</DocsChecklistItem>
        <DocsChecklistItem>Not using Honeypot’s features in ways that are deceptive, harmful, or violate Discord’s Terms of Service - including intentionally configuring a commonly used channel, such as <DocsInlineCode>#general</DocsInlineCode>, as the honeypot to cause mass bans or similar disruptions;</DocsChecklistItem>
        <DocsChecklistItem>Using the bot only as intended and in accordance with this policy.</DocsChecklistItem>
      </DocsChecklist>
      <DocsP>Any misuse, incorrect configuration, or failure to understand the consequences of your actions is the sole responsibility of the moderator.</DocsP>
      <DocsP>The bot operator is not liable for any actions taken against members as a result of them sending messages in a honeypot channel, including bans, timeouts, or other moderation actions triggered by the bot’s automated enforcement. All server members are subject to the configuration choices made by moderators (administrators) of the bot, and it is the responsibility of those users to communicate the presence and purpose of the honeypot channel to their communities.</DocsP>
    </DocsSection>

    <DocsSection title="Limitation of Liability">
      <DocsP>Honeypot is provided "as is" without warranties. We are not responsible for false positives, Discord API issues, permission errors, or data loss from platform problems.</DocsP>
    </DocsSection>

    <DocsSection title="Termination">
      <DocsP>Remove the bot from your server to stop service and delete all data. We may remove the bot from servers violating these terms.</DocsP>
    </DocsSection>

    <DocsSection title="Governing Law">
      <DocsP>Disputes are governed by the laws of Australia.</DocsP>
    </DocsSection>

    <DocsSection title="Contact">
      <DocsP>For support, join the Discord server <DocsLink href="https://discord.gg/qK9pfnB3Yv">https://discord.gg/qK9pfnB3Yv</DocsLink> or contact the owner RiskyMH at <DocsLink href="https://riskymh.dev">https://riskymh.dev</DocsLink>.</DocsP>
    </DocsSection>
  </DocsLayout>
}
