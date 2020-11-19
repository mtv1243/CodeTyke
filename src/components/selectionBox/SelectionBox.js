import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {

  let id = props.id;

  let handleClick = () => {
    let selectionObj = { ...props.toggleSelection };
    selectionObj[id] = !(props.toggleSelection[id]);
    props.setToggleSelection(selectionObj);
  }

  let handleReveal = () => {
    if (props.answer.isCorrect) {
      return " correct"
    } else {
      return " incorrect"
    }
  }

  return(
    <div
      className={"selectionBox" + 
      (props.toggleSelection[id] ? " active" : " inactive" + 
      (!props.toggleRevealAnswers ? handleReveal() : ""))}
      id={"selectionBox" + props.id}
      onClick={()=>{handleClick()}}
    >
      <img className="selectionBox--image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input className="selectionBox--checkbox" type="checkbox" />
      <span className="selectionBox--text">{props.answer.text}</span>
    </div>
   )
}

export default SelectionBox;
