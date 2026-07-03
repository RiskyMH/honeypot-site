import { createFileRoute } from '@tanstack/react-router'
import { BlogPostLayout, getBlogPostMeta } from '@/components/blog/page'
import {
  DocsLink,
  DocsP,
  DocsSection,
  DocsSubheading,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const meta = getBlogPostMeta('what-is-a-honeypot')

const title = `${meta.title} - Honeypot`
const description = meta.description
const url = 'https://honeypot.riskymh.dev/blog/what-is-a-honeypot'

export const Route = createFileRoute('/blog/what-is-a-honeypot')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'article', publishedTime: meta.dateCanonical, author: 'RiskyMH' }),
})

function RouteComponent() {
  return (
    <BlogPostLayout meta={meta}>
      <DocsP>
        <em>“The first and most important rule of gun-running: never get shot with your own merchandise.”</em> The same logic applies to traps. Build one well enough, and the attacker walks into it themselves.
      </DocsP>

      <DocsP>
        Honeypots have existed in cybersecurity for decades. They began as improvised tools by researchers tracking hackers on Cold War-era networks. The same core idea now protects email inboxes, web forms, and - through tools like{' '}
        <DocsLink href="https://honeypot.riskymh.dev/">Honeypot</DocsLink> - millions of Discord members from automated abuse.
      </DocsP>

      <DocsP>
        The concept has lasted because it solves a problem traditional defences struggle with: instead of trying to recognise attacks, a honeypot simply offers something that legitimate users should never touch.
      </DocsP>

      <DocsSection id="what-is-a-honeypot" title="What is a honeypot?">
        <DocsP>
          A honeypot is a decoy. It looks like something real and valuable: a server, a database, a channel, an email address. Nothing legitimate ever touches it. So when something does, that interaction is the signal.
        </DocsP>

        <DocsP>
          This is a different posture from most security tools. Firewalls define what is allowed and block everything else. Content filters scan for known-bad patterns. A honeypot does neither. It exploits one consistent property of attackers - they probe everything they can reach - and uses that against them.
        </DocsP>

        <DocsP>
          Because no legitimate user ever has reason to interact with a decoy, the false positive rate approaches zero. There is no threshold to tune, no pattern list to maintain. Contact with the trap is the detection.
        </DocsP>

        <DocsP>
          <DocsLink href="https://en.wikipedia.org/wiki/Honeypot_(computing)">Wikipedia's article on honeypots</DocsLink> puts it cleanly: “Honeypots derive their value from the use by attackers. If not interacted with, the honeypot has little to no value.” That is also what makes them reliable. Silence is fine. The moment contact happens, you know.
        </DocsP>
      </DocsSection>

      <DocsSection id="where-the-name-came-from" title="Where the name came from">
        <DocsP>
          The term predates computing by centuries. In{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/Honey_trapping">espionage</DocsLink>, a “honey trap” describes using personal attraction to lure a target into a compromising situation → the premise being that desire makes people careless. Biblical stories, Chinese military treatises, and Cold War intelligence doctrine all contain versions of this technique. The KGB formalised it; the Stasi documented it. By the time the computing world borrowed the word, “honeypot” already carried exactly the right connotation: something irresistible that becomes a trap.
        </DocsP>

        <DocsP>
          Applied to computers, the logic is identical. A fake system made to look valuable enough will draw an attacker in even when caution might otherwise hold them back. The name stuck because it is concrete, intuitive, and slightly absurd - which accurately describes the technique.
        </DocsP>
      </DocsSection>

      <DocsSection id="origins" title="Origins">
        <DocsSubheading id="the-cuckoos-egg" title="The Cuckoo's Egg (1986)" />
        <DocsP>
          The earliest documented example in computing traces to 1986, when Clifford Stoll - an astronomer turned systems administrator at Lawrence Berkeley National Laboratory - was handed a mundane task on his second day at the job: investigate a{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/The_Cuckoo%27s_Egg">75-cent discrepancy</DocsLink> in the computer accounting logs.
        </DocsP>

        <DocsP>
          Behind it was a hacker who had been moving quietly through US government and military networks for months, searching for keywords like “nuclear” and “SDI” and selling what he found to the Soviet KGB. Rather than cutting off access, Stoll kept the attacker engaged. He created records of a bogus military project → a decoy to hold the connection long enough to trace it back to its origin in Hanover, West Germany. The investigation eventually identified{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/Markus_Hess">Markus Hess</DocsLink>, who had broken into an estimated 400 US military computers and sold the material for $54,000. Hess and two accomplices received suspended sentences. Stoll told the whole story in his 1989 book{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/The_Cuckoo%27s_Egg"><em>The Cuckoo's Egg</em></DocsLink>, which remains one of the more readable accounts of early network security and introduced a generation of practitioners to the idea of using deception as a defensive tool.
        </DocsP>

        <DocsSubheading id="the-berferd-jail" title="The Berferd jail (1991)" />
        <DocsP>
          In January 1991, Bill Cheswick at AT&T Bell Labs encountered a hacker attempting to exploit a known vulnerability in the lab's internet gateway. Rather than blocking the attempt, Cheswick sent back a fake password file. He then spent several months maintaining the attacker's access inside a carefully constructed{' '}
          <DocsLink href="https://cheswick.com/ches/papers/berferd.pdf">chroot jail</DocsLink> - an isolated environment that looked real from the inside but logged everything. His paper, <em>An Evening with Berferd</em>, documented the attacker's techniques in careful detail and introduced the idea that observing attackers over time produced more intelligence than simply ejecting them. The word "jail" he coined for that environment is still part of Unix systems today.
        </DocsP>

        <DocsSubheading id="deception-toolkit" title="Deception Toolkit (1997)" />
        <DocsP>
          By the mid-1990s the technique had a name and a growing community. In 1997, Fred Cohen released the{' '}
          <DocsLink href="http://www.all.net/dtk/">Deception Toolkit</DocsLink>, the first structured honeypot framework - software that let defenders simulate vulnerable services and observe how attackers responded. Commercial products followed within the year.
        </DocsP>

        <DocsSubheading id="honeynet-project" title="Honeynet Project (1999)" />
        <DocsP>
          In 1999, Lance Spitzner founded the{' '}
          <DocsLink href="https://www.honeynet.org/">Honeynet Project</DocsLink>, a nonprofit research organisation that turned honeypots into a formal discipline. Rather than isolated researchers running individual traps, they coordinated networks of honeypots across many countries and published detailed analyses of attacker tools, infrastructure, and behaviour. Their work has been cited in over 8,000 academic references and informed how the security industry approached deception-based detection for the following decade.
        </DocsP>
      </DocsSection>

      <DocsSection id="email-honeypots" title="Email honeypots">
        <DocsP>
          One of the earliest mass deployments of honeypot logic happened not in network security but in email.
        </DocsP>

        <DocsP>
          By the late 1990s, spam had become a serious problem. Spammers harvested addresses by crawling websites, buying lists, and scraping anywhere text appeared publicly. The counter-technique was simple: plant fake addresses in locations spammers would scrape, then wait. Any email arriving at one of these addresses came from someone scraping without consent or using a purchased list containing the trap.
        </DocsP>

        <DocsP>
          These are called <strong>spam traps</strong> or <strong>pristine honeypots</strong>. Organisations like{' '}
          <DocsLink href="https://www.spamhaus.org/">Spamhaus</DocsLink> maintain large numbers of them → hidden in web pages with invisible text or buried in HTML that only automated scrapers would find. Any sender that reaches one gets flagged.
        </DocsP>

        <DocsP>
          The concept was scaled further by{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/Project_Honey_Pot">Project Honey Pot</DocsLink>, launched in 2004 by engineers Lee Holloway and Matthew Prince (who later co-founded Cloudflare). The project distributes honeypot pages across thousands of participating websites, each embedding unique trap email addresses invisible to human visitors. Because each address is unique to a specific page visit, when spam arrives at one, the system knows exactly which harvesting bot collected it and when. As of recent statistics, it monitors tens of millions of trap addresses across over 185 countries.
        </DocsP>

        <DocsP>
          <strong>Recycled traps</strong> work differently. These are formerly legitimate addresses, inactive long enough for the provider to convert them into traps. A sender using old, unverified lists eventually hits them &mdash; a reliable indicator of poor list hygiene.
        </DocsP>

        <DocsP>
          Both types share the same logic: the address does nothing by default. Its only function is to receive mail that should never arrive.
        </DocsP>
      </DocsSection>

      <DocsSection id="network-honeypots" title="Network honeypots">
        <DocsP>
          In network security, honeypots grew more sophisticated over time. The two main classifications are <strong>low-interaction</strong> and <strong>high-interaction</strong>.
        </DocsP>

        <DocsP>
          <strong>Low-interaction honeypots</strong> simulate only the services attackers commonly request: an open port, a fake login form, a plausible banner. They are cheap to deploy, consume few resources, and can catch automated scanners reliably. The trade-off is that they do not capture much about what an attacker actually does once inside, because there is no real inside to explore.
        </DocsP>

        <DocsP>
          <strong>High-interaction honeypots</strong> are complete operating environments → fully functional systems, isolated from production infrastructure, where an attacker who gains access finds what appears to be a real machine. Every action is logged, every tool downloaded is catalogued, every technique is studied. These are used primarily by security organisations and government agencies. The value is not catching individual attackers; it is understanding how attack campaigns evolve across months or years.
        </DocsP>

        <DocsP>
          <strong>Production honeypots</strong> serve a more immediate purpose: sitting quietly inside real infrastructure as early warning systems. A server with no legitimate traffic, surrounded by real systems, becomes a high-confidence intrusion detector. If it receives a connection, something is probing or moving laterally. Because nothing should ever touch it, the signal quality is unusually high. The modern enterprise equivalent, sometimes sold as{' '}
          <DocsLink href="https://en.wikipedia.org/wiki/Deception_technology">deception technology</DocsLink>, automates the deployment of honeypot resources at scale across large organisations.
        </DocsP>

        <DocsP>
          A related concept is the <strong>honeytoken</strong>: a fake credential, API key, or document embedded into real infrastructure. It serves no legitimate function; so any access to it confirms that something has already breached the perimeter and is snooping. Honeytokens generate near-zero false positives for exactly the same reason a honeypot channel does.
        </DocsP>
      </DocsSection>

      <DocsSection id="modern-applications" title="Modern applications">
        <DocsP>
          The concept has spread into nearly every domain where automated abuse is a problem.
        </DocsP>

        <DocsP>
          <strong>Web forms</strong> use honeypots to catch bots. A hidden field is added to a form - invisible to human users, but visible in the HTML. Spam bots that fill every available field automatically fill it in. Any submission with a value in that field can be discarded confidently.
        </DocsP>

        <DocsP>
          <strong>Web scraping detection</strong> uses honeypot links: URLs that appear in HTML source but lead nowhere a real visitor would navigate. If a scraper follows one, it identifies itself.
        </DocsP>

        <DocsP>
          <strong>Security research</strong> continues to use honeypots to track malware families, botnet infrastructure, and emerging exploitation techniques. Researchers have recently explored{' '}
          <DocsLink href="https://arxiv.org/abs/2309.00614">LLM-based honeypots</DocsLink> that respond intelligently to attacker queries, keeping them engaged longer to surface more of their methodology.
        </DocsP>

        <DocsP>
          <strong>Discord</strong> has become one of the more active environments for channel-based honeypot detection. Spam bots and compromised accounts that join a server typically blast every visible channel, so a channel that looks ordinary but serves no real purpose becomes a reliable trap. Any account that messages it is almost certainly automated or compromised. Why this works so consistently in practice, and why building it at scale is harder than it looks, is the subject of{' '}
          <DocsLink href="/blog/how-honeypot-systems-work">How Honeypot Systems Work</DocsLink>.
        </DocsP>
      </DocsSection>

      <DocsSection id="why-it-has-lasted" title="Why it has lasted">
        <DocsP>
          Honeypots have been part of network security for nearly forty years - rare longevity in a fast-moving field. The reason is simple: the technique does not rely on knowing what an attack looks like.
        </DocsP>

        <DocsP>
          Most security tools are reactive. A honeypot is not. It only needs to know that something touched what should never be touched. That fundamental simplicity is why it still works so well.
        </DocsP>

        <DocsP>
          If you're running a larger Discord server and dealing with spam, a well-implemented honeypot channel can be one of the highest-signal detection methods available. I built the <DocsLink href="https://honeypot.riskymh.dev/">Honeypot Bot</DocsLink> specifically to make this approach reliable at scale.
        </DocsP>
      </DocsSection>
    </BlogPostLayout>
  )
}
