// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'api/axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function UsersData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const columns = [
    { field: '#', headerName: '#', width: 100 },

    { field: 'id', headerName: 'ID', width: 200 },
    {
      field: 'email',
      headerName: 'Email',
      width: 400
    }
  ];

  const rows = users?.map((user, index) => {
    return { '#': index, id: user._id, email: user.email };
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
