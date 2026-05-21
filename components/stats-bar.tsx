"use client"
import { useEffect, useRef, useState } from "react";
import { Users, Shield, Trash2, Clock, CheckCheck, ShieldAlert } from "lucide-react";

import { useStats } from "@/components/stats-context";

// AnimatedStatValue: shows stat value with vertical slide animation on change
export function AnimatedStatValue({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimating(true);
      // After out animation, update text
      const outTimeout = setTimeout(() => {
        setDisplayValue(value);
        setAnimating(false);
      }, 160); // match CSS animation duration (out)
      prevValue.current = value;
      return () => clearTimeout(outTimeout);
    }
  }, [value]);

  return (
    <span className={`inline-block relative h-[1.05em] w-full`}>
      <span className={`stat-slide ${animating ? "stat-slide-out" : "stat-slide-in"}`}>{displayValue}</span>
    </span>
  );
}

export function StatsBar() {
  const { stats } = useStats();
  const displayStats = [
    {
      icon: Users,
      value: stats?.guilds?.toLocaleString?.() || "10k+",
      label: "Servers Protected",
      color: "text-primary",
      slideOnRemount: true, // on an actual change, make it a vertical slider or smth
    },
    {
      icon: ShieldAlert,
      value: stats?.moderations?.toLocaleString?.() || "50k+",
      label: "Users Banned",
      color: "text-primary",
      slideOnRemount: true,
    },
    {
      icon: CheckCheck,
      value: "99%",
      label: "Satisfaction Rate",
      color: "text-green-500",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Always Online",
      color: "text-blue-400",
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
                    {stat.slideOnRemount ? (
                      <AnimatedStatValue value={stat.value} />
                    ) : (
                      stat.value
                    )}
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
