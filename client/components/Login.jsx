import React, { useState } from 'react';

export default ({
  login,
  handleToggle,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) login(username, password);
  };
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="userNameLabel">Username:
          <input className="loginUserName" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label className="passwordLabel">Password:
          <input className="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Login" />
      </form>
      <button className="createAccountBtn" type="button" onClick={handleToggle}>Create Account Here!</button>
    </div>
  );
};
