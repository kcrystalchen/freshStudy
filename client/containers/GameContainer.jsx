import React from 'react';

export default ({ cards }) => (
  <div>
    {cards.map(card => <p>{card.question}</p>)}
  </div>
);
