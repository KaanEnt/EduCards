import React, { useState, useRef, useEffect } from 'react';
import Flashcard from './Flashcard';
import './Quiz.css';

const Quiz = ({ flashcards, onClose, cardColor, textColor, shadow, borderRadius }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledCards, setShuffledCards] = useState([...flashcards]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        setShowAnswer(false); // Reset to question view when card changes
    }, [currentIndex]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        containerRef.current.style.animation = 'slideRight 0.5s forwards';
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
            containerRef.current.style.animation = '';
            setIsAnimating(false);
        }, 500);
    };

    const handlePrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        containerRef.current.style.animation = 'slideLeft 0.5s forwards';
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
            containerRef.current.style.animation = '';
            setIsAnimating(false);
        }, 500);
    };

    const handleShuffle = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        containerRef.current.style.animation = 'shuffle 0.5s';
        setTimeout(() => {
            const newShuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
            setShuffledCards(newShuffled);
            setCurrentIndex(0);
            containerRef.current.style.animation = '';
            setIsAnimating(false);
        }, 500);
    };

    return (
        <div className="quiz">
            <button className="close-btn" onClick={onClose} style={{ right: '10px' }}>×</button>
            <div className="card-container" ref={containerRef}>
                <Flashcard 
                    flashcards={shuffledCards.slice(currentIndex, currentIndex + 3)} 
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onShuffle={handleShuffle}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                    cardColor={cardColor}
                    textColor={textColor}
                    shadow={shadow}
                    borderRadius={borderRadius}
                    setCurrentIndex={setCurrentIndex}
                />
            </div>
            <div className="controls">
                <button onClick={handlePrevious} disabled={isAnimating}>Previous</button>
                <button onClick={handleShuffle} disabled={isAnimating}>Shuffle</button>
                <button onClick={handleNext} disabled={isAnimating}>Next</button>
            </div>
        </div>
    );
};

export default Quiz; 