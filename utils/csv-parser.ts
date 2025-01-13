import Papa, { ParseResult } from 'papaparse';
import { EVData } from '../types/ev-types';

export const parseCSVData = async (csvText: string): Promise<EVData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<string>(csvText, {
      header: true,
      complete: (results: ParseResult<any>) => {
        const data = results.data.map((row: any) => ({
          vin: row['VIN (1-10)'],
          county: row['County'],
          city: row['City'],
          state: row['State'],
          postalCode: row['Postal Code'],
          modelYear: parseInt(row['Model Year']),
          make: row['Make'],
          model: row['Model'],
          electricVehicleType: row['Electric Vehicle Type'],
          cafvEligibility: row['Clean Alternative Fuel Vehicle (CAFV) Eligibility'],
          electricRange: parseInt(row['Electric Range']) || 0,
          baseMSRP: parseInt(row['Base MSRP']) || 0,
          legislativeDistrict: row['Legislative District'],
          dolVehicleId: row['DOL Vehicle ID'],
          vehicleLocation: row['Vehicle Location'],
          electricUtility: row['Electric Utility'],
          censusTract: row['2020 Census Tract']
        }));
        resolve(data as EVData[]);
      },
    });
  });
};

