import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import GameContainer from './GameContainer';
import PlayAgainScreen from '../components/PlayAgainScreen';

const mapStateToProps = ({ game }) => ({
  isPlaying: game.isPlaying,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
});

const MainContainer = ({ isPlaying, startNewGame, cards }) => (
  <div className="container">
    {(isPlaying === true
      ? <GameContainer cards={cards}/>
      : <PlayAgainScreen startNewGame={startNewGame}/>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
