"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResearchReport from "@/components/ResearchReport";
import { SearchResult } from "@/lib/tavily";

interface ReportData {
  report: string;
  sources: SearchResult[];
  queries: string[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px 80px",
        textAlign: "center",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,38,211,0.2) 0%, transparent 70%), var(--bg-hero)",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.3,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            border: "1px solid var(--accent)",
            borderRadius: "20px",
            padding: "4px 14px",
            fontSize: "0.7rem",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent-alt)",
            marginBottom: "28px",
            background: "var(--accent-glow)",
          }}>
            Powered by Claude + Tavily
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: "800",
            letterSpacing: "-2px",
            lineHeight: "1.05",
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}>
            Research anything,{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-pink) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              deeply.
            </span>
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            maxWidth: "480px",
            margin: "0 auto 48px",
            lineHeight: "1.7",
            fontWeight: "300",
          }}>
            The agent searches the web, reasons across sources, and delivers a structured report.
          </p>

          <SearchForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "48px 24px" }}>

        {isLoading && (
          <div className="fade-up" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "80px 0",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              animation: "spin 0.7s linear infinite",
            }} />
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: "700",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                marginBottom: "6px",
              }}>
                Agent is working...
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Searching the web, reading sources, building your report
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="fade-up" style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "16px 20px",
            borderRadius: "12px",
            backgroundColor: "var(--bg-card)",
            borderLeft: "3px solid #e05c5c",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
          }}>
            {error}
          </div>
        )}

        {result && (
          <ResearchReport
            report={result.report}
            sources={result.sources}
            queries={result.queries}
          />
        )}
      </div>
    </div>
  );
}