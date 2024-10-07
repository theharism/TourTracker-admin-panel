// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'api/axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function TourBookingsData() {
  const [tourBookings, setTourBookings] = useState([]);

  useEffect(() => {
    axios
      .get('/tour-bookings')
      .then((res) => setTourBookings(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const columns = [
    { field: '#', headerName: '#', width: 100 },
    { field: 'id', headerName: 'ID', width: 100 },

    { field: 'tourDate', headerName: 'Tour Date', width: 100 },

    { field: 'tourType', headerName: 'Tour Type', width: 100 },
    {
      field: 'itinerary',
      headerName: 'Itinerary',
      width: 100
    },
    { field: 'guestCount', headerName: 'Guest Count', width: 100 },
    { field: 'primaryContactName', headerName: 'Primary Contact', width: 100 },

    { field: 'vehicle', headerName: 'Vehicle', width: 100 },
    { field: 'prepay', headerName: 'Prepay', width: 100 },

    { field: 'prepayAmount', headerName: 'Prepay Amount', width: 100 }
  ];

  const rows = tourBookings?.map((tour, index) => {
    return {
      '#': index,
      id: tour._id,
      tourDate: tour.tourDate,
      tourType: tour.tourType,
      itinerary: tour.itinerary,
      guestCount: tour.guestCount,
      primaryContactName: tour.primaryContactName,
      vehicle: tour.vehicle,
      prepay: tour.prepay,
      prepayAmount: tour.prepayAmount
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
