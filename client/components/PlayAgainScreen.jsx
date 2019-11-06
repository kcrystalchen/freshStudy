import React from 'react';

export default ({ startNewGame, isPlaying }) => (
  <div>
    <button type="button" onClick={startNewGame}>Start new game?</button>
  </div>
);
