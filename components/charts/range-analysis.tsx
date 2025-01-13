'use client'

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';
import '../../utils/chart-config';

interface Props {
  data: EVData[];
}

export default function RangeAnalysis({ data }: Props) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const ranges = data.map(vehicle => vehicle.electricRange).filter(range => range > 0);
  const rangeCategories = ['0-100', '101-200', '201-300', '301-400', '400+'];
  const rangeCounts = [
    ranges.filter(range => range <= 100).length,
    ranges.filter(range => range > 100 && range <= 200).length,
    ranges.filter(range => range > 200 && range <= 300).length,
    ranges.filter(range => range > 300 && range <= 400).length,
    ranges.filter(range => range > 400).length,
  ];

  const chartData = {
    labels: rangeCategories,
    datasets: [
      {
        label: 'Number of Vehicles',
        data: rangeCounts,
        backgroundColor: rangeCounts.map((_, index) => 
          hoveredBar === index ? '#FF6384' : '#4BC0C0'
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onHover: (_: any, elements: any[]) => {
      if (elements.length === 1) {
        setHoveredBar(elements[0].index);
      } else {
        setHoveredBar(null);
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            const total = ranges.length;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Electric Range Distribution
          </Typography>
          <div className="h-[300px] cursor-pointer">
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

