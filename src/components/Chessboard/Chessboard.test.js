import React from 'react';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import Chessboard from './Chessboard';

test('render the component Chessboard', () => {
  render(
    <SnackbarProvider>
      <Chessboard />
    </SnackbarProvider>
  );
});
