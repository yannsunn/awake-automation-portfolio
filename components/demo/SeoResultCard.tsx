'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface SeoResultCardProps {
  title: string;
  metaDescription: string;
  h2Structure: string[];
  keywords: string[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className='p-1 text-gray-500 hover:text-gray-300 transition-colors'>
      {copied ? <Check size={14} className='text-green-400' /> : <Copy size={14} />}
    </button>
  );
}

export default function SeoResultCard({ title, metaDescription, h2Structure, keywords }: SeoResultCardProps) {
  return (
    <div className='glass-card p-6 space-y-6'>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium text-gray-400'>タイトル</h3>
          <CopyButton text={title} />
        </div>
        <p className='text-lg font-bold text-green-400'>{title}</p>
      </div>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium text-gray-400'>メタディスクリプション</h3>
          <CopyButton text={metaDescription} />
        </div>
        <p className='text-sm text-gray-300'>{metaDescription}</p>
      </div>
      <div>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>H2構成</h3>
        <ol className='space-y-1'>
          {h2Structure.map((h, i) => (
            <li key={i} className='text-sm text-gray-300 flex items-start gap-2'>
              <span className='text-green-400 font-mono text-xs mt-0.5'>H2-{i + 1}</span>
              {h}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>キーワード一覧</h3>
        <div className='flex flex-wrap gap-2'>
          {keywords.map((kw, i) => (
            <span key={i} className='px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400'>
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
