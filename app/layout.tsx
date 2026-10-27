import type { Metadata, Viewport } from 'next';
import '@fontsource/big-shoulders-display/latin-500';
import '@fontsource/big-shoulders-display/latin-700';
import '@fontsource/big-shoulders-display/latin-800';
import '@fontsource/cormorant-garamond/latin-400';
import '@fontsource/cormorant-garamond/latin-500';
import '@fontsource/cormorant-garamond/latin-400-italic';
import '@fontsource/cormorant-garamond/latin-500-italic';
import '@fontsource-variable/instrument-sans';
import './globals.css';
import TransitionProvider from '@/components/TransitionProvider';
import Cursor from '@/components/Cursor';
import QuoteModal from '@/components/QuoteModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://detailcraft.com'),
  title: 'DetailCraft | Luxury Vehicle & Aircraft Preservation',
  description:
    'A private preservation facility for multi-million-dollar cars and aircraft. Premium automotive detailing and aircraft appearance management, Chennai, India.',
  keywords: [
    'auto detailing',
    'aircraft detailing',
    'ceramic coating',
    'paint correction',
    'aviation preservation',
    'luxury cars',
    'Chennai detailing',
  ],
  openGraph: {
    title: 'DetailCraft | Luxury Vehicle & Aircraft Preservation',
    description: 'A private preservation facility for multi-million-dollar cars and aircraft.',
    siteName: 'DetailCraft',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0c',
};

// Runs before first paint: enables the hidden start states for reveal animations (never for reduced motion)
// and skips the preloader on repeat visits in the same session.
const boot = `try{var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('js');if(r||sessionStorage.getItem('dc-seen'))d.classList.add('seen');setTimeout(function(){if(!window.__dcReveal)d.classList.add('reveal-all')},4500)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <TransitionProvider>{children}</TransitionProvider>
        <Cursor />
          <QuoteModal />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
