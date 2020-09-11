import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const Modal = ({setShowModal, showModal, children}) => {

  const hideModal = function() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className="modal" style={{display: showModal ? "block" : "none"}}>
        <div className="modal--closeIcon">
          <FontAwesomeIcon icon={faTimes} onClick={hideModal} size="lg" />
        </div>
        <div className="modal--title"> Rules </div>
        <div className="modal--content">
          { children }
        </div>
      </div>
    </>
  )
}

export default Modal;
