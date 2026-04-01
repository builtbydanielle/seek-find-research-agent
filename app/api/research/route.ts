import { NextRequest, NextResponse } from "next/server";
import { runResearchAgent } from "@/lib/agent";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    const result = await runResearchAgent(topic.trim());

    return NextResponse.json(result);
  } catch (error) {
    console.error("Research agent error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}