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
      <form id="login" onSubmit={handleSubmit}>
        <label>Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Login" />
      </form>
      <button type="button" onClick={handleToggle}>Create Account Here!</button>
    </div>
  );
};
