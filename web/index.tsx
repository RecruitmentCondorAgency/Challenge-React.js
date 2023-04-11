import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './app';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
