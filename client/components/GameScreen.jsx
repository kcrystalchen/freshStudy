import React from 'react';
import Card from './Card';

export default ({ activeCardIndex, cards, isGameOver, numCorrectAnswers, attemptAnswer }) => {
  const wrongAnswers = [cards[activeCardIndex].ans_one];
  if (cards[activeCardIndex].ans_two) {
    wrongAnswers.push(cards[activeCardIndex].ans_two);
    if (cards[activeCardIndex].ans_three) wrongAnswers.push(cards[activeCardIndex].ans_three);
  };
  return (
    <div>
      {(isGameOver
        ? <p>Game over!</p>
        : <Card
            key={cards[activeCardIndex].id}
            question={cards[activeCardIndex].question}
            correctAns={cards[activeCardIndex].ans_correct}
            wrongAnswers={wrongAnswers}
            attemptAnswer={attemptAnswer}
          />
      )}
      <p>You have answered {numCorrectAnswers} questions correctly.</p>
    </div>
  );
};
