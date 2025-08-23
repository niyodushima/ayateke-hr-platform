import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function EmployeeCards({ cards }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          onClick={() => navigate(card.path)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-6 rounded-lg shadow-md cursor-pointer ${card.bg}`}
        >
          <div className="text-3xl mb-4 text-gray-700">{card.icon}</div>
          <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
        </motion.div>
      ))}
    </div>
  );
}

export default EmployeeCards;
