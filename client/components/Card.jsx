import React from 'react';

export default ({ question, correctAns, wrongAnswers, handleAttempt }) => {
  const allAnswers = wrongAnswers.concat(correctAns);
  const indices = Object.keys(allAnswers).sort(() => Math.random() - 0.5);
  const randomizedAnswers = indices.map(i => (
    <p key={allAnswers[i]} onClick={() => handleAttempt(allAnswers[i])}>{allAnswers[i]}</p>
  ));
  return (
    <div id="card" className="card">
      <p id="question">{question}</p>
      {randomizedAnswers}
    </div>
  );
};
