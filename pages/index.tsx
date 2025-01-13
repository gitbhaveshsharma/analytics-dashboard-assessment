'use client'

import { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/header';
import SummaryCards from '../components/summary-cards';
import VehicleDistribution from '../components/charts/vehicle-distribution';
import GeographicalAnalysis from '../components/charts/geographical-analysis';
import RangeAnalysis from '../components/charts/range-analysis';
import TemporalTrends from '../components/charts/temporal-trends';
import CAFVEligibility from '../components/charts/cafv-eligibility';
import LegislativeDistrictAnalysis from '../components/charts/legislative-district-analysis';
import UtilityProviderInsights from '../components/charts/utility-provider-insights';
import { parseCSVData } from '../utils/csv-parser';
import { calculateSummaryData } from '../utils/summary-calculator';
import { EVData, SummaryData } from '../types/ev-types';
import FilterDropdown from '../components/filter-dropdown';
import TabbedChartContainer from '../components/Tabbed-Chart-Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';
import { Download, 
  Github,
  Linkedin,
  Phone
 } from 'lucide-react';
import Link from 'next/link';


const Home: React.FC = () => {
  const [data, setData] = useState<EVData[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [filteredData, setFilteredData] = useState<EVData[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const expectedHeaders = [
    'VIN (1-10)',
    'County',
    'City',
    'State',
    'Postal Code',
    'Model Year',
    'Make',
    'Model',
    'Electric Vehicle Type',
    'Clean Alternative Fuel Vehicle (CAFV) Eligibility',
    'Electric Range',
    'Base MSRP',
    'Legislative District',
    'DOL Vehicle ID',
    'Vehicle Location',
    'Electric Utility',
    '2020 Census Tract',
  ];
  const handlePhoneClick = () => {
    setShowPhoneNumber(!showPhoneNumber); 
  };


  const handleMakeSelect = (value: string) => {
    setSelectedMake(value);
    filterData(value, selectedCounty);
  };

  const handleCountySelect = (value: string) => {
    setSelectedCounty(value);
    filterData(selectedMake, value);
  };

  const filterData = (make: string, county: string) => {
    let filtered = data;
    if (make) {
      filtered = filtered.filter(item => item.make === make);
    }
    if (county) {
      filtered = filtered.filter(item => item.county === county);
    }
    setFilteredData(filtered);
  };

  const updateFilters = (data: EVData[]) => {
    const uniqueMakes = Array.from(new Set(data.map(item => item.make))).sort();
    const uniqueCounties = Array.from(new Set(data.map(item => item.county))).sort();
    setMakes(uniqueMakes);
    setCounties(uniqueCounties);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileText = await file.text();
        
        const { meta } = Papa.parse(fileText, { header: true });
        const fileHeaders = meta.fields || [];
        
        const isValidStructure = expectedHeaders.every(header => fileHeaders.includes(header));
        if (!isValidStructure) {
          toast.error('Invalid file structure. Please check the CSV headers.');
          setIsFileUploaded(false);
          return;
        }
  
        const parsedData = await parseCSVData(fileText);
        setData(parsedData);
        setFilteredData(parsedData);
        setSummaryData(calculateSummaryData(parsedData));
        updateFilters(parsedData);
        setIsFileUploaded(true);
        toast.success('Data loaded successfully!');
      } catch (error) {
        console.error('Error parsing file:', error);
        toast.error('Something went wrong. Check the file structure.');
        setIsFileUploaded(false);
      }
    }
  };
  
  

  const handlePreloadData = async () => {
    try {
      const response = await fetch('/Electric_Vehicle_Population_Data.csv');
      const csvText = await response.text();
      const parsedData = await parseCSVData(csvText);
      setData(parsedData);
      setFilteredData(parsedData);
      setSummaryData(calculateSummaryData(parsedData));
      updateFilters(parsedData);
      setIsFileUploaded(true);
      toast.success('Data loaded successfully!');
    } catch (error) {
      toast.error('Failed to preload data. Please check the server or file.');
    }
  };
  

  const chartGroups = [
    {
      label: "Vehicle Types and Geography",
      component: (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <VehicleDistribution data={filteredData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GeographicalAnalysis data={filteredData} />
          </Grid>
        </Grid>
      )
    },
    {
      label: "Range and Trends",
      component: (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <RangeAnalysis data={filteredData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TemporalTrends data={filteredData} />
          </Grid>
        </Grid>
      )
    },
    {
      label: "CAFV and Legislative",
      component: (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CAFVEligibility data={filteredData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <LegislativeDistrictAnalysis data={filteredData} />
          </Grid>
        </Grid>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Header />
      <ToastContainer />
      <Container maxWidth="xl" className="py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {!isFileUploaded && (
              <div className="h-[72vh] flex flex-col items-center justify-center ">
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
              
                <Button
                  variant="contained"
                  component="label"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Upload CSV File
                  <input
                    type="file"
                    hidden
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                </Button>
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 ml-4"
                  onClick={handlePreloadData}
                >
                  Preload Data
                </Button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <a
                    href="/sample.csv"
                    download="sample.csv"
                    className="flex items-center space-x-1 group"
                  >
                    <Download
                      className="w-6 h-6 text-blue-500 group-hover:text-purple-500 transition duration-300 transform group-hover:scale-110"
                    />
                    <span className="text-blue-500 group-hover:text-purple-500 transition duration-300">
                      Download Sample File
                    </span>
                  </a>
                </div>
              </motion.div>
              </div>
            )}
          </AnimatePresence>

          {isFileUploaded && (
            <div className="flex space-x-4 mb-4">
              <FilterDropdown
                options={makes}
                onSelect={handleMakeSelect}
                label="Filter by Make"
                filterType="make"
              />
              <FilterDropdown
                options={counties}
                onSelect={handleCountySelect}
                label="Filter by County"
                filterType="county"
              />
            </div>
          )}
          {filteredData.length > 0 && <SummaryCards filteredData={filteredData} />}

          {filteredData.length > 0 && (
            <>
              <TabbedChartContainer charts={chartGroups} />
              <Grid container spacing={4} className="mt-8">
                <Grid item xs={12}>
                  <UtilityProviderInsights data={filteredData} />
                </Grid>
              </Grid>
            </>
          )}
        </motion.div>
      </Container>
      <footer className="py-4 text-center">
      <div className="flex justify-center items-center space-x-4">

        <a
          href="https://github.com/gitbhaveshsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-purple-500  transition duration-300"
        >
          <Github className="w-4 h-4" />
        </a>


        <a
          href="https://www.linkedin.com/in/bhavesh-sharma-b5b3a7222/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-purple-500 transition duration-300"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <a
          onClick={handlePhoneClick} 
          className="text-gray-600 hover:text-purple-500 transition duration-300 flex items-center space-x-1 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          {showPhoneNumber && <span className="text-xs">+91 9650168435</span>}
        </a>
      </div>
      <span className="text-gray-600 hover:text-purple-500 transition duration-300 text-xs">
        Made by Bhavesh Sharma
      </span>
    </footer>
    </div>
  );
}

export default Home;
