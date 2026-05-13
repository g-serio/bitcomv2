import '@/types'; // TBP: load type augmentation from capsule-driven types
import './index.css'; // emit CSS as a separate bundle file so the browser links it from <head> (fonts load on first paint)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// ... resto del file

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




