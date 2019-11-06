import React from 'react';

export default ({
  login,
  handleToggle,
}) => (
  <div>
  <label>Username</label>
  <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
  <label>Password</label>
  <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  <button type="submit" onClick={() => login(username, password)}>Login here!</button>
  <button type="button" onClick={handleToggle}>Create Account Here!</button>
  </div>
);
