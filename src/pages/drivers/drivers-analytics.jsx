import { useEffect, useState } from 'react';

// material-ui

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import axios from 'api/axios';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
import IncomeAreaChart from 'pages/dashboard/IncomeAreaChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function DriversAnalytics() {
  const [topDrivers, setTopDrivers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get('/analytics/drivers/top/10')
      .then((res) => setTopDrivers(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  useEffect(() => {
    axios
      .get('/analytics/drivers/averageTip')
      .then((res) => {
        setSeries([
          {
            name: 'Drivers Tip',
            data: res.data.map((r) => r.avgTip.toFixed(2))
          }
        ]);
        setLabels(res.data.map((r) => r.month));
      })
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const labels1 = topDrivers?.map((tour) => tour._id);

  const data = topDrivers?.map((tour) => tour.tourCount);

  return (
    <>
      <MainCard title="Top 10 Drivers by Number of Tours" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={data} labels={labels1} />
        </Box>
      </MainCard>
      <MainCard title="Average Driver Tip" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot="month" series={series} labels={labels} />
        </Box>
      </MainCard>
    </>
  );
}
