import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsCallout,
  DocsInlineCode,
  DocsP,
  DocsSection,
  DocsStep,
  DocsStepList,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'How It Works - Honeypot'
const description = 'The actual logic behind the trap and the moderation flow.'
const url = 'https://honeypot.riskymh.dev/docs/how-it-works'

export const Route = createFileRoute('/docs/how-it-works')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="How It Works" description="The actual logic behind the trap and the moderation flow." />

    <DocsSection title="The core loop">
      <DocsP>Spammers (or compromised accounts) typically blast every visible channel. Honeypot works because the trap channel is visible and looks ordinary, so their automation hits it and gets caught.</DocsP>
      <DocsStepList>
        <DocsStep step="1" title="A trap channel is defined">
          The honeypot channel is a normal text channel chosen in <DocsInlineCode>/honeypot</DocsInlineCode>.
        </DocsStep>
        <DocsStep step="2" title="Message is detected">
          Any message sent in the honeypot channel triggers the flow. Slash command actions are attributed to the user; other bot messages are ignored.
        </DocsStep>
        <DocsStep step="3" title="Optional DM is sent">
          The bot attempts to DM the user first (unless “No DM” is enabled).
        </DocsStep>
        <DocsStep step="4" title="Action runs">
          Softban = ban then unban to remove recent messages. Ban = permanent ban.
        </DocsStep>
        <DocsStep step="5" title="Log + counter update">
          The action is logged and the warning message count is updated if enabled.
        </DocsStep>
      </DocsStepList>
    </DocsSection>

    <DocsSection title="Action details">
      <DocsP>Softban uses a ban/unban sequence to remove the last hour of messages. Ban removes the user permanently and also clears their recent messages.</DocsP>
      <DocsCallout tone="info" title="Softban is default">
        Softban is the default action because it removes spam while keeping the option to rejoin.
      </DocsCallout>
    </DocsSection>

    <DocsSection title="Edge cases">
      <DocsP>Honeypot is conservative and logs failures clearly:</DocsP>
      <DocsCallout tone="warn" title="Server owner">
        If the server owner triggers the honeypot, the bot cannot action them and will log a warning instead.
      </DocsCallout>
      <DocsCallout tone="warn" title="Missing permissions">
        If the bot lacks Ban Members or its role is too low, the action fails and a log warning is posted.
      </DocsCallout>
    </DocsSection>
  </DocsLayout>
}
