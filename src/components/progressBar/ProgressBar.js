import React from 'react';

import './Styles.scss';

const ProgressBar = ({id, totalQuestions}) => {

  return(
    <div className="progressBar">
      <div className="progressBar--fill" style={{ width : (id + 1) / (totalQuestions + 1) * 100 + "%"}} />
      <div className="progressBar--background"></div>
    </div>
  )
}

export default ProgressBar;