import * as types from '../constants/actionTypes';

const initialState = {
  user: {
    isLoggedIn: false,
    username: '',
  },
  game: {
    isActive: false,
    numCorrectAnswers: 0,
    numRemainingQuestions: 0,
    numSkippedQuestions: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
