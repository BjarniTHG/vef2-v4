import { Category, Paginated } from '@/types'
import api from './index'

export const getCategories = async (limit = 10, offset = 0) => {
    return api.get<Paginated<Category>>(`/categories?limit=${limit}&offset=${offset}`);
};

export const getCategoryBySlug = async (slug: string) => {
    return api.get<Category>(`categories/${slug}`);
};

export const createCategory = async (category: { name: string}) => {
    return api.post<Category>('/categories', category);
};

export const updateCategory = async (slug: string, category: { name: string}) => {
    return api.patch<Category>(`/categories/${slug}`, category);
};

export const deleteCategory = async (slug: string) => {
    return api.delete<Category>(`categories/${slug}`);
};