import Link from 'next/link';
import { FileText, Share2, ScanLine, MessageSquare } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  FileText, Share2, ScanLine, MessageSquare,
};

interface ProductCardProps {
  title: string;
  description: string;
  icon: string;
  price: string;
  href: string;
  color: string;
}

export default function ProductCard({ title, description, icon, price, href, color }: ProductCardProps) {
  const Icon = ICON_MAP[icon] || FileText;
  return (
    <Link href={href} className='glass-card p-6 block group'>
      <div className='h-1 rounded-full mb-4' style={{ background: color }} />
      <div className='w-12 h-12 rounded-lg flex items-center justify-center mb-4' style={{ background: color + '20' }}>
        <Icon size={24} />
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-gray-400 text-sm mb-4 leading-relaxed'>{description}</p>
      <div className='flex items-center justify-between'>
        <span className='text-xs text-gray-500'>{price}</span>
        <span className='text-sm text-green-400 group-hover:translate-x-1 transition-transform'>デモを見る →</span>
      </div>
    </Link>
  );
}
