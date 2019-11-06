import React, { useState } from 'react';

export default ({
  register,
  handleToggle,
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <label>Email</label>
      <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Username</label>
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label>Password</label>
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" onClick={() => register({ email, username, password })}>Signup!</button>
      <button type="button" onClick={handleToggle}>Login here!</button>
    </div>
  );
};
