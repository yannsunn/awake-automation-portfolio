'use client';

import { Twitter, Youtube, Instagram, AtSign, Music, BookOpen, Loader2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  x: Twitter, youtube: Youtube, instagram: Instagram, threads: AtSign, tiktok: Music, note: BookOpen,
};

const COLORS: Record<string, string> = {
  x: '#1DA1F2', youtube: '#FF0000', instagram: '#E4405F', threads: '#000000', tiktok: '#010101', note: '#41C9B4',
};

interface SnsPreviewCardProps {
  platform: string;
  name: string;
  text: string;
  maxLength: number;
  loading?: boolean;
}

export default function SnsPreviewCard({ platform, name, text, maxLength, loading }: SnsPreviewCardProps) {
  const Icon = ICON_MAP[platform] || Twitter;
  const color = COLORS[platform] || '#fff';
  const charCount = text.length;

  return (
    <div className='glass-card p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ background: color + '30' }}>
          <span style={{ color }}><Icon size={16} /></span>
        </div>
        <span className='text-sm font-medium'>{name}</span>
        <span className='ml-auto text-xs text-gray-500'>{charCount}/{maxLength}</span>
      </div>
      {loading ? (
        <div className='flex items-center justify-center py-8'>
          <Loader2 size={20} className='animate-spin text-gray-500' />
        </div>
      ) : (
        <p className='text-sm text-gray-300 whitespace-pre-wrap leading-relaxed'>{text || 'プレビューがここに表示されます'}</p>
      )}
    </div>
  );
}
