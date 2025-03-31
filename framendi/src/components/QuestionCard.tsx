'use client';

import { useState } from 'react';
import { Question, Answer } from '@/types';

type QuestionCardProps = {
    question: Question;
};

export default function QuestionCard({ question }: QuestionCardProps){
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAnswerSelected = (answerId: number) => {
        if (!isSubmitted){
            setSelectedAnswer(answerId);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null){
            setIsSubmitted(true);
        };
    };

    const isCorrect = (answer: Answer) => {
        return isSubmitted && selectedAnswer === answer.id && answer.correct;
    };

    const isIncorrect = (answer: Answer) => {
        return isSubmitted && selectedAnswer === answer.id && !answer.correct;
    };

    const getCorrectAnswer = () => {
        return question.answers.find(answer => answer.correct);
    };

    return (
        <div className="bg-slate-700 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">{question.text}</h3>

            <div className="space-y-3 mb-4">
                {question.answers.map((answer => (
                    <div 
                    key={answer.id}
                    onClick={() => handleAnswerSelected(answer.id)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors
                      ${selectedAnswer === answer.id ? 'border-blue-500 bg-slate-600' : 'border-gray-200'}
                      ${isCorrect(answer) ? 'bg-green-100 border-green-500' : ''}
                      ${isIncorrect(answer) ? 'bg-red-100 border-red-500' : ''}
                    `}
                  >
                    {answer.text}
                    </div>
                )))}
            </div>

            <div className="flex justify-between items-center">
                <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null ||isSubmitted}
                    className={`px-4 py-2 rounded-md ${
                        isSubmitted 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : selectedAnswer === null 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                    Senda svar
                </button>

                    {isSubmitted && (
                        <div className={isCorrect(question.answers.find(a => a.id === selectedAnswer)!) 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }>
                            {isCorrect(question.answers.find(a => a.id === selectedAnswer)!) 
                                ? 'Rétt hjá þér!' 
                                : `Ekki alveg. Rétta svarið er: ${getCorrectAnswer()?.text}`
                            }
                        </div>
                    )}
                </div>
            </div>
    );
}