import Layout from '@/components/Layout';
import Link from 'next/link';
import CategoryList from '@/components/CategoryList';
import { Category } from '@/types';
import { getCategories } from '@/lib/categories';

export default async function HomePage() {
  const response = await getCategories();
  console.log(response);

  if(!response.ok){
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ekki fékkst rétt svar frá API</h1>
          <p className="text-red-500">{response.error || 'Ekki tókst að sækja categories gögn'}</p>
        </div>
      </Layout>
    );
  }

  const categories = response.data?.data ||[];

  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Flokkar</h1>
        <p className="mt-2">Veldu flokk til að skoða</p>
      </div>

      <CategoryList categories={categories} />
    </Layout>
  );
}