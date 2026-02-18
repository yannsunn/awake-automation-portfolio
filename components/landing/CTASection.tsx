import Link from 'next/link';

export default function CTASection() {
  return (
    <section className='py-20 relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl' />
      <div className='relative z-10 text-center max-w-2xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>無料相談・デモ予約</h2>
        <p className='text-gray-400 mb-8'>
          御社の業務に最適な自動化ソリューションをご提案します。まずはお気軽にご相談ください。
        </p>
        <Link href='/contact' className='inline-block px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-lg transition-colors'>
          お問い合わせ
        </Link>
      </div>
    </section>
  );
}
