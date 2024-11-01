import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const publicUrl = import.meta.env.VITE_APP_PUBLIC_URL;
root.render(
  <BrowserRouter basename={publicUrl}>
    <App />
  </BrowserRouter>,
);
