import React from 'react';
import { useDrag } from 'react-use-gesture';
import './FlashcardList.css';

const getRandomColor = (index) => {
    const colors = [
        '#1e3a8a', '#3b82f6', '#f59e0b', '#fbbf24', 
        '#10b981', '#059669', '#d946ef', '#a855f7',
        '#ef4444', '#f97316', '#84cc16', '#14b8a6'
    ];
    return colors[index % colors.length];
};

const FlashcardList = ({ course, onStartQuiz, cardColor, textColor, shadow, borderRadius }) => {
    const bind = useDrag(({ args: [topic], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2;
        const dir = xDir < 0 ? -1 : 1;
        
        if (!down && trigger) {
            onStartQuiz(topic);
        }
    });

    return (
        <div className="flashcard-list">
            <h3>{course.name}</h3>
            <div className="topics">
                {course.topics.map((topic, index) => (
                    <div 
                        key={index}
                        className="topic-stack"
                        {...bind(topic)}
                    >
                        <div className="topic-card" style={{ 
                            background: `linear-gradient(135deg, ${getRandomColor(index)}, ${getRandomColor(index + 1)})`,
                            color: textColor,
                            boxShadow: shadow,
                            borderRadius: `${borderRadius}px`
                        }}>
                            <div className="topic-content">
                                <h4>{topic}</h4>
                            </div>
                        </div>
                        <div className="topic-shadow"></div>
                        <div className="topic-shadow"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardList; 