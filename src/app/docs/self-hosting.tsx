import DocsLayout from '@/components/docs/layout'
import { createFileRoute } from '@tanstack/react-router'
import {
  DocsCallout,
  DocsCodeBlock,
  DocsInlineCode,
  DocsLink,
  DocsP,
  DocsSection,
  DocsTable,
  DocsTitle,
} from '@/components/docs/markdown'
import { buildHead } from '@/lib/utils'

const title = 'Self-Hosting - Honeypot'
const description = 'Run Honeypot on your own infrastructure with our official Docker image or Railway template.'
const url = 'https://honeypot.riskymh.dev/docs/self-hosting'

export const Route = createFileRoute('/docs/self-hosting')({
  component: RouteComponent,
  head: () => buildHead({ title, description, url }),
})

function RouteComponent() {
  return <DocsLayout>
    <DocsTitle title="Self-Hosting" description="Run Honeypot on your own infrastructure." />

    <DocsSection title="Quick options">
      <DocsTable
        headers={['Option', 'Best for', 'Notes']}
        rows={[
          ['Railway template', 'Fastest setup', 'Managed hosting with a deploy button.'],
          ['Docker Compose', 'Self-hosted servers', 'Stable restarts with a container.'],
          ['Bun start', 'Local testing', 'Manual process; no auto-start for persistent deployments.'],
        ]}
      />
      <DocsCallout tone="note" title="Official image">
        Docker uses <DocsInlineCode>ghcr.io/riskymh/honeypot:latest</DocsInlineCode>.
      </DocsCallout>
    </DocsSection>

    <DocsSection title="Railway">
      <DocsP>Use the public template to deploy quickly.</DocsP>
      <DocsLink href="https://railway.com/deploy/honeypot?referralCode=risky&utm_medium=integration&utm_source=template&utm_campaign=generic">
        <img
          src="https://railway.app/button.svg"
          alt="Deploy on Railway"
          className="h-10"
        />
      </DocsLink>
    </DocsSection>

    <DocsSection title="Docker Compose">
      <DocsCodeBlock
        language="docker-compose.yml"
        code={`services:
   honeypot:
     image: ghcr.io/riskymh/honeypot:latest
     restart: unless-stopped
     init: true
     environment:
       DISCORD_TOKEN: \${DISCORD_TOKEN:?REQUIRED}
       DATABASE_URL: \${DATABASE_URL:-sqlite:///data/honeypot.sqlite}
       REDIS_URL: \${REDIS_URL} # optional
     volumes:
        - data:/data
volumes:
  data:
`}
      />
      <DocsP>Run <DocsInlineCode>docker compose up -d</DocsInlineCode> and check logs.</DocsP>
    </DocsSection>

    <DocsSection title="Bun (local)">
      <DocsCodeBlock
        language="Terminal"
        code={`git clone https://github.com/riskymh/honeypot.git\ncd honeypot\nbun install\nbun start`}
      />
      <DocsP>Set <DocsInlineCode>DISCORD_TOKEN</DocsInlineCode> before starting.</DocsP>
    </DocsSection>

    <DocsSection title="Environment variables">
      <DocsTable
        headers={['Variable', 'Required', 'Purpose']}
        rows={[
          [<DocsInlineCode>DISCORD_TOKEN</DocsInlineCode>, 'Yes', 'Discord bot token.'],
          [<DocsInlineCode>DATABASE_URL</DocsInlineCode>, 'No', 'SQLite or Postgres connection string. Defaults to sqlite file.'],
          [<DocsInlineCode>REDIS_URL</DocsInlineCode>, 'No', 'Needed for sharded/websocket proxy mode.'],
          [<DocsInlineCode>PORT</DocsInlineCode>, 'No', 'Port for stats API when sharded.'],
        ]}
      />
    </DocsSection>
  </DocsLayout>
}
