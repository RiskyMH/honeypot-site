import { createFileRoute } from '@tanstack/react-router'
import { BlogPostLayout, getBlogPostMeta } from '@/components/blog/page'
import {
  DocsChecklist,
  DocsChecklistItem,
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
  DocsSubheading,
  DocsTable,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'

const meta = getBlogPostMeta('how-discord-spam-detection-works')

const title = `${meta.title} - Honeypot`
const description = meta.description
const url = `${APP_URL}/blog/how-discord-spam-detection-works`

export const Route = createFileRoute('/blog/how-discord-spam-detection-works')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'article', publishedTime: meta.dateCanonical, author: 'RiskyMH' }),
})

function RouteComponent() {
  return (
    <BlogPostLayout meta={meta}>
      <DocsP>
        Discord spam is not one problem. It shows up as repeated text, as text that changes every time, as images with no text at all, as automated accounts, and as messages from real accounts that were stolen. No single detector sees all of that, so a whole toolbox of approaches grew up over time.
      </DocsP>

      <DocsP>
        This guide walks through that toolbox from the simplest signal to the more specialised ones: what people see, what the message contains, how it is sent, who sent it, and eventually why they interacted with something at all. For each one I cover what it checks, what it is good at, where it stands today, where it is heading, and some well known bots that use it. The goal is to show what is possible. It is not a ranking, because the honest answer is that you will probably want several of these running at once.
      </DocsP>

      <DocsP>
        Spam and its defences grew up together. Early raids were easy to catch because many accounts sent the same text. As spammers started varying text, using images and eventually compromising legitimate accounts, defenders had to look at more than the message itself.
      </DocsP>

      <DocsSection id="people-reports-and-moderator-pings" title="1. People: reports and moderator pings">
        <DocsP>
          The first defence was a human. A member sees spam, pings the moderator role or uses a report command, and a moderator deals with it. Discord's{' '}
          <DocsLink href="https://discord.com/community/keeping-your-community-safe">best practices keeping server safe</DocsLink> recommends this. Good examples include moderator pings, report commands, modmail channels and modmail bots.{' '}
          <DocsLink href="https://discord.com/discovery/applications/1540722224288366682">My own /report bot</DocsLink> is an example of the report command style.
        </DocsP>

        <DocsP>
          This layer understands context in a way no automated system does. A person can tell a scam from a joke. The limit is speed. Someone has to be awake and watching, and the spam has already been seen by the time they act. In a big server that delay is the whole problem.
        </DocsP>

        <DocsSubheading id="people-where-it-is-now" title="Where it is now" />
        <DocsP>
          Reports are still the safety net for everything automation misses. They also feed the platform. Discord says community reports raised its ability to identify bad actors by 1000%, as described in{' '}
          <DocsLink href="https://discord.com/safety/how-discord-is-fighting-spam">How We're Fighting Spammers on Discord</DocsLink>.
        </DocsP>

        <DocsSubheading id="people-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Reporting stays, but automation is taking the obvious cases first so moderators only see what is left.
        </DocsP>

        <DocsSubheading id="people-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>Discord's built-in report options for messages and DMs.</DocsChecklistItem>
          <DocsChecklistItem>Report command and modmail bots, which collect reports in one place for your moderators.</DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="keyword-and-link-filters-automod" title="2. Keyword and link filters: AutoMod">
        <DocsP>
          Next came automatic rules. The system checks each message against a list of words, phrases or link patterns and acts on a match.
        </DocsP>

        <DocsP>
          If you take one thing from this guide, make it this: before adding another moderation bot, turn on Discord's own{' '}
          <DocsLink href="https://support.discord.com/hc/articles/4421269296535">AutoMod</DocsLink> and set up two rules. Block invite links, and block @everyone pings.
        </DocsP>

        <DocsP>
          Those two rules fit how a lot of spam works. Most spam is built around an invite link or a scam link. A mass ping is what turns a single message into a notification for the whole server. Remove both and many of the lazy attempts fail on the spot.
        </DocsP>

        <DocsP>
          AutoMod is free and needs no bot to install. Discord describes it as detecting and blocking content before it is ever posted. A moderation bot generally has to see the message first and delete it afterwards.
        </DocsP>

        <DocsP>A good starting setup:</DocsP>
        <DocsChecklist>
          <DocsChecklistItem>
            A custom keyword rule for invites, using wildcard patterns such as <DocsInlineCode>*discord.gg/*</DocsInlineCode> and{' '}
            <DocsInlineCode>*discord.com/invite/*</DocsInlineCode>.
          </DocsChecklistItem>
          <DocsChecklistItem>
            A custom keyword rule for <DocsInlineCode>@everyone</DocsInlineCode> and <DocsInlineCode>@here</DocsInlineCode>.
          </DocsChecklistItem>
          <DocsChecklistItem>Exempt rules for your moderator roles and any announcement channels.</DocsChecklistItem>
          <DocsChecklistItem>The built-in Block Mention Spam and Block Spam Content rules switched on.</DocsChecklistItem>
          <DocsChecklistItem>
            Separately, remove the Mention Everyone permission from the default role so only trusted roles can ping everyone at all.
          </DocsChecklistItem>
        </DocsChecklist>

        <DocsP>
          Filters are also the first thing spammers adapt to. Lookalike Unicode characters can slip past word matching, and an image-only message has no text to match. That is why this layer is the base of a setup and not the whole of it.
        </DocsP>

        <DocsSubheading id="filters-where-it-is-now" title="Where it is now" />
        <DocsP>
          Invite and mass ping rules still stop a large amount of common spam for no cost, which makes them the best first step.
        </DocsP>

        <DocsSubheading id="filters-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Discord keeps adding built-in rule types, so it is worth checking what AutoMod already does before adding a bot for the same job.
        </DocsP>

        <DocsSubheading id="filters-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>Discord's own AutoMod, as above.</DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://docs.probot.io/docs/modules/automod">ProBot</DocsLink> runs several of its filters through Discord's AutoMod rules.
          </DocsChecklistItem>
          <DocsChecklistItem>
            General purpose bots such as <DocsLink href="https://carl.gg/">Carl-bot</DocsLink> and <DocsLink href="https://dyno.gg/">Dyno</DocsLink> have their own keyword and link filters.
          </DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="content-matching-have-we-seen-this-before" title="3. Content matching: have we seen this before?">
        <DocsP>
          Filters match what you tell them to look for. Content matching goes further and keeps a growing collection of known bad things, then checks new messages against it.
        </DocsP>

        <DocsP>
          For text that means known phrases and shared blocklists of scam domains. For images it means fingerprints. A normal cryptographic hash is useless here, because changing one pixel changes the whole hash. A perceptual hash (pHash) works the other way around. Similar images produce similar hashes, so a resized, recompressed or lightly cropped copy of a known scam image lands close to the original. The system compares hashes by distance and flags anything under a threshold.
        </DocsP>

        <DocsP>
          This is a good fit for how image spam works. A campaign tends to reuse a small set of images thousands of times with minor edits, so one confirmed sample can protect every server that shares the database.
        </DocsP>

        <DocsSubheading id="content-matching-where-it-is-now" title="Where it is now" />
        <DocsP>
          Image-only spam is the reason this layer matters. A text filter has nothing to read when the message is only a picture, and fingerprinting is one of the cheapest ways to handle it.
        </DocsP>

        <DocsSubheading id="content-matching-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          As spammers get better at producing endless variants, near-duplicate matching has to cover a wider range of edits. I expect it to be paired more and more with classifiers rather than used alone.
        </DocsP>

        <DocsSubheading id="content-matching-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>Discord's AutoMod spam content rule looks for messages that resemble reported spam.</DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://raidprotect.bot/">RaidProtect</DocsLink> has an image analysis module called ScamLens for scam images.
          </DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="behaviour-detection-does-this-look-like-spam" title="4. Behaviour detection: does this look like spam?">
        <DocsP>Content detection asks what was sent. Behaviour detection asks how it was sent.</DocsP>

        <DocsP>
          The signals include message frequency, repeated messages, how many channels an account posts in, how many accounts join in a short window, and bursts of activity across a server. Automation tends to be consistent in ways people are not. It sends fast, it sends the same thing, and it ignores what the conversation is about.
        </DocsP>

        <DocsP>
          This approach does not depend on the wording of the spam, which helps because wording is cheap to change. Thresholds still need tuning. A limit strict enough to stop a raid can also catch a busy moderator or a fast chat during an event.
        </DocsP>

        <DocsSubheading id="behaviour-where-it-is-now" title="Where it is now" />
        <DocsP>
          A raid of fresh accounts and a single compromised account look very different. A raid is loud. A compromised account might send only a handful of messages. The same thresholds do not fit both.
        </DocsP>

        <DocsSubheading id="behaviour-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          More systems combine several weak signals into one score instead of relying on a single rule. A join a few seconds ago adds a little suspicion. Posting in many channels adds more. Crossing the total triggers action.
        </DocsP>

        <DocsSubheading id="behaviour-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>Discord's AutoMod mention spam rule, which limits unique mentions per message.</DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://docs.probot.io/docs/modules/automod">ProBot</DocsLink> can flag users who send more than five messages in five seconds.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://wickbot.com/">Wick</DocsLink> describes its anti spam as based on a heat system.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://top.gg/bot/651095740390834176">Security Bot</DocsLink> uses a score based anti raid system that can lock channels when a limit is reached.
          </DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="verification-can-we-stop-them-before-they-start" title="5. Verification: can we stop them before they start?">
        <DocsP>
          Verification is preventative. Instead of detecting bad activity after it happens, it tries to make getting in more expensive.
        </DocsP>

        <DocsP>
          The common tools are CAPTCHAs, button verification, role gates, restrictions on new members, account age requirements, and extra checks that only switch on when something looks suspicious. Think of it as access control. A raid that needs a hundred accounts to each solve a challenge costs far more than one that does not.
        </DocsP>

        <DocsP>
          Discord has described the same idea at the platform level. In its{' '}
          <DocsLink href="https://discord.com/safety/how-discord-is-fighting-spam">post on fighting spam</DocsLink>, it talked about testing a server safe mode that watches for inauthentic behaviour from new members and requires CAPTCHAs for a while when it sees it.
        </DocsP>

        <DocsSubheading id="verification-where-it-is-now" title="Where it is now" />
        <DocsP>
          Verification is strongest against fresh automated accounts. It is weaker against a stolen account that joined and passed the gate long ago.
        </DocsP>

        <DocsSubheading id="verification-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Adaptive verification, where the gate only appears during suspicious activity, keeps the cost low for real members while still raising it for raids.
        </DocsP>

        <DocsSubheading id="verification-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>
            <DocsLink href="https://wickbot.com/">Wick</DocsLink> offers CAPTCHA verification for everyone or only for suspicious joins.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://top.gg/bot/651095740390834176">Security Bot</DocsLink> supports hCaptcha, in app captcha codes and one click verification.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://captcha.bot/">Captcha.bot</DocsLink> is a dedicated captcha option.
          </DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="reputation-and-account-signals-who-is-sending-this" title="6. Reputation and account signals: who is sending this?">
        <DocsP>Reputation is separate from behaviour. Behaviour looks at what an account does right now. Reputation looks at what is known about the account.</DocsP>

        <DocsP>
          Signals include account age, moderation history, membership across servers, whether the account has been flagged elsewhere, and other trust indicators. Some systems share that information across servers so a spammer caught in one place is recognised in another.
        </DocsP>

        <DocsP>
          The important point is that reputation is not identity. A compromised account can be years old with a normal history and still be malicious right now. Discord's own{' '}
          <DocsLink href="https://discord.com/safety/how-discord-is-fighting-spam">fighting spam article</DocsLink> says compromised accounts cause some of the highest user impact spam because the messages come from accounts that look legitimate.
        </DocsP>

        <DocsSubheading id="reputation-where-it-is-now" title="Where it is now" />
        <DocsP>Reputation works well as one signal among several and badly as the only one.</DocsP>

        <DocsSubheading id="reputation-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Shared intelligence only helps if it arrives in time. In the data I have looked at, the same spam wave can reach different servers within seconds of each other, so a shared list has almost no window to warn anyone first.
        </DocsP>

        <DocsSubheading id="reputation-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>
            Discord's own account level detection. In its{' '}
            <DocsLink href="https://discord.com/blog/discord-transparency-report-q2-2022">Q2 2022 transparency report</DocsLink>, Discord said it disabled over 27 million accounts for spam in one quarter, with 90% caught proactively.
          </DocsChecklistItem>
          <DocsChecklistItem>Report Spam signals from members, which feed that same detection.</DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="honeypots-why-did-they-interact-with-this" title="7. Honeypots: why did they interact with this?">
        <DocsP>
          Honeypots take a different approach from everything above. Most systems look at what someone sends. A honeypot creates something legitimate users have no reason to touch, then watches for anyone who does.
        </DocsP>

        <DocsP>
          The idea is old in security, and honeypot channels have existed on Discord for a while, but they have become more popular recently as spam increasingly targets every channel it can reach. Image-only messages made content analysis expensive, and stolen accounts made account checks unreliable. A decoy channel can sidestep all three. It does not read the message, it does not care how old the account is, and it does not need to understand the image. The interaction itself is the signal, so it detects intent instead of content.
        </DocsP>

        <DocsSubheading id="honeypots-where-it-is-now" title="Where it is now" />
        <DocsP>
          When the trap is placed somewhere legitimate members have no reason to use, it can be cheap, fast and have very few false positives. For raw image spam with no caption, it works without any image parsing.
        </DocsP>

        <DocsSubheading id="honeypots-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Spam is slowly adapting. Some bots now pick channels more carefully, and some target voice channel chat, which older tools often ignore. Expect setups with several honeypots, a voice channel honeypot, and channels that look active. The goal is not a perfect trap but making the cheapest attacks not worth it. Honeypots also suit some servers better than others, mainly large public ones.
        </DocsP>

        <DocsSubheading id="honeypots-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>
            <DocsLink href="https://raidprotect.bot/en/docs/features/honeypot">RaidProtect</DocsLink> includes a HoneyPot feature as part of its wider suite.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://carl.gg/">Carl-bot</DocsLink> can be set up the same way with a rule that acts on any message in one channel.
          </DocsChecklistItem>
          <DocsChecklistItem>
            <DocsLink href="https://honeypot.riskymh.dev">Honeypot</DocsLink> is a dedicated bot built around this one idea.
          </DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="ai-and-machine-learning-can-we-understand-what-this-is" title="8. AI and machine learning: can we understand what this is?">
        <DocsP>
          AI and machine learning are increasingly being used for spam and scam classification, particularly where simple rules cannot keep up with changing content. Traditional filters are told what to look for, while machine learning systems learn patterns from examples — useful when spam is too varied or too new for hand-written rules.
        </DocsP>

        <DocsP>
          In practice this covers text classification, image classification, and multimodal models that read the text inside an image and look at the picture together. It also covers scam detection that depends on context, such as a fake giveaway that never uses a banned word.
        </DocsP>

        <DocsP>
          AI is not a shortcut, and it is easy to oversell. Running a model on every message and every image costs real money at Discord scale, and it adds delay. It can also be fooled. A spammer can crop an image, add noise, reword the text or wrap a scam in something that looks normal, and a model that was confident yesterday can be wrong today.
        </DocsP>

        <DocsP>
          It is also hard to judge spam without context. A giveaway, a trade offer or a link to a download can be a scam in one server and perfectly normal in another, and a model rarely knows which server it is looking at. So the question is never simply whether something is a scam. That is why human judgement still matters, and why AI works best as one layer that flags things for the other layers or for a person, not as the final decision.
        </DocsP>

        <DocsSubheading id="ai-where-it-is-now" title="Where it is now" />
        <DocsP>
          Discord runs its own detection at platform scale, and a growing number of newer bots are experimenting with text and image classification for scams and similar content. As an emerging layer it is less established than the others, so I have not linked specific examples here.
        </DocsP>

        <DocsSubheading id="ai-where-it-is-heading" title="Where it is heading" />
        <DocsP>
          Spam written and generated with AI will vary more, which pushes defenders toward models that generalise instead of rules that enumerate. Cheaper inference should make that more practical. It will stay an arms race though, because models can be fooled just as filters can, and the hardest calls will still need a person.
        </DocsP>

        <DocsSubheading id="ai-examples" title="Examples" />
        <DocsChecklist>
          <DocsChecklistItem>Discord's own proactive detection, as in the transparency report above.</DocsChecklistItem>
          <DocsChecklistItem>Newer multimodal moderation bots that read text and images together.</DocsChecklistItem>
        </DocsChecklist>
      </DocsSection>

      <DocsSection id="why-you-probably-want-several-at-once" title="Why you probably want several at once">
        <DocsP>Asking which technique is best is the wrong question. Each one is strong where another is weak.</DocsP>

        <DocsTable
          headers={['Layer', 'Asks', 'Best at catching', 'Weak spot']}
          rows={[
            ['People', 'Does this look wrong?', 'Anything needing context', 'Speed and coverage'],
            ['Filters (AutoMod)', 'Does it match a rule?', 'Invites, mass pings, known phrases', 'Lookalike text, images'],
            ['Content matching', 'Have we seen this?', 'Reused spam and images', 'Brand new content'],
            ['Behaviour', 'How was it sent?', 'Bursts, raids, automation', 'Low volume spam'],
            ['Verification', 'Can they get in?', 'Fresh automated accounts', 'Accounts already inside'],
            ['Reputation', 'Who sent it?', 'Known bad actors', 'Stolen accounts with good history'],
            ['Honeypots', 'Why touch this?', 'Spam that hits every channel', 'Spam that avoids the trap'],
            ['AI', 'What is this?', 'Novel or complex content', 'Expensive, easy to fool, lacks context'],
          ]}
          mobileFullTable
        />

        <DocsP>
          Here is how a single wave can play out. A message with an @everyone ping and an invite link is blocked by AutoMod before it posts. A known scam image is caught by content matching. A raid of thirty fresh accounts is caught by behaviour or stopped at the verification gate. A stolen account with years of history slips past reputation, but not past a honeypot if it posts in every channel. A brand new image that nothing has seen before is where AI or a human report picks up the slack. Each layer covers what the others miss.
        </DocsP>

        <DocsP>
          What a good setup looks like depends on the server, and most servers end up with more layers than this. As one example, my own server runs an AutoMod rule for @everyone pings, a way for members to report problems, a honeypot, and scam keywords added to AutoMod by hand as new ones show up. That is not meant to suggest it is this easy. Bigger or more targeted servers usually need more, and the right mix changes as the spam does.
        </DocsP>
      </DocsSection>

      <DocsSection id="there-is-no-single-fix" title="There is no single fix">
        <DocsP>
          The interesting part of Discord spam detection is that the message itself is not always the best thing to inspect. Sometimes the useful signal is the frequency of messages, sometimes the account sending them, and sometimes simply the fact that someone interacted with something they had no reason to touch.
        </DocsP>

        <DocsP>
          That is why spam prevention has grown into a toolbox rather than a single detector. The more different the signals are, the less likely one change from a spammer is enough to get around everything.
        </DocsP>

        <DocsP>The strongest setups do not choose between these approaches. <em>They combine them.</em></DocsP>
      </DocsSection>
    </BlogPostLayout>
  )
}
