// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'api/axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function DriverPostToursData() {
  const [driverPostTour, setDriverPostTour] = useState([]);

  useEffect(() => {
    axios
      .get('/driver-post-tours')
      .then((res) => setDriverPostTour(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const columns = [
    { field: '#', headerName: '#', width: 100 },
    { field: 'id', headerName: 'ID', width: 100 },

    { field: 'tourKey', headerName: 'Tour Key', width: 100 },

    { field: 'driver', headerName: 'Driver', width: 100 },
    { field: 'vehicle', headerName: 'Vehicle', width: 100 },
    { field: 'cashTipAmount', headerName: 'Cash Tip Amount', width: 100 },

    {
      field: 'driverStartTime',
      headerName: 'Driver Start Time',
      width: 100
    },

    { field: 'lotDepartureTime', headerName: 'Lot Departure Time', width: 100 },
    { field: 'clientDropOffTime', headerName: 'Client DropOff Time', width: 100 },

    { field: 'lotReturnTime', headerName: 'Lot Return Time', width: 100 },

    { field: 'startMileage', headerName: 'Start Mileage', width: 100 },

    { field: 'endMileage', headerName: 'End Mileage', width: 100 }
  ];

  const rows = driverPostTour?.map((tour, index) => {
    return {
      '#': index,
      id: tour._id,
      tourKey: tour.tourKey,
      driver: tour.driver,
      vehicle: tour.vehicle,
      cashTipAmount: tour.cashTipAmount,
      driverStartTime: tour.driverStartTime,
      lotDepartureTime: tour.lotDepartureTime,
      clientDropOffTime: tour.clientDropOffTime,
      lotReturnTime: tour.lotReturnTime,
      startMileage: tour.startMileage,
      endMileage: tour.endMileage
    };
  });

  return (
    <MainCard>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          disableRowSelectionOnClick
        />
      </Box>
    </MainCard>
  );
}
