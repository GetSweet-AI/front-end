import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
const tagManagerArgs = {
  gtmId: "GTM-W22KL25B", // replace with your GTM ID
};

import { ChakraProvider } from '@chakra-ui/react'

// import { Theme } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';

TagManager.initialize(tagManagerArgs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <Theme> */}
        <ChakraProvider>
          <App />
        </ChakraProvider>
        {/* </Theme> */}
      </Provider>
    </Router>
  </React.StrictMode>
);
