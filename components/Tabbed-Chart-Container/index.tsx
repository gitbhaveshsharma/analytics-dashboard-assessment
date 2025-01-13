'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabbedChartContainerProps {
  charts: {
    label: string;
    component: React.ReactNode;
  }[];
}

export default function TabbedChartContainer({ charts }: TabbedChartContainerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-[#f4ecf7] rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b ">
        {charts.map((chart, index) => (
          <button
            key={index}
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === index
                ? 'bg-[#5b2c6f] text-white'
                : 'bg-[#bb8fce] text-gray-700 hover:bg-[#9b59b6] hover:text-gray-900'
            } transition-colors duration-200`}
            onClick={() => handleChange(index)}
          >
            {chart.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {charts[activeTab].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
