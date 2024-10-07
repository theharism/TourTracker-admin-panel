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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function UniqueVisitorCard() {
  const [slot, setSlot] = useState('week');

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get(`/analytics/users/signups?timeframe=${slot}`)
      .then((res) => {
        setSeries([
          {
            name: 'User Signups',
            data: res.data.map((r) => r.count)
          }
        ]);
        setLabels(
          res.data.map((item) => {
            const [year, month] = item._id.split('-');
            const monthName = months[parseInt(month) - 1];
            return monthName;
          })
        );
      })
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, [slot]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">users Sign ups</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              Week
            </Button>
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
