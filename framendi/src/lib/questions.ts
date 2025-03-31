import api from './index';
import type { Question, Paginated, QuestionToCreate } from '@/types';

export const getQuestions = async (limit = 10, offset = 0, categorySlug?: string) => {
    let url = `/questions?limit=${limit}&offset=${offset}`;

    if (categorySlug) {
        url += `&category=${categorySlug}`;
    }
    return api.get<Paginated<Question>>(url);
};

export const getQuestionById = async (id: number) => {
    return api.get<Question>(`/questions/${id}`);
};

export const createQuestion = async (question: QuestionToCreate) => {
    return api.post<Question>('/questions', question);
};

export const updateQuestion = async (id: number, question: QuestionToCreate) => {
    return api.patch<Question>(`/questions/${id}`, question);
};

export const deleteQuestion = async (id: number) => {
    return api.delete(`/questions/${id}`);
};