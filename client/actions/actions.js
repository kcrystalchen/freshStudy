import * as types from '../constants/actionTypes';

export const startNewGame = () => dispatch => {
  fetch('/questions')
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: types.START_NEW_GAME,
        payload: data,
      });
    })
    .catch(console.error);
};
