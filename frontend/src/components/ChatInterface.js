import React, { useState, useCallback } from 'react';
import { geminiChat } from '../services/geminiWrapper';
import AddDocumentButton from './AddDocumentButton';
import UploadModal from './UploadModal';
import './ChatInterface.css';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFileChange(file);
        }
    };

    const handleSend = async () => {
        if (!message.trim() && !selectedFile) return;
        
        setIsLoading(true);
        const userMessage = { role: 'user', content: message, file: selectedFile };
        setConversation(prev => [...prev, userMessage]);
        
        try {
            const response = await geminiChat(message, selectedFile);
            if (response && response.response) {
                let content = response.response;
                
                // If flashcards were generated, add them to the message
                if (response.flashcards && response.flashcards.length > 0) {
                    content += "\n\nGenerated Flashcards:";
                    response.flashcards.forEach((card, index) => {
                        content += `\n\nCard ${index + 1}:`;
                        content += `\nQ: ${card.question}`;
                        content += `\nA: ${card.answer}`;
                    });
                    
                    // You could also store these flashcards in your app's state
                    // handleNewFlashcards(response.flashcards);
                }
                
                setConversation(prev => [...prev, { 
                    role: 'assistant', 
                    content: content
                }]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Chat error:', error);
            setConversation(prev => [...prev, { 
                role: 'assistant', 
                content: `Error: ${error.message || 'Could not get response'}`
            }]);
        } finally {
            setIsLoading(false);
            setMessage('');
            setSelectedFile(null);
        }
    };

    return (
        <div 
            className="chat-interface"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="conversation">
                {conversation.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                        {msg.file && (
                            <div className="file-attachment">
                                <span>📄 {msg.file.name}</span>
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && <div className="message assistant">Thinking...</div>}
            </div>
            <div className="input-area">
                <AddDocumentButton onClick={handleOpenModal} />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    disabled={isLoading}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} disabled={isLoading || (!message.trim() && !selectedFile)}>
                    Send
                </button>
            </div>
            {selectedFile && (
                <div className="file-preview">
                    <span>📄 {selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)}>×</button>
                </div>
            )}
            {isDragging && (
                <div className="drag-overlay">
                    Drop your PDF file here
                </div>
            )}
            <UploadModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onUpload={handleFileChange}
            />
        </div>
    );
};

export default ChatInterface; 