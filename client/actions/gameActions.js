import * as types from '../constants/gameActionTypes';
import messageTypes from '../constants/messageTypes';
import emitAction from '../services/socket.service';

export const startNewGame = () => dispatch => {
  fetch('/questions')
    .then(res => res.json())
    .then(data => dispatch({
      type: types.START_NEW_GAME,
      payload: data,
    }))
    .catch(console.error);
};

export const pauseGame = () => ({
  type: types.PAUSE_GAME,
});

export const resumeGame = () => ({
  type: types.RESUME_GAME,
});

export const attemptAnswer = emitAction(isCorrect => ({
  key: messageTypes.ANSWER,
  type: types.ATTEMPT_ANSWER,
  payload: isCorrect,
}));
