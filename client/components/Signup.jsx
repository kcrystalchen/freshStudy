import React, { useState } from 'react';

export default ({
  register,
  handleToggle,
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && username && password) register({ email, username, password });
  };
  return (
    <div>
      <form id="register" onSubmit={handleSubmit}>
        <label>Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Register" />
      </form>
      <button type="button" onClick={handleToggle}>Login here!</button>
    </div>
  );
};
