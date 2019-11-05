import * as types from '../constants/actionTypes';

const initialState = {
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
    default:
      return state;
  }
};
