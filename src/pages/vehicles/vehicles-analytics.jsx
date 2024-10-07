import { useEffect, useState } from 'react';

// material-ui

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import axios from 'api/axios';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function VehiclesAnalytics() {
  const [topVehicles, setTopVehicles] = useState([]);

  useEffect(() => {
    axios
      .get('/analytics/vehicles/usage')
      .then((res) => setTopVehicles(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const labels = topVehicles?.map((tour) => tour._id);

  const data = topVehicles?.map((tour) => tour.usageCount);

  return (
    <>
      <MainCard title="Top 10 Vehicles by Number of Tours" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={data} labels={labels} />
        </Box>
      </MainCard>
    </>
  );
}
