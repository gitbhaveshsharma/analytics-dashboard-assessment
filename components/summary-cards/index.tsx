import { motion } from 'framer-motion';
import { EVData } from '../../types/ev-types';
import { Car, Gauge, Trophy, Zap } from 'lucide-react';

interface Props {
  filteredData: EVData[];
}

const calculateSummaryData = (data: EVData[]) => {
  if (data.length === 0) {
    return {
      totalVehicles: 0,
      averageRange: 0,
      topMake: 'N/A',
      topModel: 'N/A',
    };
  }

  const totalVehicles = data.length;
  const averageRange = data.reduce((sum, ev) => sum + ev.electricRange, 0) / totalVehicles;
  const makeCounts: { [key: string]: number } = {};
  const modelCounts: { [key: string]: number } = {};

  data.forEach(ev => {
    makeCounts[ev.make] = (makeCounts[ev.make] || 0) + 1;
    modelCounts[`${ev.make} ${ev.model}`] = (modelCounts[`${ev.make} ${ev.model}`] || 0) + 1;
  });

  const topMake = Object.entries(makeCounts).reduce((a, b) => (a[1] as number) > (b[1] as number) ? a : b)[0] as string;
  const topModel = Object.entries(modelCounts).reduce((a, b) => (a[1] as number) > (b[1] as number) ? a : b)[0] as string;

  return { totalVehicles, averageRange, topMake, topModel };
};

export default function SummaryCards({ filteredData }: Props) {
  const summary = calculateSummaryData(filteredData);

  const cardData = [
    { title: 'Total Vehicles', value: summary.totalVehicles, icon: Car, color: '#bb8fce' },
    { title: 'Average Range', value: `${Math.round(summary.averageRange)} miles`, icon: Gauge, color: '#9b59b6' },
    { title: 'Top Make', value: summary.topMake, icon: Trophy, color: '#6c3483' },
    { title: 'Top Model', value: summary.topModel, icon: Zap, color: '#5b2c6f' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-md"
            style={{ backgroundColor: card.color }}
          >
            <div className="flex items-center mb-2">
              <card.icon className="w-10 h-10 mr-2 text-white" />
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

