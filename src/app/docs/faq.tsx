import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsFaqItem,
  DocsFaqList,
  DocsInlineCode,
  DocsLearnMore,
  DocsLink,
  DocsP,
  DocsSection,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'FAQ - Honeypot'
const description = 'Quick answers to common questions about the Honeypot Discord bot.'
const url = 'https://honeypot.riskymh.dev/docs/faq'

export const Route = createFileRoute('/docs/faq')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="FAQ" description="Quick answers to common questions." />

    <DocsSection title="FAQ">
      <DocsFaqList>
        <DocsFaqItem question="What does Honeypot actually do?">
          It watches one dedicated channel and automatically moderates anyone who posts there.
        </DocsFaqItem>
        <DocsFaqItem question="Why does this catch spam bots?">
          Most spam bots blast every visible channel. A normal-looking trap channel catches those blasts immediately.
        </DocsFaqItem>
        <DocsFaqItem question="Is Honeypot free?">
          Yes. It is free to use and lightweight to run.
        </DocsFaqItem>
        <DocsFaqItem question="How is it sustainable?">
          Honeypot barely uses resources, so the ongoing cost is low. If you want to support it, you can sponsor the project on GitHub.
          <div className="mt-2">
            <DocsLink href="https://github.com/sponsors/RiskyMH">https://github.com/sponsors/RiskyMH</DocsLink>
          </div>
        </DocsFaqItem>
        <DocsFaqItem question="What is softban?">
          Softban means ban then unban. It removes the user’s recent messages while allowing rejoin later.
        </DocsFaqItem>
        <DocsFaqItem question="Does it read messages outside the honeypot channel?">
          No. It only reacts to messages in the honeypot channel.
        </DocsFaqItem>
        <DocsFaqItem question="Why did the bot fail to ban someone?">
          Either its role is below the user or it lacks Ban Members permission.
        </DocsFaqItem>
        <DocsFaqItem question="Can I customize the messages?">
          Yes. Use <DocsInlineCode>/honeypot-messages</DocsInlineCode> to customize the warning, DM, and log messages.
        </DocsFaqItem>
        <DocsFaqItem question="Can I self-host it?">
          Yes. See the <DocsLink href="/docs/self-hosting">self-hosting guide</DocsLink>.
        </DocsFaqItem>
        <DocsFaqItem question="Where are commands available?">
          Most commands run in servers. The <DocsInlineCode>/stats</DocsInlineCode> command runs in bot DMs.
        </DocsFaqItem>
      </DocsFaqList>
    </DocsSection>

    <DocsSection title="More help">
      <DocsLearnMore href="/docs/setup-guide" text="for the full setup guide" />
    </DocsSection>
  </DocsLayout>
}
