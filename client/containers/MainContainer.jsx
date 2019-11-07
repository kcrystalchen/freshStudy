import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GameContainer from './GameContainer';
import LandingPage from '../components/LandingPage';

const mapStateToProps = ({ game, user }) => ({
  isPlaying: game.isPlaying,
  user: user.userData,
  isLoggedIn: user.isLoggedIn,
  isLoading: user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
  login: (username, password) => dispatch(actions.login(username, password)),
  register: newUserData => dispatch(actions.register(newUserData)),
  verify: () => dispatch(actions.verify()),
});

const MainContainer = ({
  isPlaying,
  startNewGame,
  user,
  isLoggedIn,
  isLoading,
  login,
  register,
  verify,
}) => {
  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="container">
      {!isLoading && (
        isPlaying === true
          ? <GameContainer
            startNewGame={startNewGame}
            user={user}
            isLoggedIn={isLoggedIn}
          />
          : <LandingPage
            startNewGame={startNewGame}
            user={user}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            login={login}
            register={register}
          />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
