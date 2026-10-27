import Home from '@/components/Home';
import { getImages } from '@/lib/images';

export default function Page() {
  return <Home images={getImages()} />;
}
