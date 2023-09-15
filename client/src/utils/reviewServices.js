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

export { addReview };
