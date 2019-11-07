import React from 'react';

export default ({ user, isLoggedIn, logout }) => {
  const handleUserRedirect = () => {
    if(isLoggedIn) logout(isLoggedIn);
  }
  return (
    <div id="navbar">
      <span>Playing as {isLoggedIn ? user.username : 'Guest'}</span>
      <button onClick={handleUserRedirect}>{isLoggedIn ? 'Log Out' : 'Sign in'}</button>
    </div>
  )
}