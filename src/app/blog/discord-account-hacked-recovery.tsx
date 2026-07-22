import { createFileRoute } from '@tanstack/react-router'
import { BlogPostLayout, getBlogPostMeta } from '@/components/blog/page'
import {
  DocsChecklist,
  DocsChecklistItem,
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
  DocsStep,
  DocsStepList,
  DocsSubheading,
  DocsUl,
  DocsLi,
  DocsOl,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'
import { APP_URL } from '@/lib/constants'

const meta = getBlogPostMeta('discord-account-hacked-recovery')

const title = `${meta.title} - Honeypot`
const description = meta.description
const url = `${APP_URL}/blog/discord-account-hacked-recovery`

export const Route = createFileRoute('/blog/discord-account-hacked-recovery')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url, type: 'article', publishedTime: meta.dateCanonical, author: 'RiskyMH' }),
})

function RouteComponent() {
  return (
    <BlogPostLayout meta={meta}>
      <DocsP>
        If you're reading this because you're already locked out, jump straight to{' '}
        <a href="#what-to-do-right-now-if-youve-been-hacked" className="text-amber-500 hover:underline">What to do right now</a>.
        If you're here because you want to avoid ever needing that section, skip to{' '}
        <a href="#how-discord-accounts-actually-get-hacked" className="text-amber-500 hover:underline">How Discord accounts actually get hacked</a>{' '}
        and then{' '}
        <a href="#locking-your-account-down-for-good" className="text-amber-500 hover:underline">Locking your account down for good</a>.
      </DocsP>

      <DocsP>
        Discord getting &ldquo;hacked&rdquo; almost never means someone brute-forced a password. In the vast majority of real cases, the attacker got in because a token was stolen, a phishing page was convincing enough, or a scam talked the account owner into disabling their own defenses. That distinction matters, because it changes what you actually need to do to fix it and stop it happening again.
      </DocsP>

      <DocsSection id="what-to-do-right-now-if-youve-been-hacked" title="What to do right now if you've been hacked">

        <DocsSubheading id="signs-your-account-is-compromised" title="Signs your account is compromised" />
        <DocsP>
          A compromised account rarely announces itself with a single obvious event. It's usually a pattern:
        </DocsP>
        <DocsChecklist>
          <DocsChecklistItem>Messages or friend requests you didn't send, often pushing &ldquo;free Nitro,&rdquo; crypto giveaways, or a link to &ldquo;check out my game&rdquo;</DocsChecklistItem>
          <DocsChecklistItem>An email from Discord about a password or email change you didn't make</DocsChecklistItem>
          <DocsChecklistItem>Login alerts from a device or location you don't recognize</DocsChecklistItem>
          <DocsChecklistItem>2FA codes arriving when you didn't try to log in</DocsChecklistItem>
          <DocsChecklistItem>Your server suddenly has new webhooks, new bots, or roles and permissions that changed without you touching anything</DocsChecklistItem>
          <DocsChecklistItem>A moderation bot DMing you about sending spam, phishing links, or suspicious messages in servers you’ve never joined or been active in</DocsChecklistItem>
        </DocsChecklist>
        <DocsP>
          If any of that is happening, treat it as a compromise immediately rather than waiting to see if it's a fluke.
        </DocsP>

        <DocsSubheading id="if-you-can-still-log-in" title="If you can still log in" />
        <DocsOl>
          <li>
            <strong>Change your password first,</strong> from a device you trust. This alone invalidates the stolen session token in most cases, since Discord issues a fresh token on password change.
          </li>
          <li>
            <strong>Log out of all other sessions.</strong> In User Settings, there's a &ldquo;Log Out Everywhere&rdquo; style option that kills every active session except your current one.
          </li>
          <li>
            <strong>Enable Multi-Factor Authentication.</strong> Enable Multi-Factor Authentication if it isn't already on, and set up a passkey or security key rather than SMS (more on why below).
          </li>
          <li>
            <strong>Go through Authorized Apps.</strong> User Settings → Authorized Apps, and revoke anything you don't recognise or don't use. This is the step people skip most often, and it's exactly how a lot of &ldquo;I changed my password but they're still posting&rdquo; cases happen: OAuth grants don't get revoked by a password change.
          </li>
          <li>
            <strong>Change your email password too.</strong> especially if it's reused anywhere. Email is the actual root of most account recovery, so if the attacker still has your inbox, they can just reset Discord again.
          </li>
          <li>
            If you're a server owner or mod anywhere, check the server's <strong>Audit Log</strong> for webhook creation, role changes, or bans and kicks you didn't perform, and check <strong>Server Settings → Integrations</strong> for webhooks you don't recognise. Attackers rarely stop at sending spam from one account. If the compromised user moderates a server, they'll often create a webhook, invite a lookalike bot, or quietly adjust permissions before anyone notices, so understanding exactly what changed matters as much as reverting it.
          </li>
        </DocsOl>
        <DocsP><em>
          Read more on <DocsLink href="https://support.discord.com/hc/en-us/articles/24160905919511-My-Discord-Account-was-Hacked-or-Compromised">Discord's official &ldquo;My Discord Account was Hacked or Compromised&rdquo; support article</DocsLink>.
        </em></DocsP>

        <DocsSubheading id="if-youve-been-locked-out" title="If you've been locked out" />
        <DocsP>
          If the attacker changed your email, check the inbox of your <strong>original</strong> email address first. Discord sends a &ldquo;Discord Email Address changed&rdquo; notification with a revert link, but according to Discord's own support documentation, that window only lasts 48 hours from the change.
        </DocsP>
        <DocsP>
          If that window has closed, your only path is{' '}
          <DocsLink href="https://dis.gd/hackedaccount">Discord's official hacked-account support form</DocsLink>.
          A few things that consistently make this faster, based on both Discord's guidance and recurring patterns in support-forum threads:
        </DocsP>
        <DocsUl>
          <DocsLi>Include your exact username/handle, the original email address, and a clear timeline of what happened</DocsLi>
          <DocsLi>Attach screenshots or purchase receipts if you have any, since proof of ownership is what actually moves a ticket forward</DocsLi>
          <DocsLi>Submit one ticket, not several. Duplicate tickets tend to slow things down rather than speed them up</DocsLi>
          <DocsLi>Response times vary a lot, anywhere from a day to several weeks depending on how complicated the case is, so a thorough first submission matters more than a fast follow-up</DocsLi>
        </DocsUl>
        <DocsP>
          Discord is explicit that they will never DM you directly for support, ask for payment, or ask you to change your credentials over chat. Any message claiming to be Discord staff doing that is the scam, not the fix, which brings us to how most of this starts in the first place.
        </DocsP>
      </DocsSection>

      <DocsSection id="how-discord-accounts-actually-get-hacked" title="How Discord accounts actually get hacked">
        <DocsP>
          None of the methods below need someone to guess your password. They all rely on either malware doing the stealing for them, or you being talked into handing over access voluntarily.
        </DocsP>

        <DocsSubheading id="token-stealing-malware" title="Token-stealing malware (infostealers)" />
        <DocsP>
          This is the single biggest cause of Discord account takeovers today. Discord doesn't re-check your password every time you open the app. It stores a session token locally that keeps you logged in, the same way most apps do. If malware on your device can read that token, it can log in as you with no password and no 2FA prompt at all, because as far as Discord's servers are concerned, that token <em>is</em> proof it's you.
        </DocsP>
        <DocsP>
          This isn't theoretical. In January 2026, researchers at Palo Alto Networks' Unit 42{' '}
          <DocsLink href="https://unit42.paloaltonetworks.com/vvs-stealer/">documented a new infostealer called VVS Stealer</DocsLink>{' '}
          being sold on Telegram for as little as €10 a week. It searches a user's local Discord storage for encrypted tokens, decrypts them using Windows' own protection API, kills the running Discord client, and can even inject a script to hijack the session outright, on top of grabbing saved browser passwords, cookies, and screenshots. It's one example among many. &ldquo;Token grabber&rdquo; malware has existed in various forms for years, but the tooling keeps getting more capable and cheaper to buy.
        </DocsP>
        <DocsP>
          These stealers almost always arrive disguised as something you'd want to run: a game &ldquo;cheat,&rdquo; a cracked piece of paid software, a Discord Nitro generator, a game mod, or a fake &ldquo;verification&rdquo; tool someone insists you need to install to join a server or claim a reward. They spread through direct messages, often from a friend's account that's already been compromised, which is why an unexpected file from someone you trust is actually a bigger red flag than one from a stranger.
        </DocsP>

        <DocsSubheading id="phishing-pages" title="Phishing pages and fake logins" />
        <DocsP>
          The classic version: a link promising free Nitro, a crypto giveaway, or an NFT drop leads to a page that looks exactly like Discord's login screen. Type your credentials in, and you've just handed them over. The only reliable tell is the URL. A genuine Discord login page will always be on <DocsInlineCode>discord.com</DocsInlineCode>, not a lookalike domain or a shortened link.
        </DocsP>
        <DocsP>
          A more targeted version of this is the <strong>&ldquo;I accidentally reported you&rdquo;</strong> scam. A message, often from a hacked account you recognise, claims they reported you by mistake and that you need to contact a specific &ldquo;support member&rdquo; before you get banned. That person then walks you through changing your email, disabling your 2FA, or scanning a &ldquo;verification&rdquo; QR code, all of which hands them the account directly. Discord support will never approach you first, and will never ask you to disable your own security features. If a conversation is heading in that direction, stop and go to Discord's real support page instead.
        </DocsP>

        <DocsSubheading id="malicious-oauth-apps" title="Malicious OAuth apps and authorized-app abuse" />
        <DocsP>
          When you click &ldquo;Authorize&rdquo; on a bot or third-party app, you're granting it a set of permissions on your account, sometimes just profile info, sometimes far more. Attackers build apps that request broad permissions and disguise the authorization screen as something innocuous, like a &ldquo;verify to claim reward&rdquo; step. Because this doesn't touch your password at all, it survives a password reset, which is why checking Authorized Apps is a required step after any compromise, not an optional one.
        </DocsP>

        <DocsSubheading id="qr-code-login-abuse" title="QR code login abuse" />
        <DocsP>
          Discord's QR login (scan a code with your phone to log into the desktop or web app) is genuinely convenient, but it's also been repeatedly abused for scams since it launched. Scammers generate a real Discord login QR code, disguise it as a &ldquo;free Nitro&rdquo; claim code, and if you scan it, you've just logged <em>their</em> session into <em>your</em> account. The rule here is simple: only ever scan a Discord QR code that you generated yourself by choosing to log in on a new device. If a QR code arrives via DM or a giveaway post, it's not a gift.
        </DocsP>

        <DocsSubheading id="credential-stuffing" title="Credential stuffing and password reuse" />
        <DocsP>
          If you reuse a password across sites, a breach at some unrelated service can hand your Discord credentials to an attacker with zero effort on their part. They just try the same email and password combo on Discord and see if it works. This is quietly one of the most common causes of account takeovers across every platform, not just Discord, precisely because it requires no phishing and no malware at all.
        </DocsP>

        <DocsSubheading id="compromised-friend-chains" title="Compromised-friend chains" />
        <DocsP>
          A huge share of the malware and phishing links above spread specifically <em>because</em> they arrive from someone already on your friends list. Once one account in a friend group is compromised, attackers use it to message everyone else, since a &ldquo;hey check this out&rdquo; from a known contact bypasses the instinctive suspicion a message from a stranger would trigger. We've seen the same pattern show up as fake moderation bots and fake verification bots too: the initial compromise is rarely where the damage stops, it's just where it starts. This is also why warning your friends and any servers you're in immediately after a compromise isn't just politeness, it's actively slowing the spread.
        </DocsP>
      </DocsSection>

      <DocsSection id="locking-your-account-down-for-good" title="Locking your account down for good">
        <DocsSubheading id="get-proper-mfa" title="Get proper MFA, not just any MFA" />
        <DocsP>
          Discord supports three MFA methods, and they are not equally secure. In order of strength:
        </DocsP>
        <DocsUl>
          <DocsLi>
            <strong>Passkeys / security keys</strong>: a cryptographic credential tied to your device (Face ID, Windows Hello, or a physical hardware key like a YubiKey). Discord's own security team{' '}
            <DocsLink href="https://discord.com/blog/keeping-discord-safe-and-sound">describes this as close to phishing-proof</DocsLink>, because there's no code to steal or trick you into typing. The credential never leaves your device in a form an attacker could intercept. Set it up under User Settings → My Account → Security Keys.
          </DocsLi>
          <DocsLi>
            <strong>Authenticator apps (TOTP)</strong>: codes from an app like Google Authenticator or a password manager's built-in generator. Solid, but a phishing page can still trick you into typing the code in at the wrong moment.
          </DocsLi>
          <DocsLi>
            <strong>SMS codes</strong>: better than nothing, but vulnerable to SIM-swap attacks and the weakest of the three options Discord offers.
          </DocsLi>
        </DocsUl>
        <DocsP>
          Whichever combination you use, <strong>download and store your backup codes</strong> somewhere safe (a password manager, not a screenshot on your desktop). They're the only way back in if you lose your device.
        </DocsP>

        <DocsSubheading id="password-manager" title="Use a password manager and a unique password" />
        <DocsP>
          If your Discord password is used anywhere else, change that first. A password manager removes the excuse: you never have to remember or reuse a password again, and most will flag it for you if a password you're using has shown up in a known breach.
        </DocsP>

        <DocsSubheading id="audit-authorized-apps" title="Audit your Authorized Apps periodically" />
        <DocsP>
          Not just after a scare, every few months. It's the same five-second check each time: User Settings → Authorized Apps → remove anything you don't recognise or no longer use. Treat &ldquo;why does this app need this permission&rdquo; as a real question, not a formality.
        </DocsP>

        <DocsSubheading id="keep-devices-clean" title="Keep your devices clean" />
        <DocsP>
          Since most account takeovers now start with malware rather than a guessed password, device hygiene <em>is</em> Discord security. That means:
        </DocsP>
        <DocsUl>
          <DocsLi>Don't run executables sent to you by someone else, even a friend, without verifying through a different channel first</DocsLi>
          <DocsLi>Be skeptical of &ldquo;game cheats,&rdquo; cracked software, and mod tools, since these are consistently the most common delivery method for token-stealing malware</DocsLi>
          <DocsLi>Keep your OS and browser updated, and run reputable antivirus/anti-malware software</DocsLi>
          <DocsLi>If you suspect malware already ran, a full scan (or in bad cases, a clean OS reinstall) needs to happen <em>before</em> you trust that device with password resets or MFA setup again, otherwise you're just handing the attacker a fresh token</DocsLi>
        </DocsUl>

        <DocsSubheading id="server-owner-moderation" title="If you own or moderate a server" />
        <DocsP>
          This is where it's worth slowing down, because a compromised <em>admin</em> account doesn't just cost one person. It can take an entire community down with it, and it's the pattern we run into most often when we're called in to help clean up after a server-wide incident.
        </DocsP>
        <DocsUl>
          <DocsLi><strong>Limit Administrator permission to the owner only.</strong> Administrator bypasses every other permission check, so if a mod with Admin gets compromised, the attacker effectively owns the server.</DocsLi>
          <DocsLi><strong>Give bots only what they need.</strong> A moderation bot rarely needs Administrator to function; most well-built bots document the specific permissions they actually require. Bots with unnecessary Manage Roles, Manage Channels, or Manage Webhooks access are a common way a single compromised bot account escalates into a full server takeover.</DocsLi>
          <DocsLi><strong>Treat webhook URLs like passwords.</strong> A webhook URL that leaks, whether in a public repo, a pasted config, or a chat log, lets anyone post as an official-looking announcement in your server. That's exactly how the fake-airdrop and fake-mint scams spread through crypto-adjacent servers.</DocsLi>
          <DocsLi><strong>Review permissions on a schedule, not just after an incident.</strong> Departed mods and unused bot integrations are exactly the kind of standing access that gets exploited months after everyone's forgotten it exists.</DocsLi>
        </DocsUl>
        <DocsP>
          Good account security closes off most of the easy ways in, but it can't catch everything on its own, especially the moment an attacker is already inside and moving fast. That's the gap that ongoing monitoring for suspicious joins, phishing links, and unusual moderation activity is meant to cover, and it's the exact problem{' '}
          <DocsLink href={APP_URL}>Honeypot</DocsLink> was built to sit in front of.{' '}
          <DocsLink href="/blog/how-honeypot-systems-work">How Honeypot Systems Work</DocsLink> covers the detection approach in more detail.
        </DocsP>
      </DocsSection>

      <DocsSection id="stay-skeptical-of-urgency" title="Stay skeptical of urgency">
        <DocsP>
          Nearly every method above (the fake support DM, the &ldquo;claim before it expires&rdquo; giveaway, the &ldquo;you're about to be banned&rdquo; message) depends on making you act before you think. The single most effective habit against all of it is the same: if a message is trying to rush you into logging in somewhere, scanning something, or disabling a security feature, stop and go verify it through Discord's official channels yourself instead of following the link you were handed.
        </DocsP>
      </DocsSection>

      <DocsSection id="quick-reference-checklist" title="Quick reference: locked-down Discord checklist">
        <DocsChecklist>
          <DocsChecklistItem>Unique password, stored in a password manager</DocsChecklistItem>
          <DocsChecklistItem>Passkey or security key set up as your primary MFA</DocsChecklistItem>
          <DocsChecklistItem>Backup codes saved somewhere safe (not a screenshot)</DocsChecklistItem>
          <DocsChecklistItem>Authorized Apps reviewed in the last few months</DocsChecklistItem>
          <DocsChecklistItem>No unnecessary Administrator-permission bots in any server you run</DocsChecklistItem>
          <DocsChecklistItem>Webhook URLs never pasted anywhere public</DocsChecklistItem>
          <DocsChecklistItem>A standing rule: never run files sent unprompted, never scan QR codes you didn't generate yourself</DocsChecklistItem>
        </DocsChecklist>

        <hr className="mb-6 border-white/10" />
        <DocsP>
          <em>
            Sources and further reading:{' '}
            <DocsLink href="https://support.discord.com/hc/en-us/articles/24160905919511-My-Discord-Account-was-Hacked-or-Compromised">Discord's official &ldquo;My Discord Account was Hacked or Compromised&rdquo; support article</DocsLink>,{' '}
            <DocsLink href="https://support.discord.com/hc/en-us/articles/219576828-Setting-up-Multi-Factor-Authentication">Discord's Multi-Factor Authentication setup guide</DocsLink>,{' '}
            <DocsLink href="https://discord.com/safety/360044104071-tips-against-spam-and-hacking">Discord Safety Center's spam and hacking prevention tips</DocsLink>, and{' '}
            <DocsLink href="https://discord.com/blog/keeping-discord-safe-and-sound">Discord's blog post on how MFA keeps accounts safe</DocsLink>.</em>
        </DocsP>
      </DocsSection>
    </BlogPostLayout>
  )
}
