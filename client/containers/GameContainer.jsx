import React from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';

const mapStateToProps = ({ game }) => ({
  cards: game.cards,
  activeCardIndex: game.activeCardIndex,
  numCorrectAnswers: game.numCorrectAnswers,
});

const GameContainer = ({ cards, activeCardIndex, numCorrectAnswers }) => (
  <div>Current question:
    <Card
        key={cards[activeCardIndex].id}
        question={cards[activeCardIndex].question}
        correctAns={cards[activeCardIndex].ans_correct}
        wrongAns1={cards[activeCardIndex].ans_one}
        wrongAns2={cards[activeCardIndex].ans_two}
        wrongAns3={cards[activeCardIndex].ans_three}
    />
  </div>
);

export default connect(mapStateToProps)(GameContainer);