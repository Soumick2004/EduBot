import React, { useState } from 'react';
import { Send, FileUp, MessageSquare, BookOpen, Code } from 'lucide-react';
import './Demo.css';

const Demo = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to EduBOT! How can I help you with your research today?",
      sender: "bot"
    },
    {
      id: 2,
      content: "Can you summarize the key findings from the paper 'AI in Education: Promises and Challenges'?",
      sender: "user"
    },
    {
      id: 3,
      content: "Certainly! The paper discusses how AI can personalize learning, automate administrative tasks, and provide insights to educators. However, it also highlights challenges like data privacy concerns, potential bias in AI systems, and the need for human oversight in educational decision-making.",
      sender: "bot"
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user"
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        content: "Thank you for your question! I'm analyzing this query and will provide a detailed response shortly...",
        sender: "bot"
      };
      setMessages([...messages, newUserMessage, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="demo-section">
      <div className="container">
        <h2>Try the Demo</h2>
        <p>Experience the power of EduBOT with our interactive demo</p>
        
        <div className="demo-container">
          <div className="chat-header">
            <div className="chat-title">EduBOT Chat Assistant</div>
            <div className="chat-status">
              <span className="status-indicator"></span>
              <span>Online</span>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className={`message-bubble ${message.sender}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="chat-input-area">
            <div className="chat-actions">
              <button className="action-btn" aria-label="Upload file">
                <FileUp size={20} />
              </button>
              <button className="action-btn" aria-label="Search papers">
                <BookOpen size={20} />
              </button>
              <button className="action-btn" aria-label="View code">
                <Code size={20} />
              </button>
            </div>
            
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ask a question or paste text from a paper..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="demo-disclaimer">
          <p>This is a demo interface. The actual application may have additional features and capabilities.</p>
        </div>
      </div>
    </section>
  );
};

export default Demo;