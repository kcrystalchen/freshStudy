import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/gameActions';
import GameScreen from '../components/GameScreen';

const mapStateToProps = ({ game }) => ({
  activeCardIndex: game.activeCardIndex,
  cards: game.cards,
  isGameOver: game.isGameOver,
  numCorrectAnswers: game.numCorrectAnswers,
});

const mapDispatchToProps = dispatch => ({
  attemptAnswer: (correct) => dispatch(actions.attemptAnswer(correct)),
});

const GameContainer = (props) => (
  <GameScreen { ...props }/>
);

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);