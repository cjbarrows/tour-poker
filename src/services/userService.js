// import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  // getAll
};

async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  const response = await fetch(`${process.env.REACT_APP_API_PREFIX}/users/authenticate`, requestOptions);
  const user = await handleResponse(response);
  // login successful if there's a user in the response
  if (user) {
    // store user details and basic auth credentials in local storage 
    // to keep user logged in between page refreshes
    user.authdata = window.btoa(username + ':' + password);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

/*
function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}
*/

async function handleResponse(response) {
  const text = await response.text();

  const data = text && JSON.parse(text);
  if (!data.ok) {
    if (data.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // window.location.reload(true);
    }

    const errorMessage = (data && data.text) || response.statusText;
    return { ok: false, errorMessage };
  }

  return data;
}