import * as types from '../constants/userActionTypes';
import user from '../services/user.service';

export const login = (username, password) => dispatch => {
  dispatch({
    type: types.LOGIN_REQUEST,
  });
  user.login(username, password)
    .then(userData => dispatch({
      type: types.LOGIN_SUCCESS,
      payload: userData,
    }))
    .catch(e => dispatch({
      type: types.LOGIN_FAILURE,
      payload: e,
    }));
};

export const register = (newUserData) => dispatch => {
  dispatch({
    type: types.SIGNUP_REQUEST,
  });
  user.register(newUserData)
    .then(userData => dispatch({
      type: types.SIGNUP_SUCCESS,
      payload: userData,
    }))
    .catch(e => dispatch({
      type: types.LOGIN_FAILURE,
      payload: e,
    }));
};

export const logout = (isLoggedIn) => dispatch => {
  if(isLoggedIn) {
    dispatch({
      type: types.LOGOUT
    })
  }
}