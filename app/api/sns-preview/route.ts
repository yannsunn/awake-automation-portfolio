import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/glm-client';

const PLATFORM_LIMITS: Record<string, { name: string; maxLength: number; style: string }> = {
  x: { name: 'X (Twitter)', maxLength: 280, style: '短くインパクトのある文。ハッシュタグ2-3個。絵文字あり。' },
  youtube: { name: 'YouTube', maxLength: 5000, style: '詳細な説明文。タイムスタンプ形式。ハッシュタグ多め。' },
  instagram: { name: 'Instagram', maxLength: 2200, style: 'ビジュアル重視の文。ハッシュタグ10-15個。改行多め。' },
  threads: { name: 'Threads', maxLength: 500, style: 'カジュアルで会話調。ハッシュタグ少なめ。' },
  tiktok: { name: 'TikTok', maxLength: 2200, style: '若者向けカジュアル。トレンドハッシュタグ。' },
  note: { name: 'Note', maxLength: 10000, style: '丁寧で読みやすい長文。見出し付き。' },
};

export async function POST(req: NextRequest) {
  try {
    const { text, platform } = await req.json();
    if (!text || !platform) return NextResponse.json({ error: 'text and platform required' }, { status: 400 });
    const p = PLATFORM_LIMITS[platform];
    if (!p) return NextResponse.json({ error: 'invalid platform' }, { status: 400 });

    const content = await chatCompletion([
      {
        role: 'system',
        content: `あなたはSNSコンテンツライターです。以下のプラットフォーム向けに投稿文をリライトしてください。
プラットフォーム: ${p.name}
文字数上限: ${p.maxLength}文字
スタイル: ${p.style}
投稿文のみを返してください。説明や前置きは不要です。`,
      },
      { role: 'user', content: text },
    ], 0.7);

    return NextResponse.json({ platform, text: content.slice(0, p.maxLength) });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
