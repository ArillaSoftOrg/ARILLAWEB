import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = 'Projenizi Hayata Geçirmeye Hazır Mısınız?',
  description = 'Fikrinizi bizimle paylaşın, size özel çözüm sunalım. Ücretsiz keşif görüşmesi için bugün iletişime geçin.',
  primaryLabel = 'Ücretsiz Teklif Al',
  primaryHref = '/iletisim',
  secondaryLabel = 'Bizimle İletişime Geçin',
  secondaryHref = '/iletisim',
}: CTASectionProps) {
  return (
    <section className="section-py bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="white" asChild>
            <Link href={primaryHref} className="flex items-center gap-2">
              {primaryLabel} <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
            <Link href={secondaryHref} className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {secondaryLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
