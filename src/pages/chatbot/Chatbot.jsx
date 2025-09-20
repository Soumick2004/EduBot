import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, userMessage]);
      setInputValue('');
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5000/summarize/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue }),
        });

        const data = await response.json();
        
        const botMessage = {
          id: Date.now() + 1,
          text: data.summary,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        let errorText = 'Sorry, I encountered an error. Please try again.';
        
        if (error.message.includes('Failed to fetch')) {
          errorText = 'Cannot connect to the backend server. Please make sure the backend is running on port 5000.';
        } else if (error.message.includes('NetworkError')) {
          errorText = 'Network error. Please check your internet connection.';
        }
        
        const errorMessage = {
          id: Date.now() + 1,
          text: errorText,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadOption = async (type) => {
    setShowUploadModal(false);
    
    if (type === 'pdf') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          await handlePdfUpload(file);
        }
      };
      input.click();
    } else if (type === 'youtube') {
      const url = prompt('Enter YouTube URL:');
      if (url) {
        await handleYoutubeUpload(url);
      }
    } else if (type === 'text') {
      const text = prompt('Enter or paste your text:');
      if (text) {
        await handleTextUpload(text);
      }
    }
  };

  const handlePdfUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/summarize/pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now(),
        text: `PDF Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      let errorText = 'Sorry, I encountered an error processing the PDF. Please try again.';
      
      if (error.message.includes('Failed to fetch')) {
        errorText = 'Cannot connect to the backend server. Please make sure the backend is running on port 5000.';
      }
      
      const errorMessage = {
        id: Date.now(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYoutubeUpload = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/summarize/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now(),
        text: `YouTube Video Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now(),
        text: 'Sorry, I encountered an error processing the YouTube video. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextUpload = async (text) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/summarize/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now(),
        text: `Text Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now(),
        text: 'Sorry, I encountered an error processing the text. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading && (
            <div className="message bot">
              <div className="message-content loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>ScholarIQ is thinking...</span>
              </div>
            </div>
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
