import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { company_name, industry, business, values_input, goal, tone } =
      await request.json();

    if (!company_name || !industry || !business || !values_input || !goal || !tone) {
      return NextResponse.json(
        { error: "すべての質問に回答してください" },
        { status: 400 }
      );
    }

    const prompt = `あなたは企業ブランディングの専門家です。
以下の情報をもとに、ミッション・ビジョン・バリュー・パーパスを生成してください。

会社名: ${company_name}
業種: ${industry}
事業内容: ${business}
大切にしていること: ${values_input}
3年後の目標: ${goal}
トーン: ${tone}

出力形式（必ずこのJSON形式で出力してください。JSON以外のテキストは含めないでください）:
{
  "mission": "ミッション文（1〜2文）",
  "vision": "ビジョン文（1〜2文）",
  "values": [
    { "keyword": "キーワード1", "description": "説明文1" },
    { "keyword": "キーワード2", "description": "説明文2" },
    { "keyword": "キーワード3", "description": "説明文3" }
  ],
  "purpose": "パーパス文（1文）"
}

日本語で、${tone}トーンで生成してください。
企業サイトにそのまま掲載できるクオリティで。
Valueは3〜5項目で生成してください。`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "MVVの生成に失敗しました" },
      { status: 500 }
    );
  }
}
