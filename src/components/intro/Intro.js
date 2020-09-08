import React from 'react';
import Button from '../button/Button';

import './Styles.scss';

const Intro = ({gameStatus, setGameStatus}) => {

    return (
        <div className="introContainer">
                <div className="introContainer--logo">
                    <img alt="logo" src="assets/logo.png" />            
                </div>
                <div className="introContainer--message">
                    {gameStatus.message}
                </div>
                <div className="introContainer--submitButtonContainer">
                    <Button label="start" handleSubmit={()=> setGameStatus({loadIntro: false})} />
                </div>
        </div>
    )
}

export default Intro
