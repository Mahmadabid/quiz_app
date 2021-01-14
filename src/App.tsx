import React, { useState } from "react";
import { QuestionCard } from "./Components/QuestionCard";
import { fetchQuizData, QuestionState, categoryData, TnumState, CatState } from "./Global/Api";
import { GlobalStyle, Wrapper } from "./App.styles";
import { AmountSelector, CategorySelector, DIfficulitySelector, TypeSelector } from "./Components/Selectors";
import './App.css';
import { Result } from "./Components/Result";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [score, setscore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [categories, setcategories] = useState<CatState['categories']>([]);
  const [category, setcategory] = useState(8);
  const [TotalQuestions, setTotalQuestions] = useState<TnumState['TotalQuestions']>(5);
  const [QuizType, setQuizType] = useState("multiple");
  const [QuizDifficulty, setQuizDifficulty] = useState("easy");
  const [result, setresult] = useState(true);
  
  categoryData(setcategories);

  if (category === 8) {
    const random = Math.floor(Math.random() * (32 - 9 + 1)) + 9;
    setcategory(random);
  }

  const startQuiz = async () => {
    setloading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizData(TotalQuestions, QuizDifficulty, QuizType, category);
    setquestions(newQuestions);
    setscore(0);
    setUserAnswers([]);
    setnumber(0);
    setloading(false);
  };

  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    setnumber(nextQuestion);
  };

  const viewResult = async () => {
    setresult(false);
  };

  const startAgain = async () => {
    setresult(true);
    setGameOver(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setscore(score + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {result ? (
          <div>
            {gameOver  ? (
              <div className="selectors">
                <TypeSelector setQuizType={setQuizType} />
                <CategorySelector categories={categories} setcategory={setcategory} />
                <DIfficulitySelector setQuizDifficulty={setQuizDifficulty} />
                <AmountSelector TotalQuestions={TotalQuestions} setTotalQuestions={setTotalQuestions} />
              </div>
            ) : null}

            {gameOver ? (
              <button onClick={startQuiz} className="start">start</button>) : null}
            {!gameOver ? (
              <p className="score">
                Score: {score}
              </p>
            ) : null}
            {loading ? (
              <p style={{color: 'white', textAlign: 'center'}}>
                loading...
              </p>
            ) : null}
            {!loading && !gameOver ? (<QuestionCard
              questionNumber={number + 1}
              totalQuestions={TotalQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />) : null}
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TotalQuestions - 1 ? (
              <button onClick={nextQuestion} className="next">next</button>
            ) : null}
            {!gameOver && userAnswers.length === TotalQuestions && !loading ? (
              <button onClick={viewResult} className="next">view</button>            
        ) : null}
        </div>
        ): 
          <Result score = {score} TotalQuestions = {TotalQuestions} startAgain = {startAgain}/>
        }
      </Wrapper>
    </>
  );
}

export default App;
