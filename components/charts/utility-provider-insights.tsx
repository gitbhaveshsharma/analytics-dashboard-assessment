'use client'

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';

interface Props {
  data: EVData[];
}

export default function UtilityProviderInsights({ data }: Props) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  useEffect(() => {
    updateChartData(data);
  }, [data]);

  const updateChartData = (data: EVData[]) => {
    const utilityCounts = data.reduce((acc, curr) => {
      acc[curr.electricUtility] = (acc[curr.electricUtility] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedUtilities = Object.entries(utilityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    setChartData({
      labels: sortedUtilities.map(([utility]) => utility),
      datasets: [
        {
          data: sortedUtilities.map(([, count]) => count),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#7BC225', '#B11623'
          ],
        },
      ],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">
              EV Distribution by Utility Provider
            </Typography>
          </div>
          <div className="h-[300px]">
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
