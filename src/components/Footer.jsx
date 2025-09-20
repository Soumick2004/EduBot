import React from 'react';
import { Github, Book, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>EduBOT</h3>
            <p>Your AI Academic Assistant</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#" className="footer-link">
                  <Github size={16} className="link-icon" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <Book size={16} className="link-icon" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <Mail size={16} className="link-icon" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <Github size={20} />
              </a>
              <a href="#" className="social-icon">
                <Book size={20} />
              </a>
              <a href="#" className="social-icon">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>© 2025 EduBOT. Built with ❤️ for students & researchers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;