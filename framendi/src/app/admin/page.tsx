'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import CategoryForm from '@/components/CategoryForm';
import AdminCategoryList from '@/components/AdminCategoryList';
import { getCategories } from '@/lib/categories';
import { Category } from '@/types';

export default function AdminPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    const fetchCategories = async () => {
        setLoading(true);
        try{
            const response = await getCategories();
            if (!response.ok){
                throw new Error(response.error || 'Villa við að sækja flokka');
            }
            setCategories(response.data?.data || []);
            setError('');
        } catch (err){
            setError(err instanceof Error ? err.message : 'Villa hefur skéð');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        window.scrollTo({ top: 0, behavior: 'smooth'});
    };

    const handleSuccess = () => {
        fetchCategories();
        setEditingCategory(undefined);
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        {editingCategory ? 'Breyta flokki' : 'Búa til flokk'}
                    </h1>
                    <CategoryForm
                        category={editingCategory}
                        onSuccess={handleSuccess}
                    />
                    {editingCategory && (
                        <button
                            onClick={() => setEditingCategory(undefined)}
                            className="mt-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            Hætta við breytingu
                        </button>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Flokkar</h2>
                    {loading && !categories.length ? (
                        <p className="text-gray-500"> Sæki flokka...</p>
                    ) : error ? (
                        <div className="p-4 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    ) : !categories.length ? (
                        <p className="text-gray-500">Engir flokkar fundust. Búðu til einn!</p>
                    ) : (
                        <AdminCategoryList
                            categories={categories}
                            onEdit={handleEdit}
                            onDelete={fetchCategories}
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}