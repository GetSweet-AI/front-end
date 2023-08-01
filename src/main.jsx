import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactGA from "react-ga4";
import TagManager from 'react-gtm-module';
const tagManagerArgs = {
    gtmId: 'GTM-W22KL25B' // replace with your GTM ID
}

TagManager.initialize(tagManagerArgs);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);