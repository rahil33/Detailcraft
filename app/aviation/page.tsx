import type { Metadata } from 'next';
import AirPage from '@/components/AirPage';
import { getImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Aviation Services | DetailCraft',
  description:
    'Aircraft appearance management for business aviation: cabin detailing, paint restoration, aerospace ceramic coatings, ramp support at VOMM Chennai, helicopters and training aircraft across India.',
};

export default function Page() {
  return <AirPage images={getImages()} />;
}
