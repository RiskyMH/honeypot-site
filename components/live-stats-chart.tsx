"use client";

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
import { RawStats } from "./stats-context";
import { useIsMobile } from "@/hooks/use-mobile";


export function LiveStatsChart({ data }: {
  data: {
    date: string;
    bans: number;
    servers: number;
  }[]
}) {
  const isMobile = useIsMobile();
  if (!data?.length) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} >
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
    </ResponsiveContainer>
  );
}