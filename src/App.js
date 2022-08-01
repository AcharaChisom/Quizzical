import './index.css';
import React from 'react'

import Home from './components/Home'
import Question from './components/Question'

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [endGame, setEndGame] = React.useState(false)
    
    React.useEffect(() => {
        if (endGame) {
            const num = questions.reduce((prevVal, curVal) => {
                return curVal.correctAnswer === curVal.selectedAnswer ?
                    prevVal + 1 : prevVal
            }, 0)
            setCorrectAnswers(num)
        }
    })
    
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * arr.length)
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr
    }
    
    function getQuestions() {
        fetch('https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results.map(result => {
                    return {
                        question: result.question.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#039;/g, "'"),
                        selectedAnswer: '',
                        correctAnswer: result.correct_answer,
                        possibleAnswers: shuffleArray([...result.incorrect_answers, result.correct_answer])
                    }
                }))
            })
    }
    
    function setSelectedAnswer(id, ans) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                return question.question === id ? {...question, selectedAnswer: ans} : question
            })
        })
    }
    
    function gameEnd() {
        setEndGame(true)
    }
    
    const questionElements = questions.map((question) => {
        return <Question 
                    key={question.question}
                    {...question}
                    id={question.question}
                    setSelectedAnswer={setSelectedAnswer}
                    isOver={endGame}
                    />
    })
    
    return (
        <main>
            {
                questions.length > 0 ?
                <div className='question-and-btn'>
                    <div className='questions-container'>
                        {questionElements}
                    </div>
                    {
                        endGame 
                        ?
                        <div className='submitted-ans'>
                            <h2 className='score'>You scored {correctAnswers}/5 correct answers</h2>
                            <button onClick={() => {setEndGame(false); getQuestions()}} className='play-again'>Play again</button>
                        </div> 
                        :
                        <button onClick={gameEnd} className='answer-btn'>Check answers</button>
                    }
                </div>
                :
                <Home 
                    handleClick={getQuestions}
                />
            }
        </main>
    )
}
