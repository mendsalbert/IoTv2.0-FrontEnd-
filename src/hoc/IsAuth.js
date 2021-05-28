import react from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const isAuth = (WrappedComponent, auth) => {
  console.log(authState);
  return (props) => <>{auth ? <WrappedComponent /> : <Navigate to="/" />}</>;
};

export default isAuth;
