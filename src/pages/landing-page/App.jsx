import React from 'react';
import './App.css';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Demo from '../../components/Demo';
import Team from '../../components/Team';
import Footer from '../../components/Footer';

const EduBOTApp = ({ onNavigate }) => {
  return (
    <div className="scholar-iq-app">
      {/* Floating Background Elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      
      <Hero onNavigate={onNavigate} />
      <Features />
      <Demo />
      <Team />
      <Footer />
    </div>
  );
};

export default EduBOTApp;