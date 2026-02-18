import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/glm-client';
import { FAQ_DATA } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ error: 'question is required' }, { status: 400 });

    const faqContext = FAQ_DATA.map((f) => `Q: ${f.question}\nA: ${f.answer}\nカテゴリ: ${f.category}\n`).join('\n');

    const result = await chatCompletion(
      [
        {
          role: 'system',
          content: `あなたはカスタマーサポートAIです。以下のFAQデータベースを参照して回答してください。

FAQデータベース:
${faqContext}

ルール:
1. FAQに関連する質問は、FAQの内容に基づいて回答してください
2. FAQにない質問や複雑な問題は「人間のオペレーターに転送することを推奨します」と伝えてください
3. 必ず以下のJSON形式で返してください:
{
  "answer": "回答テキスト",
  "references": [参照したFAQのID番号の配列],
  "confidence": 0.0-1.0の信頼度,
  "shouldEscalate": true/false
}
JSONのみを返してください。`,
        },
        { role: 'user', content: question },
      ],
      0.3,
    );

    let parsed;
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      parsed = jsonMatch
        ? JSON.parse(jsonMatch[0])
        : { answer: result, references: [], confidence: 0.5, shouldEscalate: false };
    } catch {
      parsed = { answer: result, references: [], confidence: 0.5, shouldEscalate: false };
    }

    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
