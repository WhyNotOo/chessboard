# The Chessboard

## React coding challenge

The goal was to :

- Display a chessboard with a default FEN of: 8/2p5/8/8/8/8/8/8 w KQkq -  0 1
- Include a button that adds a white pawn to a random legal position on the board.
- Allow that pawn to make legal moves across the board.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It includes :
- Material UI for the buttons (and required depency for React DND, so might as well use it)
- Styled components for the CSS
- React DND for the drag&drop to allow pawn to move
- MobX to keep the board state
- PropTypes to add types to our components
- Notistack to display feedback snackbar

Visible at https://codesandbox.io/s/kevin-albessard-chessboard-rispd


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.