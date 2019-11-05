import * as types from '../constants/actionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    username: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
