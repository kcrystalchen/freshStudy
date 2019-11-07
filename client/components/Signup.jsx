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
      <form className="login-form" id="register" onSubmit={handleSubmit}>
        <label>Email
          <input className="emailInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Username
          <input className="userNameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>Password
          <input className="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <input className="registerBtn" type="submit" value="Register" />
      </form>
      <button className="loginHere" type="button" onClick={handleToggle}>Login here!</button>
    </div>
  );
};
