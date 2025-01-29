import React from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard }) => {
    return (
        <div className="flashcard">
            <div className="front">
                <h3>{flashcard.question}</h3>
            </div>
            <div className="back">
                <p>{flashcard.answer}</p>
                {flashcard.topic && <small>Topic: {flashcard.topic}</small>}
            </div>
        </div>
    );
};

export default Flashcard; 