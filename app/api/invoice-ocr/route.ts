import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/glm-client';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'file is required' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type || 'image/jpeg';

    const prompt = `この請求書画像から以下の情報を抽出してJSON形式で返してください。
{
  "vendor": "取引先名",
  "invoiceNumber": "請求書番号",
  "date": "発行日 (YYYY-MM-DD)",
  "dueDate": "支払期限 (YYYY-MM-DD)",
  "subtotal": 小計（数値）, 
  "tax": 消費税（数値）, 
  "total": 合計（数値）, 
  "items": [
    { "name": "品目名", "quantity": 数量, "unitPrice": 単価, "amount": 金額 }
  ]
}
JSONのみを返してください。`;

    const result = await chatCompletion([
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
        ],
      },
    ], 0.1);

    let parsed;
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: result };
    } catch {
      parsed = { raw: result };
    }

    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
