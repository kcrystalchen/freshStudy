import * as types from '../constants/userActionTypes';
import user from '../services/user.service';

export const login = (username, password) => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST,
  });
  user.login(username, password)
    .then(userData => {
      if (userData === false) return dispatch({ type: types.FETCH_FAILURE });
      dispatch({
        type: types.FETCH_SUCCESS,
        payload: userData,
      });
    })
    .catch(console.error);
};

export const register = (newUserData) => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST,
  });
  user.register(newUserData)
    .then(userData => {
      if (userData === false) return dispatch({ type: types.FETCH_FAILURE });
      dispatch({
        type: types.FETCH_SUCCESS,
        payload: userData,
      });
    })
    .catch(console.error);
};

export const verify = () => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST,
  });
  user.verify()
    .then(userData => {
      if (userData === false) return dispatch({ type: types.FETCH_FAILURE });
      dispatch({
        type: types.FETCH_SUCCESS,
        payload: userData,
      });
    })
    .catch(console.error);
};
