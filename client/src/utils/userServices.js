import { setToken, getUserFromToken, removeToken } from "./tokenServices";
import BASE_URL from "./constants";

function signUp(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Email already taken!");
    })
    .then(({ token }) => setToken(token));
}

async function getUser() {
  return await getUserFromToken();
}

function logOut() {
  removeToken();
}

function login(cred) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(cred),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Invalid credentials");
    })
    .then(({ token }) => setToken(token));
}

export { signUp, getUser, logOut, login };
