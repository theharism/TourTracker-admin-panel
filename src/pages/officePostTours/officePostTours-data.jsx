// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'api/axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function OfficePostToursData() {
  const [officePostTour, setOfficePostTour] = useState([]);

  useEffect(() => {
    axios
      .get('/office-post-tours')
      .then((res) => setOfficePostTour(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const columns = [
    { field: '#', headerName: '#', width: 100 },
    { field: 'id', headerName: 'ID', width: 200 },

    { field: 'tourKey', headerName: 'Tour Key', width: 200 },

    { field: 'additionalFees', headerName: 'Additional Fees', width: 200 }
  ];

  const rows = officePostTour?.map((tour, index) => {
    return {
      '#': index,
      id: tour._id,
      tourKey: tour.tourKey,
      additionalFees: tour.additionalFees
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
