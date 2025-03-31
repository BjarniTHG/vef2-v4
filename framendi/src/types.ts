export type Paginated<T> = {
    data: T[];
    total: number;
    limit: number;
    offset: number;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
};

export type CategoryToCreate = {
    name: string;
};

export type Answer = {
    id: number;
    text: string;
    correct: boolean;
};

export type Question = {
    id: number;
    text: string;
    answers: Answer[];
    category: Category;
};

export type AnswerToCreate = {
    text: string;
    correct: boolean;
};

export type QuestionToCreate = {
    text: string;
    categoryId: number;
    answers: AnswerToCreate[];
};

