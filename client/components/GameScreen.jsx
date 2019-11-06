import React from 'react';
import Card from './Card';

export default ({ activeCardIndex, cards, isGameOver, numCorrectAnswers, attemptAnswer }) => (
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
