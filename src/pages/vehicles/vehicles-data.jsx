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
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: '50%' }}>Company Name</th>
                <th style={{ textAlign: 'left', width: '50%' }}>Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <Fragment key={index}>
                  <tr className={`company-row hover-effect ${company.company_vehicles.length > 1 ? 'highlight-company' : ''}`}>
                    <td className="company-name">
                      {company.company_name ? company.company_name : <span className="no-company">[No Company Name]</span>}
                    </td>
                    <td className="vehicle">{company.company_vehicles[0]}</td>
                  </tr>
                  {company.company_vehicles.slice(1).map((vehicle, vehicleIndex) => (
                    <tr
                      key={vehicleIndex}
                      className={`vehicle-row hover-effect ${company.company_vehicles.length > 1 ? 'highlight-company' : ''}`}
                    >
                      <td className="vehicle-indent"></td>
                      <td className="vehicle">{vehicle}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </MainCard>
  );
}
