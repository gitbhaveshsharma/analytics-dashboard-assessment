'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  label: string;
  filterType: string;
}

export default function FilterDropdown({ options, onSelect, label, filterType }: FilterDropdownProps) {
  const [selected, setSelected] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 w-full md:w-1/2 lg:w-1/3"
    >
      <select
        value={selected}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={`${filterType}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

