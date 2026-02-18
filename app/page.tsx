import HeroSection from '@/components/landing/HeroSection';
import ProductCard from '@/components/landing/ProductCard';
import MetricsSection from '@/components/landing/MetricsSection';
import CTASection from '@/components/landing/CTASection';
import { PRODUCTS } from '@/lib/constants';

export default function Home() {
  return (
    <div className='max-w-6xl mx-auto'>
      <HeroSection />
      <section id='products' className='py-16'>
        <h2 className='text-3xl font-bold text-center mb-12'>提供サービス</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} title={p.title} description={p.description} icon={p.icon} price={p.price} href={p.href} color={p.color} />
          ))}
        </div>
      </section>
      <MetricsSection />
      <CTASection />
    </div>
  );
}
