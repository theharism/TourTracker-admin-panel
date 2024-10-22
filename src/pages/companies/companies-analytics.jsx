import { useEffect, useState } from 'react';

// material-ui

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import axios from 'api/axios';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
import { Alert, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
// import SalesChart from 'pages/dashboard/SalesChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

const getCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for the month
  return `${year}-${month}`;
};

export default function CompaniesAnalytics() {
  const [tourTypes, setTourTypes] = useState([]);
  const [toursBookedData, setToursBookedData] = useState([]);
  const [toursBookedLabels, setToursBookedLabels] = useState([]);
  const [month, setMonth] = useState(getCurrentMonth());

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
      .get(`/analytics/tours/booked?year=${month.split('-')[0]}&month=${month.split('-')[1]}`)
      .then((res) => {
        setToursBookedData(res.data.map((obj) => obj.totalTours));
        setToursBookedLabels(res.data.map((obj) => obj.companyName));
      })
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const labels = tourTypes?.map((tour) => tour._id);

  const data = tourTypes?.map((tour) => tour.count);

  // const series1 = series.map((s) => s.avgBaseRate.toFixed(2));
  // const series2 = series.map((s) => s.avgHourlyRate.toFixed(2));
  // const labels1 = series.map((s) => s._id);
  const handleMonthChange = (e) => {
    setMonth(e.target.value); // Update the month state with the selected value
  };
  return (
    <>
      <MainCard title="Total Companies by Tour Types" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={data} labels={labels} />
        </Box>
      </MainCard>

      <MainCard title={`Total Tours Booked By Companies in ${month}`} content={false} sx={{ mt: 1.5 }}>
        <div style={{ display: 'flex', width: '95%', marginTop: '-4%', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 16, marginRight: 5 }}>Select Month:</span>
          <input type="month" id="monthYear" name="monthYear" value={month} onChange={handleMonthChange} style={{ fontSize: 16 }} />
        </div>

        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={toursBookedData} labels={toursBookedLabels} />
        </Box>
      </MainCard>
    </>
  );
}
