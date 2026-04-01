import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Research Agent",
  description: "AI-powered multi-step research agent built with Claude and Tavily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
          padding: "0 32px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background-color 0.4s ease",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://ik.imagekit.io/riverandskyline/light-bulb-purple.png"
              alt="Research Agent"
              style={{ width: "64px", height: "64px", objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "'Syne Mono', sans-serif",
              fontWeight: "400",
              fontSize: "2.1rem",
              letterSpacing: "-0.3px",
              color: "var(--text-primary)",
            }}>
              seek+find
            </span>
          </div>
          <ThemeToggle />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}