import * as types from '../constants/actionTypes';

export const startNewGame = () => dispatch => {
  fetch('/questions')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch({
        type: types.START_NEW_GAME,
        payload: data,
      });
    })
    .catch(console.error);
};
// mock data

// export const startNewGame = () => dispatch => {
//   dispatch({
//     type: types.START_NEW_GAME,
//     payload: [
//       {
//         question: 'What is the airspeed velocity of an unladen swallow?',
//         ans_correct: 'African or European?',
//         ans_one: '17km/h',
//         ans_two: '38km/h',
//         ans_three: 'Yes',
//       },
//     ],
//   });
// };
