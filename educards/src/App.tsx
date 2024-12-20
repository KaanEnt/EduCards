import React from 'react';
import Flashcards from './components/Flashcards';
import './components/Flashcards.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Flashcards</h1>
      </header>
      <Flashcards />
    </div>
  );
}

export default App; 