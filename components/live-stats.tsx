"use client";

import { Shield, Server } from "lucide-react";
import { useStats } from "@/components/stats-context";
import { STAT_FALLBACKS } from "@/lib/stats-format";
import { lazy, Suspense } from 'react';
import { StatValue } from "./stats-bar.js";

const LiveStatsChart = lazy(() => import('./live-stats-chart.js').then(module => ({ default: module.LiveStatsChart })));

export function LiveStats() {
  const { stats } = useStats();

  const statCards = [
    { icon: Shield, label: "Bans (7d)", value: stats?.last7dModerations, color: "text-green-400", fallback: STAT_FALLBACKS.last7dModerations },
    { icon: Shield, label: "Total Bans", value: stats?.moderations, color: "text-blue-400", fallback: STAT_FALLBACKS.moderations },
    { icon: Server, label: "Triggered Servers (7d)", value: stats?.last7dEngagedGuilds, color: "text-primary", fallback: STAT_FALLBACKS.last7dEngagedGuilds },
    { icon: Server, label: "Total Servers", value: stats?.guilds, color: "text-blue-400", fallback: STAT_FALLBACKS.guilds },
  ];

  const chartData = stats?.dailyStats?.map(stat => ({
    date: new Date(stat.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    bans: stat.moderations,
    servers: stat.engagedGuilds,
  }));

  return (
    <section id="stats" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Live Statistics
        </h2>
        <noscript className="sr-only">Note: Live stats update in real-time. JavaScript is required for live updates</noscript>
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Stat cards */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-1">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-[#12151a] p-4"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`size-5 ${stat.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      <StatValue value={stat.value} fallback={stat.fallback} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border bg-[#12151a] p-4 lg:col-span-3">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-green-400" />
                <span className="text-sm text-muted-foreground">Bans Issued</span>
              </div>
              <div className="flex items-center gap-2 ms-auto">
                <span className="text-sm text-muted-foreground">Triggered Servers</span>
                <div className="size-3 rounded-full bg-primary" />
              </div>
            </div>
            <p className="sr-only">Triggered Server means a server that has had at least 1 ban issued in the time period</p>
            <div className="h-70 w-full">
              <Suspense>
                <LiveStatsChart data={chartData} />
              </Suspense>
            </div>
            {/* <p className="mt-4 text-center text-xs text-muted-foreground">
              Real-time stats update every 60s
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
