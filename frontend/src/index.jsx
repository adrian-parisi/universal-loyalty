import './index.css';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";
import { getProvider } from './utils/provider';
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getProvider}>
        <Provider store={store}>
          <App />
        </Provider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
