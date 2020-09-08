import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Button = (props) => {

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