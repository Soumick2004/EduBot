import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Lead Researcher",
      avatar: "SC"
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "AI Engineer",
      avatar: "AJ"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "UX Designer",
      avatar: "MR"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Backend Developer",
      avatar: "JW"
    }
  ];

  const acknowledgments = [
    { id: 1, name: "OpenAI Research" },
    { id: 2, name: "MIT Academic Labs" },
    { id: 3, name: "Google Scholar" },
    { id: 4, name: "arXiv" }
  ];

  return (
    <section className="team-section">
      <div className="container">
        <h2>Meet the Team</h2>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(58, 134, 255, 0.3)"
              }}
            >
              <div className="team-avatar">
                <span>{member.avatar}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="acknowledgments-section">
          <h3>Acknowledgments</h3>
          <p>We'd like to thank our partners and supporters:</p>
          
          <div className="acknowledgments-logos">
            {acknowledgments.map((org) => (
              <div key={org.id} className="org-logo">
                {org.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;