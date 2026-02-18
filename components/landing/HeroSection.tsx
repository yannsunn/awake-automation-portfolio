export default function HeroSection() {
  return (
    <section className='relative py-20 overflow-hidden'>
      <div className='absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float' />
      <div className='absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed' />
      <div className='relative z-10 max-w-4xl mx-auto text-center'>
        <h1 className='text-5xl md:text-7xl font-bold mb-6'>
          <span className='gradient-text'>Awake Automation</span>
        </h1>
        <p className='text-2xl md:text-3xl text-gray-300 mb-4'>AI × 自動化で業務を変革</p>
        <p className='text-lg text-gray-400 max-w-2xl mx-auto mb-8'>
          n8nワークフロー自動化とAIを組み合わせ、SEOコンテンツ生成・SNS運用・経理処理・カスタマーサポートを自動化します。
        </p>
        <div className='flex gap-4 justify-center'>
          <a href='/contact' className='px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors'>
            無料相談・デモ予約
          </a>
          <a href='#products' className='px-8 py-3 border border-white/20 hover:bg-white/5 rounded-lg font-medium transition-colors'>
            サービス一覧
          </a>
        </div>
      </div>
    </section>
  );
}
