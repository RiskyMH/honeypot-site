"use client"
import { Users, Clock, CheckCheck, ShieldAlert } from "lucide-react";

import { useStats } from "@/components/stats-context";
import { STAT_FALLBACKS } from "@/lib/stats-format";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";


export function StatValue({ value, fallback }: { value: number | null | undefined; fallback: string }) {
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
  }, [value]);

  return (
    <span className={`inline-block relative h-[1.05em]`}>
      <span className={`stat-slide ${animating ? "stat-slide-out" : "stat-slide-in"}`}>
        {showFallback ? fallback : <NumberFlow value={value || 0} />}
      </span>
    </span>
  );
}


export function StatsBar() {
  const { stats } = useStats();
  const displayStats = [
    {
      icon: Users,
      value: stats?.guilds,
      label: "Servers Protected",
      color: "text-primary",
      fallback: STAT_FALLBACKS.guilds,
    },
    {
      icon: ShieldAlert,
      value: stats?.moderations,
      label: "Users Banned",
      color: "text-primary",
      fallback: STAT_FALLBACKS.moderations,
    },
    {
      icon: CheckCheck,
      value: null,
      label: "Satisfaction Rate",
      color: "text-green-500",
      display: "99%",
    },
    {
      icon: Clock,
      value: null,
      label: "Always Online",
      color: "text-blue-400",
      display: "24/7",
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
                className={`flex items-center gap-3 ${
                  index < displayStats.length - 1
                    ? "md:border-r md:border-border md:pr-4"
                    : ""
                }`}
              >
                <stat.icon className={`size-6 ${stat.color}`} />
                <div>
                  <p className="text-xl font-bold text-foreground md:text-2xl">
                    {stat.display ?? <StatValue value={stat.value} fallback={stat.fallback} />}
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
