import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsBadge,
  DocsCallout,
  DocsCodeBlock,
  DocsInlineCode,
  DocsKeyValue,
  DocsLearnMore,
  DocsLink,
  DocsP,
  DocsSection,
  DocsSubheading,
  DocsTable,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Configuration - Honeypot'
const description = 'Low-level controls for channels, actions, experiments, and messages in the Honeypot Discord bot.'
const url = 'https://honeypot.riskymh.dev/docs/configuration'

export const Route = createFileRoute('/docs/configuration')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Configuration" description="Low-level controls for channels, actions, experiments, and messages." />

    <DocsSection title="/honeypot modal">
      <DocsP>Use <DocsInlineCode>/honeypot</DocsInlineCode> to configure core behavior. These values are stored per-server.</DocsP>

      <DocsSubheading title="Core fields" />
      <DocsKeyValue
        label="Honeypot Channel"
        value={<>Any message sent here triggers the action.</>}
        hint={<>Required. This should be a dedicated trap channel.</>}
      />
      <DocsKeyValue
        label="Log Channel"
        value={<>Where moderation events are logged.</>}
        hint={<>Optional but recommended.</>}
      />
      <DocsKeyValue
        label="Action"
        value={<>Choose <DocsInlineCode>softban</DocsInlineCode>, <DocsInlineCode>ban</DocsInlineCode>, or <DocsInlineCode>disabled</DocsInlineCode>.</>}
        hint={<>Softban is default. It bans then unbans to remove recent messages.</>}
      />
      <DocsKeyValue
        label="Experiments"
        value={<>Optional switches for extra behavior at catching & preventing spam better.</>}
        hint={<>See below table for options.</>}
      />

      <DocsSubheading title="Experiments" />
      <DocsP>Optional switches for extra behavior. These can be enabled together.</DocsP>
      <DocsTable
        headers={['Experiment', 'What it does', 'Notes']}
        rows={[
          [<>Forward Message</>, 'Send the incriminating message to the log channel.', 'Helps you review what messages were sent.'],
          [<>No Warning Msg</>, 'Removes the warning post from the honeypot channel.', 'Use when you want the trap to look empty.'],
          [<>No DM</>, 'Skips DMing the user after they trigger.', 'Use if you prefer silence.'],
          [<>Channel Warmer</>, 'Posts a daily message to keep the honeypot active.', 'Helps the channel look “alive”.'],
          [<>Random Channel Name</>, <>Renames the honeypot channel daily. <DocsLink href="https://github.com/RiskyMH/honeypot/blob/main/src/utils/random-channel-names.yaml">See the name list</DocsLink>.</>, 'Avoid predictable names.'],
          [<>Random Channel Name (Chaos)</>, 'Renames with random characters daily.', 'Best against blacklist bots.'],
          [<>Reinvite</>, 'Include an invite link in the DM so users can rejoin.', 'Helpful to legitimate members.'],
          [<>Timeout First</>, 'Timeouts the user for 1 hour before banning/softbanning.', 'This timeout should still apply when they rejoin.'],
          [<>Only More Recent Delete</>, 'Only deletes the last 15 minutes of messages instead of 1 hour.', 'Should be less jarring to message history.'],
          [<>Many Honeypots</>, 'Allows selection of multiple honeypot channels.', 'Requires modal submit and re-open to add them.'],
        ]}
      />

      <DocsCallout tone="warn" title="Permissions">
        You need Ban Members to set the action to softban or ban. The bot also needs Ban Members to enforce actions.
      </DocsCallout>
    </DocsSection>

    <DocsSection title="/honeypot-messages modal">
      <DocsP>Customize what the bot says. Leave a field empty to reset to default.</DocsP>
      <DocsSubheading title="Fields" />
      <DocsTable
        headers={['Message', 'Purpose', 'Limit']}
        rows={[
          ['Honeypot Warning', 'Pinned warning shown in the honeypot channel.', '10-1500 chars'],
          ['DM Message', 'Message sent to the user after they trigger.', '10-1000 chars'],
          ['Log Message', 'Message posted to your log channel.', '10-500 chars'],
        ]}
      />
      <DocsCallout tone="note" title="Image support">
        Honeypot Warning & DM Messages can include images. Place each image URL on its own line at the end of the message (max 4).
      </DocsCallout>

      <DocsSubheading title="Message variables" />
      <DocsP>Use template variables to insert live values in messages.</DocsP>
      <DocsTable
        headers={['Variable', 'Used in', 'Replaced with']}
        rows={[
          [<DocsInlineCode>{'{{action:text}}'}</DocsInlineCode>, 'Warning, DM, Log', 'Text for the chosen action (ban / softban / disabled).'],
          [<DocsInlineCode>{'{{server:name}}'}</DocsInlineCode>, 'DM', 'The server name.'],
          [<DocsInlineCode>{'{{server:name:linked}}'}</DocsInlineCode>, 'DM', 'Server name linked to its Discord discovery page (if applicable).'],
          [<DocsInlineCode>{'{{server:public-link}}'}</DocsInlineCode>, 'DM', 'Link to the server\'s public discovery page (if applicable).'],
          [<DocsInlineCode>{'{{honeypot:channel:link}}'}</DocsInlineCode>, 'DM', 'Link to the honeypot channel message.'],
          [<DocsInlineCode>{'{{reinvite:link}}'}</DocsInlineCode>, 'DM', 'Invite link to rejoin the server (requires Reinvite experiment).'],
          [<DocsInlineCode>{'{{user:mention}}'}</DocsInlineCode>, 'Log', 'Mentions the user.'],
          [<DocsInlineCode>{'{{user:id}}'}</DocsInlineCode>, 'Log', 'Raw user ID.'],
          [<DocsInlineCode>{'{{honeypot:channel:mention}}'}</DocsInlineCode>, 'Log', 'Mentions the honeypot channel.'],
          [<DocsInlineCode>{'{{honeypot:moderation-count}}'}</DocsInlineCode>, 'Log', 'Total moderation count for this server.'],
        ]}
      />
      <DocsCallout tone="note" title="Log message requirement">
        Your log message must include <DocsInlineCode>{'{{user:mention}}'}</DocsInlineCode> or <DocsInlineCode>{'{{user:id}}'}</DocsInlineCode>.
      </DocsCallout>

      <DocsSubheading title="Defaults (examples)" />
      <DocsP>These are the default templates used if you do not customize messages.</DocsP>
      <DocsCodeBlock
        language="Warning Message"
        code={`## DO NOT SEND MESSAGES IN THIS CHANNEL\n\nThis channel is used to catch spam bots. Any messages sent here will result in **{{action:text}}**.`}
      />
      <DocsCodeBlock
        language="DM Message"
        code={`## Honeypot Triggered\n\nYou have been **{{action:text}}** from **{{server:name}}** for sending a message in the [honeypot]({{honeypot:channel:link}}) channel.`}
      />
      <DocsCodeBlock
        language="Log Message"
        code={`{{user:mention}} was {{action:text}} for triggering the honeypot in {{honeypot:channel:mention}}\n-# User ID: \`{{user:id}}\``}
      />

    </DocsSection>

    <DocsSection title="Related">
      <DocsLearnMore href="/docs/how-it-works" text="about how the action flow works" />
    </DocsSection>
  </DocsLayout >
}
