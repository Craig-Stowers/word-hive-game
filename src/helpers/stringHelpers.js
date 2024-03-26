export const removeLastCharacter = (str) => {
   // Check if the string is not empty
   if (str.length > 0) {
      // Use slice to return the substring excluding the last character
      return str.slice(0, -1);
   } else {
      // If the string is empty, return the string as is
      return str;
   }
};

export const countOccurrences = (str, char, caseSensitive = false) => {
   const newStr = caseSensitive ? str : str.toLowerCase();
   const newChar = caseSensitive ? char : char.toLowerCase();
   return newStr.split("").reduce((count, currentChar) => count + (currentChar === newChar ? 1 : 0), 0);
};

export const containsAllLetters = (word, letters) => {
   for (let i = 0; i < letters.length; i++) {
      if (!word.includes(letters[i])) {
         return false;
      }
   }
   return true;
};
