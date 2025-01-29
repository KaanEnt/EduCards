import React from 'react';
import './FlashcardList.css';

const FlashcardList = ({ course, onStartQuiz }) => {
    return (
        <div className="flashcard-list">
            <h3>{course.name}</h3>
            <div className="topics">
                {course.topics.map((topic, index) => (
                    <div 
                        key={index}
                        className="topic"
                        style={{ backgroundColor: `hsl(${index * 60}, 50%, 40%)` }}
                        onClick={() => onStartQuiz(topic)}
                    >
                        <h4>{topic}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardList; 