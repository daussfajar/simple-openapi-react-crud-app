import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Bootstrap Libs
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Popper.js

// SBAdmin2 Style
import './styles/scss/sb-admin-2.scss';

// Redux
import { Provider } from 'react-redux';
import { Store } from './redux/store'; // Import your Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={Store}> {/* Wrap App component with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();