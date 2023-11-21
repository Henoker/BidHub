import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';
import { Provider } from 'react-redux';
import { store } from './app/store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App className='bg-gray-900' />
    </Provider>    
  </React.StrictMode>
);


