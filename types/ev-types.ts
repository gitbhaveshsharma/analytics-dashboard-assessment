export interface EVData {
    vin: string;
    county: string;
    city: string;
    state: string;
    postalCode: string;
    modelYear: number;
    make: string;
    model: string;
    electricVehicleType: string;
    cafvEligibility: string;
    electricRange: number;
    baseMSRP: number;
    legislativeDistrict: string;
    dolVehicleId: string;
    vehicleLocation: string;
    electricUtility: string;
    censusTract: string;
    csvText: string;
  }
  
  export interface SummaryData {
    totalVehicles: number;
    averageRange: number;
    topMake: string;
    topModel: string;
  }
  
  