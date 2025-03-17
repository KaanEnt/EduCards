import React from 'react';
import './History.css';

const History = ({ courses, onSelectCourse }) => {
    return (
        <div className="history">
            <h3>History</h3>
            <ul>
                {courses.map(course => (
                    <li key={course.id} onClick={() => onSelectCourse(course)}>
                        {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History; 