import React, {useState} from 'react'
import imgIntensa from "./images/intensamente2.jpg"
import "./styles/FlipCard.css"


const FlipCard = ({ image, title, description, buttonText }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={image} alt={title} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="flip-card-back">
          <h3>{title}</h3>
          <p>{description}</p>
          <button>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;