import React from 'react';
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
  isError: user.isError,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
  login: (username, password) => dispatch(actions.login(username, password)),
  register: newUserData => dispatch(actions.register(newUserData)),
  logout: (isLoggedIn) => dispatch(actions.logout(isLoggedIn))
});

const MainContainer = ({
  isPlaying,
  startNewGame,
  user,
  isLoggedIn,
  isLoading,
  isError,
  login,
  register,
  logout
}) => (
  <div className="container">
    <NavBar user={user} isLoggedIn={isLoggedIn} logout={logout} />
    {(isPlaying === true
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
          isError={isError}
          login={login}
          register={register}
        />
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
