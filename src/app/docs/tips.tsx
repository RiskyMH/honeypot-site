import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsChecklist,
  DocsChecklistItem,
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
  DocsSubheading,
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
      <DocsP>
        The whole point of <DocsLink href="/blog/what-is-a-honeypot">a honeypot</DocsLink> is that spammers may not be able to tell it is one. These tips
        help your trap blend in so bots may hit it first.
      </DocsP>

      <DocsSubheading title="Channel naming" />
      <DocsP>
        Many spam bots may blacklist channel names like <DocsInlineCode>#honeypot</DocsInlineCode>,
        <DocsInlineCode>#trap</DocsInlineCode>, or <DocsInlineCode>#staff-only</DocsInlineCode>.
        If your trap has an obvious name, bots may skip it entirely.
      </DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Use a mundane name like <DocsInlineCode>#general-chat</DocsInlineCode> or <DocsInlineCode>#welcome</DocsInlineCode>. Nothing easily blacklistable.</DocsChecklistItem>
        <DocsChecklistItem>Enable the "Random Channel Name" (don't msg here style list) or "Chaos" (random letters) experiment to change it every day.</DocsChecklistItem>
      </DocsChecklist>

      <DocsSubheading title="Channel positioning" />
      <DocsP>
        Spam bots often post in the first visible channel they see to maximise exposure. If your
        honeypot is buried at the bottom, bots may get caught by other mod tools first, or they
        may spam every other channel before reaching your trap.
      </DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Place the honeypot near the top of your channel list. Within top three seems ideal.</DocsChecklistItem>
        <DocsChecklistItem>Avoid the very first slot; some bots may skip channel #1 as a heuristic.</DocsChecklistItem>
        <DocsChecklistItem>Keep it in a public-looking category. Bots may skip channels in categories named "Mod Only" or "Admin" assuming they lack access.</DocsChecklistItem>
      </DocsChecklist>

      <DocsSubheading title="Make it look lived-in" />
      <DocsP>
        A bare channel with a single bot message seems suspicious. Some automated tools may check for
        signs of real activity before posting.
      </DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Send a few messages under the bot's message, including one with an image. Some tools seem to treat image attachments as a signal of human activity.</DocsChecklistItem>
        <DocsChecklistItem>Space messages out with natural-looking text so it reads like a real conversation.</DocsChecklistItem>
        <DocsChecklistItem>Enable the <strong>Channel Warmer</strong> experiment. It posts a message in the honeypot channel daily so it always looks active.</DocsChecklistItem>
      </DocsChecklist>

      <DocsSubheading title="Multiple honeypots" />
      <DocsP>
        One honeypot is good; several with different strategies are better. Enable the <strong>Many Honeypots</strong> experiment for multi-channel trapping.
      </DocsP>
      <DocsChecklist>
        <DocsChecklistItem><strong>Text + Voice.</strong> Add a voice channel honeypot too. Some bots seem to target the lowest voice channel first.</DocsChecklistItem>
        <DocsChecklistItem><strong>Different names.</strong> Use varied naming conventions so no single blacklist covers all of them.</DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="Permissions & safety">
      <DocsChecklist>
        <DocsChecklistItem>Keep the bot role above all member roles. If it is below, bans may fail.</DocsChecklistItem>
        <DocsChecklistItem>Set a dedicated log channel so moderators see every action and error.</DocsChecklistItem>
        <DocsChecklistItem>Never use <DocsInlineCode>#general</DocsInlineCode> or any active channel as the honeypot. Real members may get banned.</DocsChecklistItem>
        <DocsChecklistItem>Test with an alt account to verify the DM, action, and log entry all work.</DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="DM & member experience">
      <DocsP>Configure messages via <DocsInlineCode>/honeypot-messages</DocsInlineCode>.</DocsP>
      <DocsChecklist>
        <DocsChecklistItem>Turn on the <strong>Reinvite</strong> experiment to auto-add an invite link, or manually include one. This lets legitimate members rejoin after a softban.</DocsChecklistItem>
        <DocsChecklistItem>Keep the tone calm and explain what happened. This reduces confusion for real users.</DocsChecklistItem>
        <DocsChecklistItem>Localise the in-channel warning to your server's primary language via <DocsInlineCode>/honeypot-messages</DocsInlineCode>.</DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="Common mistakes">
      <DocsChecklist>
        <DocsChecklistItem><strong>Obvious names.</strong> <DocsInlineCode>#honeypot</DocsInlineCode>, <DocsInlineCode>#ban-plz</DocsInlineCode>. Spam scripts may blacklist these. You may only catch the most basic bots. </DocsChecklistItem>
        <DocsChecklistItem><strong>Trap at the very bottom.</strong> Bots may target the first visible channels. A bottom-of-list trap may catch nothing. </DocsChecklistItem>
        <DocsChecklistItem><strong>No log channel.</strong> You may not be able to tell if the honeypot is working, or if it broke due to a permission change. </DocsChecklistItem>
        <DocsChecklistItem><strong>Never testing.</strong> Roles may get re-ordered, permissions may get revoked. Test with an alt account periodically. </DocsChecklistItem>
        <DocsChecklistItem><strong>Using a real channel.</strong> Setting <DocsInlineCode>#general</DocsInlineCode> or any active channel as the honeypot may ban real members. </DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>
  </DocsLayout>
}
