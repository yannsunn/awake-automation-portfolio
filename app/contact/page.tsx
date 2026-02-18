'use client';

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    type: 'consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className='max-w-2xl mx-auto py-20 text-center'>
        <CheckCircle size={64} className='text-green-400 mx-auto mb-6' />
        <h1 className='text-3xl font-bold mb-4'>送信完了</h1>
        <p className='text-gray-400 mb-8'>お問い合わせありがとうございます。2営業日以内にご連絡いたします。</p>
        <a href='/' className='px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium'>トップに戻る</a>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center'>
            <Mail size={20} className='text-green-400' />
          </div>
          <h1 className='text-2xl font-bold'>お問い合わせ</h1>
        </div>
        <p className='text-gray-400'>自動化ソリューションの導入相談、デモ予約はこちらから</p>
      </div>

      <form onSubmit={handleSubmit} className='glass-card p-8 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm text-gray-400 mb-1'>会社名 <span className='text-red-400'>*</span></label>
            <input
              type='text'
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className='w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50'
            />
          </div>
          <div>
            <label className='block text-sm text-gray-400 mb-1'>担当者名 <span className='text-red-400'>*</span></label>
            <input
              type='text'
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className='w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm text-gray-400 mb-1'>メールアドレス <span className='text-red-400'>*</span></label>
            <input
              type='email'
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className='w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50'
            />
          </div>
          <div>
            <label className='block text-sm text-gray-400 mb-1'>電話番号</label>
            <input
              type='tel'
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className='w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm text-gray-400 mb-2'>お問い合わせ種別</label>
          <div className='flex flex-wrap gap-3'>
            {[
              { value: 'consultation', label: '導入相談（無料）' },
              { value: 'estimate', label: '見積もり依頼' },
              { value: 'demo', label: 'デモ予約' },
            ].map((opt) => (
              <label key={opt.value} className={`px-4 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
                form.type === opt.value
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}>
                <input
                  type='radio'
                  name='type'
                  value={opt.value}
                  checked={form.type === opt.value}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className='hidden'
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className='block text-sm text-gray-400 mb-1'>ご相談内容 <span className='text-red-400'>*</span></label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder='自動化したい業務や課題をお聞かせください...'
            className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50 resize-none'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg font-medium flex items-center justify-center gap-2'
        >
          {loading ? <Loader2 size={16} className='animate-spin' /> : <Send size={16} />}
          送信する
        </button>
      </form>
    </div>
  );
}
