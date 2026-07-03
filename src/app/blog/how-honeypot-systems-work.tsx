import { createFileRoute } from '@tanstack/react-router'
import { BlogPostLayout, getBlogPostMeta } from '@/components/blog/page'
import {
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
  DocsSubheading,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const meta = getBlogPostMeta('how-honeypot-systems-work')

const title = `${meta.title} - Honeypot Blog`
const description = meta.description
const url = 'https://honeypot.riskymh.dev/blog/how-honeypot-systems-work'

export const Route = createFileRoute('/blog/how-honeypot-systems-work')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'article', publishedTime: meta.dateCanonical, author: 'RiskyMH' }),
})

function RouteComponent() {
  return (
    <BlogPostLayout meta={meta}>
      <DocsP>
        A honeypot may start as a simple bait channel, but modern spam quickly turns it into a more complex detection system. The real engineering lies in the gap between the basic idea and something that works reliably at scale.
      </DocsP>

      <DocsP>
        This article focuses on Discord, one of the most active platforms that has recently become a huge target for automated abuse.
      </DocsP>

      <DocsSection id="simplest-possible-honeypot" title="The simplest possible honeypot">
        <DocsP>
          Strip the idea to its minimum: one bait, one trigger, one action.
        </DocsP>

        <DocsP>
          You create a channel. You make it visible to new members. You do nothing with it. Anyone who sends a message there gets removed.
        </DocsP>

        <DocsP>
          In the right conditions, this works remarkably well. The reason has nothing to do with content analysis or pattern matching. It works because of what the channel <em>represents</em>: something no legitimate user would ever interact with. A space that is visible but should never be touched. The moment someone touches it, something is wrong.
        </DocsP>
      </DocsSection>

      <DocsSection id="why-it-works-automation" title="Why it works: automation is predictable">
        <DocsP>
          Human behaviour in online communities follows recognisable patterns. People read before they write. They orient themselves by checking pinned messages, reading recent conversation, and getting a sense of the room. They respond to context and choose <em>where</em> to say something based on what a channel is for.
        </DocsP>

        <DocsP>
          Spam bots and compromised accounts do not do any of this.
        </DocsP>

        <DocsP>
          Automated systems optimise for reach, not relevance. A bot running a phishing campaign does not evaluate which channels are appropriate - it sends to every channel it can access. A compromised account spreading a crypto scam does not pause to read pinned messages. The channel name, the posted warning, the existing conversation - none of it registers.
        </DocsP>

        <DocsP>
          This behavioural gap is the foundation of honeypot detection. The trap does not need to understand the message. It only needs to observe that the sender could not distinguish between a real channel and a bait one. That distinction between a human who reads and a bot that blasts has remained remarkably stable even as spam techniques have evolved significantly in other ways.
        </DocsP>
      </DocsSection>

      <DocsSection id="evolution-of-discord-spam" title="The evolution of Discord spam">
        <DocsP>
          Understanding why detection systems become complex requires understanding what they are up against. Discord spam has changed substantially over the years, and each wave forced defenders to adapt.
        </DocsP>

        <DocsSubheading id="early-raids" title="Early raids" />
        <DocsP>
          The first large-scale Discord spam was blunt: dozens of accounts joining simultaneously, sending identical text in rapid succession. The content was the same across accounts, the timing was the same, the usernames followed the same template. Defenders could write a regex, set a rate limit, and catch most of it.
        </DocsP>

        <DocsSubheading id="content-gets-smarter" title="Content gets smarter" />
        <DocsP>
          Spammers introduced variation to defeat exact-match filters. The same underlying message would arrive in slightly different forms → different punctuation, different spacing, synonyms swapped in.{' '}
          Unicode became a tool: visually identical characters from different code points could silently break keyword matching. A filter looking for <DocsInlineCode>discord.gg/scam</DocsInlineCode> would not catch <DocsInlineCode>discord.gg/ꜱcam</DocsInlineCode>, because <DocsInlineCode>ꜱ</DocsInlineCode> (U+A731, Latin Letter Small Capital S) is not the ASCII letter <DocsInlineCode>s</DocsInlineCode>. The messages looked identical to a human reader and invisible to a text filter.
        </DocsP>

        <DocsSubheading id="image-based-spam" title="Image-based spam" />
        <DocsP>
          When text filters improved, spammers moved to images entirely. A message containing no text, just an image promoting a fraudulent scheme, cannot be caught by any text-based rule. This has become increasingly common and remains one of the harder problems for content-based detection to address.
        </DocsP>

        <DocsSubheading id="compromised-accounts" title="Compromised accounts" />
        <DocsP>
          Modern Discord spam frequently does not come from freshly created bot accounts, rather it comes from real accounts that have been stolen. A user runs a malicious file and software quietly extracts their session token.{' '}
          Because Discord authenticates via tokens after the initial login, an attacker with a valid token can operate an account immediately, bypassing passwords and two-factor authentication entirely.{' '}
          <DocsLink href="https://discord.com/safety/360044104071-tips-against-spam-and-hacking">Discord's own safety documentation</DocsLink> confirms this: resetting your password generates a new token and invalidates any stolen one.
        </DocsP>

        <DocsP>
          The account used to spam your server may be months or years old, with a normal conversation history, already a member of servers with strict verification requirements. Age-based checks, activity thresholds, and manual review all fail against a stolen account that already passed them.
        </DocsP>

        <DocsP>
          The scale of this problem is documented in{' '}
          <DocsLink href="https://discord.com/blog/discord-transparency-report-q2-2022">Discord's Q2 2022 Transparency Report</DocsLink>: in a single three-month window, Discord disabled <strong>27,733,948</strong> accounts for spam or spam-related offences, with 90% of those caught proactively before any user report. That figure is from 2022. The problem has not decreased since.
        </DocsP>

        <DocsP>
          Discord's own breakdown of spam types, published in their{' '}
          <DocsLink href="https://discord.com/safety/how-discord-is-fighting-spam">fighting spam article</DocsLink>, is useful context. They categorise it into three groups: generated accounts operated entirely through automation; compromised accounts (real users whose sessions were stolen and whose account is then used to spam people who trust them); and human-operated accounts run by actual people. Compromised accounts cause, in Discord's own words, "some of the highest user-impact spam", precisely because the messages arrive from accounts that look legitimate to everyone in the server.
        </DocsP>
      </DocsSection>

      <DocsSection id="why-simple-rules-fail" title="Why simple rules stop working">
        <DocsP>
          The instinct when encountering spam is to describe what it looks like and block messages that match. This is keyword filtering and it fails in predictable ways.
        </DocsP>

        <DocsP>
          <strong>False negatives</strong> emerge as soon as the attacker observes what is being blocked. The spam changes. The filter misses it. You update the filter. The spam changes again. This is an arms race the defender is structurally behind in, because the attacker sees what gets blocked and adapts, while the defender only sees what gets through.
        </DocsP>

        <DocsP>
          <strong>False positives</strong> are the opposite problem. As filters become more aggressive, they start catching legitimate messages. A filter blocking all external links catches spam and also catches every member sharing a resource. A rate limit aggressive enough to stop a raid also catches a moderator trying to respond in real time. Every tightening of a threshold increases the cost to legitimate users.
        </DocsP>

        <DocsP>
          <strong>Content becomes unreliable as a signal.</strong> If the spam uses images instead of text, content filters have nothing to scan. If it uses{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/Homoglyph">homoglyph substitution</DocsLink>, keyword matching fails. If the account sending it has a legitimate conversation history, anomaly detection on account age will not trigger.
        </DocsP>

        <DocsP>
          Static rules applied to message content always hit this ceiling. The attacker's surface area is the content and content is cheap to change.
        </DocsP>
      </DocsSection>

      <DocsSection id="behavioural-signals" title="Behavioural signals">
        <DocsP>
          The alternative is to focus not on what the spam says, but on what the spammer <em>does</em>.
        </DocsP>

        <DocsP>
          Behaviour is harder to fake than content. A spammer can randomise a message in seconds. They cannot easily randomise the pattern of their movement through a server, or convincingly mimic the pauses, the context-sensitivity, and the selective choices of a real user reading and responding to a conversation. Automation is consistent in ways that humans are not, and that consistency becomes visible if you know where to look.
        </DocsP>

        <DocsP>
          This is what makes the honeypot channel durable as a signal. It does not ask anything about message content. It asks a single binary question: did this account send a message in a channel that real users never touch? If yes, something is wrong and the confidence in that conclusion is high precisely because the channel has no legitimate use case.
        </DocsP>

        <DocsP>
          Other behavioural signals sit alongside it. An account that sends to many channels in rapid succession looks automated. One that joins and immediately posts with no dwell time is suspicious. And one that ignores conversational context - sending the same message regardless of what was said before - almost certainly is. Each of these signals is weaker than the honeypot trigger on its own, but they become useful in combination.
        </DocsP>
      </DocsSection>

      <DocsSection id="layered-detection" title="Layered detection">
        <DocsP>
          Real spam detection systems combine multiple signals, each providing partial evidence, and use the combination to reach a decision.
        </DocsP>

        <DocsP>
          Think of it as accumulated evidence. A honeypot trigger contributes strong evidence something is wrong. Sending to many channels in quick succession adds moderate evidence. Joining within the last few seconds adds weaker evidence. Prior interactions with the server may reduce the overall weight. When the accumulated evidence crosses a threshold, action is taken. Below it, the account is watched.
        </DocsP>

        <DocsP>
          This architecture has practical advantages. Weak signals that would generate too many false positives alone become useful when combined with others. The system is harder to game, because defeating one signal does not defeat the rest. And it supports natural escalation: a low-confidence detection might produce a temporary timeout; a high-confidence one produces a permanent ban.
        </DocsP>

        <DocsP>
          The honeypot channel sits near the top of this confidence hierarchy. Because legitimate users genuinely never interact with it, false positives are rare. It is fast, cheap, and high-signal - and for many servers it is sufficient on its own.
        </DocsP>
      </DocsSection>

      <DocsSection id="when-honeypots-make-sense" title="When honeypots make sense">
        <DocsP>
          The channel-based approach works well in specific conditions.
        </DocsP>

        <DocsP>
          <strong>Large public communities</strong> are the primary targets for automated spam. The larger a server, the more attractive it is - more potential victims, more channels, more damage when a raid lands. These are also the servers where an extra obscure channel goes unnoticed by real users.
        </DocsP>

        <DocsP>
          <strong>Communities that experience raids.</strong> When a spam event can expose thousands of members to phishing links in seconds, human moderators cannot react fast enough. Automated, immediate removal is the only practical response at that speed.
        </DocsP>

        <DocsP>
          <strong>Servers with open invites and many unknown members.</strong> The approach relies on legitimate users not accidentally triggering it. In large public servers with many new members daily, that risk exists but is manageable - particularly with a visible warning message inside the honeypot channel itself.
        </DocsP>
      </DocsSection>

      <DocsSection id="when-they-do-not" title="When they do not">
        <DocsP>
          <strong>Private or tight-knit communities.</strong> In a small server where every member is known, a false positive matters more. A legitimate user who messages the wrong channel gets removed. In a community built on trust, that is a meaningful cost with real consequences.
        </DocsP>

        <DocsP>
          <strong>Servers where every channel sees active use.</strong> If the community uses all its channels regularly, an unused bait channel either stands out and draws curious members, or blends in and attracts accidental interactions. Neither outcome is good.
        </DocsP>

        <DocsP>
          <strong>Servers with very low spam exposure.</strong> A small, invite-only server does not need automated spam detection. The overhead and the risk of false positives outweigh the benefit of catching bots that are unlikely to appear.
        </DocsP>

        <DocsP>
          These are not arguments against honeypots generally; they are reasons to match the tool to the context. A large public server and a private friend group have different threat models, and applying the same approach to both does not make sense.
        </DocsP>
      </DocsSection>

      <DocsSection id="what-this-means" title="What this means in practice">
        <DocsP>
          Spam detection is ultimately about understanding behaviour more than content. Spam messages change constantly. The way automated systems move through a server changes much more slowly.
        </DocsP>

        <DocsP>
          That is the lasting strength of the honeypot approach: it exploits a reliable behavioural difference. Automation tends to touch everything it can reach. Real users are selective.
        </DocsP>

        <DocsP>
          Building this reliably across tens of thousands of servers (while keeping false positives low) is the challenge I tackled with{' '}
          <DocsLink href="https://honeypot.riskymh.dev/">Honeypot</DocsLink>.
          {/* The architecture decisions behind it are covered in{' '}
          <DocsLink href="/blog/engineering-at-scale">Engineering Honeypot at Scale</DocsLink>. */}
        </DocsP>
      </DocsSection>
    </BlogPostLayout>
  )
}
