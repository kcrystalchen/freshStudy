import React from 'react';

export default ({ question, correctAns, wrongAns1, wrongAns2, wrongAns3, attemptAnswer }) => (
  <div className="card">
    <p>{question}</p>
    <p onClick={() => attemptAnswer(true)}>{correctAns}</p>
    <p onClick={() => attemptAnswer(false)}>{wrongAns1}</p>
    <p onClick={() => attemptAnswer(false)}>{wrongAns2}</p>
    <p onClick={() => attemptAnswer(false)}>{wrongAns3}</p>
  </div>
);
