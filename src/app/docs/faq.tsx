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
          Yes. It is free to use and lightweight to run. There are no limits or paywalls of any kind.
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
        <DocsFaqItem question="Can you unban me?">
          That&apos;s up to the server&apos;s moderators, not the bot or anyone else.
        </DocsFaqItem>
        <DocsFaqItem question="Can I customize the messages?">
          Yes. Use <DocsInlineCode>/honeypot-messages</DocsInlineCode> to customize the warning, DM, and log messages.
        </DocsFaqItem>
        <DocsFaqItem question="Can I self-host it?">
          Yes. See the <DocsLink href="/docs/self-hosting">self-hosting guide</DocsLink>.
        </DocsFaqItem>
        <DocsFaqItem question="Where are commands available?">
          Most <DocsLink href="/docs/commands">commands</DocsLink> run in servers. The <DocsInlineCode>/stats</DocsInlineCode> command runs in bot DMs.
        </DocsFaqItem>
        <DocsFaqItem question="What permissions do I need to use /honeypot?">
          You need Manage Server, Ban Members, Moderate Members, Manage Messages, and Manage Channels.
        </DocsFaqItem>
        <DocsFaqItem question="Do I need to do anything after adding the bot?">
          If you gave it the right permissions, most things are already done. You can use <DocsInlineCode>/honeypot</DocsInlineCode> to tweak settings further.
        </DocsFaqItem>
        <DocsFaqItem question="Can I rename the honeypot channel?">
          Yes. Any channel in the server works as long as the bot has Ban Members permission.
        </DocsFaqItem>
        <DocsFaqItem question="Why isn&apos;t my channel showing up?">
          Only normal text channels are supported because they have the highest odds of being spammed in.
        </DocsFaqItem>
        <DocsFaqItem question="Why does it ignore bots?">
          Only real Discord users are banned. Bots are seen as trusted as manually added by admins.
        </DocsFaqItem>
        <DocsFaqItem question="Can I customize the action?">
          Yes. Use <DocsInlineCode>/honeypot</DocsInlineCode> to choose between ban, softban (default) or temporarily disabled.
        </DocsFaqItem>
        <DocsFaqItem question="Where are actions logged?">
          To an admin channel you choose. Configure where errors and logs are sent with <DocsInlineCode>/honeypot</DocsInlineCode>.
        </DocsFaqItem>
        <DocsFaqItem question="Can it false-ban normal users?">
          It only triggers when someone posts in the honeypot channel. If a real user accidentally enters it, they will be treated the same as any other trigger event.
        </DocsFaqItem>
        <DocsFaqItem question="What are experiments?">
          Optional extra features I&apos;ve added. See the <DocsLink href="/docs/configuration#experiments">experiments docs</DocsLink> for details.
        </DocsFaqItem>
        <DocsFaqItem question="Any tips for best results?">
          Ensure its name isnt easily guessable & is high in the channel list. Check out the <DocsLink href="/docs/tips">tips page</DocsLink>.
        </DocsFaqItem>
        <DocsFaqItem question="How to prevent mods from being affected?">
          Use Discord&apos;s permission system → ensure trusted roles either can&apos;t see the honeypot channel or have a role above the bot&apos;s highest role so the bot can&apos;t act on them.
        </DocsFaqItem>
        <DocsFaqItem question="Can users rejoin after a softban?">
          Yes as they are unbanned immediately. You can add an invite link in <DocsInlineCode>/honeypot-messages</DocsInlineCode> so they can easier.
        </DocsFaqItem>
        <DocsFaqItem question="How can I get help?">
          Join the <DocsLink href="https://discord.gg/qK9pfnB3Yv">Discord server</DocsLink> for fast support.
        </DocsFaqItem>
      </DocsFaqList>
    </DocsSection>

    <DocsSection title="More help">
      <DocsLearnMore href="/docs/setup-guide" text="for the full setup guide" />
    </DocsSection>
  </DocsLayout>
}
