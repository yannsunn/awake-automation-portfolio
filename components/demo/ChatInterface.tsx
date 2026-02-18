'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, AlertTriangle } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  references?: number[];
  confidence?: number;
  shouldEscalate?: boolean;
}

interface ChatInterfaceProps {
  onSend: (question: string) => Promise<{
    answer: string;
    references?: number[];
    confidence?: number;
    shouldEscalate?: boolean;
  }>;
}

export default function ChatInterface({ onSend }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', content: 'こんにちは！カスタマーサポートAIです。ご質問をどうぞ。' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await onSend(userMsg.content);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: res.answer,
        references: res.references,
        confidence: res.confidence,
        shouldEscalate: res.shouldEscalate,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: 'エラーが発生しました。' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col h-[500px]'>
      <div className='flex-1 overflow-y-auto space-y-4 p-4'>
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0'>
                <Bot size={16} className='text-purple-400' />
              </div>
            )}
            <div
              className={`max-w-[75%] ${
                m.role === 'user' ? 'bg-blue-500/20 border-blue-500/30' : 'bg-white/5 border-white/10'
              } border rounded-xl px-4 py-3`}
            >
              <p className='text-sm whitespace-pre-wrap'>{m.content}</p>
              {m.confidence != null && (
                <div className='mt-2 flex items-center gap-2 text-xs text-gray-500'>
                  <span>信頼度: {Math.round(m.confidence * 100)}%</span>
                  {m.shouldEscalate && (
                    <span className='flex items-center gap-1 text-amber-400'>
                      <AlertTriangle size={12} /> 転送推奨
                    </span>
                  )}
                </div>
              )}
              {m.references && m.references.length > 0 && (
                <div className='mt-1 text-xs text-gray-500'>参照: FAQ #{m.references.join(', #')}</div>
              )}
            </div>
            {m.role === 'user' && (
              <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0'>
                <User size={16} className='text-blue-400' />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className='flex gap-3'>
            <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
              <Bot size={16} className='text-purple-400' />
            </div>
            <div className='bg-white/5 border border-white/10 rounded-xl px-4 py-3'>
              <Loader2 size={16} className='animate-spin text-gray-500' />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className='border-t border-white/10 p-4 flex gap-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder='質問を入力...'
          className='flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-purple-500/50'
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className='px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 rounded-lg'
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
