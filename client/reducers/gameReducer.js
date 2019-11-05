import * as types from '../constants/actionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    username: '',
  },
  game: {
    isActive: false,
    activeQuestionIndex: 0,
    numCorrectAnswers: 0,
    cards: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_NEW_GAME:
      return {
        ...state,
        game: {
          isActive: true,
          activeQuestionIndex: 0,
          numCorrectAnswers: 0,
          cards: payload,
        },
      };
    default:
      return state;
  }
};
