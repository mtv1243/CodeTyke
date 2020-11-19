import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Button = (props) => {

  // let toggleSelection = props.toggleSelection;

  // const handleButtonActive = () => {
  //   let temp = "";
  //   for(let key in toggleSelection) {
  //     if(toggleSelection[key]) {
  //       temp = "active"
  //     } else {
  //       temp = "inactive"
  //     }
  //     return temp;
  //   }
  // }

  return (
    <div className={"submitButton " + (props.hasIcons && "hasIcons")} onClick={props.handleSubmit} >
      <div className="placeholder"></div>
      <div className="submitButton--label">{props.label}</div>
      <div className="icon">
        {props.showLoader && <FontAwesomeIcon icon={faSync} className="spinningLoader" />}
      </div>
    </div>
  )
}

export default Button;