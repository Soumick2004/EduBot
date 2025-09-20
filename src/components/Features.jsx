import React from 'react';
import { Search, MessageSquare, FileText, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Search size={32} />,
      title: "Semantic Search",
      description: "Find the right paper fast"
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Q&A Chatbot",
      description: "Ask questions in natural language"
    },
    {
      icon: <FileText size={32} />,
      title: "PDF Summarizer",
      description: "Get key insights instantly"
    }
  ];


  return (
    <section className="features-section">
      <div className="container">
        <h2>Powerful Tools for Researchers</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(58, 134, 255, 0.3)"
              }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;