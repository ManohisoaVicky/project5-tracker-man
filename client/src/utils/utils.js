function capitalizeWords(phrase) {
  const words = phrase.split(" ");

  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });

  const capitalizedPhrase = capitalizedWords.join(" ");

  return capitalizedPhrase;
}

function removeSpace(phrase) {
  return phrase.replace(/\s+/g, "");
}

function googleSearchAuthor(artist) {
  if (typeof artist !== "string" || artist.trim() === "") {
    return;
  }

  const query = artist.split(" ").join("+");
  const link = `https://www.google.com/search?q=${query}`;
  return link;
}

function isNotEmpty(string) {
  return string.trim() !== "";
}

function isNotEmptyArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

function isLastElement(arr, element) {
  const lastIndex = arr.length - 1;
  return arr[lastIndex] === element;
}

function formatDateTime(dateTimeString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export {
  capitalizeWords,
  removeSpace,
  googleSearchAuthor,
  isNotEmpty,
  isNotEmptyArray,
  isLastElement,
  formatDateTime,
};
