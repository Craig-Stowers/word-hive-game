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

export const extendArray = (arr, desiredLength) => {
   const newArr = [...arr];
   while (newArr.length < desiredLength) {
      newArr.push(undefined); // Push empty values (undefined) into the array
   }
   return newArr;
};
export const splitArrayIntoChunks = (array, chunkSize) => {
   const chunks = [];
   for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize)); // Push a slice of the original array into the chunks array
   }
   return chunks;
};
