import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsCallout,
  DocsChecklist,
  DocsChecklistItem,
  DocsInlineCode,
  DocsP,
  DocsSection,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Tips & Best Practices - Honeypot'
const description = 'Recommendations for maximizing the effectiveness of your honeypot trap and ensuring smooth moderation.'
const url = 'https://honeypot.riskymh.dev/docs/tips'

export const Route = createFileRoute('/docs/tips')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Recommendations" description="Best practices for stronger trap effectiveness." />

    <DocsSection title="Make the trap believable">
      <DocsChecklist>
        <DocsChecklistItem>Place the honeypot channel near the top of your channel list.</DocsChecklistItem>
        <DocsChecklistItem>Rename the channel to something less predictable than <DocsInlineCode>#honeypot</DocsInlineCode>.</DocsChecklistItem>
        <DocsChecklistItem>Enable “Random Channel Name” or “Chaos” to avoid blacklist bots.</DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="Keep it safe">
      <DocsChecklist>
        <DocsChecklistItem>Keep the bot role above all member roles.</DocsChecklistItem>
        <DocsChecklistItem>Use a dedicated log channel so moderators see every action.</DocsChecklistItem>
        <DocsChecklistItem>Review logs for errors and permission warnings.</DocsChecklistItem>
      </DocsChecklist>
      <DocsCallout tone="warn" title="Don’t use #general">
        Never set a commonly used channel as the honeypot. It can cause mass bans and violates best practices.
      </DocsCallout>
    </DocsSection>

    <DocsSection title="Member experience">
      <DocsP>Consider including a server invite in the DM message so legitimate members can return.</DocsP>
      <DocsCallout tone="note" title="Tone matters">
        Keep the DM message calm and informative. It reduces confusion for real users.
      </DocsCallout>
    </DocsSection>
  </DocsLayout>
}
