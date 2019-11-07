import React from 'react';
import Card from './Card';
import NewGamePrompt from './NewGamePrompt';
import Particles from 'react-particles-js';


export default ({
  activeCardIndex,
  cards,
  isGameOver,
  numCorrectAnswers,
  attemptAnswer,
  startNewGame,
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
      {(isGameOver
        ? (<>
            <p>Game over!</p>
            <NewGamePrompt startNewGame={startNewGame} isLoggedIn={isLoggedIn}/>
          </>)
        : <Card
            key={cards[activeCardIndex].id}
            question={cards[activeCardIndex].question}
            correctAns={cards[activeCardIndex].ans_correct}
            wrongAnswers={wrongAnswers}
            attemptAnswer={attemptAnswer}
          />
        )}
      <p>You have answered {numCorrectAnswers} {numCorrectAnswers === 1 ? 'question' : 'questions'} correctly.</p>
    </div>
  );
};
