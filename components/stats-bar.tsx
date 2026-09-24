"use client"
import { Users, Clock, Star, ShieldAlert, ArrowUpRight, ArrowDownRight } from "lucide-react";

import { useStats } from "@/components/stats-context";
import { STAT_FALLBACKS } from "@/lib/stats-format";
import { DISCORD_BOT_INVITE_URL, DISCORD_INVITE_URL, GITHUB_REPO_URL } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";


export function StatValue({ value, fallback, isTop }: { value: number | null | undefined; fallback: string; isTop?: boolean }) {
  const [showFallback, setShowFallback] = useState(value == null);
  const [animating, setAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value != null && prevValue.current == null) {
      setAnimating(true);
      const t = setTimeout(() => {
        setShowFallback(false);
        setAnimating(false);
      }, 160);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
    if (value != null) {
      prevValue.current = value;
    }
    if (value == null && prevValue.current != null) {
      // reset if value goes back to null (should not happen after reveal, but keep consistent)
      prevValue.current = value;
      setShowFallback(true);
    }
  }, [value]);

  return (
    <span className="inline-block relative h-[1.05em]">
      <span className={`stat-slide ${animating ? "stat-slide-out" : "stat-slide-in"}`}>
        {showFallback ? fallback : <NumberFlow value={value || 0} className={isTop ? "-mt-2" : ""} />}
      </span>
    </span>
  );
}


function useGithubStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchStars() {
      try {
        const res = await fetch("https://api.github.com/repos/RiskyMH/honeypot", {
          headers: { Accept: "application/vnd.github.v3+json" },
          signal: controller.signal,
        });
        if (!res.ok || controller.signal.aborted) return;
        const data = await res.json();
        if (!controller.signal.aborted && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch { }
    }
    fetchStars();
    return () => {
      controller.abort();
    };
  }, []);
  return stars;
}

export function StatsBar() {
  const { stats } = useStats();
  const githubStars = useGithubStars();

  const displayStats: Array<{
    icon: typeof Users;
    label: string;
    value?: number | null;
    display?: string;
    color: string;
    fallback?: string;
    href?: string;
    cta?: string;
    external?: boolean;
  }> = [
      {
        icon: Users,
        value: stats?.guilds,
        label: "Servers Protected",
        color: "text-primary",
        fallback: STAT_FALLBACKS.guilds,
        href: DISCORD_BOT_INVITE_URL,
        cta: "Invite bot",
        external: true,
      },
      {
        icon: ShieldAlert,
        value: stats?.moderations,
        label: "Users Banned",
        color: "text-primary",
        fallback: STAT_FALLBACKS.moderations,
        href: "#stats",
        cta: "See more stats",
      },
      {
        icon: Star,
        value: stats ? githubStars : null,
        label: "GitHub Stars",
        color: "text-yellow-500",
        fallback: STAT_FALLBACKS.githubStars,
        href: GITHUB_REPO_URL,
        cta: "View on GitHub",
        external: true,
      },
      {
        icon: Clock,
        value: null,
        label: "Always Online",
        color: "text-blue-400",
        display: "24/7",
        href: DISCORD_INVITE_URL,
        cta: "Join support server",
        external: true,
      },
    ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-xl border border-border bg-[#12151a] py-6">
          <div className="grid grid-cols-2 gap-8 px-6 md:grid-cols-4 md:gap-4">
            {displayStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group flex items-center gap-3 ${index < displayStats.length - 1
                  ? "md:border-r md:border-border md:pr-4"
                  : ""
                  }`}
              >
                <stat.icon className={`size-6 ${stat.color} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-bold text-foreground md:text-2xl ">
                    {stat.display 
                    ? <span className="mb-2">{stat.display}</span>
                     : <StatValue value={stat.value} fallback={stat.fallback!} isTop />
                    }
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {stat.label}
                    </p>
                    {stat.href && stat.cta && (
                      <a
                        href={stat.href}
                        target={stat.external ? "_blank" : undefined}
                        rel={stat.external ? "noopener noreferrer" : undefined}
                        className="hidden md:inline-flex items-center gap-0.5 text-xs font-medium text-primary opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hover:underline underline-offset-2 ml-auto"
                      >
                        {stat.cta}
                        {stat.external ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
