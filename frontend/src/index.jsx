import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { App } from './App';
import './index.css';
import { getProvider } from './utils/provider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getProvider}>
        <App />
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
