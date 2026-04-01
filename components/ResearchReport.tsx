"use client";

import { SearchResult } from "@/lib/tavily";

interface Props {
  report: string;
  sources: SearchResult[];
  queries: string[];
}

export default function ResearchReport({ report, sources, queries }: Props) {
  return (
    <div className="fade-up" style={{
      display: "grid",
      gridTemplateColumns: "1fr 340px",
      gridTemplateRows: "auto 1fr",
      gap: "24px",
      alignItems: "start",
    }}>

      {/* Queries row — full width */}
      <div style={{
        gridColumn: "1 / -1",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}>
          Searches run
        </span>
        {queries.map((q, i) => (
          <span key={i} className={`fade-up-delay-${Math.min(i + 1, 3)}`} style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "5px 12px",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "500",
          }}>
            {q}
          </span>
        ))}
        <div style={{
          marginLeft: "auto",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}>
          {sources.length} sources analyzed
        </div>
      </div>

      {/* Report — left column */}
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "16px",
        padding: "36px 40px",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{
            width: "3px",
            height: "20px",
            backgroundColor: "var(--accent)",
            borderRadius: "2px",
          }} />
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.7rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}>
            Research Report
          </span>
        </div>
        <div
          className="report-content"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(report) }}
        />
      </div>

      {/* Sources — right column sticky */}
      <div style={{
        position: "sticky",
        top: "80px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "4px",
        }}>
          <div style={{
            width: "3px",
            height: "16px",
            backgroundColor: "var(--accent)",
            borderRadius: "2px",
          }} />
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.7rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}>
            Sources
          </span>
        </div>

        {sources.map((s, i) => {
          let domain = "";
          try { domain = new URL(s.url).hostname.replace("www.", ""); } catch {}
          return (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "14px 16px",
                backgroundColor: "var(--bg-card)",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                borderLeft: "3px solid var(--accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(3px)";
                e.currentTarget.style.boxShadow = "var(--shadow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                  alt=""
                  width={14}
                  height={14}
                  style={{ borderRadius: "2px", opacity: 0.8 }}
                />
                <span style={{
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                }}>
                  {domain}
                </span>
                <span style={{
                  marginLeft: "auto",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
              </div>
              <p style={{
                fontSize: "0.82rem",
                color: "var(--text-primary)",
                fontWeight: "500",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {s.title}
              </p>
            </a>
          );
        })}
      </div>

    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^\- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])/gm, "<p>")
    .replace(/(?<![>])$/gm, "</p>")
    .replace(/<p><\/p>/g, "");
}