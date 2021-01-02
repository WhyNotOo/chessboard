import React from 'react';
import { render } from '@testing-library/react';
import { Piece } from 'components';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Chessboard } from 'services';
import Square from './Square';

test('render the component Square', () => {
  render((
    <DndProvider backend={HTML5Backend}>
      <Square
        x={0}
        y={0}
        chessboardGame={new Chessboard()}
      >
        <Piece 
          piece='P'
          color='white'
          x={0}
          y={0}
          chessboardGame={new Chessboard()}
        />
      </Square>
    </DndProvider>
  ));
});
