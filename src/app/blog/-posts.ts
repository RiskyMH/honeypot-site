export type BlogSection = {
  id: string
  title: string
  children?: BlogSection[]
}

export type BlogPostMeta = {
  slug: string
  path: '/blog/what-is-a-honeypot' | '/blog/how-honeypot-systems-work' | '/blog/discord-account-hacked-recovery' | '/blog/why-im-not-worried-about-spam-bots-getting-smarter'
  title: string
  description: string
  category: string
  date: string
  dateCanonical: string
  readTime: string
  featured?: boolean
  sections: BlogSection[]
}

const metaRegistry = ([
  {
    slug: 'what-is-a-honeypot',
    path: '/blog/what-is-a-honeypot',
    title: 'What is a Honeypot?',
    description:
      'A decoy that catches attackers by doing nothing. From Cold War-era network traps to Discord spam detection, here is how honeypots work and why they have lasted 40 years.',
    category: 'Security',
    date: 'July 1, 2026',
    dateCanonical: '2026-07-01',
    readTime: '12 min read',
    featured: true,
    sections: [
      { id: 'what-is-a-honeypot', title: 'What is a honeypot?' },
      { id: 'where-the-name-came-from', title: 'Where the name came from' },
      {
        id: 'origins',
        title: 'Origins',
        children: [
          { id: 'the-cuckoos-egg', title: "The Cuckoo's Egg (1986)" },
          { id: 'the-berferd-jail', title: 'The Berferd jail (1991)' },
          { id: 'deception-toolkit', title: 'Deception Toolkit (1997)' },
          { id: 'honeynet-project', title: 'Honeynet Project (1999)' },
        ],
      },
      { id: 'email-honeypots', title: 'Email honeypots' },
      { id: 'network-honeypots', title: 'Network honeypots' },
      { id: 'modern-applications', title: 'Modern applications' },
      { id: 'why-it-has-lasted', title: 'Why it has lasted' },
    ],
  },
  {
    slug: 'how-honeypot-systems-work',
    path: '/blog/how-honeypot-systems-work',
    title: 'How Honeypot Systems Work (and Why They Become Complex)',
    description:
      'Behind the simple concept of a bait channel is a detection system that has to fight Unicode tricks, image spam, and compromised accounts at scale.',
    category: 'Engineering',
    date: 'July 2, 2026',
    dateCanonical: '2026-07-02',
    readTime: '10 min read',
    sections: [
      { id: 'simplest-possible-honeypot', title: 'The simplest possible honeypot' },
      { id: 'why-it-works-automation', title: 'Why it works: automation is predictable' },
      {
        id: 'evolution-of-discord-spam',
        title: 'The evolution of Discord spam',
        children: [
          { id: 'early-raids', title: 'Early raids' },
          { id: 'content-gets-smarter', title: 'Content gets smarter' },
          { id: 'image-based-spam', title: 'Image-based spam' },
          { id: 'compromised-accounts', title: 'Compromised accounts' },
        ],
      },
      { id: 'why-simple-rules-fail', title: 'Why simple rules stop working' },
      { id: 'behavioural-signals', title: 'Behavioural signals' },
      { id: 'layered-detection', title: 'Layered detection' },
      { id: 'when-honeypots-make-sense', title: 'When honeypots make sense' },
      { id: 'when-they-do-not', title: 'When they do not' },
      { id: 'what-this-means', title: 'What this means in practice' },
    ],
  },
  {
    slug: 'discord-account-hacked-recovery',
    path: '/blog/discord-account-hacked-recovery',
    title: 'My Discord Account Got Hacked: How to Recover It and Lock It Down for Good',
    description:
      'Token theft, phishing, and social engineering are how Discord accounts actually get taken over. Here is how to recover one and lock it down for good.',
    category: 'Security',
    date: 'July 5, 2026',
    dateCanonical: '2026-07-05',
    readTime: '15 min read',
    sections: [
      {
        id: 'what-to-do-right-now-if-youve-been-hacked',
        title: "What to do right now if you've been hacked",
        children: [
          { id: 'signs-your-account-is-compromised', title: 'Signs your account is compromised' },
          { id: 'if-you-can-still-log-in', title: 'If you can still log in' },
          { id: 'if-youve-been-locked-out', title: "If you've been locked out" },
        ],
      },
      {
        id: 'how-discord-accounts-actually-get-hacked',
        title: 'How Discord accounts actually get hacked',
        children: [
          { id: 'token-stealing-malware', title: 'Token-stealing malware (infostealers)' },
          { id: 'phishing-pages', title: 'Phishing pages and fake logins' },
          { id: 'malicious-oauth-apps', title: 'Malicious OAuth apps' },
          { id: 'qr-code-login-abuse', title: 'QR code login abuse' },
          { id: 'credential-stuffing', title: 'Credential stuffing' },
          { id: 'compromised-friend-chains', title: 'Compromised-friend chains' },
        ],
      },
      {
        id: 'locking-your-account-down-for-good',
        title: 'Locking your account down for good',
        children: [
          { id: 'get-proper-mfa', title: 'Get proper MFA' },
          { id: 'password-manager', title: 'Use a password manager' },
          { id: 'audit-authorized-apps', title: 'Audit your Authorized Apps' },
          { id: 'keep-devices-clean', title: 'Keep your devices clean' },
          { id: 'server-owner-moderation', title: 'If you own or moderate a server' },
        ],
      },
      { id: 'stay-skeptical-of-urgency', title: 'Stay skeptical of urgency' },
      { id: 'quick-reference-checklist', title: 'Quick reference checklist' },
    ],
  },
  {
    slug: 'why-im-not-worried-about-spam-bots-getting-smarter',
    path: '/blog/why-im-not-worried-about-spam-bots-getting-smarter',
    title: "Why I'm Not Worried About Spam Bots Getting Smarter",
    description:
      'Honeypot does not need to win the arms race forever. It just needs to keep making the cheapest attacks not worth it.',
    category: 'Engineering',
    date: 'August 12, 2026',
    dateCanonical: '2026-08-12',
    readTime: '8 min read',
    sections: [
      { id: 'how-we-got-here', title: 'How we got here' },
      { id: 'the-bots-used-to-be-really-simple', title: 'The bots used to be really simple' },
      { id: 'why-that-doesnt-worry-me', title: "Why that doesn't worry me" },
      { id: 'what-actually-keeps-me-busy', title: 'What actually keeps me busy' },
      { id: 'what-im-considering-next', title: "What I'm considering next" },
      { id: 'at-the-end-of-the-day', title: 'At the end of the day' },
    ],
  },
] satisfies BlogPostMeta[]).reverse();

export const blogPosts = metaRegistry

export function getBlogPostMeta(slug: string): BlogPostMeta {
  const post = metaRegistry.find((post) => post.slug === slug)
  if (!post) throw new Error(`Missing blog post: ${slug}`)
  return post
}
