import React from 'react';
import './App.css';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Demo from '../../components/Demo';
import Team from '../../components/Team';
import Footer from '../../components/Footer';

const ScholarIQApp = () => {
  return (
    <div className="scholar-iq-app">
      <Hero />
      <Features />
      <Demo />
      <Team />
      <Footer />
    </div>
  );
};

export default ScholarIQApp;