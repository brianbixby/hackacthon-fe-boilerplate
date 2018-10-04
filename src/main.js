import './style/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import appCreateStore from './lib/app-create-store.js';

let store = appCreateStore();

let AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDom.render(<AppContainer />, document.getElementById('root'));