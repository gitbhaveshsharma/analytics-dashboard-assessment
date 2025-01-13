import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';

interface Props {
  data: EVData[];
}

export default function CAFVEligibility({ data }: Props) {
  const filteredData = data.filter(item => item.cafvEligibility !== undefined);

  const eligibilityCounts = filteredData.reduce((acc, curr) => {
    acc[curr.cafvEligibility] = (acc[curr.cafvEligibility] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(eligibilityCounts),
    datasets: [
      {
        data: Object.values(eligibilityCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full p-4"
    >
      <Card className="h-full">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            CAFV Eligibility Distribution
          </Typography>
          <div className="h-[300px]" style={{ cursor: 'pointer' }}>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
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
