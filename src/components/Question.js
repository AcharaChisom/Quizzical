import React from 'react'

export default function Question(props) {
    const ansElements = props.possibleAnswers.map(answer => {
        let styles
        let click
        if (props.isOver) {
            if (props.selectedAnswer === props.correctAnswer) {
                styles = {
                    backgroundColor: props.selectedAnswer === answer ? '#94D7A2' : '#F5F7FB'
                }
            } else if (props.selectedAnswer !== props.correctAnswer) {
                styles = {
                    backgroundColor: props.selectedAnswer === answer ? '#F8BCBC' 
                        : answer === props.correctAnswer ? '#94D7A2' : '#F5F7FB' 
                }
            } 
            
        } else {
            styles = {
                backgroundColor: props.selectedAnswer === answer ? '#D6DBF5' : '#F5F7FB'
            }
            click = () => props.setSelectedAnswer(props.id, answer)
        }
        
        return <div 
                    key={answer}
                    style={styles}
                    className='ans'
                    onClick={click}
                    >{answer}</div>
    })
    
    return (
        <div>
            <div className='question-container'>
                <h2 className='question'>{props.question}</h2>
                <div className='answers'>
                    {ansElements}
                </div>
            </div>
            <hr />
        </div>
    )
}