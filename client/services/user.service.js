import authHeader from '../helpers/authHeader';

export function handleResponse(response) {
  return response.json().then(res => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }
      return Promise.reject((data && data.message) || response.statusText);
    }
    return data;
  });
}

export function login(username, password) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('/login', options)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
}

export function logout() {
  localStorage.removeItem('user');
}

export function getAll() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

export function getById(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

export function register(user) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };
  return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

export function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };
  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
export function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}