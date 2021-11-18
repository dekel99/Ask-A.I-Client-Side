import React from 'react'
import TextField from '@mui/material/TextField';
import "../styles/QuestionInput.css"

function QuestionInput({ handleQuestionInputChange }) {
  return (
    <div className="input-container">
      <TextField onChange={handleQuestionInputChange} label="Question" size="small"/>
    </div>
  )
}

export default QuestionInput
