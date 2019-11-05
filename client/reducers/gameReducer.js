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
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
