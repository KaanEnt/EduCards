import React, { useState } from 'react';
import { geminiChat } from '../services/geminiWrapper';
import './ChatInterface.css';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;
        
        setIsLoading(true);
        setConversation(prev => [...prev, { role: 'user', content: message }]);
        
        try {
            const response = await geminiChat(message);
            setConversation(prev => [...prev, { role: 'assistant', content: response.response }]);
        } catch (error) {
            setConversation(prev => [...prev, { role: 'assistant', content: 'Error: Could not get response' }]);
        } finally {
            setIsLoading(false);
            setMessage('');
        }
    };

    return (
        <div className="chat-interface">
            <div className="conversation">
                {conversation.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
                {isLoading && <div className="message assistant">Thinking...</div>}
            </div>
            <div className="input-area">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    disabled={isLoading}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} disabled={isLoading || !message.trim()}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface; 