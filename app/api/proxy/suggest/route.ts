import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();
    if (!keyword) return NextResponse.json({ error: 'keyword is required' }, { status: 400 });
    const baseUrl = process.env.KEYWORD_API_URL || 'https://keywords.awakeinc.co.jp';
    const url = new URL('/api/keywords/suggest', baseUrl);
    url.searchParams.set('keyword', keyword);
    url.searchParams.set('source', 'amazon,google');

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const apiSecret = process.env.KEYWORD_API_SECRET;
    if (apiSecret) {
      headers['Authorization'] = `Bearer ${apiSecret}`;
    }

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Backend error: ${res.status}`, detail: text }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
