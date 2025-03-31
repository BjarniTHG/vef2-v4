import Link from 'next/link';
import { Category } from '@/types';

type CategoryListProps = {
    categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="block p-6 bg-slate-800 rounded-lg border border-gray-200 shadow-md hover:bg-slate-700 transition-colors"
                    >
                        <h2 className="text-xl font-bold">{category.name}</h2>
                    </Link>
            ))}
        </div>
    );
}