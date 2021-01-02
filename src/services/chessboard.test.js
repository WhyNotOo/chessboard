import Chessboard, {DEFAULT_BOARD, EMPTY_BOARD} from "./chessboard";

let chessboard;

beforeEach(() => {
  chessboard = new Chessboard();
});

it('has a default board', () => {
  expect(chessboard.board).toBeDefined();
  expect(chessboard.board).toEqual(DEFAULT_BOARD);
});

it('can be created with a empty board', () => {
  const emptyChessboard = new Chessboard(EMPTY_BOARD);
  expect(emptyChessboard.board).toBeDefined();
  expect(emptyChessboard.board).toEqual(EMPTY_BOARD);
});

it('has a flag for next move', () => {
  expect(chessboard.nextMove).toBeDefined();
});

it('has a flag for castle possibility', () => {
  expect(chessboard.canCastle).toBeDefined();
});

it('has a tracker for the number of moves played', () => {
  expect(chessboard.fullmove).toBeDefined();
});

it('throws an error when playing with no endingPosition', () => {
  const throws = () => chessboard.play();

  expect(throws).toThrowError('You must provide the ending position of the play');
});

it('throws an error when trying to set the moving piece without a position', () => {
  const throws = () => chessboard.setPieceMoved();

  expect(throws).toThrowError('You must provide the position of the moving piece');
});

it('throws an error when trying to set the moving piece without a color', () => {
  const throws = () => chessboard.setPieceMoved([1, 1]);

  expect(throws).toThrowError('You must provide the color of the moving piece');
});

it('can set the moving piece', () => {
  chessboard.setPieceMoved([1, 1], 'black');

  expect(chessboard.pieceMoved.position).toEqual([1, 1]);
  expect(chessboard.pieceMoved.color).toEqual('black');
});

it('changes the next move color when playing', () => {
  chessboard.setPieceMoved([6, 1], 'white');
  chessboard.play([4, 1]);

  expect(chessboard.nextMove).toEqual('b');
});

it('increment the number of fullmove when playing', () => {
  chessboard.setPieceMoved([6, 1], 'white');
  chessboard.play([4, 1]);

  expect(chessboard.fullmove).toEqual(2);
});

it('move the piece when playing', () => {
  chessboard.setPieceMoved([1, 0], 'black');
  chessboard.play([3, 0]);

  expect(chessboard.board).toEqual([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['p', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ])
});

it('throws an error when trying to get the square color with no row', () => {
  const throws = () => chessboard.getSquareBackgroundColor();

  expect(throws).toThrowError('You must provide the row of the square to get his color');
});

it('throws an error when trying to get the square color with no column', () => {
  const throws = () => chessboard.getSquareBackgroundColor(0);

  expect(throws).toThrowError('You must provide the column of the square to get his color');
});

it('render a white square for the first square', () => {
  const squareBackgroundColor = chessboard.getSquareBackgroundColor(0, 0);

  expect(squareBackgroundColor).toEqual('white');
});

it('throws an error when adding a pawn with no color', () => {
  const throws = () => chessboard.addPawn();

  expect(throws).toThrowError('You must provide the color of the added pawn');
});

it('add a random white pawn to the board', () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('w');

  expect(customChessboard.board).toEqual(expect.arrayContaining([
    expect.arrayContaining(['P'])
  ]));
});

it('add a random black pawn to the board', () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('b');

  expect(customChessboard.board).toEqual(expect.arrayContaining([
    expect.arrayContaining(['p'])
  ]));
});

it("can't move a white pawn to a forbidden location", () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('w', 0);
  customChessboard.setPieceMoved([6, 0], 'white');
  
  expect(customChessboard.canMovePawn([3, 0])).toBe(false);
});

it("can move a white pawn to a valid location", () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('w', 0);
  customChessboard.setPieceMoved([6, 0], 'white');
  
  expect(customChessboard.canMovePawn([4, 0])).toBe(true);
});

it("can't move a black pawn to a forbidden location", () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('b', 0);
  customChessboard.setPieceMoved([1, 0], 'black');
  
  expect(customChessboard.canMovePawn([4, 0])).toBe(false);
});

it("can move a black pawn to a valid location", () => {
  const customChessboard = new Chessboard(EMPTY_BOARD);
  customChessboard.addPawn('b', 0);
  customChessboard.setPieceMoved([1, 0], 'black');
  
  expect(customChessboard.canMovePawn([3, 0])).toBe(true);
});