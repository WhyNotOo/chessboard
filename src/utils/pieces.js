import { lazy, Suspense } from 'react';

const Piece = lazy(() => import('components/_commons/Piece/Piece'));

const getMatchingPiece = (piece, chessboardGame, x, y) => {
  if (!piece) return piece;
  
  const color = piece === piece.toLowerCase() ? 'black' : 'white';
  
  return (
    <Suspense fallback={<span />}>
      <Piece
        color={color}
        piece={piece}
        chessboardGame={chessboardGame}
        x={x}
        y={y}
      />
    </Suspense>
  )
};

const Pieces = {
  getMatchingPiece
}

export default Pieces;