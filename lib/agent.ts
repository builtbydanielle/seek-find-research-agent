import Anthropic from "@anthropic-ai/sdk";
import { searchWeb, SearchResult } from "./tavily";

const client = new Anthropic();

export interface ResearchResult {
  report: string;
  sources: SearchResult[];
  queries: string[];
}

export async function runResearchAgent(topic: string): Promise<ResearchResult> {
  const allSources: SearchResult[] = [];
  const allQueries: string[] = [];

  // Step 1: Ask Claude what to search for
  const planResponse = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a research agent. A user wants to research this topic: "${topic}"
        
Generate 3 specific search queries that would give the best coverage of this topic.
Return ONLY a JSON array of strings, nothing else. Example: ["query one", "query two", "query three"]`,
      },
    ],
  });

  const planText = planResponse.content[0].type === "text" ? planResponse.content[0].text : "[]";
  
  let queries: string[] = [];
  try {
    queries = JSON.parse(planText);
  } catch {
    queries = [topic];
  }

  // Step 2: Run all searches
  for (const query of queries) {
    allQueries.push(query);
    const results = await searchWeb(query, 4);
    allSources.push(...results);
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const uniqueSources = allSources.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });

  // Step 3: Ask Claude to synthesize a report
  const sourceText = uniqueSources
    .map((s, i) => `[${i + 1}] ${s.title}\n${s.url}\n${s.content}`)
    .join("\n\n");

  const reportResponse = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a research analyst. Using the following sources, write a clear, well-structured research report on: "${topic}"

Sources:
${sourceText}

Write the report in markdown. Include:
- A brief executive summary
- Key findings organized by theme
- Cite sources inline using [1], [2] etc.
- A short conclusion

Be thorough but concise. Do not make up information not found in the sources.`,
      },
    ],
  });

  const report =
    reportResponse.content[0].type === "text"
      ? reportResponse.content[0].text
      : "Unable to generate report.";

  return {
    report,
    sources: uniqueSources,
    queries: allQueries,
  };
}