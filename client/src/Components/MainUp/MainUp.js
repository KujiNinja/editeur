import React from 'react';
import './MainUp.scss';

function MainUp(props) {
  return (
    <div className="mainup">
      <a name="mainup">
      <div className="mainup__title">
        <h1 className="mainup__title_header">Main Header</h1>
        <p className="mainup__title_text">some text about us</p>
      </div>
      <div className="mainup__image">
        <img className="mainup__image_img" src="./images/typewriter.png" alt="Печатная машинка" />
      </div>
      <div className="mainup__arrow">
        <a href="#maindown"><img src="./images/down-arrow.png" className="arrow-down" alt="arrow-down" /></a>
      </div>
      </a>
    </div>
  );
}

export default MainUp;
