import React, { useState, useRef } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import './Flashcard.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const Flashcard = ({ flashcards, onNext, onPrevious, onShuffle, showAnswer, setShowAnswer, cardColor, textColor, shadow, borderRadius, setCurrentIndex }) => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(flashcards.length, i => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
    from: { x: 0, rot: 0, scale: 1.5, y: -1000 }
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity, tap }) => {
    if (tap) {
      setShowAnswer(prev => !prev);
      return;
    }

    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    
    if (!down && trigger) {
      gone.add(index);
      setShowAnswer(false);
      
      if (dir === 1) {
        setCurrentIndex(prev => (prev + 1) % flashcards.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
      }
    }

    api.start(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });

    if (!down && gone.size === flashcards.length) {
      setTimeout(() => {
        gone.clear();
        api.start(i => ({
          x: 0,
          y: i * -4,
          scale: 1,
          rot: -10 + Math.random() * 20,
          delay: i * 100,
        }));
        onShuffle();
      }, 600);
    }
  });

  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

  const handleEdit = (id, updatedData) => {
    axios.put(`http://localhost:8000/api/flashcards/${id}/`, updatedData)
        .then(response => {
            // Update local state or refetch data
        })
        .catch(error => {
            console.error('Error updating flashcard:', error);
        });
  };

  return (
    <div className="flashcard-container">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="flashcard-deck" key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            className="flashcard"
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundColor: cardColor,
              color: textColor,
              boxShadow: shadow,
              borderRadius: `${borderRadius}px`
            }}
          >
            <div className={`card-side ${showAnswer ? 'hidden' : ''}`}>
              <h3>{flashcards[i].question}</h3>
            </div>
            <div className={`card-side ${!showAnswer ? 'hidden' : ''}`}>
              <p>{flashcards[i].answer}</p>
              {flashcards[i].topic && <small>Topic: {flashcards[i].topic}</small>}
            </div>
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
};

Flashcard.propTypes = {
    flashcards: PropTypes.array.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onShuffle: PropTypes.func.isRequired,
    showAnswer: PropTypes.bool.isRequired,
    setShowAnswer: PropTypes.func.isRequired,
    cardColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    shadow: PropTypes.string.isRequired,
    borderRadius: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired
};

export default Flashcard; 