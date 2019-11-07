import * as types from '../constants/userActionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    isLoading: false,
    userData: { },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REQUEST:
      console.log('login_request');
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_SUCCESS:
      console.log('login_success', action.payload);
      return {
        isLoggedIn: true,
        isLoading: false,
        userData: action.payload,
      };
    case types.FETCH_FAILURE:
      console.log('login_failure', action.payload);
      return {
        isLoggedIn: false,
        isLoading: false,
        userData: { },
      };
    case types.LOGOUT: 
      console.log('logout')
      return {
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        userData: { },
      }
    default:
      return state;
  }
};
