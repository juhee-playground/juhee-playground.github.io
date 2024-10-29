import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={import.meta.env.VITE_APP_BASE_URL}>
    <App />
  </BrowserRouter>,
);
