import { REFRESH, SIGN_UP, LOG_OUT, SIGN_IN } from '../actions/authAction';
const initialState = {
  token: '',
  isAuth: false
  // userId: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.userToken,
        isAuth: true,
        userId: action.userId
      };
    case SIGN_IN:
      return {
        ...state,
        token: action.userToken,
        isAuth: true
        // userId: action.userId
      };
    case REFRESH:
      return {
        ...state,
        isAuth: action.isAuth,
        userId: action.userId
      };
    case LOG_OUT:
      return {
        ...state,
        token: '',
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
