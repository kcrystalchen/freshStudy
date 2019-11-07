const user = { };

user.login = async (username, password) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    let res = await fetch('/login', options);
    return await res.json();
  } catch (e) {
    return e;
  }
}

user.register = async (user) => {
  const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await fetch('/register', options);
    return await res.json();
  } catch (e) {
    return e;
  }
}

user.verify = async () => {
  try {
    const res = await fetch('/verify');
    return await res.json();
  } catch (e) {
    return e;
  }
};

export default user;
