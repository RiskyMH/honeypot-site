export function formatNumber(n: number | null | undefined, fallback = "—"): string {
  if (n == null) return fallback;
  return n.toLocaleString();
}

export function abbreviateNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export function formatStat(n: number | null | undefined, fallback = "—"): string {
  return formatNumber(n, fallback);
}

export const STAT_FALLBACKS = {
  guilds: "150k+",
  moderations: "1.1M+",
  members: "150M+",
  last7dModerations: "100k+",
  last7dEngagedGuilds: "15k+",
  githubStars: "300+",
} as const;
