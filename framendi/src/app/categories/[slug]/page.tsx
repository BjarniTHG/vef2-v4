import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import QuestionCard from '@/components/QuestionCard';
import { getCategoryBySlug } from '@/lib/categories';
import { getQuestions } from '@/lib/questions';



export default async function CategoryPage({ params }: { params: { slug: string} }){
    const { slug } = await params;

    const CategoryResponse = await getCategoryBySlug(slug);

    if (!CategoryResponse.ok || !CategoryResponse.data){
        console.log('Triggering notFound() because:', { 
          responseOk: CategoryResponse.ok, 
          hasData: !!CategoryResponse.data 
        });
        notFound();
      }

    const category = CategoryResponse.data;

    const questionsResponse = await getQuestions(10, 0, slug);

    if (!questionsResponse.ok){
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Villa!!</h1>
                    <p className="text-red-500">{questionsResponse.error || 'Ekki tókst að sækja spurningar'}</p>
                </div>
            </Layout>
        );
    }

    const questions = questionsResponse.data?.data || [];

    return(
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-gray-600">Veldu svar</p>
            </div>

            {questions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-xl text-gray-600"> Engar spurningar í þessum flokki.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {questions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </div>
            )}
        </Layout>
    );
}