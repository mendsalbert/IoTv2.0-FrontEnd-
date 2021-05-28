import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Project from 'src/pages/Project';
import Logout from 'src/pages/Logout';
import { useSelector } from 'react-redux';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> }
      // { path: 'settings', element: <Settings /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: 'project', element: <Project /> },
      // { path: '/', element: <Navigate to="/app/dashboard" /> },
      //Todo-> A logic to display login if user hasn't logged in
      { path: '/', element: <Login /> },
      { path: 'logout', element: <Logout /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
