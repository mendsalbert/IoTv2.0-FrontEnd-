import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const LOG_OUT = 'LOG_OUT';
export const REFRESH = 'REFRESH';

export const refresh = () => {
  return async (dispatch) => {
    try {
      var isLoggedIn = localStorage.getItem('UserToken');
      if (isLoggedIn) {
        dispatch({ type: REFRESH, isAuth: true });
      } else {
        dispatch({ type: REFRESH, isAuth: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem('UserToken');
      localStorage.removeItem('topic');
      localStorage.removeItem('projectId');
      localStorage.removeItem('project_id');
      dispatch({ type: LOG_OUT });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signUp = (username, email, password) => (dispatch) =>
  new Promise(function (resolve, reject) {
    axios
      .post('http://localhost:5000/api/iot/v2.0/user/sign-up', {
        name: username,
        email: email,
        password: password
      })
      .then((success) => {
        localStorage.setItem('UserToken', success.data.token);
        dispatch({
          type: SIGN_UP,
          userToken: success.data.token,
          userId: success.data._id
        });
        resolve(success);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const signIn = (email, password) => (dispatch) =>
  new Promise(function (resolve, reject) {
    axios
      .post('http://localhost:5000/api/iot/v2.0/user/sign-in', {
        email: email,
        password: password
      })
      .then((success) => {
        // console.log(success.data);
        if (!success.data.msg) {
          localStorage.setItem('UserToken', success.data.token);
          dispatch({
            type: SIGN_IN,
            userToken: success.data.token
            // userId: success.data.user_id
          });
        }
        resolve(success);
        // console.log(success.data.msg);
      })
      .catch((e) => {
        reject(e);
      });
  });
