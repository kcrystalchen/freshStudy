import * as types from '../constants/gameActionTypes';

export const startNewGame = () => dispatch => {
  fetch('/questions')
    .then(res => res.json())
    .then(data => dispatch({
      type: types.START_NEW_GAME,
      payload: data,
    }))
    .catch(console.error);
};

export const attemptAnswer = isCorrect => ({
  type: types.ATTEMPT_ANSWER,
  payload: isCorrect,
});

// export const attemptLogin = ({ username, password }) => dispatch => {

// };
