import React from 'react';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Chessboard } from 'services';
import Piece from './Piece';

test('render the component Piece', () => {
  render((
    <DndProvider backend={HTML5Backend}>
      <Piece
        piece='P'
        color='white'
        x={0}
        y={0}
        chessboardGame={new Chessboard()}
      />
    </DndProvider>
  ));
});
