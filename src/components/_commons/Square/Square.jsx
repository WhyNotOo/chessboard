import { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from 'utils/constants';
import { observer } from 'mobx-react';
import { Chessboard } from 'services';

const StyledSquare = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  color: #ffffff;
  background-color: ${props => props.backgroundColor};
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${props => props.color};
`;

const Square = ({ children, x, y, chessboardGame }) => {
  const getSquareBackgroundColor = useCallback((row, col) =>
    chessboardGame.getSquareBackgroundColor(row, col),
    [chessboardGame]
  );

  const bgColor = getSquareBackgroundColor(x, y) === 'black' ? 'var(--square-black)' : 'var(--square-white)';

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PAWN,
    drop: () => chessboardGame.play([x, y]),
    canDrop: () => chessboardGame.canMovePawn([x, y]),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  return (
    <StyledSquare
      backgroundColor={bgColor}
      ref={drop}
      canDrop={canDrop}
      isOver={isOver}
    >
      {children}

      {isOver && !canDrop && <StyledOverlay color="var(--error-color)" />}
      {!isOver && canDrop && <StyledOverlay color="var(--warning-color)" />}
      {isOver && canDrop && <StyledOverlay color="var(--success-color)" />}
    </StyledSquare>
  );
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  chessboardGame: PropTypes.instanceOf(Chessboard)
};

export default observer(Square);