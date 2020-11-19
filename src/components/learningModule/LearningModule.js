import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const LearningModule = ({setGameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [toggleRevealAnswers, setToggleRevealAnswers] = React.useState(true);
  const [toggleSelection, setToggleSelection] = React.useState({
    "0": false,
    "1": false,
    "2": false,
    "3": false
  })

  console.log('draw learning mod');

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  
  // get quiz data on initial learning module render
  React.useEffect(()=>{
    getQuizData();
  },[]);

  // api fetch for quiz data, store in state
  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  // answer key will give template to check input answers against
  let answerKey = quizData.questionArr ? {
    "0": currentQuestion.possibleAnswers[0].isCorrect,
    "1": currentQuestion.possibleAnswers[1].isCorrect,
    "2": currentQuestion.possibleAnswers[2].isCorrect,
    "3": currentQuestion.possibleAnswers[3].isCorrect
  } : {};

  // let checkAnswers = (answerKey == toggleSelection) ? 'correct!' : 'incorrect :(';
  let checkAnswers = () => {

    let isCorrect;

    for (let [key, value] of Object.entries(answerKey)) {
      if(value !== toggleSelection[key]) {
        // console.log('not correct')
        isCorrect = false;
      } else if(value == toggleSelection[key])
      // console.log('is correct')
      isCorrect = true;
    }
    console.log('checkAnswers = ' + isCorrect);
    return isCorrect;
  }

  // console.log(checkAnswers());


  // when click submit, iterate to next question in quizData, or end the game
  const handleSubmit=()=> {
    if (toggleRevealAnswers){
      // if all answers are correct
      if(checkAnswers()) {
        console.log('all correct')
      }
      setToggleRevealAnswers(false);
      setToggleSelection({
        "0": false,
        "1": false,
        "2": false,
        "3": false
      })
    } else if(!toggleRevealAnswers) {
      if(currentQuestionId < quizData.totalQuestions-1){
        setShowLoader(true);
        setToggleRevealAnswers(true);
        setTimeout(function(){
          console.log("Checking answer...");
          setCurrentQuestionId(currentQuestionId+1);
          setShowLoader(false);
        }, 500 );
      } else {
        setCurrentQuestionId(0);
        setGameStatus({message: "Great Job! Play again.", loadIntro: true});
      }
    }
  }

  // create array of selection box components
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} toggleRevealAnswers={toggleRevealAnswers} toggleSelection={toggleSelection} setToggleSelection={setToggleSelection} />
    })
  }

  // determine the button's status

  

  // toggle the modal visibility on mobile
  const toggleAdditionalInfo = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="learningModule">
      { currentQuestion.title &&
        <>
          <div className="learningModule--overlay"  onClick={toggleAdditionalInfo} style={{display: showModal ? "block" : "none"}}></div>
          <Modal showModal={showModal} setShowModal={setShowModal}>
            {currentQuestion.additionalInfo}
          </Modal>
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule--header">
            <div className="learningModule--title">
              { currentQuestion.title }
            </div>
            <div className="learningModule--additionalInfoIcon">
                <FontAwesomeIcon icon={faInfoCircle} onClick={toggleAdditionalInfo} size="lg" />
                {checkAnswers()}
              </div>
            <div className="learningModule--subHeader">
              { currentQuestion.additionalInfo }
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">
              { possibleAnswers }
            </div>
            {checkAnswers() && <span className="learningModule--successMessage">Correct!</span>}
            <div className="learningModule--submitButtonContainer">
              <Button label={toggleRevealAnswers ? "Submit" : "Next"} handleSubmit={ handleSubmit } showLoader={showLoader} hasIcons />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default LearningModule;
