// material-ui
import { Box, Button } from '@mui/material';
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
        alert('Internal Server Error');
      });
  }, []);

  const updateUserStatus = async (userId) => {
    try {
      const response = await axios.patch(`/users/${userId}/status`);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const result = await updateUserStatus(id); // Call the updateUserStatus function
      console.log(result.message); // Log the success message
      // Optionally, refresh the data or update the state to reflect the change
      const updatedCompanies = companies.map((company) =>
        company.userId._id == id ? { ...company, userId: { ...company.userId, status: !company.userId.status } } : company
      );
      setCompanies(updatedCompanies); // Update the state with the new companies array
    } catch (error) {
      alert('Failed to update user status'); // Display an error message
    }
  };

  const columns = [
    { field: '#', headerName: '#', width: 100 },
    { field: 'id', headerName: 'Company ID', width: 100 },
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'user_email', headerName: 'User Email', width: 200 },
    { field: 'company_name', headerName: 'Company Name', width: 150 },
    { field: 'company_email', headerName: 'Company Email', width: 200 },
    {
      field: 'company_address',
      headerName: 'Company Address',
      width: 300
    },
    { field: 'company_phoneno', headerName: 'Company Phoneno', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color={params.row.status ? 'success' : 'error'}
            onClick={() => handleStatusToggle(params.row.user_id)}
          >
            {params.row.status ? 'Deactivate' : 'Activate'}
          </Button>
        );
      }
    }
  ];

  const rows = companies?.map((company, index) => {
    return {
      '#': index + 1, // Adjust index to be 1-based
      id: company._id,
      user_id: company.userId._id,
      user_email: company.userId.email,
      company_name: company.company_name,
      company_email: company.company_email,
      company_address: company.company_address,
      company_phoneno: company.company_phoneno,
      status: company.userId.status
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
