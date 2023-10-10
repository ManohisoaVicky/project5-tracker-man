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

    // Create an array to store the filter criteria
    const filterCriteria = [];

    // Check if any of the filter options (type, comicStatus, or readingStatus) have values
    if (filter.types.length > 0) {
      filterCriteria.push(`type:${filter.types.join(",")}`);
    }

    if (filter.comicStatus.length > 0) {
      filterCriteria.push(`comicStatus:${filter.comicStatus.join(",")}`);
    }

    if (filter.readingStatus.length > 0) {
      filterCriteria.push(`readingStatus:${filter.readingStatus.join(",")}`);
    }

    // Combine the filter criteria into a single string with a comma (,) separator
    const filterString = filterCriteria.join(",");

    // Construct the API URL with the filter portion if there are filter criteria
    const apiUrl = `${MANGA_URL}?page=${page}&limit=${limit}&search=${search}${
      filterString ? `&filter=${filterString}` : ""
    }&sort=${sort}`;

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
