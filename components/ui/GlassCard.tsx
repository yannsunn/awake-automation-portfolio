import Link from 'next/link';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function GlassCard({ children, className = '', onClick, href }: GlassCardProps) {
  const baseClass = `glass-card p-6 ${className}`;
  if (href) {
    return <Link href={href} className={baseClass}>{children}</Link>;
  }
  return <div className={baseClass} onClick={onClick}>{children}</div>;
}
