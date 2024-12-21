import React from 'react';
import { atom, useAtom } from 'jotai';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

// Declarative Card Type
type Card = {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

// Declarative Button Type
type MotionButtonProps = HTMLMotionProps<'button'> & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Atomic State
const cardsAtom = atom<Card[]>([]);
const currentIndexAtom = atom(0);
const isFlippedAtom = atom(false);
const animationDirectionAtom = atom<'left' | 'right'>('right');

// Derived Atoms
const currentCardAtom = atom(get => {
  const cards = get(cardsAtom);
  const index = get(currentIndexAtom);
  return cards[index];
});

// Declarative Components
const FlashcardContainer: React.FC = () => {
  const [cards, setCards] = useAtom(cardsAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const [isFlipped, setIsFlipped] = useAtom(isFlippedAtom);
  const currentCard = useAtom(currentCardAtom)[0];
  const [animationDirection, setAnimationDirection] = React.useState<'left' | 'right'>('right');

  React.useEffect(() => {
    fetch('http://localhost:8000/api/questions/')
      .then(res => res.json())
      .then(setCards);
  }, []);

  React.useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const actions = {
    next: () => {
      setAnimationDirection('right');
      setIsFlipped(false);
      setCurrentIndex(idx => (idx + 1) % cards.length);
    },
    previous: () => {
      setAnimationDirection('left');
      setIsFlipped(false);
      setCurrentIndex(idx => (idx === 0 ? cards.length - 1 : idx - 1));
    },
    flip: () => setIsFlipped(f => !f),
    shuffle: () => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  if (!currentCard) return <div>Loading...</div>;

  return (
    <motion.div>
      <AnimatePresence mode="wait">
        <AnimatedCard 
          key={currentCard.id}
          card={currentCard} 
          isFlipped={isFlipped} 
          onFlip={actions.flip}
          animationDirection={animationDirection}
        />
      </AnimatePresence>
      <CardControls 
        currentIndex={currentIndex}
        totalCards={cards.length}
        onNext={actions.next}
        onPrevious={actions.previous}
        onShuffle={actions.shuffle}
      />
    </motion.div>
  );
};

// Declarative Sub-Components
const MotionStack: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flashcard-stack"
  >
    {children}
  </motion.div>
);

const AnimatedCard: React.FC<{
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
  animationDirection: 'left' | 'right';
}> = ({ card, isFlipped, onFlip, animationDirection }) => {
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
      scale: 0.5
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3
      }
    })
  };

  const shuffleVariants = {
    initial: { y: 0, opacity: 1 },
    shuffle: {
      y: [-20, 20, -20, 20, 0],
      opacity: [1, 0.5, 1, 0.5, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  };

  return (
    <motion.div 
      key={card.id}
      variants={slideVariants}
      custom={animationDirection}
      initial="enter"
      animate="center"
      exit="exit"
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={onFlip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="flashcard-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flashcard-front">
          {card.question}
        </div>
        <div className="flashcard-back">
          {card.answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CardFace: React.FC<React.PropsWithChildren<{ type: 'front' | 'back' }>> = ({ 
  children, 
  type 
}) => (
  <motion.div 
    className={`card-face card-${type}`}
    initial={{ backfaceVisibility: 'hidden' }}
  >
    {children}
  </motion.div>
);

const CardControls: React.FC<{
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
}> = ({ currentIndex, totalCards, onNext, onPrevious, onShuffle }) => (
  <motion.div 
    className="card-controls"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
  >
    <ControlButton onClick={onPrevious}>Previous</ControlButton>
    <ControlButton onClick={onShuffle}>Shuffle</ControlButton>
    <motion.span>{currentIndex + 1} / {totalCards}</motion.span>
    <ControlButton onClick={onNext}>Next</ControlButton>
  </motion.div>
);

const ControlButton: React.FC<MotionButtonProps> = (props) => (
  <motion.button 
    {...props} 
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  />
);

export default FlashcardContainer;