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
  guilds: "100k+",
  moderations: "900k+",
  members: "150M+",
  last7dModerations: "90k+",
  last7dEngagedGuilds: "15k+",
} as const;
