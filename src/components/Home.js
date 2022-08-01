import React from 'react'

export default function Home(props) {
    return (
        <div className='home-container'>
            <div className='home'>
                <h1 className="home--title">Quizzical</h1>
                <p className='home--description'>Test your knowledge of Anime's 🤩</p>
                <button 
                    onClick={props.handleClick}
                    className='home--btn'>Start quiz</button>
            </div>
        </div>
    )
}