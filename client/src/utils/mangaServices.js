import { getToken } from "./tokenServices";
import { MANGA_URL } from "./constants";

async function trackManga(manga) {
  try {
    const token = getToken();
    let res = await fetch(MANGA_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: manga,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { trackManga };
