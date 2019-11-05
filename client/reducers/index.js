import { combineReducers } from 'redux';
import game from './gameReducer';
import user from './userReducer';

export default combineReducers({
  game,
});
