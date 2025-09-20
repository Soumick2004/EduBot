import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>ScholarIQ: Your AI Academic Assistant</h1>
        <p className="tagline">Ask questions. Get answers. Unlock research.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Try Demo</button>
          <button className="btn btn-secondary">Chat Now</button>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="background-elements">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>
    </section>
  );
};

export default Hero;