import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GameContainer from './GameContainer';
import LandingPage from '../components/LandingPage';
import NavBar from '../components/NavBar';

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
  logout: (isLoggedIn) => dispatch(actions.logout(isLoggedIn)),
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
  logout,
  verify,
}) => {
  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="container">
      <NavBar user={user} isLoggedIn={isLoggedIn} logout={logout} />
      {isLoading && 'Loading...'}
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
