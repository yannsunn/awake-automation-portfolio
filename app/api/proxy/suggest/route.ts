import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();
    if (!keyword) return NextResponse.json({ error: 'keyword is required' }, { status: 400 });
    const url = new URL('/api/suggest', process.env.KEYWORD_API_URL || 'https://keywords.awakeinc.co.jp');
    url.searchParams.set('keyword', keyword);
    url.searchParams.set('source', 'amazon,google');
    const res = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
