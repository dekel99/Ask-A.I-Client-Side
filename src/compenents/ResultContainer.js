import React from 'react'
import PossibleAnswers from './PossibleAnswers';
import Summery from './Summery';
import "../styles/ResultContainer.css"

function ResultContainer({ answers, summery }) {
    return (
        <div className="result-container">
            <PossibleAnswers asnwers={answers}/>
            <Summery summery={summery} />
        </div>
    )
}

export default ResultContainer
