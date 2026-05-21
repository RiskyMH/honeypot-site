"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface RawStats {
  guilds: number;
  moderations: number;
  last7dModerations: number;
  last7dEngagedGuilds: number;
  dailyStats: Array<{
    date: string;
    moderations: number;
    engagedGuilds: number;
  }>;
}

interface StatsContextShape {
  stats: RawStats | null;
}

const StatsContext = createContext<StatsContextShape>({ stats: null });
export function useStats() {
  return useContext(StatsContext);
}

export function StatsProvider({ children, initialStats }: { children: ReactNode; initialStats?: RawStats }) {
  const [stats, setStats] = useState<RawStats | null>(initialStats ?? null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let pingInterval: ReturnType<typeof setInterval> | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let intentionallyClosed = false;

    let fetchController: AbortController | null = null;
    let wsReceivedFirst = false;
    let fetchCompleted = false;

    async function doFetchInitialStats() {
      fetchController = new AbortController();
      try {
        const response = await fetch("https://honeypot-stats.riskymh.dev", {
          signal: fetchController.signal,
        });
        if (!response.ok) return;
        const json = await response.json();
        if (!wsReceivedFirst) {
          fetchCompleted = true;
          setStats(json);
        }
      } catch (e) {
        // Fetch was likely aborted or failed. Do nothing.
      }
    }

    function cleanupConnection() {
      intentionallyClosed = true;
      if (pingInterval) { clearInterval(pingInterval); pingInterval = null; }
      if (reconnectTimeout) { clearTimeout(reconnectTimeout); reconnectTimeout = null; }
      if (ws) { ws.close(); ws = null; }
      if (fetchController) { fetchController.abort(); fetchController = null; }
    }

    function connect() {
      intentionallyClosed = false;
      ws = new WebSocket("wss://honeypot-stats.riskymh.dev/ws");
      ws.onopen = () => {
        if (pingInterval) clearInterval(pingInterval);
        pingInterval = setInterval(() => {
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send("");
          }
        }, 5 * 60 * 1000); // 5min
      };
      ws.onmessage = (event) => {
        wsReceivedFirst = true;
        // If fetch still in progress, abort it
        if (fetchController && !fetchCompleted) {
          fetchController.abort();
        }
        try {
          const json = JSON.parse(event.data);
          setStats(json);
        } catch { }
      };
      ws.onclose = () => {
        if (pingInterval) {
          clearInterval(pingInterval);
          pingInterval = null;
        }
        // Only reconnect if visible
        if (!intentionallyClosed && document.visibilityState === "visible") {
          const baseDelay = 3000;
          const jitter = Math.floor(Math.random() * 1200);
          reconnectTimeout = setTimeout(connect, baseDelay + jitter);
        }
      };
      ws.onerror = () => { };
    }

    const handleVis = () => {
      if (document.visibilityState === "visible") {
        // If ws is gone or closed, reconnect
        if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
          if (reconnectTimeout) clearTimeout(reconnectTimeout); // avoid duplicate reconnect on rapid vis
          connect();
        }
      }
      // If hidden: do nothing (keep connection alive)
    };

    document.addEventListener("visibilitychange", handleVis);
    connect();

    // Only fetch if we do NOT have initialStats
    if (initialStats == null) {
      doFetchInitialStats();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVis);
      cleanupConnection();
    };
  }, []);


  return (
    <StatsContext.Provider value={{ stats }}>
      {children}
    </StatsContext.Provider>
  );
}
