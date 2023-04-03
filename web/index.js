import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/app'

const rootElement = document.getElementById('app')
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
