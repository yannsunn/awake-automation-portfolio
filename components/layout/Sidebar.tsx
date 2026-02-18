'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, FileText, Share2, ScanLine, MessageSquare, Mail, Menu, X, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'ホーム', href: '/', icon: Home },
  { label: 'SEOブログ自動生成', href: '/demo/seo-blog', icon: FileText },
  { label: 'SNS自動投稿', href: '/demo/sns-posting', icon: Share2 },
  { label: '請求書OCR', href: '/demo/invoice-ocr', icon: ScanLine },
  { label: 'AIサポート', href: '/demo/ai-support', icon: MessageSquare },
  { label: 'お問い合わせ', href: '/contact', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className='fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-800/80 backdrop-blur'
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className='fixed inset-0 bg-black/50 z-30 md:hidden' onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='p-6'>
          <Link href='/' className='flex items-center gap-2 mb-8' onClick={() => setOpen(false)}>
            <Zap className='text-green-400' size={24} />
            <span className='text-lg font-bold'>Awake Automation</span>
          </Link>
          <nav className='space-y-1'>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className='absolute bottom-6 left-6 right-6'>
          <div className='text-xs text-gray-500'>© 2026 Awake Inc.</div>
        </div>
      </aside>
    </>
  );
}
