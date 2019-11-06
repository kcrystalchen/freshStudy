import * as types from '../constants/userActionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    userData: { },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      console.log('login_request');
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      console.log('login_success', action.payload);
      return {
        isLoggedIn: true,
        isLoading: false,
        isError: false,
        userData: action.payload,
      };
    case types.LOGIN_FAILURE:
      console.log('login_failure', action.payload);
      return {
        isLoggedIn: false,
        isLoading: false,
        isError: true,
        userData: { },
      };
    case types.SIGNUP_REQUEST:
      console.log('signup_request');
      return {
        ...state,
        isLoading: true,
      };
    case types.SIGNUP_SUCCESS:
      console.log('signup_success', action.payload);
      return {
        isLoggedIn: true,
        isLoading: false,
        isError: false,
        userData: action.payload,
      };
    case types.SIGNUP_FAILURE:
      console.log('signup_failure', action.payload);
      return {
        isLoggedIn: false,
        isLoading: false,
        isError: true,
        userData: { },
      };
    default:
      return state;
  }
};
