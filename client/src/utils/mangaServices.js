import { getToken } from "./tokenServices";
import { MANGA_URL } from "./constants";

async function trackManga(manga) {
  try {
    const token = getToken();
    let res = await fetch(MANGA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(manga),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function fetchMangas(page) {
  const limit = 10;

  try {
    const token = getToken();
    const response = await fetch(`${MANGA_URL}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch mangas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSingleManga(mangaID) {
  try {
    const token = getToken();
    let response = await fetch(`${MANGA_URL}${mangaID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { trackManga, fetchMangas, getSingleManga };
