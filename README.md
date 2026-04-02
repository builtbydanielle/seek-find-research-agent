# seek+find

A multi-step AI research agent that actually goes out and finds things, searches the web, reads the sources, and hands you back a structured report.
Built with Next.js, Claude, and Tavily.

---

## How it works

Type in a topic. The agent figures out what to search for, runs multiple queries, pulls the sources, and synthesizes everything into a clean report with citations. You didn't have to do any of that.

1. Enter a research topic
2. Claude generates targeted search queries
3. Tavily runs the searches in real time
4. Claude reads across all sources and writes the report
5. Sources are cited and linked

---

## Stack

- **Next.js 16** — App Router, API routes, SSR
- **Claude (claude-opus-4-5)** — multi-step reasoning and synthesis
- **Tavily Search API** — real-time web search built for AI agents
- **TypeScript** — end to end
- **CSS variables** — dark/light mode theming

---

## Run it locally
```bash
git clone https://github.com/builtbydanielle/research-agent.git
cd research-agent
npm install
```

Create a `.env.local` file in the root:
```
ANTHROPIC_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

Then:
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)

---

## API keys

- **Anthropic** — [console.anthropic.com](https://console.anthropic.com)
- **Tavily** — [app.tavily.com](https://app.tavily.com) — free tier works fine

---

## Structure
```
app/
  api/research/route.ts   # API endpoint
  layout.tsx              # Shell, header, theme
  page.tsx                # Main page
components/
  SearchForm.tsx          # Input
  ResearchReport.tsx      # Report + sources
  ThemeToggle.tsx         # Dark/light toggle
lib/
  agent.ts                # Agent logic
  tavily.ts               # Search integration
```

---

Built by [Danielle Denton](https://github.com/builtbydanielle) — full-stack developer and marketing developer building AI-powered tools to help humans, not replace them.
