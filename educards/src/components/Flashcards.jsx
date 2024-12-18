import { useState, useEffect, useRef } from 'react';

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animation, setAnimation] = useState(''); // '' | 'cycling-next' | 'cycling-prev' | 'shuffling'

  const frontTextRef = useRef(null);
  const backTextRef = useRef(null);

  // Add function to adjust text size
  const adjustTextSize = (element, maxHeight) => {
    if (!element) return;
    
    const text = element;
    const maxWidth = element.offsetWidth - 20; // Account for padding
    let fontSize = 36; // Starting font size
    
    // Reset to starting font size
    text.style.fontSize = `${fontSize}px`;
    
    // First quick check if we even need to reduce
    if (text.scrollHeight <= maxHeight && text.scrollWidth <= maxWidth) {
      return; // Text fits perfectly, no need to adjust
    }

    // Binary search for the right font size
    let min = 14;
    let max = 36;
    
    while (min <= max) {
      fontSize = Math.floor((min + max) / 2);
      text.style.fontSize = `${fontSize}px`;
      
      if (text.scrollHeight <= maxHeight && text.scrollWidth <= maxWidth) {
        // Text fits, try a larger size
        min = fontSize + 1;
      } else {
        // Text too big, try a smaller size
        max = fontSize - 1;
      }
    }
    
    // Set to the largest size that worked
    fontSize = max;
    text.style.fontSize = `${fontSize}px`;
  };

  // Adjust text size whenever card changes
  useEffect(() => {
    if (cards.length > 0) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        adjustTextSize(frontTextRef.current, 160); // Increased back to 160
        adjustTextSize(backTextRef.current, 160);
      }, 10); // Increased timeout slightly
    }
  }, [currentCardIndex, cards, isFlipped]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/questions/');
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error loading flashcards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleAnimationEnd = () => {
    setAnimation('');
  };

  const handleNext = () => {
    setIsFlipped(false);
    setAnimation('cycling-next');
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => 
        prevIndex + 1 >= cards.length ? 0 : prevIndex + 1
      );
    }, 300); // Half of animation duration
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setAnimation('cycling-prev');
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => 
        prevIndex - 1 < 0 ? cards.length - 1 : prevIndex - 1
      );
    }, 300); // Half of animation duration
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleCards = () => {
    setIsFlipped(false);
    setAnimation('shuffling');
    setTimeout(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentCardIndex(0);
    }, 300); // Half of animation duration
  };

  if (cards.length === 0) return <div>Loading...</div>;

  return (
    <div className="flashcards-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''} ${animation}`}
        onClick={handleFlip}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div ref={frontTextRef} className="card-text">
              {cards[currentCardIndex].question}
            </div>
          </div>
          <div className="flashcard-back">
            <div ref={backTextRef} className="card-text">
              {cards[currentCardIndex].answer}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flashcard-controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={shuffleCards}>Shuffle</button>
        <span>{currentCardIndex + 1} / {cards.length}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Flashcards; 