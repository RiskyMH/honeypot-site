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
import { APP_URL, GITHUB_REPO_URL, OWNER_URL } from '@/lib/constants'

const title = 'Credits - Honeypot'
const description = 'Acknowledgements for the open-source software and artwork used by Honeypot, an open-source Discord anti-spam bot.'
const url = `${APP_URL}/docs/credits`

export const Route = createFileRoute('/docs/credits')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Credits" description="Open-source software and artwork used by Honeypot." />

    <DocsP>
      Honeypot is built on the work of several open-source projects, as well as the Discord API
      and third-party artwork. This page credits the software and assets that make up the project
      and briefly explains how they are used.
    </DocsP>
    <DocsP>
      The bot&apos;s own source code is on{' '}
      <DocsLink href={GITHUB_REPO_URL}>GitHub</DocsLink>.
    </DocsP>
    <br />

    <DocsSection title="Discord">
      <DocsP>
        Discord is the platform Honeypot integrates with. The bot communicates with it through 
        both the Discord REST API, for operations such as managing channels, messages, and bans. 
        As well as the Discord Gateway, for receiving real-time events such as message creates.
        See the official{' '}
        <DocsLink href="https://docs.discord.com/developers/intro">
          Discord developer documentation
        </DocsLink>.
      </DocsP>

      <DocsSubheading title="Discord libraries" />
      <DocsP>
        Honeypot does not use the all-in-one <DocsInlineCode>discord.js</DocsInlineCode>{' '}
        client. Instead, it uses these lower-level packages directly. All are maintained as part
        of the{' '}
        <DocsLink href="https://discord.js.org">
          discord.js project
        </DocsLink>
        :
      </DocsP>
      <DocsChecklist>
        <DocsChecklistItem>
          <DocsInlineCode>@discordjs/core</DocsInlineCode> (Apache-2.0) 
          - Discord API functionality used by Honeypot.
        </DocsChecklistItem>
        <DocsChecklistItem>
          <DocsInlineCode>@discordjs/rest</DocsInlineCode> (Apache-2.0) 
          - REST transport, request handling, errors and rate limits.
        </DocsChecklistItem>
        <DocsChecklistItem>
          <DocsInlineCode>@discordjs/ws</DocsInlineCode> (Apache-2.0) 
          - Gateway WebSocket connections, including the sharded deployment. 
        </DocsChecklistItem>
        <DocsChecklistItem>
          <DocsInlineCode>discord-api-types</DocsInlineCode> (MIT) - 
          Provides the TypeScript definitions for Discord API routes, events, 
          and permissions that the bot and the packages above build on.
        </DocsChecklistItem>
      </DocsChecklist>
    </DocsSection>

    <DocsSection title="Runtime">
      <DocsP>
        Honeypot is written in{' '}
        <DocsLink href="https://www.typescriptlang.org">TypeScript</DocsLink> (Apache-2.0)
        and runs on <DocsLink href="https://bun.com">Bun</DocsLink> (MIT), which is also used
        for package installation and builds. Rather than adding separate dependencies, the bot
        deliberately uses Bun-native APIs where they exist.
      </DocsP>
      <DocsP>
        The hosted bot is packaged and run with{' '}
        <DocsLink href="https://www.docker.com">Docker</DocsLink>.
      </DocsP>
    </DocsSection>

    <DocsSection title="Data">
      <DocsSubheading title="SQLite" />
      <DocsP>
        The primary persistent database is a local{' '}
        <DocsLink href="https://sqlite.org">SQLite</DocsLink> database, accessed through
        Bun&apos;s SQL API. SQLite is dedicated to the public domain (
        <DocsLink href="https://sqlite.org/copyright.html">copyright terms</DocsLink>).
      </DocsP>

      <DocsSubheading title="Redis" />
      <DocsP>
        <DocsLink href="https://redis.io">Redis</DocsLink> (RSALv2, SSPLv1, or AGPLv3 -{' '}
        <DocsLink href="https://redis.io/legal/licenses/">license information</DocsLink>) is used
        for communication and state between processes: event queues and cached data.
      </DocsP>
    </DocsSection>

    <DocsSection title="Artwork">
      <DocsP>
        The "honey pot" emoji used throughout Honeypot comes from{" "}
        <DocsLink href="https://github.com/microsoft/fluentui-emoji">
          Microsoft Fluent Emoji
        </DocsLink>
        , © Microsoft Corporation, licensed under the MIT License.
      </DocsP>
    </DocsSection>

    <DocsSection title="Sponsors">
      <DocsP>
        Honeypot is developed and maintained by{' '}
        <DocsLink href={OWNER_URL}>RiskyMH</DocsLink>. The project&apos;s sponsors are
        listed on{' '}
        <DocsLink href="https://github.com/sponsors/RiskyMH">GitHub Sponsors</DocsLink> -
        thank you to everyone supporting ongoing development.
      </DocsP>
    </DocsSection>

    <DocsSection title="Project license">
      <DocsP>
        Honeypot&apos;s source code is licensed under AGPL-3.0. Third-party software and
        artwork remain under their respective licenses. See the{' '}
        <DocsLink href={GITHUB_REPO_URL}>GitHub repository</DocsLink>.
      </DocsP>
    </DocsSection>
  </DocsLayout>
}
