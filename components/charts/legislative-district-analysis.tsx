'use client'

import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';
import '../../utils/chart-config';

interface Props {
  data: EVData[];
}

export default function LegislativeDistrictAnalysis({ data }: Props) {
  const filteredData = data.filter(item => item.legislativeDistrict !== undefined);

  const districtCounts = filteredData.reduce((acc, curr) => {
    acc[curr.legislativeDistrict] = (acc[curr.legislativeDistrict] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(districtCounts),
    datasets: [
      {
        label: 'Number of EVs',
        data: Object.values(districtCounts),
        backgroundColor: '#9966FF',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            EV Distribution by Legislative District
          </Typography>
          <div className="h-[300px] cursor-pointer">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
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
