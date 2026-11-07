import type { Metadata } from 'next';
import AutoPage from '@/components/AutoPage';
import { getImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'DetailCraft | Premium Automotive Detailing, Chennai',
  description:
    'Premium automotive detailing in Chennai: exterior and interior detailing, paint correction, ceramic coating and paint protection film. Aviation services also available.',
};

export default function Page() {
  return <AutoPage images={getImages()} />;
}
