export function formatNumber(n: number | null | undefined, fallback = "—"): string {
  if (n == null) return fallback;
  return n.toLocaleString();
}

export function abbreviateNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export const formatStat = formatNumber;

export const STAT_FALLBACKS = {
  guilds: "180k+",
  moderations: "1.4M+",
  members: "190M+",
  last7dModerations: "130k+",
  last7dEngagedGuilds: "20k+",
  githubStars: "300+",
} as const;
