import io from 'socket.io-client';
import messageTypes from '../constants/messageTypes';

let socket;

const init = (store) => {
  socket = io();
  Object.keys(messageTypes).forEach(key => {
    socket.on(key, ({ type, payload }) => store.dispatch({ type, payload }));
  });
};

const emit = (type, payload) => socket && socket.emit(type, payload);

const emitAction = action => {
  return (...args) => {
    const result = action.apply(this, args);
    if (socket) socket.broadcast.emit(result.key, { ...result.payload, type: result.type });
    return result;
  };
};

export { init, emit, emitAction };
