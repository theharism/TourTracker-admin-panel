import { useEffect, useState } from 'react';

// material-ui

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import axios from 'api/axios';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
import SalesChart from 'pages/dashboard/SalesChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function CompaniesAnalytics() {
  const [tourTypes, setTourTypes] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get('/analytics/companies/tourTypes/count')
      .then((res) => setTourTypes(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  useEffect(() => {
    axios
      .get('/analytics/companies/averageRates')
      .then((res) => setSeries(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const labels = tourTypes?.map((tour) => tour._id);

  const data = tourTypes?.map((tour) => tour.count);

  const series1 = series.map((s) => s.avgBaseRate.toFixed(2));
  const series2 = series.map((s) => s.avgHourlyRate.toFixed(2));
  const labels1 = series.map((s) => s._id);

  return (
    <>
      <MainCard title="Total Companies by Tour Types" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={data} labels={labels} />
        </Box>
      </MainCard>
      <MainCard title="Average Company Rates" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <SalesChart
            series1={{ data: series1, name: 'Base Rate' }}
            series2={{ data: series2, name: 'Hourly Rate' }}
            labels={labels1}
            label1="Base Rate"
            label2="Hourly Rate"
          />
        </Box>
      </MainCard>
    </>
  );
}
