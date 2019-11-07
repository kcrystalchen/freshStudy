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
      <Particles
        className="gameScreen"

        params={{
          "particles": {
            "number": {
              "value": 100,
              "density": {
                "enable": true,
                "value_area": 1500
              }
            },
            "line_linked": {
              "enable": true,
              "opacity": 0.3
            },
            "move": {
              "direction": "right",
              "speed": 0.5
            },
            "size": {
              "value": 1.8
            },
            "opacity": {
              "anim": {
                "enable": true,
                "speed": 5,
                "opacity_min": 0.6
              }
            }
          },
          "interactivity": {
            "events": {
              "onclick": {
                "enable": true,
                "mode": "push"
              }
            },
            "modes": {
              "push": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }} />
      <div className="isGameOver">
        {isLoggedIn ? user.username : 'Guest'}
        {(isGameOver
          ? (<>
            <p>Game over!</p>
            <NewGamePrompt startNewGame={startNewGame} isLoggedIn={isLoggedIn} />
          </>)
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
    </div>
  );
};
