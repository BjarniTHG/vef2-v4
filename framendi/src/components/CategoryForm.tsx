'use client';

import { useState } from "react";
import { Category } from "@/types";
import { createCategory, updateCategory } from "@/lib/categories";

type CategoryFormProps = {
    category?: Category;
    onSuccess: () => void;
};

export default function CategoryForm({ category, onSuccess }: CategoryFormProps){
    const [name, setName] = useState(category?.name || '');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isEditing = !!category;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(name.trim().length < 3) {
            setError('Nafn á flokki verður að vera amk 3 stafir');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            if (isEditing && category){
                const response = await updateCategory(category.slug, { name });
                if (!response.ok){
                    throw new Error(response.error || 'Villa við að uppfæra flokk');
                }
            } else {
                const response = await createCategory({ name });
                if (!response.ok){
                    throw new Error(response.error ||'Villa við að búa til flokk');
                }
            }
            setName('');
            onSuccess();
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Villa hefur skéð');
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nafn flokks
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Sláðu inn nafn flokks"
                    disabled={isLoading}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                    {isLoading ? 'Vinnur...' : isEditing ? 'Uppfæra flokk' : 'Búa til flokk'}
                </button>
            </div>
        </form>
    )
}