import React from 'react';

export default ({ user, isLoggedIn, logout }) => {
  const handleUserRedirect = () => {
    if(isLoggedIn) logout(isLoggedIn);
  }
  return (
    <div id="navbar">
      <div id="navbar-title">Fresh Study</div>
      <div>Playing as {isLoggedIn ? user.username : 'Guest'}</div>
      <button onClick={handleUserRedirect}>{isLoggedIn ? 'Log Out' : 'Sign in'}</button>
    </div>
  )
}