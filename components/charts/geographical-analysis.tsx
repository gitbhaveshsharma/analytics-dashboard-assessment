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

export default function GeographicalAnalysis({ data }: Props) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const countiesCounts = data.reduce((acc, curr) => {
    acc[curr.county] = (acc[curr.county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedCounties = Object.entries(countiesCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartData = {
    labels: sortedCounties.map(([county]) => county),
    datasets: [
      {
        label: 'Number of EVs',
        data: sortedCounties.map(([, count]) => count),
        backgroundColor: sortedCounties.map((_, index) => 
          hoveredBar === index ? '#FF6384' : '#36A2EB'
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
            const total = data.length;
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Top 10 Counties by EV Distribution
          </Typography>
          <div className="h-[300px] cursor-pointer">
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

