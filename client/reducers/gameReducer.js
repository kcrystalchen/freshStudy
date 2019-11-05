import * as types from '../constants/actionTypes';

const initialState = {
  isGameOver: false,
  isPlaying: false,
  activeCardIndex: 0,
  numCorrectAnswers: 0,
  cards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_NEW_GAME:
      return {
        isPlaying: true,
        activeCardIndex: 0,
        numCorrectAnswers: 0,
        cards: action.payload,
      };
    case types.ATTEMPT_ANSWER:
      const newState = { ...state };
      newState.activeCardIndex += 1;
      if (newState.activeCardIndex >= newState.cards.length) newState.isGameOver = true;
      if (action.payload === true) newState.numCorrectAnswers += 1;
      return newState;
    default:
      return state;
  }
};
