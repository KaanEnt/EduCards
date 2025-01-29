import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Quiz.css';

const Quiz = ({ flashcards, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffledCards, setShuffledCards] = useState([...flashcards]);

    const { transform, opacity } = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
        setIsFlipped(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
        setIsFlipped(false);
    };

    const handleShuffle = () => {
        const newShuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
        setShuffledCards(newShuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    return (
        <div className="quiz">
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="card-container">
                <animated.div
                    className="card"
                    style={{
                        opacity: opacity.interpolate(o => 1 - o),
                        transform,
                    }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <h3>{shuffledCards[currentIndex].question}</h3>
                </animated.div>
                <animated.div
                    className="card back"
                    style={{
                        opacity,
                        transform: transform.interpolate(t => `${t} rotateY(180deg)`),
                    }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <p>{shuffledCards[currentIndex].answer}</p>
                </animated.div>
            </div>
            <div className="controls">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleShuffle}>Shuffle</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Quiz; 