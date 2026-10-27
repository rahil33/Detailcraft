import type { Metadata } from 'next';
import AutoPage from '@/components/AutoPage';
import { getImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Automotive Care | DetailCraft',
  description:
    'Premium automotive detailing in Chennai: exterior and interior detailing, paint correction, ceramic coating, paint protection and maintenance packages.',
};

export default function Page() {
  return <AutoPage images={getImages()} />;
}
