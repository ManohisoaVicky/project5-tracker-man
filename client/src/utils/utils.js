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

export { capitalizeWords };
