import { BASE_URL } from "./constants";

function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function getToken() {
  let token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      token = null;
    }
  }
  return token;
}

async function getUserFromToken() {
  let token = getToken();
  if (JSON.parse(atob(token.split(".")[1])).userId) {
    token = JSON.parse(atob(token.split(".")[1])).userId;
  } else {
    token = null;
  }
  let user = await fetchUserInfo(token);
  return user;
}

async function fetchUserInfo(userId) {
  try {
    let res = await fetch(`${BASE_URL}${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

function removeToken() {
  localStorage.removeItem("token");
}

export { setToken, getToken, getUserFromToken, removeToken };
