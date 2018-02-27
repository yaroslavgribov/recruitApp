import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import Application from './containers/Application';

import dotenv from 'dotenv';
dotenv.config();

import './resources';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>
, document.getElementById('root'));
