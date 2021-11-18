// import '@tensorflow/tfjs-backend-webgl';
import wiki from 'wikijs';
import axios from "axios"
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import QuestionInput from './QuestionInput';
import Alert from '@mui/material/Alert';
import animateBG from "../functions/backgroundAnimation"
import LoadingButton from '@mui/lab/LoadingButton';
import ResultContainer from './ResultContainer';
import '../styles/App.scss';
import HowToUse from './HowToUse';
// import * as tf from '@tensorflow/tfjs-core';
// import { loadTFLiteModel, TFLiteModel } from '@tensorflow/tfjs-tflite';
// import * as tf from '@tensorflow/tfjs-tflite';
let model
// const text = `Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.`
// const question2 = "who is the ceo of google"


function App() {
  const [searchInput, setSearchInput] = useState()
  const [question, setQuestion] = useState()
  const [answers, setAnswers] = useState()
  const [dataFoundMessage, setDataFoundMessage] = useState()
  const [summery, setSummery] = useState()
  const [isDataFound, setIsDataFound] = useState()
  const [searchBtnLoading, setSearchBtnLoading] = useState(false)
  const [askBtnLoading, setAskBtnLoading] = useState(false)
  const [rawContent, setRawContent] = useState()
  
  async function loadModel(){
    // const tfliteModel = await loadTFLiteModel("https://storage.googleapis.com/tfhub-lite-models/tensorflow/lite-model/mobilebert/1/metadata/1.tflite");
    model = await window.tfTask.QuestionAndAnswer.CustomModel.TFLite.load({
      model:"https://storage.googleapis.com/tfhub-lite-models/tensorflow/lite-model/mobilebert/1/metadata/1.tflite"
    })
    console.log("model finish loading") 
    
  }

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value)
  }

  function handleQuestionInputChange(e) {
    setQuestion(e.target.value)
  } 
  
  async function getAnswer() {
    try{
      setAskBtnLoading(true)
      // const data = {searchInput, question}
      // const res = await axios({method: "POST", url: process.env.REACT_APP_SERVER_URL, withCredentials: true, data})
      // console.log(question, rawContent)
      const res = await model.predict(question, rawContent)
      console.log(res.answers)
      // const { answersRes } = res.data
      setAnswers(res.answers)
    } catch (err) {
      console.log(err)
    }
    setAskBtnLoading(false)
  }

  async function fetchWikiData() {
    try{
      if (!searchInput) throw "Input is empty"
      setSearchBtnLoading(true)
      setAnswers()
      const page = await wiki().page(`${searchInput}`)
      const summeryResult = await page.summary()
      const rawContentResult = await page.rawContent()
      console.log(page)
      setDataFoundMessage(`Data on ${page.title} found you may ask a question`)
      setRawContent(rawContentResult)
      setSummery(summeryResult)
      setIsDataFound(true)
    } catch(err) {
      console.log("Error while tried to fetch data:", err)
      setDataFoundMessage("Data on your search term not found")
      setIsDataFound(false)
    }
    setSearchBtnLoading(false)
  }

  useEffect(() => {
    animateBG()
    loadModel()
  }, [])

  return (
    <div className="app-container">
      <div className="container hero">
      	<div className="inner">
      		<h1>Ask A.I.</h1>
          <SearchInput handleSearchInputChange={handleSearchInputChange} fetchWikiData={fetchWikiData} searchBtnLoading={searchBtnLoading}/>
          {dataFoundMessage && <Alert variant="outlined" severity={isDataFound ? "success" : "error"}>{dataFoundMessage}</Alert>}
          {isDataFound && 
            <div style={{marginTop: "10px"}}>
              <QuestionInput handleQuestionInputChange={handleQuestionInputChange} />
              <LoadingButton loading={askBtnLoading} onClick={getAnswer} variant="contained">Ask A.I</LoadingButton>
              {answers &&
                <ResultContainer summery={summery} answers={answers} />}
            </div>}
          <HowToUse />
      	</div>
      	<div className="overlay"></div>
      	<div className="background">
      		<canvas id="hero-canvas" width="1920" height="1080"></canvas>
      	</div>
      </div>
      <p className="small by-text">by: Dekel Luski</p>
    </div>
  )
}

export default App;
