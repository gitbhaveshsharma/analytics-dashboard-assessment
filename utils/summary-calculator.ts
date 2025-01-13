import { EVData, SummaryData } from '../types/ev-types';

export function calculateSummaryData(data: EVData[]): SummaryData {
  const totalVehicles = data.length;
  const averageRange = data.reduce((sum, vehicle) => sum + vehicle.electricRange, 0) / totalVehicles;

  const makeCount: Record<string, number> = {};
  const modelCount: Record<string, number> = {};

  data.forEach(vehicle => {
    makeCount[vehicle.make] = (makeCount[vehicle.make] || 0) + 1;
    modelCount[`${vehicle.make} ${vehicle.model}`] = (modelCount[`${vehicle.make} ${vehicle.model}`] || 0) + 1;
  });

  const topMake = Object.entries(makeCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const topModel = Object.entries(modelCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return {
    totalVehicles,
    averageRange: Math.round(averageRange),
    topMake,
    topModel
  };
}

