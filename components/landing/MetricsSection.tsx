'use client';

import { useEffect, useRef, useState } from 'react';

const METRICS = [
  { label: '本番運用ワークフロー', value: 6, suffix: '件' },
  { label: 'SNS同時投稿先', value: 6, suffix: 'プラットフォーム' },
  { label: '月間自動処理', value: 500, suffix: '件以上' },
  { label: 'コスト削減率', value: 80, suffix: '%' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            setCount(current);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className='text-center'>
      <div className='text-4xl md:text-5xl font-bold gradient-text'>{count}<span className='text-lg ml-1'>{suffix}</span></div>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>実績</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {METRICS.map((m) => (
          <div key={m.label} className='glass-card p-6 text-center'>
            <Counter target={m.value} suffix={m.suffix} />
            <p className='text-sm text-gray-400 mt-2'>{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
