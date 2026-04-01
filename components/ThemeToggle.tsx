"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      setIsLight(true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      setIsLight(false);
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "6px 16px",
        cursor: "pointer",
        color: "var(--text-secondary)",
        fontSize: "0.82rem",
        fontFamily: "'Syne', sans-serif",
        fontWeight: "600",
        letterSpacing: "0.06em",
        transition: "border-color 0.2s, color 0.2s",
      }}
    >
      {isLight ? "Dark" : "Light"}
    </button>
  );
}