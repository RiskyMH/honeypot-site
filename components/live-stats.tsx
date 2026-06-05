"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Shield, MessageSquare, Server } from "lucide-react";
import { useStats } from "@/components/stats-context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { AnimatedStatValue } from "./stats-bar";

export function LiveStats() {
  const { stats: _stats } = useStats();
  const isMobile = useIsMobile();
  // if (!stats) return null;
  const stats = _stats || {
    guilds: 15_000,
    moderations: 100_000,
    last7dModerations: 20_000,
    last7dEngagedGuilds: 4_000,
    dailyStats: [],
  };

  // Formatting logic local to this component
  const statCards = [
    { icon: Shield, label: "Bans (7d)", value: stats.last7dModerations?.toLocaleString?.() || "-", color: "text-green-400" },
    { icon: Shield, label: "Total Bans", value: stats.moderations?.toLocaleString?.() || "-", color: "text-blue-400" },
    { icon: Server, label: "Triggered Servers (7d)", value: stats.last7dEngagedGuilds?.toLocaleString?.() || "-", color: "text-primary" },
    { icon: Server, label: "Total Servers", value: stats.guilds?.toLocaleString?.() || "-", color: "text-blue-400" },
  ];

  const chartData = stats.dailyStats?.map(stat => ({
    date: new Date(stat.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    bans: stat.moderations,
    servers: stat.engagedGuilds,
  }));

  // if (!chartData.length) return null;

  return (
    <section id="stats" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Live Statistics
        </h2>
        <noscript className="hidden">Note: Live stats update in real-time. JavaScript is required for live updates</noscript>
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
                      <AnimatedStatValue value={stat.value} />
                      {/* {stat.value} */}
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
            <p className="hidden">Triggered Server means a server that has had at least 1 ban issued in the time period</p>
            <div className="h-70 w-full ">
              {!!chartData?.length && <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    xAxisId="main"
                    type="category"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    tickLine={false}
                  />
                  <XAxis
                    xAxisId="boring"
                    type="number"
                    domain={[0, 2]}
                    hide
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    domain={['auto', 'auto']}
                    tick={{ fill: "#4ade80B3", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    tickLine={false}
                    tickFormatter={(value) =>
                      value >= 1000 ? `${value / 1000}k` : value
                    }
                    hide={isMobile}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={['auto', 'auto']}
                    tick={{ fill: "#f59e0bB3", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    tickLine={false}
                    tickFormatter={(value) =>
                      value >= 1000 ? `${value / 1000}k` : value
                    }
                    hide={isMobile}
                  />
                  <ReferenceLine xAxisId="boring" x={1} yAxisId={"left"} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1d21",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                    formatter={(value) => value.toLocaleString()}
                  />
                  <Line
                    yAxisId="left"
                    xAxisId="main"
                    type="monotone"
                    dataKey="bans"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={{ fill: "#4ade80", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <Line
                    yAxisId="right"
                    xAxisId="main"
                    type="monotone"
                    dataKey="servers"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{
                      fill: "#f59e0b",
                      strokeWidth: 0,
                      r: 4,
                    }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>}
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
