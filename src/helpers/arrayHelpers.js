export const shuffleArray = (array) => {
   // Make a copy of the array
   const shuffledArray = [...array];

   // Shuffle the remaining elements
   for (let i = shuffledArray.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
   }

   return shuffledArray;
};

export const filterString = (inputString, allowedCharacters, caseSensitive = false) => {
   console.log("allowed", allowedCharacters, inputString);
   return inputString
      .split("")
      .filter((char) => allowedCharacters.toLowerCase().includes(char.toLowerCase()))
      .join("");
};
