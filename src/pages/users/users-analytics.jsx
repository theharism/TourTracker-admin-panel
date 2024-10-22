import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from 'pages/dashboard/IncomeAreaChart';

import axios from 'api/axios';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function UniqueVisitorCard() {
  const [slot, setSlot] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get(`/analytics/users/signups?startDate=${startDate}&endDate=${endDate}`)
      .then((res) => {
        setSeries([
          {
            name: 'User Signups',
            data: res.data.map((r) => r.count)
          }
        ]);

        const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Define options for date format

        const labels = res.data.map((item) => {
          const date = new Date(item._id); // Parse the _id into a Date object
          return date.toLocaleDateString('en-US', options); // Format the date as "Oct 1, 2024"
        });

        setLabels(labels);
      })
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, [startDate, endDate]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">users Sign ups</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={2}>
            <div className="flex flex-col mb-4">
              <label htmlFor="startDate" className="text-lg mb-1">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-xl p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="endDate" className="text-lg mb-1">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-xl p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot={slot} series={series} labels={labels} />
        </Box>
      </MainCard>
    </>
  );
}
