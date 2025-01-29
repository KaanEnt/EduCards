import React, { useState } from 'react';
import History from './components/History';
import ChatInterface from './components/ChatInterface';
import FlashcardList from './components/FlashcardList';
import Quiz from './components/Quiz';
import { Leva } from 'leva';
import './App.css';

function App() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizCards, setQuizCards] = useState([]);

    // Mock data - replace with actual data from your API
    const courses = [
        { id: 1, name: 'AI Fundamentals', topics: ['Neural Networks', 'Reinforcement Learning'] },
        { id: 2, name: 'ML Basics', topics: ['Supervised Learning', 'Decision Trees'] },
    ];

    const handleStartQuiz = (topic) => {
        // Fetch flashcards for the selected topic
        const topicCards = [
            { question: 'What is a neural network?', answer: 'A series of algorithms...' },
            { question: 'What is reinforcement learning?', answer: 'A type of machine learning...' },
        ];
        setQuizCards(topicCards);
        setShowQuiz(true);
    };

    return (
        <div className="App">
            <Leva collapsed />
            <div className="app-layout">
                <History courses={courses} onSelectCourse={setSelectedCourse} />
                <div className="main-content">
                    <ChatInterface />
                    {selectedCourse && (
                        <FlashcardList 
                            course={selectedCourse} 
                            onStartQuiz={handleStartQuiz}
                        />
                    )}
                </div>
            </div>
            {showQuiz && (
                <Quiz flashcards={quizCards} onClose={() => setShowQuiz(false)} />
            )}
        </div>
    );
}

export default App; 