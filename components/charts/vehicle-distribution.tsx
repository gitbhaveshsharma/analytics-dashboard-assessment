'use client'

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';

interface Props {
  data: EVData[];
}

export default function VehicleDistribution({ data }: Props) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  });

  useEffect(() => {
    const vehicleTypes = data.reduce((acc, curr) => {
      if (curr.electricVehicleType) {
        acc[curr.electricVehicleType] = (acc[curr.electricVehicleType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    setChartData({
      labels: Object.keys(vehicleTypes),
      datasets: [
        {
          data: Object.values(vehicleTypes),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    });
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          color: '#333',
          cursor: 'pointer',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onHover: (_: any, elements: any[]) => {
      if (elements.length === 1) {
        setHoveredSlice(elements[0].index);
      } else {
        setHoveredSlice(null);
      }
    },
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
          <Typography variant="h6" className="mb-4">
            Vehicle Type Distribution
          </Typography>
          <div className="h-[300px] cursor-pointer relative">
            <Pie data={chartData} options={options} />
            {hoveredSlice !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <Typography variant="h4" className="font-bold" >
                  {Object.values(chartData.datasets[0].data)[hoveredSlice]}
                </Typography>
                <Typography variant="body2" >
                  {Object.keys(chartData.labels)[hoveredSlice]}
                </Typography>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
