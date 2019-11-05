import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = ({
  game: { isActive, activeQuestionIndex, numCorrectAnswers, cards },
}) => ({
  isActive,
  activeQuestionIndex,
  numCorrectAnswers,
  cards,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
});

const MainContainer = props => (
  <div className="container">
    <p>Fresh Study</p>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
