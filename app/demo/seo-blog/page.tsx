'use client';

import { useState } from 'react';
import { Search, Loader2, FileText, Send } from 'lucide-react';
import SeoResultCard from '@/components/demo/SeoResultCard';

interface SeoResult {
  title: string;
  metaDescription: string;
  h2Structure: string[];
  keywords: string[];
}

export default function SeoBlogDemo() {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState('');
  const [articleStatus, setArticleStatus] = useState('');

  const fetchSuggestions = async () => {
    if (!keyword.trim()) return;
    setLoading('suggest');
    try {
      const res = await fetch('/api/proxy/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });
      const data = await res.json();
      const kws = data.keywords || data.suggestions || data.amazon || [];
      setSuggestions(Array.isArray(kws) ? kws.slice(0, 20).map((k: string | { keyword: string }) => typeof k === 'string' ? k : k.keyword) : []);
    } catch {
      setSuggestions([]);
    }
    setLoading('');
  };

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
  };

  const generateSeo = async () => {
    if (selectedKeywords.length === 0) return;
    setLoading('seo');
    try {
      const res = await fetch('/api/proxy/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: keyword,
          productDescription: selectedKeywords.join(', '),
          keywords: selectedKeywords,
        }),
      });
      const data = await res.json();
      setSeoResult({
        title: data.title || data.seoTitle || keyword + ' - SEO最適化記事',
        metaDescription: data.metaDescription || data.description || '',
        h2Structure: data.h2Structure || data.headings || data.sections || [],
        keywords: data.keywords || selectedKeywords,
      });
    } catch {
      setSeoResult(null);
    }
    setLoading('');
  };

  const publishArticle = async () => {
    if (!seoResult) return;
    setLoading('publish');
    setArticleStatus('');
    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: seoResult.title,
          keywords: seoResult.keywords,
          h2Structure: seoResult.h2Structure,
        }),
      });
      const data = await res.json();
      setArticleStatus(data.success ? '記事を生成・公開しました！' : 'エラーが発生しました');
    } catch {
      setArticleStatus('エラーが発生しました');
    }
    setLoading('');
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center'>
            <FileText size={20} className='text-green-400' />
          </div>
          <h1 className='text-2xl font-bold'>SEOブログ自動生成</h1>
        </div>
        <p className='text-gray-400'>キーワードからSEO最適化されたブログ記事構成を自動生成します</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          <div className='glass-card p-6'>
            <h2 className='text-lg font-semibold mb-4'>1. キーワード入力</h2>
            <div className='flex gap-2'>
              <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchSuggestions()}
                placeholder='例: AI 業務効率化'
                className='flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-green-500/50'
              />
              <button
                onClick={fetchSuggestions}
                disabled={loading === 'suggest'}
                className='px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg text-sm font-medium flex items-center gap-2'
              >
                {loading === 'suggest' ? <Loader2 size={16} className='animate-spin' /> : <Search size={16} />}
                サジェスト取得
              </button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className='glass-card p-6'>
              <h2 className='text-lg font-semibold mb-4'>2. キーワード選択</h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleKeyword(s)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      selectedKeywords.includes(s)
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {selectedKeywords.length > 0 && (
                <button
                  onClick={generateSeo}
                  disabled={loading === 'seo'}
                  className='w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg text-sm font-medium flex items-center justify-center gap-2'
                >
                  {loading === 'seo' ? <Loader2 size={16} className='animate-spin' /> : null}
                  SEO最適化を実行 ({selectedKeywords.length}件選択中)
                </button>
              )}
            </div>
          )}
        </div>

        <div className='space-y-6'>
          {seoResult ? (
            <>
              <SeoResultCard {...seoResult} />
              <button
                onClick={publishArticle}
                disabled={loading === 'publish'}
                className='w-full px-4 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg font-medium flex items-center justify-center gap-2'
              >
                {loading === 'publish' ? <Loader2 size={16} className='animate-spin' /> : <Send size={16} />}
                記事を生成・公開する
              </button>
              {articleStatus && (
                <div className={`p-3 rounded-lg text-sm text-center ${articleStatus.includes('エラー') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {articleStatus}
                </div>
              )}
            </>
          ) : (
            <div className='glass-card p-12 text-center'>
              <FileText size={48} className='text-gray-600 mx-auto mb-4' />
              <p className='text-gray-500'>キーワードを選択してSEO最適化を実行すると、ここに結果が表示されます</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
