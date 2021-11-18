import React from 'react'
import "../styles/Summery.css"

function Summery({ summery }) {
  return (
    <div>
      {summery && 
        <div className="summery-container">
          <span style={{fontWeight: "700"}}>Summery:</span><br/>
          <p className="summery">{summery}</p>
        </div>}
    </div>
  )
}

export default Summery
