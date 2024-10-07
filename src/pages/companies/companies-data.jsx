// material-ui
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'api/axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function CompaniesData() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get('/companies')
      .then((res) => setCompanies(res.data))
      .catch((err) => {
        console.error(err);
        Alert('Internal Server Error');
      });
  }, []);

  const columns = [
    { field: '#', headerName: '#', width: 100 },
    { field: 'id', headerName: 'ID', width: 100 },

    { field: 'company_name', headerName: 'Company Name', width: 200 },

    { field: 'company_email', headerName: 'Company Email', width: 200 },
    {
      field: 'company_address',
      headerName: 'Company Address',
      width: 200
    },
    { field: 'company_phoneno', headerName: 'Company Phoneno', width: 200 }
  ];

  const rows = companies?.map((company, index) => {
    return {
      '#': index,
      id: company._id,
      company_name: company.company_name,
      company_email: company.company_email,
      company_address: company.company_address,
      company_phoneno: company.company_phoneno
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
