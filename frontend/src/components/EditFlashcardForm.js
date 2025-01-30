import React, { useState } from 'react';
import axios from 'axios';

const EditFlashcardForm = ({ flashcard, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        question: flashcard.question,
        answer: flashcard.answer,
        topic: flashcard.topic,
        course: flashcard.course
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(flashcard.id, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <textarea
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                />
            </div>
            <div>
                <label>Answer:</label>
                <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                />
            </div>
            <div>
                <label>Topic:</label>
                <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
            </div>
            <div>
                <label>Course:</label>
                <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditFlashcardForm; 