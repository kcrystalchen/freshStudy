import React, { useState, useEffect } from 'react';
import {useSpring, useTrail, animated, interpolate} from 'react-spring';



export default ({ question, correctAns, wrongAnswers, attemptAnswer }) => {
  // randomize answers
  const allAnswers = wrongAnswers.concat(correctAns);
  const indices = Object.keys(allAnswers).sort(() => Math.random() - 0.5);

  // concat question + randomized answers for react-spring mapping
  const cardTextArr = [question, correctAns, ...wrongAnswers];

  // create a spring for each question + answers
  const [ trail, setTrail, stopTrail ] = useTrail(indices.length, () => ({ xy: [-200, 100], o: 0}));

  // declare 'animationEvent' trigger
  const [ animationEvent, setAnimationEvent ] = useState('enterLeft');

  // save answerStatus (true/false) to send to parent component when spring exit animation concludes
  // make this const outside of func?
  const [ answerStatus, setAnswerStatus ] = useState(false);


  // save state of gifCurtain for the next question transition
  const [ showGif, setShowGif ] = useState('none');

  // fade in/out 'gifCurtain' to reveal animation 
  const [ springProps, setSpringProps] = useSpring(() => ({opacity: 0}));

  // 'restSpringCounter' and 'onRestSpring' allow us to wait until the last spring-enabled animated element
  // has exited the game screen. Then we notify the parent component of user's answer status.
  let restSpringCounter;
  const onRestSpring = () => {
    if (--restSpringCounter === 0) {
      console.log(`in onRestSpring. isAnswerCorrect = ${answerStatus}`)
      return attemptAnswer(answerStatus); 
    }
  }




  // an onClick handler that evaluates user's answer, stores the true/false result, and sets the 
  // corresponding animationEvent string.
  const handleAttempt = answer => {
    //console.log(`In handleAttempt with answer: ${answer}. Correct is: ${correctAns}`);
    setAnswerStatus(answer === correctAns);
    if (answer !== correctAns) {
      setAnimationEvent('exitDown');
    } else {
      setAnimationEvent('exitUp');
    }
  }

  // only updates when 'animationEvent' state is set. Currently, 'handleAttempt' sets this based on user pass/fail answer.
  useEffect(() => {
    switch (animationEvent) {
      case 'enterLeft':
        setTrail({to: {xy: [20, 100], o: 1}});
        setSpringProps({from: {opacity: 0}, to: {opacity: 1}});
        break;
      case 'exitUp':
        restSpringCounter = cardTextArr.length - 1;
        setShowGif('correct');
        setTrail({to: {xy: [20, -200], o: 0}, onRest: onRestSpring});
        setSpringProps({from: {opacity: 1}, to: {opacity: 0}});
        break;
      case 'exitDown':
        restSpringCounter = cardTextArr.length - 1;
        setShowGif('incorrect');
        setTrail({to: {xy: [20, 400], o: 0}, onRest: onRestSpring});
        setSpringProps({from: {opacity: 1}, to: {opacity: 0}});
        break;
      default:
        console.log(`animationEvent '${animationEvent}' not recognized`);
    }}, [animationEvent]);
  

    useEffect(() => {
      switch (showGif) {
        case 'incorrect':
          document.getElementsByClassName('incorrect')[0].style.opacity = 1;
          document.getElementsByClassName('correct')[0].style.opacity = 0;
          break;
        case 'correct':
          document.getElementsByClassName('correct')[0].style.opacity = 1;
          document.getElementsByClassName('incorrect')[0].style.opacity = 0;
          break;
        case 'none':
          document.getElementsByClassName('correct')[0].style.opacity = 0;
          document.getElementsByClassName('incorrect')[0].style.opacity = 0;
          break;
        default:
          console.log(`useEffect received unknown showGif state of '${showGif}'`);
      }}, [showGif]);

  return (
    <div style={{   width: '500px',
                    height: '600px',
                    backgroundColor: '#0ff',
                    margin: 'auto',
                    overflow: 'hidden'
                }}>

    <div className="correct"></div>
    <div className="incorrect"></div>
    <animated.div className="gifCurtain" style={springProps}>hello</animated.div>


    {trail.map(({ xy, o }, i) => (
    <animated.div   key={cardTextArr[i]} 
                    onClick={(i > 0 ?  () => handleAttempt(cardTextArr[i]) : undefined)}
                    style={{ 
                            
                            cursor: (i > 0 ? 'pointer' : 'default'),
                            marginBottom: (i > 0 ? '10px' : '20px'),
                            fontSize: (i > 0 ? '18px' : '24px'),
                            transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
                            opacity: o.interpolate(o => o),
                            overflowWrap: 'break-word',
                            width: '90%'
                            }}>
    {(i > 0 ? `${i}. ` : '')}{cardTextArr[i]}                           
    </animated.div>))}
    </div>
  );

}
