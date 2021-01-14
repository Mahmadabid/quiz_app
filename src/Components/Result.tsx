import React from 'react'
import { TryState } from '../Global/Api';

interface Prop extends TryState {
    startAgain: () => void,
}

export const Result: React.FC<Prop> = ({score, TotalQuestions, startAgain }) => {

    const Percent = (score/TotalQuestions) * 100;

    return (
        <div className="result">
            <h3>Your Score: <span style={{fontWeight: 'lighter', color: 'rgb(141, 47, 248)'}}>{score}/{TotalQuestions}</span></h3>
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>{Percent}%{Percent >= 70 ? " Congratulations! 🚀 " : " Sorry "}</p>
            <button onClick={startAgain} className="next">Try Again</button>
        </div>
    )
}
