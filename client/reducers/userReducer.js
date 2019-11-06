import * as types from '../constants/userActionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    user: { },
  },
};

export default (state = initialState, action) => {

  switch (action.type) {
    default:
      return state;
  }
};
