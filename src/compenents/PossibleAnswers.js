import React from 'react'
import "../styles/PossibleAnswers.css"
let isMarked

function PossibleAnswers({ asnwers }) {

  return (
    <div className="possible-answers-container">
      {asnwers.length > 0 ?
        <div> 
          <span style={{fontWeight: "700"}}>Possible answers:</span><br/>
          <div className="possible-answers">
            {asnwers.map((answer, i) => {
              i % 2 === 0 ? isMarked = true : isMarked = false
              return <p className="answer" key={i} style={isMarked ? {backgroundColor: "rgb(196, 196, 196)"} : null}>{i+1}. {answer.text}</p>
            })}
          </div>
        </div>
      :
        <p>A.I didn't find specific answer.</p>}
    </div>
  )
}

export default PossibleAnswers
