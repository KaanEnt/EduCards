import React, { useState, useEffect } from 'react';
import History from './components/History';
import ChatInterface from './components/ChatInterface';
import FlashcardList from './components/FlashcardList';
import Quiz from './components/Quiz';
import { Leva } from 'leva';
import { useLevaControls } from './components/LevaControls';
import axios from 'axios';
import './App.css';

function App() {
    const { background, cardColor, textColor, shadow, borderRadius } = useLevaControls();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizCards, setQuizCards] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/flashcards/');
                const flashcards = response.data;
                
                // Group flashcards by course and topics
                const courseMap = new Map();
                flashcards.forEach(flashcard => {
                    if (!courseMap.has(flashcard.course)) {
                        courseMap.set(flashcard.course, {
                            id: courseMap.size + 1,
                            name: flashcard.course,
                            topics: new Map()
                        });
                    }
                    const course = courseMap.get(flashcard.course);
                    if (!course.topics.has(flashcard.topic)) {
                        course.topics.set(flashcard.topic, []);
                    }
                    course.topics.get(flashcard.topic).push(flashcard);
                });

                // Convert Map to array
                const coursesArray = Array.from(courseMap.values()).map(course => ({
                    ...course,
                    topics: Array.from(course.topics.keys())
                }));

                setCourses(coursesArray);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleStartQuiz = async (topic) => {
        try {
            const response = await axios.get('http://localhost:8000/api/flashcards/', {
                params: {
                    course: selectedCourse.name,
                    topic: topic
                }
            });
            
            // Ensure we only get flashcards for the exact course and topic
            const filteredCards = response.data.filter(card => 
                card.course === selectedCourse.name && card.topic === topic
            );
            
            if (filteredCards.length === 0) {
                alert('No flashcards found for this topic');
                return;
            }
            
            setQuizCards(filteredCards);
            setShowQuiz(true);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    return (
        <div className="App" style={{ backgroundColor: background }}>
            <Leva collapsed />
            <div className="app-layout">
                <History 
                    courses={courses} 
                    onSelectCourse={setSelectedCourse} 
                    loading={loading}
                />
                <div className="main-content">
                    <ChatInterface />
                    {selectedCourse && (
                        <FlashcardList 
                            course={selectedCourse} 
                            onStartQuiz={handleStartQuiz}
                            cardColor={cardColor}
                            textColor={textColor}
                            shadow={shadow}
                            borderRadius={borderRadius}
                        />
                    )}
                </div>
            </div>
            {showQuiz && (
                <Quiz 
                    flashcards={quizCards} 
                    onClose={() => setShowQuiz(false)}
                    cardColor={cardColor}
                    textColor={textColor}
                    shadow={shadow}
                    borderRadius={borderRadius}
                />
            )}
        </div>
    );
}

export default App; 