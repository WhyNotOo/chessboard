import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { Chessboard } from "components";
import { EMPTY_BOARD } from 'services/chessboard';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Chessboard customBoard={EMPTY_BOARD} />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();