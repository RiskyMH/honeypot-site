import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsCallout,
  DocsInlineCode,
  DocsP,
  DocsSection,
  DocsTable,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Commands - Honeypot'
const description = 'Slash commands available in Honeypot.'
const url = 'https://honeypot.riskymh.dev/docs/commands'

export const Route = createFileRoute('/docs/commands')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Commands" description="Slash commands available in Honeypot." />

    <DocsSection title="Command reference">
      <DocsTable
        headers={['Command', 'Description', 'Where']}
        rows={[
          [<DocsInlineCode>/honeypot</DocsInlineCode>, 'Configure the honeypot channel, log channel, action, and experiments.', 'Server'],
          [<DocsInlineCode>/honeypot-messages</DocsInlineCode>, 'Customize the warning, DM, and log messages.', 'Server'],
          [<DocsInlineCode>/stats</DocsInlineCode>, 'View overall stats for Honeypot (DMs only).', 'Bot DMs'],
        ]}
      />
    </DocsSection>

    <DocsSection title="Permissions">
      <DocsP>Commands are restricted to members with server management permissions.</DocsP>
      <DocsCallout tone="info" title="Required">
        Manage Server, Ban Members, Moderate Members, Manage Messages, and Manage Channels.
      </DocsCallout>
    </DocsSection>
  </DocsLayout>
}
