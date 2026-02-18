'use client';

import { useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import ChatInterface from '@/components/demo/ChatInterface';
import StatusBadge from '@/components/ui/StatusBadge';

const MOCK_TICKETS = [
  { id: 'T-001', subject: '返品手続きについて', status: 'success' as const, statusLabel: '自動解決', time: '2分前' },
  { id: 'T-002', subject: '商品の初期不良', status: 'warning' as const, statusLabel: '転送済み', time: '15分前' },
  { id: 'T-003', subject: '配送状況の確認', status: 'success' as const, statusLabel: '自動解決', time: '1時間前' },
  { id: 'T-004', subject: 'ポイント残高について', status: 'info' as const, statusLabel: '対応中', time: '2時間前' },
  { id: 'T-005', subject: '法人請求書の発行', status: 'warning' as const, statusLabel: '転送済み', time: '3時間前' },
];

export default function AiSupportDemo() {
  const [escalated, setEscalated] = useState(false);

  const handleSend = async (question: string) => {
    const res = await fetch('/api/ai-support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    return res.json();
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
            <MessageSquare size={20} className='text-purple-400' />
          </div>
          <h1 className='text-2xl font-bold'>AIカスタマーサポート</h1>
        </div>
        <p className='text-gray-400'>FAQデータベースを活用したAI自動応答デモ</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div className='glass-card overflow-hidden'>
            <div className='px-4 py-3 border-b border-white/10 flex items-center justify-between'>
              <span className='text-sm font-medium'>チャット</span>
              <button
                onClick={() => setEscalated(true)}
                className='px-3 py-1 text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-lg flex items-center gap-1'
              >
                <Phone size={12} /> 人間に転送
              </button>
            </div>
            {escalated ? (
              <div className='p-12 text-center'>
                <Phone size={40} className='text-amber-400 mx-auto mb-4' />
                <p className='text-lg font-medium mb-2'>オペレーターに転送しました</p>
                <p className='text-sm text-gray-400'>担当者が対応いたします。少々お待ちください。</p>
                <button onClick={() => setEscalated(false)} className='mt-4 text-sm text-purple-400 hover:underline'>
                  AIチャットに戻る
                </button>
              </div>
            ) : (
              <ChatInterface onSend={handleSend} />
            )}
          </div>
        </div>

        <div className='space-y-6'>
          <div className='glass-card p-4'>
            <h2 className='text-sm font-semibold mb-3'>ナレッジベース</h2>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'><span className='text-gray-400'>FAQ登録数</span><span>10件</span></div>
              <div className='flex justify-between'><span className='text-gray-400'>カテゴリ</span><span>7種類</span></div>
              <div className='flex justify-between'><span className='text-gray-400'>自動解決率</span><span className='text-green-400'>78%</span></div>
              <div className='flex justify-between'><span className='text-gray-400'>平均応答時間</span><span className='text-blue-400'>1.2秒</span></div>
            </div>
          </div>

          <div className='glass-card p-4'>
            <h2 className='text-sm font-semibold mb-3'>最近のチケット</h2>
            <div className='space-y-3'>
              {MOCK_TICKETS.map((t) => (
                <div key={t.id} className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm font-medium'>{t.subject}</p>
                    <p className='text-xs text-gray-500'>
                      {t.id} · {t.time}
                    </p>
                  </div>
                  <StatusBadge status={t.status} label={t.statusLabel} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
