import { getToken } from "./tokenServices";
import { REVIEW_URL } from "./constants";

async function addReview(review, mangaId) {
  try {
    const token = getToken();
    let res = await fetch(`${REVIEW_URL}${mangaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(review),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function fetchReviews(page, mangaId) {
  const limit = 3;

  try {
    const token = getToken();
    const response = await fetch(
      `${REVIEW_URL}${mangaId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { addReview, fetchReviews };
