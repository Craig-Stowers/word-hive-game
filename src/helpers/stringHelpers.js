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
