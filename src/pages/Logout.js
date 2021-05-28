import React from 'react';
import { useDispatch } from 'react-redux';
import * as authAction from '../store/actions/authAction';

const Logout = (props) => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(authAction.logOut());
    location.replace('/login');
    // window.location.reload();
  };

  return (
    <React.Fragment>
      <button hidden onClick={onLogoutHandler()}>
        Logout
      </button>
      {/* <h1>Log out</h1> */}
    </React.Fragment>
  );
};

export default Logout;
