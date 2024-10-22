import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import UsersData from 'pages/users/users-data';
import UsersAnalytics from 'pages/users/users-analytics';
import CompaniesData from 'pages/companies/companies-data';
import CompaniesAnalytics from 'pages/companies/companies-analytics';
import DriversAnalytics from 'pages/drivers/drivers-analytics';
import VehiclesAnalytics from 'pages/vehicles/vehicles-analytics';
import TourBookingsData from 'pages/tourBookings/tourBookings-data';
import OfficePostToursData from 'pages/officePostTours/officePostTours-data';
import DriverPostToursData from 'pages/driverPostTours/driverPostTours-data';
import ToursAnalytics from 'pages/tours/tours-analytics';
import VehiclesData from 'pages/vehicles/vehicles-data';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/users/users-data')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users-data',
      element: <UsersData />
    },
    {
      path: 'users-analytics',
      element: <UsersAnalytics />
    },
    // {
    //   path: 'drivers-data',
    //   element: <SamplePage />
    // },
    {
      path: 'drivers-analytics',
      element: <DriversAnalytics />
    },
    {
      path: 'vehicles-data',
      element: <VehiclesData />
    },
    {
      path: 'vehicles-analytics',
      element: <VehiclesAnalytics />
    },
    {
      path: 'companies-data',
      element: <CompaniesData />
    },
    {
      path: 'companies-analytics',
      element: <CompaniesAnalytics />
    },
    {
      path: 'tour-bookings',
      element: <TourBookingsData />
    },
    {
      path: 'office-post-tours',
      element: <OfficePostToursData />
    },
    {
      path: 'driver-post-tours',
      element: <DriverPostToursData />
    },
    {
      path: 'tours-analytics',
      element: <ToursAnalytics />
    }
  ]
};

export default MainRoutes;
