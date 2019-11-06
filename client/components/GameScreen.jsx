import React from 'react';
import Card from './Card';
import NewGamePrompt from './NewGamePrompt';

export default ({
  activeCardIndex,
  cards,
  isGameOver,
  numCorrectAnswers,
  attemptAnswer,
  startNewGame,
  user,
  isLoggedIn,
}) => {
  let wrongAnswers;
  if (!isGameOver) {
    wrongAnswers = [cards[activeCardIndex].ans_one];
    if (cards[activeCardIndex].ans_two) {
      wrongAnswers.push(cards[activeCardIndex].ans_two);
      if (cards[activeCardIndex].ans_three) wrongAnswers.push(cards[activeCardIndex].ans_three);
    }
  }
  return (
    <div>
      {isLoggedIn ? user.username : 'Guest'}
      {(isGameOver
        ? (<><p>Game over!</p><NewGamePrompt startNewGame={startNewGame} /></>)
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
