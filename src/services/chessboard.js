import { makeAutoObservable } from "mobx";

const DEFAULT_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const EMPTY_BOARD = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Chessboard {
  constructor(board) {
    this.board = board || DEFAULT_BOARD;
    this.nextMove = 'w';
    this.canCastle = 'KQkq';
    this.fullmove = 1;

    this.pieceMoved = null;

    makeAutoObservable(this);
  }

  _movePiece(endPosition) {
    const [startX, startY] = this.pieceMoved.position;
    const [endX, endY] = endPosition;
    const pieceMoved = this.board[startX][startY];
    this.board[startX][startY] = '';
    this.board[endX][endY] = pieceMoved;
  }

  setPieceMoved(position, color) {
    if (!position) throw new Error('You must provide the position of the moving piece');
    if (!color) throw new Error('You must provide the color of the moving piece');

    this.pieceMoved = {
      position,
      color
    };
  }

  play(endPosition) {
    if (!endPosition) throw new Error('You must provide the ending position of the play');

    this._movePiece(endPosition);

    this.nextMove = this.nextMove === 'w' ? 'b' : 'w';
    this.fullmove += 1;
  }

  addPawn(color, col) {
    if (!color) throw new Error('You must provide the color of the added pawn');

    const randomColumn = col !== undefined ? col : getRandomInt(0, 7);

    const colorSetting = {
      start: color === 'w' ? 6 : 1,
      piece: color === 'w' ? 'P' : 'p'
    }

    const startPosition = [colorSetting.start, randomColumn];

    return new Promise((resolve, reject) => {
      if (!this.board[startPosition[0]][startPosition[1]]) {
        this.board[startPosition[0]][startPosition[1]] = colorSetting.piece;
        resolve();
      } else {
        reject('A pawn already exist on this square');
      }
    })
  }

  canMovePawn(end) {
    const [startX, startY] = this.pieceMoved.position;
    const [endX, endY] = end;
    
    if (endY !== startY) return false;
    
    if (this.pieceMoved.color === 'black') {
      if (endX < startX) return false;
      const numberOfMovementAllowed = this.pieceMoved.position[0] === 1 ? 2 : 1;

      return ((endX > startX) && (Math.abs(startX - endX)) <= numberOfMovementAllowed);
    } else {
      if (endX > startX) return false;
      const numberOfMovementAllowed = this.pieceMoved.position[0] === 6 ? 2 : 1;

      return ((endX < startX) && (Math.abs(startX - endX)) <= numberOfMovementAllowed);
    }
  }

  getSquareBackgroundColor(row, col) {
    if (row === undefined) throw new Error('You must provide the row of the square to get his color');
    if (col === undefined) throw new Error('You must provide the column of the square to get his color');

    const isOdd = (i) => i % 2 === 0;

    if (isOdd(row)) {
      return isOdd(col) ? 'white' : 'black';
    }

    return isOdd(col) ? 'black' : 'white';
  }
}

export default Chessboard;

export {
  DEFAULT_BOARD,
  EMPTY_BOARD
}