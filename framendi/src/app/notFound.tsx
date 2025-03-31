import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">404 - Ekki fundið</h1>
        <p className="text-xl mb-8">Þessi síða er ekki til.</p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Aftur á forsíðu
        </Link>
      </div>
    </Layout>
  );
}