import React, { useState } from 'react';
import ScholarIQApp from './pages/landing-page/App';
import Login from './pages/login-signup/Login';
import Signup from './pages/login-signup/Signup';
import Chatbot from './pages/chatbot/Chatbot';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      case 'chatbot':
        return <Chatbot onNavigate={setCurrentPage} />;
      default:
        return <ScholarIQApp onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App
