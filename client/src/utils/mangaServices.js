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
async function fetchMangas(page, search = "", filter = {}, sort = "") {
  const limit = 10;

  try {
    const token = getToken();

    const filterCriteria = [];

    if (filter.types.length > 0) {
      filterCriteria.push(`type:${filter.types.join(",")}`);
    }

    if (filter.comicStatus.length > 0) {
      filterCriteria.push(`comicStatus:${filter.comicStatus.join(",")}`);
    }

    if (filter.readingStatus.length > 0) {
      filterCriteria.push(`readingStatus:${filter.readingStatus.join(",")}`);
    }

    if (filter.rating.length > 0) {
      const ratingString = filter.rating.filter(Number).map(String).join(",");
      if (ratingString) {
        filterCriteria.push(`rating:${ratingString}`);
      }
    }

    const filterString =
      filterCriteria.length > 0 ? `&filter=${filterCriteria.join(",")}` : "";

    const apiUrl = `${MANGA_URL}?page=${page}&limit=${limit}&search=${search}${filterString}&sort=${sort}`;

    const response = await fetch(apiUrl, {
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

async function deleteManga(id) {
  try {
    const token = getToken();
    let res = await fetch(`${MANGA_URL}${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function updateManga(manga, mangaId) {
  try {
    const token = getToken();

    let res = await fetch(`${MANGA_URL}${mangaId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(manga),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { trackManga, fetchMangas, getSingleManga, deleteManga, updateManga };
