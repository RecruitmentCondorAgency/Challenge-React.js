import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles.css';
import App from './app';
import store from './store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
