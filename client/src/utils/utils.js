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

export { capitalizeWords, removeSpace, googleSearchAuthor };
