import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import {Chessboard as ChessboardService} from 'services';
import Pieces from 'utils/pieces';
import { observer } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Square } from 'components';
import Button from '@material-ui/core/Button';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem auto;

  button:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const StyledTitle = styled.h1`
  margin: 0 2rem 0 0;
  font-size: 3rem;
  line-height: 3rem;
  color: var(--primary-color);
  text-align: center;
  font-family: 'QueensGambit';
`;

const StyledChessContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  margin: 2rem auto;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    z-index: -1;
    background: linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
      linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
      linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
      linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
      linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
      linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
    background-color: #131313;
    background-size: 20px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
`;

const Chessboard = ({ customBoard }) => {
  const { enqueueSnackbar } = useSnackbar();
  const chessboardGame = useMemo(() => new ChessboardService(customBoard), [customBoard]);

  useEffect(() => {
    chessboardGame.addPawn('b', 2)
      .catch(err => enqueueSnackbar(err, {variant: 'error'}));
  }, [chessboardGame, enqueueSnackbar]);

  const handleAddPawn = useCallback((e) => {
    const { color } = e.currentTarget.dataset;
    chessboardGame.addPawn(color)
      .then(() => enqueueSnackbar('The pawn was successfully added !', {variant: 'success'}))
      .catch(err => enqueueSnackbar(err, {variant: 'error'}));
  }, [chessboardGame, enqueueSnackbar]);

  return (
    <>
      <StyledHeader>
        <StyledTitle>The chessboard</StyledTitle>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPawn}
          startIcon="+"
          data-color="w"
        >
          Add white pawn
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPawn}
          startIcon="+"
          data-color="b"
        >
          Add black pawn
        </Button>
      </StyledHeader>

      <main>
        <DndProvider backend={HTML5Backend}>
          <StyledChessContainer>
            {chessboardGame.board.map((row, indexRow) => {
              return row.map((col, indexCol) => (
                <Square
                  key={`col${indexCol}`}
                  x={indexRow}
                  y={indexCol}
                  chessboardGame={chessboardGame}
                >
                  {Pieces.getMatchingPiece(col, chessboardGame, indexRow, indexCol)}
                </Square>
              ))
            })}
          </StyledChessContainer>
        </DndProvider>
      </main>
    </>
  );
}

export default observer(Chessboard);