import { observer } from 'mobx-react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ItemTypes } from 'utils/constants';
import { Chessboard } from 'services';

const StyledPiece = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: ${props => props.color === 'black' ? 's-resize' : 'n-resize'};
`;

const Piece = ({ piece, color, chessboardGame, x, y }) => {
  const [, drag, preview] = useDrag({
    item: { type: ItemTypes.PAWN },
    begin: () => chessboardGame.setPieceMoved([x, y], color)
  });

  const imgSrc = `/images/${color}/${piece}.png`;
  
  return (
    <StyledPiece ref={drag} color={color}>
      <DragPreviewImage connect={preview} src={imgSrc} />
      <img
        width="64px"
        height="64px"
        alt={`Piece ${piece}`}
        src={imgSrc}
      />
    </StyledPiece>
  );
};

Piece.propTypes = {
  piece: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  chessboardGame: PropTypes.instanceOf(Chessboard),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default observer(Piece);