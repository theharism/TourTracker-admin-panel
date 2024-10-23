import { Box } from '@mui/material';
import './vehicles-data.css';
import axios from 'api/axios';
import MainCard from 'components/MainCard';
import { Fragment, useEffect, useState } from 'react';

export default function VehiclesData() {
  const [companies, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/companies-vehicles')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        alert('Internal Server Error');
      });
  }, []);

  return (
    <MainCard>
      <Box sx={{ width: '100%' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-heading">Company Name</th>
                <th className="table-heading">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <Fragment key={index}>
                  <tr className="hover-effect company-row with-top-border">
                    <td className="company-name">{company.company_name}</td>
                    <td>{company.company_vehicles[0]}</td>
                  </tr>
                  {company.company_vehicles.slice(1).map((vehicle, vehicleIndex) => {
                    const isLastVehicle = vehicleIndex === company.company_vehicles.length - 2;
                    return (
                      <tr key={vehicleIndex} className={`hover-effect vehicle-row ${isLastVehicle ? 'with-bottom-border' : ''}`}>
                        <td></td>
                        <td className="vehicle">{vehicle}</td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </MainCard>
  );
}
