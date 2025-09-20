import React, { useState } from 'react';
import './Chatbot.css';
import { uploadChatResponse } from '/src/firebase/uploadChatResponse'; // adjust path
import { auth } from '/src/firebase/auth';

const Chatbot = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

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
      // Call backend for text summary
      const response = await fetch('http://localhost:5000/summarize/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue })
      });
      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.summary,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Upload bot response to Firebase
      try {
        const uid = auth.currentUser ? auth.currentUser.uid : 'guest';
        await uploadChatResponse(uid, inputValue, data.summary);
      } catch (storageError) {
        console.error('Firebase Storage upload error:', storageError);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorText = error.message.includes('Failed to fetch') 
        ? 'Cannot connect to backend server. Make sure it is running on port 5000.'
        : 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => setShowUploadModal(true);

  const handleUploadOption = async (type) => {
    setShowUploadModal(false);
    
    if (type === 'pdf') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) await handlePdfUpload(file);
      };
      input.click();
    } else if (type === 'youtube') {
      const url = prompt('Enter YouTube URL:');
      if (url) await handleYoutubeUpload(url);
    } else if (type === 'text') {
      const text = prompt('Enter or paste your text:');
      if (text) await handleTextUpload(text);
    }
  };

  const handlePdfUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/summarize/pdf', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      const botMessage = {
        id: Date.now(),
        text: `PDF Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Upload to Firebase
      try {
        const uid = auth.currentUser ? auth.currentUser.uid : 'guest';
        await uploadChatResponse(uid, file.name, data.summary);
      } catch (storageError) {
        console.error('Firebase Storage upload error:', storageError);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Error processing PDF. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYoutubeUpload = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/summarize/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();

      const botMessage = {
        id: Date.now(),
        text: `YouTube Video Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Upload to Firebase
      try {
        const uid = auth.currentUser ? auth.currentUser.uid : 'guest';
        await uploadChatResponse(uid, url, data.summary);
      } catch (storageError) {
        console.error('Firebase Storage upload error:', storageError);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Error processing YouTube video. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextUpload = async (text) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/summarize/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();

      const botMessage = {
        id: Date.now(),
        text: `Text Summary: ${data.summary}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Upload to Firebase
      try {
        const uid = auth.currentUser ? auth.currentUser.uid : 'guest';
        await uploadChatResponse(uid, text, data.summary);
      } catch (storageError) {
        console.error('Firebase Storage upload error:', storageError);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Error processing text. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setShowUploadModal(false);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button className="back-button" onClick={() => onNavigate('landing')}>← Back to Home</button>
        <h1>ScholarIQ Chatbot</h1>
      </div>

      <div className="chatbot-main">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to ScholarIQ!</h2>
              <p>Ask me anything about your academic research, or upload documents to get started.</p>
            </div>
          ) : messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-time">{msg.timestamp.toLocaleTimeString()}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content loading">
                <div className="loading-dots"><span></span><span></span><span></span></div>
                <span>ScholarIQ is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-wrapper">
              <button type="button" className="upload-button" onClick={handleUploadClick} title="Upload files">+</button>
              <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Ask anything" className="chat-input"/>
              <button type="submit" className="send-button">Send</button>
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
              <button className="upload-option" onClick={() => handleUploadOption('pdf')}>
                <div className="upload-icon">📄</div>
                <span>PDF Upload</span>
                <small>Upload research papers, documents</small>
              </button>
              <button className="upload-option" onClick={() => handleUploadOption('youtube')}>
                <div className="upload-icon">📺</div>
                <span>YouTube Link</span>
                <small>Add video content for analysis</small>
              </button>
              <button className="upload-option" onClick={() => handleUploadOption('text')}>
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
