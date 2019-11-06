import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GameContainer from './GameContainer';
import LandingPage from '../components/LandingPage';

const mapStateToProps = ({ game }) => ({
  isPlaying: game.isPlaying,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
});

const MainContainer = ({ isPlaying, startNewGame }) => (
  <div className="container">
    {(isPlaying === true
      ? <GameContainer />
      : <LandingPage startNewGame={startNewGame}/>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
