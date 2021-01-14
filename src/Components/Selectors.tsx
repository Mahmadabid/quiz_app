import React from 'react';
import { Cat, TnumState, CatState } from "../Global/Api";

interface Props extends TnumState {
    setTotalQuestions: (p: number) => void,
}

interface Prop1 extends CatState {
    setcategory: (p: number) => void,
}

interface Prop2 {
    setQuizDifficulty: (str: string) => void,
}

interface Prop3 {
    setQuizType: (str: string) => void,
}

export const CategorySelector: React.FC<Prop1> = ({ categories, setcategory }) => {
    return (
        <div className="selector-child">
            <label htmlFor="Category">Select Category:</label>
            <select id="Category" onChange={(e) => setcategory(parseInt(e.target.value))} >
                <option value='8'>RANDOM</option>
                {categories.map((categor: Cat, ind: number) => (
                    <option value={categor.id} key={ind}>{categor.name}</option>
                ))}
            </select>
        </div>
    )
}

export const AmountSelector: React.FC<Props> = ( {TotalQuestions, setTotalQuestions} ) => {
    return (
        <div className="selector-child">
            <label htmlFor="amount">Enter Amount:</label>
            <input type="number" id="amount" value={TotalQuestions} onChange={(e) => setTotalQuestions(parseInt(e.target.value))} />
        </div>
    )
}

export const DIfficulitySelector: React.FC<Prop2>= ({setQuizDifficulty}) => {
    return (
        <div className="selector-child">
            <label htmlFor="Difficulty">Select Difficulty:</label>
            <select id="Difficulty" onChange={(e) => setQuizDifficulty(e.target.value)} >
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>           
        </select>
        </div>
    )
}

export const TypeSelector: React.FC<Prop3>= ({setQuizType}) => {
    return (
        <div className="selector-child">
            <label htmlFor="Type">Select Type:</label>
            <select id="Type" onChange={(e) => setQuizType(e.target.value)} >
                <option value="multiple">MULTIPLE</option>            
                <option value="boolean">TRUE/FALSE</option>
            </select>
        </div>
    )
}