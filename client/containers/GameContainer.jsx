import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Card from '../components/Card';

const mapStateToProps = ({ game }) => ({
  isGameOver: game.isGameOver,
  cards: game.cards,
  activeCardIndex: game.activeCardIndex,
  numCorrectAnswers: game.numCorrectAnswers,
});

const mapDispatchToProps = dispatch => ({
  attemptAnswer: (correct) => dispatch(actions.attemptAnswer(correct)),
});

const GameContainer = ({ isGameOver, cards, activeCardIndex, numCorrectAnswers, attemptAnswer }) => (
  <div>
    {(isGameOver
      ? <p>Game over!</p>
      : <Card
          key={cards[activeCardIndex].id}
          question={cards[activeCardIndex].question}
          correctAns={cards[activeCardIndex].ans_correct}
          wrongAns1={cards[activeCardIndex].ans_one}
          wrongAns2={cards[activeCardIndex].ans_two}
          wrongAns3={cards[activeCardIndex].ans_three}
          attemptAnswer={attemptAnswer}
        />
    )}
    <p>You have answered {numCorrectAnswers} questions correctly.</p>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);