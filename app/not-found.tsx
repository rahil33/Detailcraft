import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <p className="nf-n">404</p>
      <h1>This page is not in the vault.</h1>
      <Link href="/" className="btn btn-solid">
        Back to DetailCraft
      </Link>
    </main>
  );
}
