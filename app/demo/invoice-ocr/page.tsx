'use client';

import { useState } from 'react';
import { ScanLine, Loader2, CheckCircle, XCircle, Download } from 'lucide-react';
import FileUpload from '@/components/demo/FileUpload';

interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface InvoiceData {
  vendor?: string;
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  items?: InvoiceItem[];
  raw?: string;
}

export default function InvoiceOcrDemo() {
  const [result, setResult] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [approved, setApproved] = useState<boolean | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError('');
    setResult(null);
    setApproved(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/invoice-ocr', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(String(e));
    }
    setLoading(false);
  };

  const fmt = (n?: number) => n != null ? n.toLocaleString('ja-JP') : '-';

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center'>
            <ScanLine size={20} className='text-amber-400' />
          </div>
          <h1 className='text-2xl font-bold'>請求書OCR処理</h1>
        </div>
        <p className='text-gray-400'>AI画像認識で請求書を自動読取。構造化データに変換します。</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          <div className='glass-card p-6'>
            <h2 className='text-lg font-semibold mb-4'>請求書アップロード</h2>
            <FileUpload onFileSelect={handleFileSelect} />
            {loading && (
              <div className='flex items-center justify-center gap-2 mt-4 text-amber-400'>
                <Loader2 size={16} className='animate-spin' /> AI解析中...
              </div>
            )}
            {error && <p className='mt-4 text-sm text-red-400'>{error}</p>}
          </div>

          {result && !result.raw && (
            <div className='glass-card p-6'>
              <h2 className='text-lg font-semibold mb-4'>承認フロー</h2>
              <div className='flex gap-3'>
                <button
                  onClick={() => setApproved(true)}
                  className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${approved === true ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                >
                  <CheckCircle size={16} /> 承認
                </button>
                <button
                  onClick={() => setApproved(false)}
                  className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${approved === false ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
                >
                  <XCircle size={16} /> 差し戻し
                </button>
              </div>
              {approved === true && <p className='text-green-400 text-sm mt-3 text-center'>承認済み — freee/Google Sheetsへ連携可能</p>}
              {approved === false && <p className='text-red-400 text-sm mt-3 text-center'>差し戻し — 修正が必要です</p>}
            </div>
          )}
        </div>

        <div>
          {result && !result.raw ? (
            <div className='glass-card p-6 space-y-4'>
              <h2 className='text-lg font-semibold'>抽出結果</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div><span className='text-xs text-gray-500'>取引先</span><p className='font-medium'>{result.vendor || '-'}</p></div>
                <div><span className='text-xs text-gray-500'>請求書番号</span><p className='font-medium'>{result.invoiceNumber || '-'}</p></div>
                <div><span className='text-xs text-gray-500'>発行日</span><p className='font-medium'>{result.date || '-'}</p></div>
                <div><span className='text-xs text-gray-500'>支払期限</span><p className='font-medium'>{result.dueDate || '-'}</p></div>
              </div>
              {result.items && result.items.length > 0 && (
                <div>
                  <h3 className='text-sm font-medium text-gray-400 mb-2'>品目一覧</h3>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='text-gray-500 border-b border-white/10'>
                        <th className='text-left py-2'>品目</th>
                        <th className='text-right py-2'>数量</th>
                        <th className='text-right py-2'>単価</th>
                        <th className='text-right py-2'>金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.items.map((item, i) => (
                        <tr key={i} className='border-b border-white/5'>
                          <td className='py-2'>{item.name}</td>
                          <td className='text-right'>{item.quantity}</td>
                          <td className='text-right'>¥{fmt(item.unitPrice)}</td>
                          <td className='text-right'>¥{fmt(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className='border-t border-white/10 pt-4 space-y-1'>
                <div className='flex justify-between text-sm'><span className='text-gray-400'>小計</span><span>¥{fmt(result.subtotal)}</span></div>
                <div className='flex justify-between text-sm'><span className='text-gray-400'>消費税</span><span>¥{fmt(result.tax)}</span></div>
                <div className='flex justify-between text-lg font-bold'><span>合計</span><span className='text-amber-400'>¥{fmt(result.total)}</span></div>
              </div>
              <div className='pt-4 flex gap-2'>
                <button className='flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center justify-center gap-1'>
                  <Download size={14} /> Google Sheets連携
                </button>
                <button className='flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center justify-center gap-1'>
                  <Download size={14} /> freee連携
                </button>
              </div>
            </div>
          ) : result?.raw ? (
            <div className='glass-card p-6'>
              <h2 className='text-lg font-semibold mb-2'>解析結果（テキスト）</h2>
              <pre className='text-sm text-gray-300 whitespace-pre-wrap'>{result.raw}</pre>
            </div>
          ) : (
            <div className='glass-card p-12 text-center'>
              <ScanLine size={48} className='text-gray-600 mx-auto mb-4' />
              <p className='text-gray-500'>請求書画像をアップロードすると、AI解析結果がここに表示されます</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
