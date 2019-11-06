import React from 'react';
import {useSprings, useTrail, animated, interpolate} from 'react-spring';

// react-spring helper funcs
const to = i => ({ x: 200, o: 1});
const from = i => ({ x: 0, o: 0});


export default ({ question, correctAns, wrongAnswers, attemptAnswer }) => {
  // randomize answers
  const allAnswers = wrongAnswers.concat(correctAns);
  const indices = Object.keys(allAnswers).sort(() => Math.random() - 0.5);
  console.log("TCL: indices", indices)

  // concat question + randomized answers for react-spring mapping
  const cardTextArr = [question, correctAns, ...wrongAnswers];
  // react-spring hook for generating a spring for the question and each answer
  const [ springsProps, setSpringsProps, stopSpringsProps ] = useSprings(indices.length, i => ({ ...to(i), from: from(i) }));

  // check for correct answer and notify parent component of result.
  const handleAttempt = answer => {
    if (answer !== correctAns) return attemptAnswer(false);
    return attemptAnswer(true);
  }

/*
  const randomizedAnswers = indices.map(i => (
    <p key={allAnswers[i]} onClick={() => handleAttempt(allAnswers[i])}>{allAnswers[i]}</p>
  ));
*/


  return springsProps.map(({ x, o }, i) => (
    <animated.div   key={cardTextArr[i]} 
                    onClick={(i > 0 ? () => handleAttempt(cardTextArr[i]) : undefined)}
                    style={{ 
                            fontSize: (i === 0 ? '32px' : '24px'),
                            transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`),
                            opacity: o.interpolate(o => o)
                            }}>
    {cardTextArr[i]}                           
    </animated.div>
  ));

}
