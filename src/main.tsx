import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={(import.meta as ImportMeta & { env: { BASE_URL?: string } }).env.BASE_URL || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
