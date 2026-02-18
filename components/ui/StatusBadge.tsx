const COLORS = {
  success: { bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-400' },
  warning: { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  error: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
  info: { bg: 'bg-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
  pending: { bg: 'bg-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-400' },
};

interface StatusBadgeProps {
  status: keyof typeof COLORS;
  label: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {label}
    </span>
  );
}
