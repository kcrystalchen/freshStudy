import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import NewGamePrompt from './NewGamePrompt';
import Particles from 'react-particles-js';

export default ({
  startNewGame,
  user,
  isLoggedIn,
  login,
  register,
  isPaused,
  resume,
}) => {
  const [viewToggle, setViewToggle] = useState(true);
  const handleToggle = () => setViewToggle(status => !status);
  return (
    <div className="landing_page">
      <Particles
        params={{
          "particles": {
            "number": {
              "value": 100,
              "density": {
                "enable": true
              }
            },
            "size": {
              "value": 10,
              "random": true
            },
            "move": {
              "direction": "bottom",
              "out_mode": "out"
            },
            "line_linked": {
              "enable": false
            }
          },
          interactivity: {
            "events": {
              "onclick": {
                "enable": true,
                "mode": "remove"
              }
            },
            "modes": {
              "remove": {
                "particles_nb": 10
              }
            }

          }
        }}
      />
      <div className="login_page">
          <NewGamePrompt
            startNewGame={startNewGame}
            isLoggedIn={isLoggedIn}
            resume={resume}
            isPaused={isPaused}
          />
        <div>
          {!isLoggedIn && (viewToggle
            ? <Login
                login={login}
                handleToggle={handleToggle}
              />
            : <Signup
                register={register}
                handleToggle={handleToggle}
              />
          )}
          {isLoggedIn && `Welcome ${user.username}!`}
        </div>
      </div>
    </div>
  )
};
