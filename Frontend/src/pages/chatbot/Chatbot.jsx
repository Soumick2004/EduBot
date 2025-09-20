import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadOption = (type) => {
    console.log(`Selected upload type: ${type}`);
    setShowUploadModal(false);
    // Handle different upload types here
  };

  const closeModal = () => {
    setShowUploadModal(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button 
          className="back-button" 
          onClick={() => onNavigate('landing')}
        >
          ← Back to Home
        </button>
        <h1>ScholarIQ Chatbot</h1>
      </div>

      <div className="chatbot-main">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to ScholarIQ!</h2>
              <p>Ask me anything about your academic research, or upload documents to get started.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-wrapper">
              <button
                type="button"
                className="upload-button"
                onClick={handleUploadClick}
                title="Upload files"
              >
                +
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask anything"
                className="chat-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {showUploadModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Content</h3>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="upload-options">
              <button 
                className="upload-option"
                onClick={() => handleUploadOption('pdf')}
              >
                <div className="upload-icon">📄</div>
                <span>PDF Upload</span>
                <small>Upload research papers, documents</small>
              </button>
              <button 
                className="upload-option"
                onClick={() => handleUploadOption('youtube')}
              >
                <div className="upload-icon">📺</div>
                <span>YouTube Link</span>
                <small>Add video content for analysis</small>
              </button>
              <button 
                className="upload-option"
                onClick={() => handleUploadOption('text')}
              >
                <div className="upload-icon">📝</div>
                <span>Text Upload</span>
                <small>Paste or type text content</small>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
