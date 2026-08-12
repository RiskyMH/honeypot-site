import { createFileRoute } from '@tanstack/react-router'
import { BlogPostLayout, getBlogPostMeta } from '@/components/blog/page'
import {
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'

const meta = getBlogPostMeta('why-im-not-worried-about-spam-bots-getting-smarter')

const title = `${meta.title} - Honeypot`
const description = meta.description
const url = `${APP_URL}/blog/why-im-not-worried-about-spam-bots-getting-smarter`

export const Route = createFileRoute('/blog/why-im-not-worried-about-spam-bots-getting-smarter')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'article', publishedTime: meta.dateCanonical, author: 'RiskyMH' }),
})

function RouteComponent() {
  return (
    <BlogPostLayout meta={meta}>
      <DocsSection id="how-we-got-here" title="How we got here">
        <DocsP>
          Honeypot didn't start as a plan. It started as a realisation. Back in October the{' '}
          <DocsLink href="https://discord.gg/nextjs">Next.js server</DocsLink> added a honeypot channel to their custom bot, and that's basically where I first properly clocked how well the idea actually works. Fast forward to mid-December, I was in a small server talking about that exact effectiveness. Mid-conversation it hit me how easy this would actually be to build myself, and how good a case study it'd make for using raw <DocsLink href="https://npmx.dev/package/@discordjs/core"><DocsInlineCode>@discordjs/core</DocsInlineCode></DocsLink> instead of full discord.js. The first pass came together fast, decent UX within a few hours since I already had the experience for it. I had it auto-create the channel on join from day one too, since that kills most of the friction of a bot getting added and then just sitting there doing nothing.
        </DocsP>

        <DocsP>
          That should've been the end of it, but I kept finding new ways to improve it. There's a large number of commits from just chasing small annoyances. The one I remember most clearly is getting sick of my own <DocsInlineCode>/honeypot</DocsInlineCode> command. I either had to ship it with partial values, split it into a bunch of separate commands, or force people to fill in everything at once. Then I remembered modals exist, and just like that it could all be one command with every field prefilled and clearly labelled.
        </DocsP>

        <DocsP>
          Around that same time, spam on the{' '}
          <DocsLink href="https://discord.com/servers/bun-876711213126520882">Bun server</DocsLink>{' '}
          (where I was a mod) had gone from basically nothing earlier in the year to a real every-few-weeks problem. I'd already built and shipped the bot fast by that point (made & released Dec 15, 2025), but Bun was one of the first real signs it'd actually be useful somewhere. I didn't actually add it to Bun itself until Feb, after we'd crossed 500-ish servers and won Nelly's Choice at the Buildathon, as it felt a bit weird self-promoting into a server I moderated at the time. Funny enough, my own <DocsLink href="https://discord.com/servers/riskys-server-894705593087049729">personal server</DocsLink> only got Honeypot added because I figured I should be supporting my own project, but these days it's actually grown into needing it. Being fully automated also meant I got to go back to a nearly moderation-free existence right after mods had started having to do real work again. Half-joking, but Honeypot's basically been quietly taking mod jobs back.
        </DocsP>
      </DocsSection>

      <DocsSection id="the-bots-used-to-be-really-simple" title="The bots used to be really simple">
        <DocsP>
          <DocsLink href="/blog/how-honeypot-systems-work#evolution-of-discord-spam">Early on it really was just join and spam</DocsLink>. The important thing wasn't that these bots were bad at their job. They were optimised for volume, hit as many channels and people as possible with about as little logic as you can get away with. The actual attachment-heavy spam has basically always come from compromised real accounts rather than freshly made bot accounts. It's only in the last month or so that this has ramped back up, after a stretch of mostly fresh throwaway accounts, likely some mix of leaked tokens and more automation around compromising accounts again. That shift is honestly why I used to be a bit confused when smaller servers said they needed Honeypot, I didn't get it. Now pretty much any server with a public invite probably does.
        </DocsP>

        <DocsP>
          Multiple honeypots came later too, once bots actually started getting smarter about which channels they'd hit. That's when I added support for running several strategies at once, including a dedicated voice channel honeypot. Bots targeting voice channels specifically only showed up several months after Honeypot first launched, well after the original version, and I genuinely didn't see it coming. I actually like it though, a VC honeypot is dead simple to set up and exposes even fewer real members, since almost nobody's hanging out in some random empty voice channel. Probably just older mod bots never accounting for the fact you can chat directly inside a voice channel at all.
        </DocsP>
      </DocsSection>

      <DocsSection id="why-that-doesnt-worry-me" title="Why that doesn't worry me">
        <DocsP>
          Here's the part that actually matters. The goal was never a perfect detector, it was changing the economics of spamming a server. A bot that blindly joins and blasts every channel is a very cheap attack. The moment it has to understand a server, figure out which channel is a trap, and avoid false positives, that same attack gets slower and more expensive to run. Smarter bots don't beat Honeypot so much as they get pushed from cheap and broad into something narrower and costlier, and a lot of operators just won't bother making that trade.
        </DocsP>

        <DocsP>
          There's another angle here too. I think compromised-account spam actually converts best through DMs and small trusting servers, since a message from someone you already know hits differently than one in a big server full of strangers. That's part of why I'm not that worried about spammers "patching" around Honeypot even as detection gets smarter. Big public servers just don't carry the same trust a DM does, and they usually have active mods around to clean things up fast anyway.
        </DocsP>

        <DocsP>
          One of the reasons this stays cheap to run on my end too is that I deliberately didn't build a normal Discord bot. It doesn't need to know a server's history, cache thousands of members, or read every message that goes by. It only needs to answer one question: did someone send a message somewhere they shouldn't have. Keeping the actual detection that dumb is a big part of why it scales so well.
        </DocsP>

        <DocsP>
          I used to be genuinely excited about the idea of a global blacklist across servers once I had enough scale to make the data meaningful. That day just never really came. I've checked the data a few times since, and the pattern holds up: cross-server hits from the same spam wave land within a few seconds of each other, so there's no real window a shared blacklist would buy me. The only repeat hits I see later are, best I can tell, people testing their own server's setup rather than anything adversarial. I thought I'd eventually need more intelligence here. Turns out the simple version was already enough.
        </DocsP>

        <DocsP>
          There's also a content-format reason a honeypot works where other automod doesn't. A lot of what it catches never had a chance against a text filter anyway, since it's raw image attachments with no text at all. Automodding <DocsInlineCode>discord.gg/*</DocsInlineCode> links and similar patterns catches plenty on its own, I do that too, but the moment spam is just a scam image with no caption, you're stuck actually parsing image content, which is a whole different and expensive problem. A honeypot doesn't care what's in the message at all, so it catches that stuff for free.
        </DocsP>

        <DocsP>
          And even when Honeypot isn't the primary layer catching something, it still holds up as a fallback when other detection systems break or haven't caught up to a new pattern yet, since it never needed to recognise the pattern in the first place.
        </DocsP>
      </DocsSection>

      <DocsSection id="what-actually-keeps-me-busy" title="What actually keeps me busy">
        <DocsP>
          The parts of this that have actually taken the most work lately have had nothing to do with spam bots getting smarter, they've been Discord's own API at scale. At this volume, a low-probability API quirk stops being a curiosity and becomes a daily support ticket.
        </DocsP>

        <DocsP>
          The main one is the one where bans doesn't{' '}
          <DocsLink href="https://github.com/discord/discord-api-docs/issues/8360">always delete all of a user's recent messages </DocsLink> during high-activity spam windows, seemingly a backend race condition on Discord's end. My workaround is the{' '}
          "Ensure Message Delete" experiment, which comes back 2 minutes later and searches for anything left over to clean up manually.
        </DocsP>

        <DocsP>
          The other half is ratelimits, but global ones on my bot, not per-server. Any single server only ever sends me a handful of spam messages. The problem is 500 bans landing within 5 seconds across many different servers at once, which starts hitting my global limits. Respecting Discord's ratelimit headers properly is intentional. That's just correct behaviour. Ending up with a 10-minute lag on some logs and DMs during a bad wave isn't the goal though, that's just where the queue backs up to when it happens. Bans themselves haven't actually gotten ratelimited yet as far as I've seen, it's specifically the DMs and log messages that lag behind.
        </DocsP>

        <DocsP>
          Running at this scale has surfaced edge cases I never would have seen otherwise. A couple of them ended up getting discussed in Discord's own API issue tracker: the message-delete race condition (a rarer related one is still open) and <DocsInlineCode>app_permissions</DocsInlineCode> getting added to resolved channels in modals so I can check my own permissions upfront instead of guessing. Good reminder that the interesting lessons at scale usually aren't the ones you set out looking for.
        </DocsP>
      </DocsSection>

      <DocsSection id="what-im-considering-next" title="What I'm considering next">
        <DocsP>
          None of this is a solved game, it's an elaborate cat and mouse match and I don't expect that to change. Best I can hope for is nudging things so "smarter" spam ends up costing more and being less invasive overall, not more.
        </DocsP>

        <DocsP>
          Right now I give a few setup recommendations when the bot joins a server, but I could be a lot more direct about what actually makes a honeypot effective instead of leaving it mostly to{' '}
          <DocsLink href="https://honeypot.riskymh.dev/docs/tips">the tips page</DocsLink>, worth a read if you actually run one and want the longer version of all this. The bigger thing I think about is what happens if spammers ever start blacklisting by my bot's own application ID rather than anything server-specific, and every existing trap stops working overnight. I never expected to cross even 5k servers, so I always figured I was too small to be worth targeting directly. That assumption feels a lot shakier at this scale. If that day comes, I'd seriously consider pushing a fix across every server at once, deleting and reposting the initial warning message everywhere, rather than leaving each admin to figure it out on their own.
        </DocsP>

        <DocsP>
          There's also making the trap itself feel more alive. The channel warmer already fakes a bit of daily activity, but I've thought about going further with actual back-and-forth conversation via webhooks instead of one daily message, enough that a bot scanning for signs of life actually finds some.
        </DocsP>

        <DocsP>
          I don't really think of Honeypot as a finished project, and I don't want to. Whenever I spot a gap, or think of some way to educate admins or users better, that becomes the next small experiment. That's most of what "still working on it" actually means at this point.
        </DocsP>
      </DocsSection>

      <DocsSection id="at-the-end-of-the-day" title="At the end of the day">
        <DocsP>
          <DocsLink href="https://honeypot.riskymh.dev">Honeypot</DocsLink> doesn't need to win this arms race forever. It just needs to keep making the cheapest attacks not worth it. If avoiding it costs a spammer more than the spam is worth, it's already done its job. Bots getting smarter about which channels they hit is a cost increase for them, not a loss for me. The real work lately has been keeping up with Discord's own API at scale, not the spam bots themselves. And I'm already thinking about the next round.
        </DocsP>
      </DocsSection>
    </BlogPostLayout>
  )
}
