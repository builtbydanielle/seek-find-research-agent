"use client";

import { useState } from "react";

interface Props {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: Props) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (topic.trim() && !isLoading) onSubmit(topic.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <div style={{ width: "100%", maxWidth: "680px", margin: "0 auto" }}>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What do you want to research?"
        disabled={isLoading}
        rows={2}
        style={{
          width: "100%",
          padding: "18px 20px",
          fontSize: "1rem",
          borderRadius: "12px",
          border: "1.5px solid var(--border)",
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          resize: "none",
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: "1.6",
          backdropFilter: "blur(8px)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border)";
          e.target.style.boxShadow = "none";
        }}
      />
     <button
  onClick={handleSubmit}
  style={{
    marginTop: "12px",
    width: "100%",
    padding: "16px",
    fontSize: "0.95rem",
    fontWeight: "700",
    fontFamily: "'Syne', sans-serif",
    letterSpacing: "0.04em",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-pink) 100%)",
    color: "#fff",
    cursor: "pointer",
    transition: "opacity 0.2s",
    boxShadow: "0 4px 20px var(--accent-glow)",
  }}
>
  {isLoading ? "Researching..." : "Research This"}
</button>
    </div>
  );
}