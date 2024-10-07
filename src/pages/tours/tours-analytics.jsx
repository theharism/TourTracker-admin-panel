import { useEffect, useState } from 'react';

// material-ui

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import axios from 'api/axios';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function ToursAnalytics() {
  const [tourTypes, setTourTypes] = useState([]);

  useEffect(() => {
    axios
      .get('/analytics/tours/popularType')
      .then((res) => setTourTypes(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const labels = tourTypes?.map((tour) => tour._id);

  const data = tourTypes?.map((tour) => tour.count);

  return (
    <>
      <MainCard title="Most Popular Tour Type" content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart data={data} labels={labels} />
        </Box>
      </MainCard>
    </>
  );
}
