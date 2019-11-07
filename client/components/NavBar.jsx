import React from 'react';

export default ({ user, isLoggedIn, logout, isPlaying, pause }) => {
  return (
    <div id="navbar">
      <div id="navbar-title">Fresh Study</div>
      {isPlaying && isLoggedIn
        && (
          <>
            <div>Playing as {user.username}</div>
            <button onClick={() => logout(true)}>Log Out</button>
          </>
        )}
      {isPlaying && !isLoggedIn
        && (
          <>
            <div>Playing as Guest</div>
            <button onClick={() => pause()}>Sign In</button>
          </>
        )}
      {!isPlaying && isLoggedIn
        && (
          <button onClick={() => logout(true)}>Log Out</button>
        )}
    </div>
  )
}