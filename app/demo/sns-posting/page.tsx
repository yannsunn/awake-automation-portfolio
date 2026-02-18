'use client';

import { useState } from 'react';
import { Share2, Loader2, Wand2 } from 'lucide-react';
import SnsPreviewCard from '@/components/demo/SnsPreviewCard';

const PLATFORMS = [
  { id: 'x', name: 'X (Twitter)', maxLength: 280 },
  { id: 'youtube', name: 'YouTube', maxLength: 5000 },
  { id: 'instagram', name: 'Instagram', maxLength: 2200 },
  { id: 'threads', name: 'Threads', maxLength: 500 },
  { id: 'tiktok', name: 'TikTok', maxLength: 2200 },
  { id: 'note', name: 'Note', maxLength: 10000 },
];

export default function SnsPostingDemo() {
  const [text, setText] = useState('');
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loadingPlatforms, setLoadingPlatforms] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);

  const generateAll = async () => {
    if (!text.trim()) return;
    setGenerating(true);
    const newPreviews: Record<string, string> = {};
    const newLoading = new Set(PLATFORMS.map((p) => p.id));
    setLoadingPlatforms(newLoading);

    for (const platform of PLATFORMS) {
      try {
        const res = await fetch('/api/sns-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: text.trim(), platform: platform.id }),
        });
        const data = await res.json();
        newPreviews[platform.id] = data.text || '';
      } catch {
        newPreviews[platform.id] = 'エラーが発生しました';
      }
      setPreviews({ ...newPreviews });
      newLoading.delete(platform.id);
      setLoadingPlatforms(new Set(newLoading));
    }
    setGenerating(false);
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
            <Share2 size={20} className='text-blue-400' />
          </div>
          <h1 className='text-2xl font-bold'>SNS自動投稿</h1>
        </div>
        <p className='text-gray-400'>1つのテキストを6プラットフォーム向けにAIがリライトします</p>
      </div>

      <div className='glass-card p-6 mb-8'>
        <h2 className='text-lg font-semibold mb-4'>投稿テキスト</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='投稿したいテキストを入力してください...'
          rows={4}
          className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 resize-none'
        />
        <button
          onClick={generateAll}
          disabled={generating || !text.trim()}
          className='mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg text-sm font-medium flex items-center gap-2'
        >
          {generating ? <Loader2 size={16} className='animate-spin' /> : <Wand2 size={16} />}
          6プラットフォーム向けにリライト
        </button>
      </div>

      <h2 className='text-lg font-semibold mb-4'>プレビュー</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {PLATFORMS.map((p) => (
          <SnsPreviewCard
            key={p.id}
            platform={p.id}
            name={p.name}
            text={previews[p.id] || ''}
            maxLength={p.maxLength}
            loading={loadingPlatforms.has(p.id)}
          />
        ))}
      </div>

      <div className='mt-8 glass-card p-6'>
        <h2 className='text-lg font-semibold mb-2'>投稿スケジュール（デモ）</h2>
        <p className='text-sm text-gray-400 mb-4'>実際の投稿は打ち合わせ時に手動トリガーで実演します</p>
        <div className='grid grid-cols-7 gap-1'>
          {Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i);
            return (
              <div key={i} className='p-3 rounded-lg bg-white/5 text-center'>
                <div className='text-xs text-gray-500'>{d.toLocaleDateString('ja-JP', { weekday: 'short' })}</div>
                <div className='text-lg font-bold'>{d.getDate()}</div>
                {i < 3 && <div className='w-2 h-2 rounded-full bg-blue-400 mx-auto mt-1' />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
