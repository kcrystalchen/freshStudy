import React from 'react';

export default ({ startNewGame, isLoggedIn, isPaused, resume }) => {
  const handleClick = () => {
    if (isPaused) resume();
    else startNewGame();
  };
  
  return (
    <button type="button" onClick={handleClick}>
      {isLoggedIn
        ? 'Start new game?'
        : 'Play as guest?'
      }
    </button>
  );
};
