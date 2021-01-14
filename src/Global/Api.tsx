import { ShuffleArray } from "../Components/utilities";

export async function categoryData(set: (p: Cat[]) => void) {
    const fetchCategory = await fetch('https://opentdb.com/api_category.php');
    const CategoriesData = await fetchCategory.json();
    set(CategoriesData.trivia_categories);
}

export async function fetchQuizData(amount: number, difficulty: string, types: string, category: number) {
    const fetchG = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${types}`);
    const QuizApi = await fetchG.json();
    return QuizApi.results.map((question: Questions) =>  (
        {
            ...question,
            answers: ShuffleArray([...question.incorrect_answers, question.correct_answer])
        } 
        
        ))
}

export type Questions = {
    category: string;
    correct_answer: string;
    question: string;
    incorrect_answers: string[];
    difficulty: string;
    type: string;
}

export type QuestionState = Questions & { answers: string[] }

export type Cat = {
    id: number,
    name: string
}

export interface TnumState {
    TotalQuestions: number;
  }

export interface CatState {
    categories: Cat[];
}

export interface TryState {
    TotalQuestions: number;
    score: number;
  }