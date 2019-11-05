import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';
import './assets/styles/styles.scss';

render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  document.getElementById('root')
);
