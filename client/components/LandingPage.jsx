import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import NewGamePrompt from './NewGamePrompt';

export default ({
  startNewGame,
  user,
  isLoggedIn,
  isLoading,
  isError,
  login,
  register,
}) => {
  const [viewToggle, setViewToggle] = useState(true);
  const handleToggle = () => setViewToggle(status => !status);
  return (
    <div>
      <NewGamePrompt startNewGame={startNewGame} />
      {(viewToggle
        ? <Login
            login={login}
            handleToggle={handleToggle}
          />
        : <Signup
            register={register}
            handleToggle={handleToggle}
          />
      )}
      {isLoading && 'isLoading'}
      {isError && 'isError'}
    </div>
  )
};
