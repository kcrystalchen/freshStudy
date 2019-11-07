import React from 'react';

export default ({ startNewGame, isLoggedIn }) => (
  <button type="button" onClick={startNewGame}>
    {isLoggedIn
      ? 'Start new game?'
      : 'Play as guest?'
    }
  </button>
);
