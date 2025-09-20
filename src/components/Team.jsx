import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Suthirtha Dey",
      // role: "Lead Researcher",
      avatar: "SD"
    },
    {
      id: 2,
      name: "Soumick Samanta",
      // role: "AI Engineer",
      avatar: "SS"
    },
    {
      id: 3,
      name: "Tanushree Mandal",
      // role: "UX Designer",
      avatar: "TM"
    }
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
      </div>
    </section>
  );
};

export default Team;