import React from 'react'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import "../styles/SearchInput.css"

function SearchInput({ fetchWikiData, handleSearchInputChange, searchBtnLoading}) {
  return (
    <div className="input-container">
      <TextField onChange={handleSearchInputChange} label="Subject" size="small"/>
      <LoadingButton loading={searchBtnLoading} onClick={fetchWikiData} variant="text">Search</LoadingButton>
    </div>
  )
}

export default SearchInput
