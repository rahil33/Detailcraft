import type { Metadata } from 'next';
import ServicesPage from '@/components/ServicesPage';
import { getImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Services | DetailCraft',
  description: 'Exterior and interior detailing, ceramic coating, PPF and aircraft appearance management by DetailCraft, Chennai.',
};

export default function Page() {
  return <ServicesPage images={getImages()} />;
}
