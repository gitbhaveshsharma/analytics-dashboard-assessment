import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';

interface Props {
  data: EVData[];
}

export default function TemporalTrends({ data }: Props) {
  const yearCounts = data.reduce((acc, curr) => {
    acc[curr.modelYear] = (acc[curr.modelYear] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const years = Object.keys(yearCounts).sort();

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Number of Vehicles',
        data: years.map(year => yearCounts[parseInt(year)]),
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            EV Adoption Trends
          </Typography>
          <div className="h-[300px] cursor-pointer">
            <Line
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

